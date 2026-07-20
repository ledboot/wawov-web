---
slug: /2016/05/09/java-array
title: java 数组
date: 2016-05-09
authors: [gwynn]
tags: [java, java基础]
---

#### 一维数组

##### 数组初始化

本文整理 Java 数组的初始化、遍历和常见操作，作为基础语法复习笔记。

<!-- truncate -->

```java
//静态初始化
int[] a = {1,2,3};
int[] a = new int[]{1,2,3};

//动态初始化
int[] a = new int[3];
```

##### 数组遍历

```java
//普通for循环
for(int i=0;i<a.length;i++){
	System.out.println(a[i]);
}

//增强for循环
for(int i:a){
	System.out.println(i);
}
```

#### 二维数组

##### 初始化

```java
//静态初始化
int[][] a = {{1,2},{3,4}};

//动态初始化
int[][] a = new int[3][3];
int[][] a = new int[3][];
a[0] = new int[3];
```

#### 数组复制

```java
System.arraycopy(src, srcPos, dest, destPos, length);
```

#### 数组排序

```java
Arrays.sort(a);
```

#### 数组查找

```java
//二分查找（前提是已排序）
Arrays.binarySearch(a, key);
```
