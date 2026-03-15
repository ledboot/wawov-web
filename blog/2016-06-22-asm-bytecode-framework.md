---
id: asm-bytecode-framework
title: ASM Bytecode Framework探索与使用
date: 2016-06-22
tags: [java, ASM]
---

<!-- <!-- ![](...) -->ASM_cover.png) -->

ASM是一款基于java字节码层面的代码分析和修改工具。无需提供源代码即可对应用嵌入所需debug代码，用于应用API性能分析。ASM可以直接产生二进制class文件，也可以在类被加入JVM之前动态修改类行为。

<!-- more -->

##### ASM库的结构

<!-- <!-- ![](...) -->1.png) -->


- **Core** 为其他包提供基础的读、写、转化Java字节码和定义的API，并且可以生成Java字节码和实现大部分字节码的转换
- **Tree**提供了Java字节码在内存中的表现
- **Analysis**为存储在tree包结构中的java方法字节码提供基本的数据流统计和类型检查算法
- **Commons**提供一些常用的简化字节码生成转化和适配器
- **Util**包含一些帮助类和简单的字节码修改，有利于在开发或者测试中使用
- **XML**提供一个适配器将XML和SAX-comliant转化成字节码结构，可以允许使用XSLT去定义字节码转化。

##### class文件结构

在了解ASM之前，有必要先了解一下class文件结构。对于每个class文件其实都是有固定的结构信息，而且保留了源码文件中的符号。下图是class文件的格式图。其中带 * 号的表示可重复的结构。

<!-- ![](...) -->2.png)


- 类结构体中所有的修饰符、字符常量和其他常量都被存储在class文件开始的一个常量堆栈(Constant Stack)中，其他结构体通过索引引用。
- 每个类必须包含headers（包括：class name, super class, interface, etc.）和常量堆栈（Constant Stack）其他元素，例如：字段（fields）、方法（methods）和全部属性（attributes）可以选择显示或者不显示。
- 每个字段块（Field section）包括名称、修饰符（public, private, etc.）、描述符号(descriptor)和字段属性。
- 每个方法区域（Method section）里面的信息与header部分的信息类似，信息关于最大堆栈（max stack）和最大本地变量数量（max local variable numbers）被用于修改字节码。对于非abstract和非native的方法有一个方法指令表，exceptions表和代码属性表。除此之外，还可以有其他方法属性。
- 每个类、字段、方法和方法代码的属性有属于自己的名称记录在类文件格式的JVM规范的部分，这些属性展示了字节码多方面的信息，例如源文件名、内部类、签名、代码行数、本地变量表和注释。JVM规范允许定义自定义属性，这些属性会被标准的VM（虚拟机）忽略，但是可以包含附件信息。
- 方法代码表包含一系列对java虚拟机的指令。有些指令在代码中使用偏移量，当指令从方法代码被插入或者移除时，全部偏移量的值可能需要调整。

##### 基于事件字节码处理

在Core包中逻辑上分为2部分：
- 字节码生产者，例如ClassReader
- 字节码消费者，例如writers（ClassWriter, FieldWriter, MethodWriter和AnnotationWriter），adapters（ClassAdapter和MethodAdapter）

下图是生产者和消费者交互的时序图：

<!-- ![](...) -->3.png)


通过时序图可以看出ASM在处理class文件的整个过程。ASM通过树这种数据结构来表示复杂的字节码结构，并利用Push模型来对树进行遍历。
- ASM中提供一个`ClassReader`类，这个类可以直接由字节数组或者class文件间接的获得字节码数据。它会调用`accept`方法，接受一个实现了抽象类`ClassVisitor`的对象实例作为参数，然后依次调用`ClassVisitor`的各个方法。字节码空间上的偏移被转成各种visitXXX方法。使用者只需要在对应的的方法上进行需求操作即可，无需考虑字节偏移。
-  这个过程中`ClassReader`可以看作是一个事件**生产者**，ClassWriter继承自ClassVisitor抽象类，负责将对象化的class文件内容重构成一个二进制格式的class字节码文件，`ClassWriter`可以看作是一个事件的**消费者**。

##### 原java类型与class文件内部类型对应关系

| Java type      |   Type descriptor|
| :-------- | --------:|
| boolean    |   Z | 
| char|C|
|byte|B|
|short|S|
|int|I|
|float|F|
|long|J|
|double|D|
|Object|Ljava/lang/Object;|
|int[]|[I|
|Object[][]|[[Ljava/lang/Object;|

##### 原java方法声明与class文件内部声明的对应关系

| Method declaration in source file    |     Method descriptor |
| :-------- | --------:| 
| void method(String str,int i,float f)    |   (Ljava/lang/String;IF)V|
| Object method(byte [] b)|([B)Ljava/lang/Object;|
|int[] method(double d)| (D)[I|

##### 遍历CLASS字节码类信息

以java.lang.Runnable作为例子

<!-- ![](...) -->4.png)

输出：
```
superName=java/lang/Object,name=java/lang/Runnable
run()V
end
```

ClassReader类的accept方法中，有个int类型的flag参数有以下几种：

- **SKIP_DEBUG** 用于忽略debug信息，例如，源文件，行数和变量信息。
- **SKIP_FRAMES** 用于忽略StackMapTable（栈图）信息。Java 6 之后JVM引入栈图概念。
- **EXPAND_FRAMES** 扩展StackMapTable数据，允许访问者获取全部本地变量类型与当前堆栈位置的信息。
- **SKIP_CODE** 排除代码访问的所有方法，同时还通过方法参数属性和注释。

##### 通过ASM生产自定义类对应的class

目标class内容：

<!-- ![](...) -->5.png)

生产目标class的代码：

*这里需要注意，平时我们写类的时候，默认的构造方法是可以不写的，但使用ASM框架生产class的话，默认的构造方法是需要写的，不然，无法实例化对象。*

创建类、构造函数与字段：

<!-- ![](...) -->6.png)

创建showInfo方法

<!-- ![](...) -->7.png)

创建get、set方法

<!-- ![](...) -->8.png)


最后生产出Person.class之后，我们可以使用JD-GUI打开：

<!-- ![](...) -->9.png)


##### 动态加载生产出的class字节码并实例化该类

我们可以通过`ClassWriter`中的`toByteArray()` 方法可以获取生成的字节码数据。然后使用`ClassLoader`的`defineClass()`方法进行反射实例化对象，并调用`showInfo()`方法。

<!-- ![](...) -->10.png)

##### 动态修改class字节码，进行AOP编程

通过加载上面生成的`Person.class`文件，在`showInfo()`方法里面添加一行打印当前时间。

通过继承ClassVisitor，重写`visitMethod()`，拦截`showInfo()`方法。

<!-- ![](...) -->11.png)


然后让继承`AdviceAdapter`的类中的`onMethodEnter()`方法修改`showInfo()`方法。

<!-- ![](...) -->12.png)


这样就可以实现修改class字节码的操作了。重新生成class文件。使用JD－GUI验证一下。不出意料，结果是我们所预期的。

<!-- ![](...) -->13.png)

虽然例子简单，但是是进行AOP"无损注入"的基础展示。著名的Spring框架也是利用这种技术实现AOP的。至此，对ASM框架的一些简单的使用就是这样了，其中会涉及到一些JVM操作的理解，可以查看我的另一篇文章：[JVM指令](http://www.jianshu.com/p/9f09a0c21542)


另外，可以到github仓库查看本次的demo工程：[ASMTest](https://github.com/ledboot/ASMTest)

