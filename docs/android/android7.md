# Android免安装应用详解
今年的GoogleIO大会之后，开始Android免安装应用对所有开发者开放，利用 Android Studio 3.0，现在可以在项目中创建免安装应用。

<!--more-->

## Android免安装应用

### 今年的GoogleIO大会之后，开始Android免安装应用对所有开发者开放，利用 Android Studio 3.0，现在可以在项目中创建免安装应用。它主要有以下几个特性：
1. Android 免安装应用采用 Material Design 技术，动画效果流畅平滑，并且无需在设备上安装，即可带来美妙的沉浸式应用体验。 
2. 让用户从那些能够打开移动网页的链接（例如，搜索、社交媒体、消息传递链接和其他深层链接）畅享您的旗舰级 Android 体验，而不必先安装您的应用。 
3. 充分利用 Google Play 服务专为打造无缝用户体验而设计的内置功能，如位置、身份、支付和 Firebase。 
4. Android 免安装应用可在大多数使用 Google Play 服务的 Android 设备上运行。 
5. Android 免安装应用功能是对现有 Android 应用的升级，而并非另起炉灶，创建一个全新的独立应用。其采用的 Android API、项目和源代码均与原应用相同。涉及的工作量会因应用当前结构的不同而有所差异。您可以模块化您的应用，Google Play 仅实时下载所需的部分。 
### 注：Android 免安装应用 仅在运行 Android 5.0（API 级别 21）或更高版本的 Android 设备上正常工作。
## 开发环境要求
1. JDK1.8
2. Android Studio 3.0以上
3. 你的环境变量要配置ANDROID_HOME指向你的Android SDK，然后通过Android Studio来下载以下几个开发包。
4. Android SDK 6.0以上
5. Android SDK Build Tools 26.x以上
6. Android SDK Tools 25.x以上
7. Android SDK Platform Tools 25.x以上
8. Android Support Library最新的
9. Android Repository最新的
10. Instant Apps Development SDK（在Android studio中Settings->Appearance&Behavior->System Settings->Android SDK->Sdk Tools->Instant Apps Development SDK）
## 运行设备
1. 设备：Nexus 5X, Nexus 6P, Pixel, Pixel XL, Galaxy S7 运行环境在android 6.0以上
2. 模拟器：Nexus 5X 镜像 运行 Android 6.0 (API level 23)版本, x86, with Google APIs. 
### 注意：你不能运行在x86_64架构上的模拟器中来测试app。
## 创建一个免安装的应用
1. 在Android Studio 3.0或以上版本中点击Start a new Android Studio project。
  ![](http://ww2.sinaimg.cn/large/006HJ39wgy1fg2rv5n8oyj30dn0dbq3h.jpg)
2. 填上应用名，公司域名，包名后点击下一步。
  ![](http://ww2.sinaimg.cn/large/006HJ39wgy1fg14ipi4fqj30m80hwdgj.jpg)
3. 选择Phone and Tablet，最小sdk选择6.0，勾选Include Android Instant App Support点击下一步
  ![](http://ww1.sinaimg.cn/large/006HJ39wgy1fg2rv5hm9zj30ke0hi0to.jpg)
4. 在自定义免安装应用中，默认设置就可以，点击下一步。
  ![](http://ww3.sinaimg.cn/large/006HJ39wgy1fg2rv5u7daj30m90hi74s.jpg)
5. 在Add an Activity to Mobile中，选择Empty Activity，点击下一步
  ![](http://ww4.sinaimg.cn/large/006HJ39wgy1fg14ipfobej30m40hmmxx.jpg)
6. 在Configure Activity 中，将Instant App URL改为/hello即可，点击完成。一个项目就创建完成了。 
  ![](http://ww4.sinaimg.cn/large/006HJ39wgy1fg14ipfzbsj30m50hjjs6.jpg)
### 最后你选择instantapp模块，点击运行，运行设备要求上面已经提到了，如果要看到效果必须要在模拟器设置中登录Google账户才行。参考网址：https://developer.android.google.cn/topic/instant-apps/index.html