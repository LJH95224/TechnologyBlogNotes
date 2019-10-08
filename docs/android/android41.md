# Android中Drawable详解
android中的Drawable表示一种图像的概念，通过颜色构造出各种各样的图像效果。在实际开发中，常用作View的背景使用。Drawable分类有很多，主要有BitmapDrawable、LayerDrawable、StateListDrawable、LevelListDrawable、TransitionDrawable、InsertDrawable、ClipDrawable。开发者可以使用xml来定义，也可以通过代码创建Drawable对象来定义，接下来介绍常用的Drawable。
<!--more-->
## BitmapDrawable
BitmapDrawable它表示的就是一张图片，通过src属性引用图片，然后设置图片的绘制方式，例如平铺填充、拉伸填充、保持图片的原始大小。示例如下：
```java
<bitmap xmlns:android="http://schemas.android.com/apk/res/android"
    android:antialias="true"
    android:src="@mipmap/ic_launcher"
	android:dither="true"
    android:filter="true"
    android:tileMode="mirror">
</bitmap>
```
其中android:src引用图片的id，android:tileMode代表使用的平铺模式，android:antialias代表是否开启图片抗锯齿功能，android:dither代表是否开启抖动效果，android:filter代表是否开启过滤效果。

## LayerDrawable
LayerDrawable通过将一组drawable放在layerdrawable中按照顺序绘制，从而达到叠加的效果。示例如下：
```java
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
	<item 
    		android:drawable="@mipmap/ic_launcher" 
    		android:gravity="left" 
    		android:top="10dp" /> 
	<item 
    		android:drawable="@mipmap/ic_launcher" 
    		android:gravity="center" 
    		android:top="20dp" /> 
</layer-list>
```
每个item代表一个引用drawable，下面的叠加在上面的，形成叠加效果。你也可以设置drawable的位置、对齐方式等等。
## StateListDrawable
StateListDrawable它是通过不同的状态提供不同的背景，例如按钮点击、获取焦点是背景的改变。示例如下：
```java
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@mipmap/ic_launcher" 
        android:state_focused="true" 
        android:state_pressed="true" />
</selector>
```
## LevelListDrawable
LevelListDrawable也是管理一组drawable的集合，但是它通过设置level等级来显示对应的drawable。示例如下：
```java
<level-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item 
        android:drawable="@mipmap/ic_launcher" 
        android:maxLevel="5" 
        android:minLevel="1" /> 
    <item 
        android:drawable="@mipmap/ic_launcher" 
        android:maxLevel="10" 
        android:minLevel="6" /> 
</level-list>
```
android:maxLevel与android:minLevel代表最低与最高等级，当你把它作为ImageView的图片时，可以通过ImageView的setImageLevel()方法来设置显示等级，从而显示对应的drawable。 
## TransitionDrawable
TransitionDrawable它是LayerDrawable的子类，主要实现两个Drawable之间淡入淡出的效果动画。示例如下：
```java
<transition xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@mipmap/ic_launcher" />
    <item android:drawable="@mipmap/ic_launcher" />
</transition>
```
```java
TransitionDrawable transitionDrawable = (TransitionDrawable) view.getDrawable();
        transitionDrawable.startTransition(1000);
        transitionDrawable.reverseTransition(1000);
```
通过view获取它的TransitionDrawable，然后使用startTransition和reverseTransition实现淡入淡出效果以及它的逆过程。
## InsertDrawable
InsertDrawable它将一个drawable插入自己的内部当中，并可以在四周留出间距，很像drawable的padding属性。示例如下：
```java
<inset xmlns:android="http://schemas.android.com/apk/res/android"
    android:drawable="@mipmap/ic_launcher"
    android:insetBottom="10dp"
    android:insetLeft="10dp"
    android:insetRight="10dp"
    android:insetTop="10dp">
</inset>
```
其中android:insetTop属性代表距离顶部的大小，其他同理。
## ClipDrawable
ClipDrawable它通过setLevel(int level)方法来剪切drawable，level等级是从0~10000，0为完全不显示，10000为完全显示。
```java
<clip xmlns:android="http://schemas.android.com/apk/res/android"
    android:clipOrientation="horizontal"
    android:drawable="@mipmap/ic_launcher"
    android:gravity="left">
</clip>
```
```java
ClipDrawable clipDrawable = (ClipDrawable) view.getDrawable();
        clipDrawable.setLevel(1000);
```
android:clipOrientation设置裁剪方向。通过view获取ClipDrawable然后设置等级，进行裁剪。

如果以上的drawable不能满足你的要求，你也可以自定义drawable，然后在onDraw()方法中绘制你所需要的图形。