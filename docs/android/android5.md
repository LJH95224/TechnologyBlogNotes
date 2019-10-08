# Android中使用SVG
SVG(Scalable Vector Graphics，可伸缩矢量图形)是W3C推出的一种开放标准的文本式矢量图形描述语言，它是基于XML的、专门为网络而设计的图像格式，SVG是一种采用XML来描述二维图形的语言，所以它可以直接打开xml文件来修改和编辑。

<!--more-->

## 矢量图的优点
1. 矢量图使用点和线来描述图形，所以文件会比较小，同时也能提供高清晰的画面。
2. 矢量图缩放自由且不会失真，完全适配于任何分辨率的屏幕。
3. 矢量图是以xml语言来描述的，所以它修改自如。
4. 矢量图色彩分辨率非常高清，同时支持滤镜。
5. 跨平台。因为矢量图是纯文本格式来描述的，所以不受平台的限制。
## Android中如何使用SVG
* 在drawable中，右击New->Vector Asset，出现如下界面。
  ![](http://i1.buimg.com/1949/a58ffa34f73426da.png)
* 在Asset Type中有两种类型，一个是使用默认的Material Design图标，另一个是使用上传的SVG、PSD格式的图片资源。在Material Icon中，点击Icon即可出现选择Icon的界面。
* 开发者也可以自己定义svg的大小。
* 点击下一步，点击完成即可生成svg了。你可以打开生成的xml文件然后点击Android Studio右侧的Preview即可预览生成的svg图片。
## svg兼容使用
由于svg只能在Android5.0及其以上的版本可以直接使用，所以如果想在Android5.0以下的版本中使用，就要在defaultConfig中添加vectorDrawables.useSupportLibrary = true代码，再添加添加appcompat的支持即可。
## 阿里巴巴图标矢量图库
网址：http://www.iconfont.cn/
## svg转为VectorDrawable
网址：http://inloop.github.io/svg2android/
