---
id: android-manifest-analysis
title: AndroidManifest解析
date: 2015-12-14
tags: [Android]
---

#### 关于AndroidManifest.xml
AndroidManifest.xml 是每个android程序中必须的文件。它位于整个项目的根目录，描述了package中暴露的组件（activities, services, 等等），他们各自的实现类，各种能被处理的数据和启动位置。 除了能声明程序中的Activities, ContentProviders, Services, 和Intent Receivers,还能指定permissions和instrumentation。

#### 各个节点的详细介绍

##### (\<manifest\>)属性

```
<manifest  xmlns:android="http://schemas.android.com/apk/res/android"
          package="com.woody.test"
          android:sharedUserId="string"
          android:sharedUserLabel="string resource"
          android:versionCode="integer"
          android:versionName="string"
          android:installLocation=["auto" | "internalOnly | preferExternal"] >
</manifest>
```
- sharedUserId，表明数据权限，因为默认情况下，Android给每个APK分配一个唯一的UserID，所以是默认禁止不同APK访问共享数据的。若要共享数据，第一可以采用Share Preference方法，第二种就可以采用sharedUserId了，将不同APK的sharedUserId都设为一样，则这些APK之间就可以互相共享数据了
- sharedUserLabel，一个共享的用户名，它只有在设置了sharedUserId属性的前提下才会有意义
- versionCode，给设备程序识别版本(升级)用的必须是一个interger值代表app更新过多少次
- versionName，这个名称是给用户看的，你可以将你的APP版本号设置为1.1版
- installLocation，安装参数，是Android2.2中的一个新特性，installLocation有三个值可以选择：internalOnly、auto、preferExternal。
	- preferExternal，系统会优先考虑将APK安装到SD卡上(当然最终用户可以选择为内部ROM存储上，如果SD存储已满，也会安装到内部存储上）
	- auto，系统将会根据存储空间自己去适应
	- internalOnly，是指必须安装到内部才能运行
	
<!--more-->

##### (< Application \>)属性

```
<application  android:allowClearUserData=["true" | "false"]
             android:allowTaskReparenting=["true" | "false"]
             android:backupAgent="string"
             android:debuggable=["true" | "false"]
             android:description="string resource"
             android:enabled=["true" | "false"]
             android:hasCode=["true" | "false"]
             android:icon="drawable resource"
             android:killAfterRestore=["true" | "false"]
             android:label="string resource"
             android:manageSpaceActivity="string"
             android:name="string"
             android:permission="string"
             android:persistent=["true" | "false"]
             android:process="string"
             android:restoreAnyVersion=["true" | "false"]
             android:taskAffinity="string"
             android:theme="resource or theme" >
</application>
```
- android:allowClearUserData，用户是否能选择自行清除数据，默认为true，程序管理器包含一个选择允许用户清除数据。当为true时，用户可自己清理用户数据，反之亦然
- android:allowTaskReparentin，是否允许activity更换从属的任务，比如从短信息任务切换到浏览器任务
- android:debuggable，当设置为true时，表明该APP在手机上可以被调试。默认为false,在false的情况下调试该APP
- android:description，可以用于具体描述获取该许可的程序可以做哪些事情
- android:label，应用名称
- android:enabled，Android系统是否能够实例化该应用程序的组件
- android:icon，APP的图标
- android:name，为应用程序所实现的Application子类的全名。当应用程序进程开始时，该类在所有应用程序组件之前被实例化
- android:permission，这个属性若在\<application\>上定义的话，是一个给应用程序的所有组件设置许可的便捷方式
- android:presistent，该应用程序是否应该在任何时候都保持运行状态,默认为false
- android:process，应用程序运行的进程名，它的默认值为\<manifest\>元素里设置的包名，当然每个组件都可以通过设置该属性来覆盖默认值。如果你想两个应用程序共用一个进程的话，你可以设置他们的android:process相同，但前提条件是他们共享一个用户ID及被赋予了相同证书的时候
- android:taskAffinity，拥有相同的affinity的Activity理论上属于相同的Task，应用程序默认的affinity的名字是\<manifest\>元素中设定的package名
- android:theme，资源的风格

##### (\< Activity \>)属性

```
<activity android:allowTaskReparenting=["true" | "false"]
          android:alwaysRetainTaskState=["true" | "false"]
          android:clearTaskOnLaunch=["true" | "false"]
          android:configChanges=["mcc", "mnc", "locale",
                                 "touchscreen", "keyboard", "keyboardHidden",
                                 "navigation", "orientation", "screenLayout",
                                 "fontScale", "uiMode"]
          android:enabled=["true" | "false"]
          android:excludeFromRecents=["true" | "false"]
          android:exported=["true" | "false"]
          android:finishOnTaskLaunch=["true" | "false"]
          android:icon="drawable resource"
          android:label="string resource"
          android:launchMode=["multiple" | "singleTop" |
                              "singleTask" | "singleInstance"]
          android:multiprocess=["true" | "false"]
          android:name="string"
          android:noHistory=["true" | "false"]  
          android:permission="string"
          android:process="string"
          android:screenOrientation=["unspecified" | "user" | "behind" |
                                     "landscape" | "portrait" |
                                     "sensor" | "nosensor"]
          android:stateNotNeeded=["true" | "false"]
          android:taskAffinity="string"
          android:theme="resource or theme"
          android:windowSoftInputMode=["stateUnspecified",
                                       "stateUnchanged", "stateHidden",
                                       "stateAlwaysHidden", "stateVisible",
                                       "stateAlwaysVisible", "adjustUnspecified",
                                       "adjustResize", "adjustPan"] >   
</activity>
```
- android:alwaysRetainTaskState，是否保留状态不变， 比如切换回home, 再从新打开，activity处于最后的状态。比如一个浏览器拥有很多状态(当打开了多个TAB的时候)，用户并不希望丢失这些状态时，此时可将此属性设置为true
- android:clearTaskOnLaunch，比如 P 是 activity, Q 是被P 触发的 activity, 然后返回Home, 重新启动 P，是否显示 Q
- android:configChanges，正常情况下. 如果手机旋转了.当前Activity后杀掉,然后根据方向重新加载这个Activity. 就会从onCreate开始重新加载.
如果你设置了 这个选项, 当手机旋转后,当前Activity之后调用onConfigurationChanged() 方法. 而不跑onCreate方法等
- android:excludeFromRecents，是否可被显示在最近打开的activity列表里，默认是false
- android:finishOnTaskLaunch，当用户重新启动这个任务的时候，是否关闭已打开的activity，默认是false，如果这个属性和allowTaskReparenting都是true,这个属性就是王牌。Activity的亲和力将被忽略。该Activity已经被摧毁并非re-parented
- android:launchMode，在多Activity开发中，有可能是自己应用之间的Activity跳转，或者夹带其他应用的可复用Activity。可能会希望跳转到原来某个Activity实例，而不是产生大量重复的Activity，默认为standard
	- standard：就是intent将发送给新的实例，所以每次跳转都会生成新的activity
	- singleTop：也是发送新的实例，但不同standard的一点是，在请求的Activity正好位于栈顶时(配置成singleTop的Activity)，不会构造新的实例
	- singleTask：和后面的singleInstance都只创建一个实例，当intent到来，需要创建设置为singleTask的Activity的时候，系统会检查栈里面是否已经有该Activity的实例。如果有直接将intent发送给它
	- 首先说明一下task这个概念，Task可以认为是一个栈，可放入多个Activity，比如启动一个应用，那么Android就创建了一个Task，然后启动这个应用的入口Activity，那在它的界面上调用其他的Activity也只是在这个task里面。singleInstance模式就是将该Activity单独放入一个栈中，这样这个栈中只有这一个Activity，不同应用的intent都由这个Activity接收和展示，这样就做到了共享。当然前提是这些应用都没有被销毁，所以刚才是按下的HOME键，如果按下了返回键，则无效
- android:multiprocess，是否允许多进程，默认是false
