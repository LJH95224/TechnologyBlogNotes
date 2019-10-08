# Snackbar的使用
Snackbar是一个带有动画效果的提示栏，一般带有提示信息显示在手机屏幕的底部或大屏幕设备的左边，它跟Toast有很大的相似之处，不同的是Snackbar可以带有一个按钮触发点击事件，它会在超时后消失或者用户在界面上其他操作时消失。

<!--more-->

#### Snackbar是一个带有动画效果的提示栏，一般带有提示信息显示在手机屏幕的底部或大屏幕设备的左边，它跟Toast有很大的相似之处，不同的是Snackbar可以带有一个按钮触发点击事件，它会在超时后消失或者用户在界面上其他操作时消失。那么如何使用呢？代码如下：

<pre>
	Snackbar.make(root!!, "提示信息", Snackbar.LENGTH_SHORT)
	.setAction("按钮") { }
	.setActionTextColor(resources.getColor(R.color.colorAccent)).show()
</pre>
#### 是不是感觉这段代码不是java写的？没错，这是用kotlin写的程序，但是大体还是能看懂的吧。Snackbar调用它的方法有4个。
* make主要是为Snackbar设置提示信息，方法中有三个参数，1、根布局view，2、提示信息，3、超时时间，超时时间有Snackbar.LENGTH_SHORT和Snackbar.LENGTH_LONG。
* setAction主要是为Snackbar添加一个按钮并提供点击事件，方法有两个参数，第一个是按钮显示文本，第二个参数事件监听器。
* setActionTextColor主要是设置Snackbar中按钮的颜色。
* show是显示Snackbar。
#### 当然Snackbar还提供了其他的方法，比如setText用来更新提示信息，setCallback为Snackbar设置了一个回调函数，当Snackbar显示发生改变的时候触发。Demo地址： https://github.com/codeteenager/SnackbarDemo
![Snackbar演示图](http://ww1.sinaimg.cn/large/006HJ39wgy1fg6ohu137zj30u01hcmza.jpg)