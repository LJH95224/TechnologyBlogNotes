# LeakCanary教程
LeakCanary是Square公司开源的一个检测内存泄漏的函数库，可以方便的在项目中集成，在Debug版本中监控Activity、Fragment等的内存泄漏。使用教程如下：

<!--more-->

#### LeakCanary是Square公司开源的一个检测内存泄漏的函数库，可以方便的在项目中集成，在Debug版本中监控Activity、Fragment等的内存泄漏。使用教程如下：

* 在你项目的gradle中添加以下依赖。
```java
dependencies {
   debugCompile 'com.squareup.leakcanary:leakcanary-android:1.5.1'
   releaseCompile 'com.squareup.leakcanary:leakcanary-android-no-op:1.5.1'
   testCompile 'com.squareup.leakcanary:leakcanary-android-no-op:1.5.1'
 }
```
在上述依赖中可以看到，只有在Debug版本中才使用LeakCanary的功能，而在Release和Test版本中，使用其no-op版本，此版本没有实际代码和操作，这样不会对生成的APK包体积和应用的性能造成影响。
* 在Application中获取RefWatcher实例，并用RefWatcher来检测想要监控的对象。
```java
	private RefWatcher refWatcher;
    @Override
    public void onCreate() {
        super.onCreate();
        if (LeakCanary.isInAnalyzerProcess(this)) {
            return;
        }
        refWatcher = LeakCanary.install(this);
    }
    public static RefWatcher getRefWatcher(Context context) {
        MyApplication application = (MyApplication) context.getApplicationContext();
        return application.refWatcher;
    }
```
如果只检测Activity的泄漏，只需要在Application中的onCreate()中使用LeakCanary.install(this);即可，此函数会启动一个ActivityRefWatcher，它会自动监控应用中调用Activity.onDestroy()之后发生泄漏的Activity。如果想监控其他对象例如Fragment，那就用RefWatcher的实例来实现。
* 使用RefWatcher来检测对象
```java
	RefWatcher refWatcher = MyApplication.getRefWatcher(this);
	refWatcher.watch(this);
```
* LeakCanary的Github地址：https://github.com/square/leakcanary
* LeakCanary中文使用：https://www.liaohuqiu.net/cn/posts/leak-canary-read-me/