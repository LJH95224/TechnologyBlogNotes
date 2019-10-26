# RxPermissions的使用
RxPermissions是基于RxJava开发的用于帮助在Android 6.0中处理运行时权限检测的框架。在Android 6.0中，系统新增了部分权限的运行时动态获取。而不再是在以前的版本中安装的时候授予权限。Github项目地址为：https://github.com/tbruyelle/RxPermissions

<!--more-->

## 使用方法
* 如果你要使用RxPermissions库的话，你的minSdkVersion必须要>=11。你需要在build.gradle中依赖RxPermissions包。
  ```xml
  repositories {
    jcenter() // If not already there
  }

dependencies {
    compile 'com.tbruyelle.rxpermissions:rxpermissions:0.9.4@aar'
}
```
如果你使用的Rxjava2的话只需要把引入的包名改为com.tbruyelle.rxpermissions2即可。
```xml
dependencies {
    compile 'com.tbruyelle.rxpermissions2:rxpermissions:0.9.4@aar'
}
```
* 获取RxPermissions单例，然后再调用请求权限的方法。
```java
RxPermissions rxPermissions =RxPermissions.getInstance(this)或者RxPermissions rxPermissions = new RxPermissions(this);
```
#### 直接获取权限
```java
RxPermissions.getInstance(this)
    .request(Manifest.permission.CAMERA)
    .subscribe(granted -> {
        if (granted) { // 在android 6.0之前会默认返回true
           // 已经获取权限
        } else {
           // 未获取权限
        }
    });
```
#### 通过条件触发获取权限(结合RxBinding使用)
```java
RxView.clicks(findViewById(R.id.enableCamera))
    .compose(RxPermissions.getInstance(this).ensure(Manifest.permission.CAMERA))
    .subscribe(granted -> {
        // 当R.id.enableCamera被点击的时候触发获取权限
    });
```
#### 一次请求多个权限
```java
rxPermissions
    .request(Manifest.permission.CAMERA,
             Manifest.permission.READ_PHONE_STATE)
    .subscribe(granted -> {
        if (granted) {
           //所有权限请求都同意
        } else {
           //至少有一个权限被拒绝
        }
    });
```
#### 以上就是RxPermissions的基本使用。