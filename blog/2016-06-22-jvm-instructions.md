---
id: jvm-instructions
title: JVM指令
date: 2016-06-22
tags: [JVM]
---

<!-- ![jvm_cover](/assets/images/jvm_cover.png) -->

##### 凡是带**const**的表示将什么数据压操作数栈
- `iconst_2` 将int型数据2压入到操作数栈；
- `aconst_null`  将null值压入栈；
- `bipush`和`sipush`  表示将单字节或者短整形的常量值压入操作数栈；

##### 带ldc的表示将什么类型数据从常量池中压入到操作数栈。
- `ldc_w`  将int或者flat或者string类型的数据压入到操作数栈；
- `ldc2_w`  将long或者double类型的数据压入到操作数栈；

##### 凡是带load的指令表示将某类型的局部变量数据压入到操作数栈的栈顶。
- `iload` 表示将int类型的局部变量压入到操作数栈的栈顶；
- `aload`  以a开头的表示将引用类型的局部变量压入到操作数栈的栈顶；
- `iload_1` 将局部变量数组里面下标为1的int类型的数据压入到操作数栈；
- `iaload`   将int型数组的指定索引的值压入到操作数栈；

<!-- more -->

##### 凡是带有store指令的表示将操作数栈顶的某类型的值存入指定的局部变量中。
- `istore`  表示将栈顶int类型的数据存入到指定的局部变量中；
- `istore_3`  表示将栈int类型的数据存入到局部变量数组的下标为3的元素中；
- `pop`  将栈顶数据弹出；
- `pop2`将栈顶的一个long或者double数据从栈顶弹出来；
- `dup`  复制栈顶的数据并将复制的值也压入到栈顶；
- `dup2`  复制栈顶一个long或者是double的数据并将复制的值也压入到栈顶；
- `swap`  将栈最顶端的两个值互换；
- `iadd` 将栈顶两个int型的数据相加然后将结果再次的压入到栈顶；
- `isub` 将栈顶两个int型的数据相减然后将结果再次的压入到栈顶；   
- `imul` 将栈顶两个int型的数据相乘然后将结果再次的压入到栈顶；
- `idiv`  将栈顶两个int型的数据相除然后将结果再次的压入到栈顶；
- `irem` 将栈顶两个int型的数据取模运算然后将结果再次的压入到栈顶；
- `ineg` 将栈顶的int数据取负将结果压入到栈顶；
- `iinc`  将指定的int变量增加指定值(i++,i--,i+=2)；
- `i2l`   将栈顶int类型数据强制转换成long型将结果压入到栈顶；
- `lcmp`  将栈顶两long型数据的大小进行比较，并将结果(1,0,-1)压入栈顶;



##### 以if开头的指令都是跳转指令
- `tableswitch`、`lookupswitch`  表示用switch条件跳转；
- `ireturn`  从当前方法返回int型数据；
- `getstatic`  获取指定类的静态域，将将结果压入到栈顶；
- `putstatic` 为指定的类的静态域赋值；
- `getfield`   获取指定类的实例变量，将结果压入到栈顶；
- `putfield`   为指定类的实例变量赋值；
- `invokevirtual`  调用实例方法；
- `invokespacial`  调用超类构造方法，实例初始化方法，私有方法；
- `invokestatic`  调用静态方法；
- `invokeinterface`  调用接口方法； 
- `new` 创建一个对象，并将其引用压入到栈顶；
- `newarray`  创建一个原始类型的数组，并将其引用压入到栈顶；
- `arraylength`   获得一个数组的长度，将将结果压入到栈顶；
- `athrow`   将栈顶的异常抛出；
- `checkcast`  检验类型转换，转换未通过，将抛出ClassCastException；
- `instanceof` 检验对象是否是指定的类的实例，如果是将1压入栈顶，否则将0压入栈顶 
- `monitorenter`   获得对象的锁，用于同步方法或同步块  
- `monitorexit`    释放对象的锁，用于同步方法或同步块
- `ifnull`    为null时跳转 
- `ifnonnull`   不为null时跳转
