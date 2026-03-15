---
id: java-object-oriented-abstract-interface
title: java 面向对象——抽象类与接口
date: 2016-05-09
tags: [java, java基础]
---

#### 抽象类

抽象类只是比普通类多了一些抽象方法而已，抽象方法没有方法体。

```java
abstract class Person{
	public abstract void walk();
}
```

注意：
- 抽象类不能直接实例化（new Person()是错误的），只能通过子类实例化
- 抽象类也包含构造方法（子类调用父类构造方法）
- 抽象类也可以包含普通方法

#### 接口

接口是抽象类的更一步抽象，接口中所有的方法都是抽象方法

```java
interface Person{
	public void walk();
	public void eat();
}
```

注意：
- 接口不能被实例化
- 接口没有构造方法
- 接口中的方法必须是抽象方法（jdk1.8后可以有default方法）
- 接口中的常量必须是public static final


#### 抽象类与接口的区别

|  | 抽象类 | 接口 |
|---|---|---|
| 成员变量 | 无特殊要求 | 必须是public static final |
| 构造方法 | 有 | 无 |
| 方法 | 可以有抽象方法也可以有普通方法 | 只能是抽象方法（jdk1.8后可以有default） |
| 继承 | 只能单继承 | 可以多实现 |
| 成员 | 可以有普通成员 | 只能是常量 |

