# Android系统分享的使用
Android中使用系统分享的案例。

<!--more-->

## Android中实现分享功能的三个方法

* 调用系统的分享功能
* 通过第三方的sdk，例如友盟、ShareSDK等
* 集成各自平台的sdk，例如微博、QQ、微信等。
#### 在这里只介绍调用系统的分享功能，其他的功能可以去相对应的官网查看文档使用说明即可。
## 调用系统的分享功能
### 分享文本信息
```java
		Intent textIntent = new Intent(Intent.ACTION_SEND);
        textIntent.setType("text/plain");
        textIntent.putExtra(Intent.EXTRA_TEXT, "分享文本内容");
        startActivity(Intent.createChooser(textIntent, "分享文本标题"));
```
效果如下：
![](http://i1.buimg.com/599943/1a0d8e3408d80056.jpg)
### 分享图片
```java
		private String getResourcesUri(@DrawableRes int id) {
        	Resources resources = getResources();
        	String uriPath = ContentResolver.SCHEME_ANDROID_RESOURCE + "://" +
                resources.getResourcePackageName(id) + "/" +
                resources.getResourceTypeName(id) + "/" +
                resources.getResourceEntryName(id);
        	return uriPath;
    	}
		String path = getResourcesUri(R.drawable.image);
        Intent imageIntent = new Intent(Intent.ACTION_SEND);
        imageIntent.setType("image/*");
        imageIntent.putExtra(Intent.EXTRA_STREAM, Uri.parse(path));
        startActivity(Intent.createChooser(imageIntent, "分享"));
```
### 分享到微信
```java
		Intent wechatIntent = new Intent(Intent.ACTION_SEND);
        wechatIntent.setPackage("com.tencent.mm");
        wechatIntent.setType("text/plain");
        wechatIntent.putExtra(Intent.EXTRA_TEXT, "分享文本内容");
        startActivity(wechatIntent);
```
效果如下图：
![](http://i2.kiimg.com/599943/2a370d0512026065.jpg)
### 分享到qq
```java
		Intent qqIntent = new Intent(Intent.ACTION_SEND);
        qqIntent.setPackage("com.tencent.mobileqq");
        qqIntent.setType("text/plain");
        qqIntent.putExtra(Intent.EXTRA_TEXT, "分享文本内容");
        startActivity(qqIntent);
```
效果如下图：
![](http://i2.kiimg.com/599943/e09fbe6bc9452f54.jpg)
此Demo地址：https://github.com/codeteenager/SystemShareDemo