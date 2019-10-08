
# 如何自定义Toast控件。

<!--more-->

#### 在Android中，开发者经常使用Toast控件来弹出信息提示用户，但是Toast默认弹出的界面默认是黑色的，而且不同的版本，界面不同。为此我们需要为Toast自定义一个界面，让界面效果更美观好看。效果如下图所示。

![](http://ww3.sinaimg.cn/large/006HJ39wgy1fh89y9i538j307m02ga9v.jpg)
#### 话不多说直接上代码。
```java
		View layoutView = LayoutInflater.from(MyApplication.getApplication()).inflate(R.layout.layout_toast, null);
        TextView tvContent = (TextView) layoutView.findViewById(R.id.tv_content);
        tvContent.setText(content);
        Toast toast = new Toast(MyApplication.getApplication());
        toast.setView(layoutView);
        toast.setDuration(Toast.LENGTH_SHORT);
        toast.setGravity(Gravity.BOTTOM, 0, 130);
        toast.show();
```
#### 从如上代码中可以看出，首先你需要获取你自已定义的layout显示布局，然后设置其内容，再new一个Toast，通过Toast的setView方法将布局设置进去，再设置显示的时间和位置即可以。至于半圆形背景，通过使用Shape自定义Drawable来实现的。代码如下。
```java
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle">
    <corners android:radius="60dip" />
    <stroke
        android:width="0dp"
        android:color="@color/colorAccent" />
    <solid android:color="@color/colorAccent" />
</shape>
```