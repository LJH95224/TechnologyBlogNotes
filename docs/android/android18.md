
# Android横竖屏知识点
Android开发过程中难免会遇到横竖屏切换的问题，当横竖屏切换时相应的布局也会切换，如果是在开发Camera相关的功能时，横竖屏切换还要改变摄像头的角度。本篇文章主要讲述横竖屏切换的知识点和实际开发过程中遇到的问题。
<!--more-->
## 禁止横竖屏切换
有些app可能会直接禁止横竖屏切换的功能，在这种情况下，只需要在AndroidManifest.xml中设置activity中的android:screenOrientation属性值来实现即可。

```java
  android:screenOrientation="portrait"//竖屏
  android:screenOrientation="landscape"//横屏
```
也可以在activity中通过setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE)来设置。

## 允许横竖屏切换
当允许app的横竖屏切换时，由于横竖屏的宽高不同，所以可能会需要不同的布局，切换布局有以下两种方法。

1. 在res目录下建立layout-land和layout-port目录,相应的layout文件名不变，比如main.xml。layout-land是横屏的layout,layout-port是竖屏的layout,当横竖屏切换时,会重启Activity,程序会调用Activity的onCreate方法，从而加载相应的布局。
2. 通过java代码来判断当前是横屏还是竖屏然后来加载相应的xml布局文件。因为当屏幕变为横屏的时候,系统会重新呼叫当前Activity的onCreate方法,你可以把以下方法放在你的onCreate中来检查当前的方向,然后可以让你的setContentView来载入不同的layout xml。
```java
if(this.getResources().getConfiguration().orientation==Configuration.ORIENTATION_LANDSCAPE)
{  
   Log.i("info", "landscape"); // 横屏
}  else if(this.getResources().getConfiguration().orientation==Configuration.ORIENTATION_PORTRAIT)
{  
  Log.i("info", "portrait"); // 竖屏
}
```

注意：由于横竖屏切换会重启Activity，因此在Activity销毁之前要保存当前活动的状态，在Activity的onCreate方法中加载相应的状态即可。

## 通过onConfigurationChanged拦截横竖屏切换时重启
Activity每次横竖屏切换都会重新调用onPause-> onStop-> onDestory-> onCreate->onStart->onResume，为此涉及到内容和数据的保存和读取，否则转屏之前的内容就会消失了。很多时候这样的结果让程序繁琐，为此Android提供了在manifest中设置android:configChanges属性，从而让Activity不延续上述的重建流程。在Android 3.2（API Level 13）以前的 SDK 可以使用如下配置android:configChanges="orientation|keyboardHidden"而 Android 3.2 以后的 SDK 则需要设置为android:configChanges="keyboardHidden|orientation|screenSize"。这样Activity横竖屏切换时不会重启，并且会回调onConfigurationChanged方法,并可以为其设置布局。

```java
@Override
public void onConfigurationChanged(Configuration config) {
  super.onConfigurationChanged(config);
  if (config.orientation == Configuration.ORIENTATION_PORTRAIT) {
    setContentView(R.layout.main); //布局
  }
  if (config.orientation == Configuration.ORIENTATION_LANDSCAPE) {
    setContentView(R.layout.main); //布局
  }
}
```

## 判断当前屏幕方向
有了上面的横竖屏切换的回调，我们就可以及时感知到屏幕的状态变化。但因为竖屏、横屏都有两个不同的方向，所以Android系统又提供了方法给我们获取当前屏幕精确的旋转方向。
```java
Display display = activity.getWindowManager().getDefaultDisplay();
    switch (display.getRotation()) {
        case Surface.ROTATION_90:
            //旋转90度
            break;
        case Surface.ROTATION_180:
            //旋转180度
            break;
        case Surface.ROTATION_270:
            //旋转270度
            break;
        default:
            //旋转0度
            break;
    }
```
## 横竖屏切换时生命周期
1. 不设置Activity的android:configChanges时，切屏会重新调用各个生命周期，切横屏时会执行一次，切竖屏时会执行两次。
2. 设置Activity的android:configChanges="orientation"时，切屏还是会重新调用各个生命周期，切横、竖屏时只会执行一次。
