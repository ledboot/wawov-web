---
id: grafana-loki
title: Loki-管理日志从未如此简单
date: 2025-03-17
tags: [Docker, Grafana, Loki, Alloy]
---

一个项目中，需要需要管理大量的日志，并且需要快速查询和分析日志。如果使用传统的日志管理方式，比如使用`tail -f`，或者使用`grep`，`awk`等命令，查询和分析日志会非常困难。如果使用ELK，需要部署大量的组件，并且需要花费大量的时间进行配置和优化。

如果使用Grafana Loki，可以非常方便地管理日志，并且可以非常方便地查询和分析日志。而且系统资源占用小，部署简单。


<!--more-->

## 什么是Loki

[Loki 官方文档](https://grafana.com/docs/loki/latest/)

Loki 是一个开源的日志管理系统，它使用 Prometheus 的存储格式来存储日志数据。Loki 的存储格式非常高效，可以存储大量的日志数据，并且可以非常方便地查询和分析日志。

### 设计理念
- 简单性：Loki 的一个核心目标是简单。它不需要复杂的索引结构，而是将日志数据按流（stream）存储，以标签（labels）为基础进行查询。这种设计使得它的使用和配置相对容易。
- 无结构化：与大多数日志系统不同，Loki 不会对日志内容进行索引，而是将其按照时间戳和标签存储。这意味着用户可以更快地写入日志，而不需要担心复杂的索引管理。

### 配置文件

创建一个`loki-config.yaml`文件为后续做准备，内容如下：

```yaml
auth_enabled: false

server:
  http_listen_port: 3100
  grpc_listen_port: 9096
  log_level: debug
  grpc_server_max_concurrent_streams: 1000

common:
  ring:
    instance_addr: 0.0.0.0
    kvstore:
      store: inmemory
  replication_factor: 1
  path_prefix: /tmp/loki

query_range:
  results_cache:
    cache:
      embedded_cache:
        enabled: true
        max_size_mb: 100

limits_config:
  allow_structured_metadata: true
  volume_enabled: true

schema_config:
  configs:
    - from: 2025-02-24
      store: tsdb
      object_store: filesystem
      schema: v13
      index:
        prefix: index_
        period: 24h

storage_config:
  tsdb_shipper:
    active_index_directory: /tmp/loki/index
    cache_location: /tmp/loki/index_cache
  filesystem:
    directory: /tmp/loki/chunks

pattern_ingester:
  enabled: true
```

## 什么是Alloy

Grafana Alloy 是 Grafana Labs 开发的一款开源工具，旨在提升数据和监控的可视化体验。

[Alloy 官方文档](https://grafana.com/docs/alloy/latest/)

>引用官方的一张图很容易理解Alloy能做什么

![Alloy 官方图](https://grafana.com/media/docs/alloy/alloy_diagram_v2.svg)

Alloy有多个组件，可以轻松支持从应用程序、数据库和OpenTelemetry收集数据，并将其转换为可查询的指标。


### 配置文件

创建一个`config.alloy`文件为后续做准备，内容如下：

```
discovery.docker "linux" {
  host = "unix:///var/run/docker.sock"
}

discovery.relabel "containers" {
	targets = []

    rule {
        source_labels = ["__meta_docker_container_label_enable_alloy"]
        regex         = "^true$"
        action        = "keep"
    }

	rule {
		source_labels = ["__meta_docker_container_name"]
		target_label  = "container_name"
	}

	rule {
		source_labels = ["__meta_docker_container_id"]
		target_label  = "container_id"
	}

}

loki.source.docker "default" {
	host       = "unix:///var/run/docker.sock"
	targets    = discovery.docker.linux.targets
	labels     = {"platform" = "docker"}
	relabel_rules = discovery.relabel.containers.rules
	forward_to = [loki.write.local.receiver]
}


loki.write "local" {
  endpoint {
    url = "http://loki:3100/loki/api/v1/push"
    batch_wait = "5s"
    batch_size = "1MiB"
    min_backoff_period = "1s" 
    max_backoff_period = "10s"
  }
}


loki.process "gflog_fmt" {
	stage.regex {
		expression = `^(?P<timestamp>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}) \[(?P<level>[A-Z]+)\] \{(?P<request_id>[a-f0-9]+)} \[(?P<duration>\d+ ms)\] (?P<content>.*)$`
	}
	stage.labels {
		values = {
			timestamp = "timestamp",
			detected_level = "level",
			duration = "duration",
		}
	}
	stage.replace {
		expression = "WARN"
		replace = "warning"
		source = "detected_level"
	}
	stage.replace {
		expression = "ERRO"
		replace = "error"
		source = "detected_level"
	}
	stage.replace {
		expression = "DEBU"
		replace = "debug"
		source = "detected_level"
	}
	stage.timestamp {
		source = "timestamp"
		format = "2006-01-02 15:04:05.000"
	}
	stage.output {
		source = "content"
	}
	forward_to = [loki.write.local.receiver]
}

```

这里有几个关键点：

- `discovery.docker`：用于发现Docker容器，并将其作为日志源。
- `loki.source.docker`：用于将Docker容器的日志写入Loki。
- `loki.process`：用于将日志格式化，并写入Loki。
- `loki.write`：用于将日志写入Loki。


在`discovery.relabel`这个配置中加入了docker label过滤，只有`enable_alloy`为`true`的容器才会被采集。


在`loki.process "gflog_fmt"`中，使用了[GoFrame框架](https://goframe.org/)，所以需要对日志的level进行处理，以满足Loki的level要求。

只有level格式一直的情况下，在Grafana中才能正确显示日志颜色。

![Grafana 日志颜色](https://cdn.wawov.com/gh/ledboot/blog-asset/img/2024/202503172052055.png)


## 部署

接下来使用DockerCompose部署Loki和Alloy。

```yaml
version: "3.8"

services:
  loki:
    container_name: loki
    image: grafana/loki:3.4
    ports:
      - "3100:3100"
    volumes:
      - ./loki-config.yaml:/etc/loki/loki-config.yaml
    command: -config.file=/etc/loki/loki-config.yaml
  alloy:
    container_name: alloy
    image: grafana/alloy:latest
    volumes:
      - /var/lib/docker/containers:/var/lib/docker/containers
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./config.alloy:/etc/alloy/config.alloy
    command: run --server.http.listen-addr=0.0.0.0:12345 /etc/alloy/config.alloy
    ports:
      - "12345:12345"
    depends_on:
      - loki
```

我这边的Grafana是独立部署的，我也个出一个参考的docker-compose.yaml文件，仅供参考。

```yaml
version:  '3'
services:
    grafana:
      image:  grafana/grafana:10.1.9
      deploy:
        resources:
          limits:
            cpus: '0.5'
            memory: 2G
      container_name:  grafana
      restart:  always
      volumes:
        - ./grafana.ini:/etc/grafana/grafana.ini
        - ./volumes/grafana:/var/lib/grafana
      network_mode: "host"
      expose:
       - "3000"
```


接下来一个命令`docker-compose up -d`一把梭服务正常就能起来了。

![Docker ps](https://cdn.wawov.com/gh/ledboot/blog-asset/img/2024/202503180928027.png)


## 配置Grafana

打开Grafana，添加Loki数据源。路径: `connections` -> `data sources` -> `add data source` -> `Loki`。


添加一个Dashboard，添加一个名为`Live logs`的panel。类型选择`Logs`，然后选择刚刚添加的`Loki`数据源。

![Grafana Live logs](https://cdn.wawov.com/gh/ledboot/blog-asset/img/2024/202503180928027.png)
