# Android动态加载详解
动态加载，就是在程序运行时，加载外部的可执行文件并运行。这里的运行时就是指应用冷启动并开始工作后；外部可以是可以是 SD 卡，可以是 data 目录，也可以是 jniLib 目录，这些可执行文件是没有随着应用一起编译的。
<!--more-->

Android的动态加载按照工作机制的不同，可以分为虚拟机层动态加载和 Native层动态加载两大类。

## 虚拟机层动态加载
基于虚拟机的动态加载技术的核心是类加载器 ClassLoader，通过它我们能够加载一些新的类，这种方式也是目前大部分技术文章谈到的加载方式。其中，根据 ClassLoader 使用方式的不同，又演变出 “热部署”、“插件化”、“热修复” 等技术。

## Native层动态加载
另一种动态加载方式是工作在Native层的，相比于ClassLoader，在 Native层的动态加载不需要重新启动APP就能生效，这类的加载有加载SO 库和基于JNI HOOK的热修复。

### 动态加载so库
一般情况下，加载so文件有两种方式：

1. 打包在apk中的情况，不需要开发者自己去判断ABI，Android系统在安装APK的时候，不会安装APK里面全部的SO库文件，而是会根据当前CPU类型支持的ABI，从APK里面拷贝最合适的SO库，并保存在APP的内部存储路径的libs下面。常见的ABI架构有：armeabi，armeabi-v7a，x86，mips，arm64-v8a，mips64，x86_64。
2. 动态加载外部so的情况下，需要我们判断ABI类型来加载相应的so，Android系统不会帮我们处理。

#### so库须知
1. 一种cpu架构相对应一种ABI参数，也相对应一种类型的so库。比如大多的X86设备除了支持X86类型的SO库，还兼容ARM类型的SO库，所以应用市场上大部分的APP只适配了ARM类型的SO库，但是注意兼容模式 运行so库的性能并不是很好，最好推荐还是一种abi对应一种so库。
2. 通过 PackageManager 安装后，在小于 Android 5.0 的系统中，SO库位于 APP 的 nativeLibraryPath 目录中。在大于等于 Android 5.0 的系统中，SO库位于 APP 的 nativeLibraryRootDir/CPU_ARCH 目录中。
3. 我们总是希望Android Studio 使用最新版本的build-tools来编译，因为Android SDK最新版本会帮我们做出最优的向下兼容工作。但是编译SO库 确实正好相反的，因为NDK平台不是向下兼容的，而是向上兼容的。应该使用app的minSdkVersion对应的版本的NDK来编译SO库文件，如果使用了太高版本的NDK编译，可能会导致APP性能低下，或者引发一些SO库相关的运行时异常，比如UnsatisfiedLinkError，dlopen: failed以及其他类型的Crash。现在Android已经是7.0了，目前不知道NDK是否对此有改进。
4. 如果我们的App写的so库只适配了armeabi-v7a和x86架构，但是用第三方库时，第三方库包含（armeabi-v7a，x86，ARM64），这时候某些ARM64的设备安装该APK的时候，只要发现apk带有ARM64的库，只会选择安装APK里面ARM64类型的SO库，这样会导致我们的so库无法拷贝到nativeLibraryPath 目录（这种情况下不会以兼容模式找armeabi-v7a或x86下的so），所以必须保证 我们的so和第三方的so 支持的架构类型个数匹配。 利用Android Studio很方便解决这个问题：library中适配所有类型的so库支持，app则适配少于或等于library中的so库。利用build.gradle实现。
```java
	//app下的build.gradle
	ndk { 
		abiFilters "armeabi-v7a" 
		abiFilters "x86" 
		abiFilters "armeabi" 
		}
```
```java
	//library下的build.gradle
	ndk { 
		abiFilters "armeabi-v7a" 
		abiFilters "x86" 
		abiFilters "armeabi" 
		abiFilters "arm64-v8a" 
		abiFilters "x86_64" 
	}
```
打包的时候以app下build.gradle支持的为准。
5. 不同Android设备架构的兼容情况
  1. armeabi-v7a 设备能够加载 armeabi 指令的 so 文件
  2. arm64-v8a 能兼容 armeabi-v7a 和 armeabi 指令集
  3. x86_64 兼容 x86
   4. mips64 兼容 mips
      mips系的手机设备数量太少，在项目里基本上不考虑。

6. 代码查询设备支持的架构
  ```java
  	android.os.Build.SUPPORTED_ABIS
  	android.os.Build.CPU_ABI 
  	android.os.Build. CPU_ABI2
  ```
  这些变量用于查询设备支持的架构，其中 SUPPORTED_ABIS 是API Level 21引入来代替CPU_ABI, CPU_ABI2的。

7. 32位的so文件不能运行在64位的虚拟机中,64位的so文件也不能运行在32位的虚拟机中。

#### 如何动态加载so库？
1. 当打开apk后，你需要从服务端远程下载so文件，并放在指定目录中。
2. 从指定目录中，复制so文件到可以动态加载的文件目录下。注意：这里可以动态加载的文件目录只有两个，一个是/system/lib，另一个是/data/data/packagename/...。
3. 配置gradle，指定cpu架构。 在使用so文件的时候，so库类型要和cpu架构类型一致，否则是会报错的。
4. 使用系统的api加载so文件。对于so文件的加载，系统提供了两个方法。
   ​	
```java
		System.loadLibrary("libName");
		System.load("pathName");
```
loadLibrary函数用于加载Libs中的so库，传入的参数库文件名，不包含库文件的扩展名。

load函数用于动态加载so库，传入的参数是库文件的绝对路径。


