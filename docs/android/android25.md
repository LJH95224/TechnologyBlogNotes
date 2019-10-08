# Android中数据双向绑定
Data Binding双向数据绑定是实现了ui跟数据绑定的框架，是实现了MVVM模式的工具，有个Data Binding我们可以更好的使用MVVM模式来开发框架。
我们之前也使用过一些框架实现过，像ButterKnife、android Annotations和RoboBinding框架都实现了view绑定，减少findViewById的使用。
它的主要优势是去除了Activity和Fragment的大量ui代码，性能超过手写代码，而且安全性很好，代码也能保证在主线程中执行。不足的是IDE支持不是很完善，报错信息不明显，重构也不是很好。那么如何使用DataBinding呢？
<!--more-->

#### 1. 在build.gradle文件的android中添加以下代码。
```xml
android {
    ....
    dataBinding {
        enabled = true
    }
}
```
#### 2. 在你的布局文件中根布局外面加上layout布局，示例如下：
```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android">
    <data>
        <variable
            name="user"
            type="com.codeteenager.databindingdemo.User" />
    </data>
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical">
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@{user.firstName}" />
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@{user.lastName}" />
    </LinearLayout>
</layout>

```
layout中有一个data标签用来定义属性供layout使用，如上图所示Variable中定义一个名为user的属性，type代表你这个属性的类型。当你定义完成后，你可以在TextView中使用这个属性了，如上图的android:text="@{user.firstName}"。User类代码如下：
```java
public class User {
   private final String firstName;
   private final String lastName;
   public User(String firstName, String lastName) {
       this.firstName = firstName;
       this.lastName = lastName;
   }
   public String getFirstName() {
       return this.firstName;
   }
   public String getLastName() {
       return this.lastName;
   }
}
```
当你布局文件定义好之后，编译一下，系统会自动给你生成一个类。例如activity_main.xml->ActivityMainBinding然后你可以在activity中通过DataBindingUtil.setContentView(this, R.layout.activity_main);给activity设置布局并赋值给ActivityMainBinding。然后再设置给绑定的布局。
```java
@Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ActivityMainBinding activityMainBinding = DataBindingUtil.setContentView(this, R.layout.activity_main);
        User user=new User("用户名","密码");
        activityMainBinding.setUser(user);
    }
```
接下来你就可以看到效果了。
#### 参考Google的DataBinding Library相关介绍 https://developer.android.com/topic/libraries/data-binding/index.html

