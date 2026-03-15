---
id: ndk-getting-started
title: NDK入门
date: 2015-12-10
tags: [Android, NDK]
---


#### **JNI中C与java类型对应表** 

|字符	|Java类型		|C类型		|
|---|-------|--------|
|V      	|void            |void			
|Z         |jboolean     |boolean	
|I       	|jint              |int
|J       	|jlong           |long
|D      	|jdouble       |double
|F      	|jfloat       	|float
|B      	|jbyte            |byte
|C      	|jchar           |char
|S      	|jshort          |short
|**数组则以"["开始，用两个字符表示**
|[I       	|jintArray      |int[]
|[F    		|jfloatArray    |float[]
|[B     	|jbyteArray    |byte[]
|[C    	|jcharArray    |char[]
|[S    |jshortArray   |short[]
|[D   | jdoubleArray |double[]
|[J     |jlongArray     |long[]
|[Z    |jbooleanArray |boolean[]


#### **开始编写jni** 

当java调用，
```java
static {
	System.loadLibrary("hello");
}
```
jni会尝试去寻找JNI_OnLoad方法，所以一些初始化的东西就可以在这里面实现。

<!--more-->

#### **方法注入**
>本人表示网上一堆乱七八糟的方式会让刚入门的同学遇到无限的坑，被坑过的我，现在整理了一下，顺便梳理过程

首先列出几个jni的方法，这些方法都可以在jni.h中找到，在jni.h中都大部分提供了有C与C++两个版本的，使用时请注意。

```C++
JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void* reserved);//jni入口

JNIEXPORT void JNICALL JNI_OnUnload(JavaVM* vm, void* reserved);//结束jni之后调用的

jint GetEnv(void** env, jint version)//传入指定的jni版本，返回是否支持此版本，成功返回JNI_OK

jclass FindClass(const char* name)//找到指定的java类，使用全包名+类名

jint RegisterNatives(jclass clazz, const JNINativeMethod* methods,jint nMethods)//注册本地方法
```

有了以上的方法，简单的NDK开发就可以开始了，列出代码讲解可能来的更加痛快。

```C++
//jni入口
JNIEXPORT jint JNI_OnLoad(JavaVM* jvm, void* reserved){
    JNIEnv *env = NULL;
    //使用reinterpret_cast进行类型转换，我之前没有使用这种方式转换，下面的代码一直有问题，所以强烈建议使用
    if(jvm->GetEnv(reinterpret_cast<void **>(&env),JNI_VERSION_1_4) != JNI_OK){
        return JNI_ERR;
    }
    //registerMethod 自己写的方法，用于方法注册
    if(registerMethod(env) == JNI_ERR){
        return JNI_ERR;
    }
    return JNI_VERSION_1_4;

}
```
这里说明一下 JNI_VERSION_1_4  是系统定义的宏，除了这个还有

- JNI_VERSION_1_1
- JNI_VERSION_1_2
- JNI_VERSION_1_6

现在的版本一般使用 JNI_VERSION_1_4。

下面是JNINativeMethod的结构体：

```
typedef struct {
    const char* name;
    const char* signature;
    void*       fnPtr;
} JNINativeMethod;
```
对于JNINativeMethod结构体说明，网上一大把的，

- 第一个变量name是Java中函数的名字。
- 第二个变量signature，用字符串是描述了函数的参数和返回值，就是方法签名，例如：()V,表示void func();()表示方法参数，V表示返回值，对应的类型可以参考上面的表格，如果参数是java的类，使用"L"开头，";"结束，例如：("Ljava/lang/Object;")I，表示int func(String str);多个参数例子：(IZLjava/lang/String;)V，表示void func(int i,boolean	flag,String str,)，()里面直接写类型就可以了
- 第三个变量fnPtr是函数指针，指向C函数。格式都是固定的(void*)xxx，xxx就是C++的方法名

```C++

static JNINativeMethod gMethods []= {
        {"stringFromJni",          "()Ljava/lang/String;",         (void*)stringFromJni},
};

int registerMethod(JNIEnv *env){
    jclass clazz = env->FindClass(CLASS_MODEL);
    if(clazz == NULL){
        return JNI_ERR;
    }
    if(env->RegisterNatives(clazz,gMethods,NELEM(gMethods))<0){
        return JNI_ERR;
    }
    return JNI_OK;
}
```

CLASS_MODEL是对应java中的全包名+类名，可以使用下面的方式，也可以定义 成static const char *CLASS_MODEL  

```
#define CLASS_MODEL  "com/wawov/nativeapp/activity/MainActivity"

#ifndef NELEM
# define NELEM(x) ((int) (sizeof(x) / sizeof((x)[0])))
#endif
```
NELEM用于计算gMethods的size。

本地的方法
```
jstring stringFromJni(JNIEnv *env,jobject thiz){
    return env->NewStringUTF("hello jni");
}
```


----------


***注意C++是至上而下编译的，所以编写是注意方法的位置，到到简单的jni就写好了***


----------


##### **Android.mk文件简介**
**LOCAL_PATH := $(call my-dir)** 
每个Android.mk文件必须以定义LOCAL_PATH为开始。它用于在开发tree中查找源文件。
宏my-dir 则由Build System提供。返回包含Android.mk的目录路径。


**include $(CLEAR_VARS)** 
CLEAR_VARS 变量由Build System提供。并指向一个指定的GNU Makefile，由它负责清理很多LOCAL_xxx.
例如：LOCAL_MODULE, LOCAL_SRC_FILES, LOCAL_STATIC_LIBRARIES等等。但不清理LOCAL_PATH.
这个清理动作是必须的，因为所有的编译控制文件由同一个GNU Make解析和执行，其变量是全局的。所以清理后才能避免相互影响。

**LOCAL_MODULE    := hello-jni** 
LOCAL_MODULE模块必须定义，以表示Android.mk中的每一个模块。名字必须唯一且不包含空格。
Build System会自动添加适当的前缀和后缀。例如，foo，要产生动态库，则生成libfoo.so. 但请注意：如果模块名被定为：libfoo.则生成libfoo.so. 不再加前缀。

**LOCAL_SRC_FILES := hello-jni.c** 
LOCAL_SRC_FILES变量必须包含将要打包如模块的C/C++ 源码。
不必列出头文件，build System 会自动帮我们找出依赖文件。
缺省的C++源码的扩展名为.cpp. 也可以修改，通过LOCAL_CPP_EXTENSION。

**include $(BUILD_SHARED_LIBRARY)** 
BUILD_SHARED_LIBRARY：是Build System提供的一个变量，指向一个GNU Makefile Script。
它负责收集自从上次调用 include $(CLEAR_VARS)  后的所有LOCAL_XXX信息。并决定编译为什么

- BUILD_STATIC_LIBRARY：编译为静态库。 
- BUILD_SHARED_LIBRARY ：编译为动态库 
- BUILD_EXECUTABLE：编译为Native C可执行程序

**LOCAL_LDLIBS := -llog**
LOCAL_LDLIBS可以用它来添加系统库，-lxxx

简单的Android.mk例子：

```
LOCAL_PATH :=$(call my-dir)
include $(CLEAR_VARS)

LOCAL_MODULE :=hello #System.loadLibrary("hello")
LOCAL_SRC_FILES :=hello.cpp

LOCAL_LDLIBS := -llog

include $(BUILD_SHARED_LIBRARY)
```

>关于Android.mk文件还有很多的内容，兴趣的同学可以移步到：
>http://android.mk/ 
>https://developer.android.com/ndk/guides/android_mk.html#mdv


----------


##### **Application.mk**

一般简单的只需要这样写：
```
APP_ABI :=armeabi
```
这里的是cup的架构除此之外，还有别的一些架构，如：x86、mips。当然在Application.mk中，可写的东西也是挺多的。对于刚入门来说，可以慢慢了解。

> 有兴趣的同学可以移步到：
> https://developer.android.com/ndk/guides/application_mk.html

*好了，jni开发的重要的几个文件就准备得差不多了，接下来就是这些文件放哪里和怎么调用的问题了。*


----------
一般的会在main目录下创建一个jni的文件夹放入hello.cpp、Android.mk和Application.mk文件，同时在建一个jniLibs文件夹放入编译好的.so文件。

接下来我们需要在java类中定义一个native的方法：

``` java
public native  String stringFromJni();
```
还记得我们在hello.cpp文件中定义了一个本地的方法：
``` C++
jstring stringFromJni(JNIEnv *env,jobject thiz){
    return env->NewStringUTF("hello jni");
}
```
这时候我们cd 到jni文件夹中，使用ndk-build命令，编译成功的话，会在jni目录下生成2个文件夹libs、obj，我们将libs中的armeabi文件夹复制到jniLibs中。接下来，在java类中这样做：
``` java

	static { 
        System.loadLibrary("hello");
    }
    
    @Override 
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        tv = (TextView) findViewById(R.id.id_tv); 
        tv.setText(stringFromJni()); 
    } 
```
如果启动app，看到hello jni，那恭喜你，一个简单ndk就完成了。
