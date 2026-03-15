---
id: tls-bootstrapping-worker-nodes
title: TLS Bootstrapping Worker Nodes
date: 2019-09-15
tags: [CKA, Kubernetes]
---

## step 1
在`kube-system`namespace下创建一个secret,名字格式:bootstrap-token-\<token\>

```
cat > bootstrap-token-05832d.yaml << EOF
apiVersion: v1
kind: Secret
metadata:
  name: bootstrap-token-05832d
  namespace: kube-system
type: bootstrap.kubernetes.io/token
stringData:
  token-id: 05832d
  token-secret: x262bbbe835dx21k
  usage-bootstrap-authentication: "true"
  usage-bootstrap-signing: "true"
  auth-extra-groups: system:bootstrappers:node03
EOF
```
## step 2
授权节点创建CSR

```
kubectl create clusterrolebinding crb-bootstrappers --clusterrole=system:node-bootstrapper --group=system:bootstrappers
```

## step 3
创建bootstrap-kubeconfig

 ```
kubectl config --kubeconfig=/var/lib/kubelet/bootstrap-kubeconfig set-cluster bootstrap --server='https://172.17.0.77:6443' --certificate-authority=/etc/kubernetes/pki/ca.crt
kubectl config --kubeconfig=/var/lib/kubelet/bootstrap-kubeconfig set-credentials kubelet-bootstrap --token=05832d.x262bbbe835dx21k
kubectl config --kubeconfig=/var/lib/kubelet/bootstrap-kubeconfig set-context bootstrap --user=kubelet-bootstrap --cluster=bootstrap
kubectl config --kubeconfig=/var/lib/kubelet/bootstrap-kubeconfig use-context bootstrap
 ```

 ## step 4
 配置kubelet.service，注意路径在`/etc/systemd/system/kubelet.service`

 ```
[Unit]
Description=Kubernetes Kubelet
Documentation=https://github.com/kubernetes/kubernetes

[Service]
ExecStart=/usr/bin/kubelet \
  --bootstrap-kubeconfig=/var/lib/kubelet/bootstrap-kubeconfig \
  --kubeconfig=/var/lib/kubelet/kubeconfig \
  --register-node=true \
  --v=2
Restart=on-failure
StandardOutput=file:/var/kubeletlog1.log
StandardError=file:/var/kubeletlog2.log
RestartSec=5

[Install]
WantedBy=multi-user.target

 ```

配置好kubelet.service之后：
```
systemctl daemon-reload
systemctl enable kubelet
systemctl start kubelet
```
kubelet正常启动之后，在master节点上`kubectl get csr`,可以看到一个pending状态的csr,可以通过创建一个clusterrolebinding让csr自动approve csr。

## step 5

自动approve csr
```
kubectl create clusterrolebinding crb-node-autoapprove-csr --clusterrole=system:certificates.k8s.io:certificatesigningrequests:nodeclient --group=system:bootstrappers

```

证书过期自动续签
```
kubectl create clusterrolebinding crb-node-autorotate-csr --clusterrole=system:certificates.k8s.io:certificatesigningrequests:selfnodeclient --group=system:nodes
```

Done !
