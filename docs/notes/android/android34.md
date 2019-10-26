# Android开源库的制作
我们在写项目时经常用到开源库，特别是在android studio中，一句话引用就可以，比如compile 'com.android.support:appcompat-v7:25.3.1'，剩下的交给gradle依赖就可以了。但是如何制作开源库给别人使用呢？现在制作开源库一般是上传到jcenter或者maven中，但是这两个比较麻烦，我将介绍一个简单的给大家使用。这个开源库是放在GitHub中然后关联到JitPack上。所以前提是你要有一个GitHub账号。
<!--more-->
### 第一步
首先，你需要在android studio中创建一个项目，在项目中新建一个module，然后选择Android Library点击完成。这个library就是你开源库的类库。
![](http://ww2.sinaimg.cn/large/006HJ39wgy1ff9hu69qbxj30mf0fl750.jpg)
### 第二步
然后，打开项目的build.gradle在classpath:中添加classpath 'com.github.dcendents:android-maven-gradle-plugin:1.5'这句话可以在jitpack官方文档中找到。
![](http://ww2.sinaimg.cn/large/006HJ39wgy1ff9hu5z6c9j30o104taa9.jpg)
### 第三步
然后，在library的build.gradle中添加apply plugin: 'com.github.dcendents.android-maven' group='com.github.YourUsername'这两句。
![](http://ww2.sinaimg.cn/large/006HJ39wgy1ff9hu61vh4j30g603at8q.jpg)
### 第四步
开源库编写完成后整个项目上传到github上，然后点击release创建一个版本。输入版本号点击Publish Release就完成。
![](http://ww3.sinaimg.cn/large/006HJ39wgy1ff9hu61m0cj30gn0cmq2z.jpg)
### 第五步
最后，将这个库例如：https://github.com/codeteenager/CalendarLib复制到jitpack上如下图所示的Git repo url，点击Look up，就可以看到下面的版本。
![](http://ww1.sinaimg.cn/large/006HJ39wgy1ff9hu6849kj30hf09nt8t.jpg)
然后点击Get it就可以看到下面两个maven和compile，然后复制到你项目对应的位置就可以引用了。
是不是很简单呢。
![](http://ww1.sinaimg.cn/large/006HJ39wgy1ff9hu6e894j30jr0eqt9s.jpg)
参考文档：**https://jitpack.io/docs/#publishing-on-jitpack**