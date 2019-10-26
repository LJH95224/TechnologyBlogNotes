# Android开发规范
最近一直想整理一套Android开发规范，一直没有时间，现在有空看了一下别人整理的，加上自己的整理。

<!--more-->

### Android Studio开发规范
1.统一调整 IDE 的编码方式为 UTF-8
2.编辑完代码后不要忘记格式化（即 Ctrl+Alt+L 快捷键）
3.尽量保证团队之间的 IDE 版本与 Gradle 版本一致，最好的做法是及时更新保证与官方最新版一致。
4.代码提交前进行代码检查（Analyze->Inspect Code），可以消除代码中的警告，减少不必要的错误。
5.擅用 //TODO 注释来标记未做完或需要其他人接手的工作
6.善用AS插件来提高开发效率，像 GsonFormat——将json字符串转换成一个Java实体类的工具，CodeGlance——在右边可以预览代码，实现快速定位等工具都是非常棒的。
### 命名规范
最有效的命名方式是使用英文拼写和语法，可以让阅读者易于理解，尽量避免使用中文拼音的情况（常见地名和通用名称例外，比如HangZhou,alibaba等）。禁止使用中英文混合或者完全中文的方式。
### 包名
通常一个app需要一个顶级包名，而这个包名通常跟公司的域名相关。一级包名是顶级域名，通常为com,edu,gov,net,org等，二级包名为公司名，三级包名根据应用进行命名。分包的时候可以根据你所用的框架的功能来进行分包。
### 类名
#### 类名要用驼峰命名法UpperCamelCase来命名，在 Android 中与系统相关的类通常以组件名为后缀标识。例如：
1.Activity 类，命名为 Activity 为后缀，如 LoginActivity
2.Fragment 类，命名以 Fragment 为后缀，如 LoginFragment
3.Service 类，命名以 Service 为后缀，如 DownloadService
4.BroadcastReceiver类，命名以Receiver为后缀，如 JPushReceiver
5.ContentProvider类, 命名以Provider为后缀，如ShareProvider
6.Adapter 类，命名以 Adapter 为后缀，如 ListAdapter
#### 其他常见命名
1.工具管理类，命名以 Utils 或者 Manager 为后缀，如 EncryptUtils，UserManager
2.实体类，命名以 Bean 或者 Info 为后缀，如 UserBean
3.接口实现类，命名以 Impl 或者 Listener 为后缀，如 ApiImpl
4.数据库类，命名以 Dao 或者 DbHelper 为后缀，如 UserDao
5.自定义控件类，命名以 View 或者 Layout 为后缀，如 SimpleSliderLayout
### 方法名
#### 方法名都以 lowerCamelCase 风格编写。方法名通常是动词或动词短语。一般方法的命名都是以动词为前缀，后面加上动作的对象。
#### 常见方法名
1.getXX()/setXX() 获取/设置属性值，如 getUserName()
2.isXX()/checkXX()/hasXX() 用于返回 Boolean 值的方法，如 isGirl(),hasPermission()
3.initXX() 	初始化相关方法，如 initView()
4.loadXX()/handleXX() 读取数据或者对数据处理时的方法，如 loadData()
5.disPlayXX()/showXX() 显示相关信息，如 showToast()
### 常量名
常量名命名模式为 CONSTANT_CASE，全部字母大写，用下划线分隔单词。
### 变量名
1.现在在 Android 非常量字段名的命名有两种方式，一种是在特定的字段名上加上特殊前缀或后缀，如普通成员变量命名以 mCamelCase 样式命名，静态变量以 sCamelCase 命名。另一种则是完全使用 lowerCamelCase 命名，如 camelCase 变量名。个人推荐变量名以 lowerCamelCase 风格编写。
2.参数名，局部变量名以 lowerCamelCase 风格编写
3.临时变量通常被取名为i、j、k、m和n，它们一般用于整型；c、d、e，它们一般用于字符型。
4.关于Android中相关控件的命名，控件变量命名可以在后缀加上控件名称或者控件名称的缩写，如login+Button=loginButton/loginBtn。平常习惯控件名缩写的话推荐使用控件名称的缩写来作为后缀。
### Android 资源文件
Android资源文件基本上都采取使用下划线_来连接词语。
### 布局文件 layout
#### 必须全部单词小写，单词间以下划线分割，使用名词或名词词组。
1.界面相关布局，命名方式为 界面_模块.xml，通常 Activity 或者 Fragment 等类名要与其布局文件相对应，如：LoginActivity.java -> activity_login.xml、BookFragment.java -> fragment_book.xml、DateDialog.java -> dialog_date.xml、SettingPopupWindow.java -> ppw_setting.xml
2.列表项布局，命名方式为 控件_模块_item.xml，一般关于列表项的命名则以 item 作为前缀，如：item_user.xml 表示这个布局文件用在用户列表中。但我更喜欢下面这种方式的命名listview_user_item -> 表示这是用于 listview 的用户列表项。
3.包含项，命名方式为 模块_描述.xml，在界面布局中，如 activity_user_header 表示为用户界面的头部布局。在列表布局中，如 listview_user_header 表示为用户列表的头部布局。
### 图片资源drawable
#### 全部小写，采用下划线命名法，加前缀区分。
1. 图标，ic\_模块名[\_用途]
2. 普通文件，模块\_用途[\_状态描述]
### 动画资源anim
命名规则为 模块_用途[_状态描述],如：fade_out->淡出。
### 菜单资源menu
命名规则为： menu_模块[_用途]，
如：menu_shelf -> 表示为书架上的菜单选项，
其中菜单内部的id命名规则为 action_用途，如：action_manage
### Values下的命名方式
#### 色调（color）
禁止在layout直接使用 “#000000” 赋予颜色，
在你的colors.xml文件中应该只是映射颜色的名称一个ARGB值，而没有其它的。不要为特定的UI定义特定的颜色值，这样只会导致颜色值重复定义。例如：
```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="colorPrimary">#3F51B5</color>
    <color name="colorPrimaryDark">#303F9F</color>
    <color name="colorAccent">#FF4081</color>
    <!-- 常用字体颜色 -->
    <color name="black">#000000</color>
    <color name="black_alpha">#8A000000</color>
    <color name="black_alpha_more">#64000000</color>
    <color name="black_normal">#DE000000</color>
    <color name="white">#FFFFFF</color>
    <color name="white_alpha">#8AFFFFFF</color>
    <color name="white_normal">#DEFFFFFF</color>
    <color name="white_normal_more">#33FFFFFF</color>
    <color name="white_less">#FFFAFA</color>
    <color name="transparent">#00000000</color></resources>
```
#### 尺寸（dimen）
尽量遵循 Material Design 的设计标准，比如字体的大小，页面左右空白16dp,列表上下间隔8dp等。
```xml
<resources>
    <dimen name="horizontal_margin">16dp</dimen>
    <dimen name="vertical_margin">16dp</dimen>
    <dimen name="horizontal_padding">16dp</dimen>
    <dimen name="vertical_padding">16dp</dimen>
    <dimen name="fab_margin">16dp</dimen>
    <!-- 页面统一间距 -->
    <dimen name="title_height">48dp</dimen>
    <dimen name="toolbar_height">48dp</dimen>
    <dimen name="tab_height">48dp</dimen>
    <dimen name="bar_height">56dp</dimen>
    <dimen name="edittext_height">56dp</dimen>
    <dimen name="caption_height">24dp</dimen>
    <dimen name="line_height">8dp</dimen>
    <dimen name="line_height_half">4dp</dimen>
    <dimen name="line_height_double">16dp</dimen>
    <dimen name="layout_height">72dp</dimen>
    <!-- 字体大小 -->
    <dimen name="text_display3">56sp</dimen>
    <dimen name="text_display2">45sp</dimen>
    <dimen name="text_display1">34sp</dimen>
    <dimen name="text_headline">24sp</dimen>
    <dimen name="text_title">20sp</dimen>
    <dimen name="text_subhead">16sp</dimen>
    <dimen name="text_body">14sp</dimen>
    <dimen name="text_caption">12sp</dimen>
    <dimen name="text_mini">10sp</dimen>
    <dimen name="text_menu">14sp</dimen>
    <dimen name="text_button">16sp</dimen>
    <dimen name="text_navi">18sp</dimen>
</resources>
```
### 字符串（string）
strings的name命名使用下划线命名法，采用以下规则：模块名+逻辑名称，
同样，禁止在代码中或者layout中直接填入字符，请在string.xml加入字符串。最好是按模块来分隔开字符串便于查找和修改，公用的写在最开始位置。例如：
```xml
<resources>
    <string name="app_name">cpacm</string>
    <string name="open_string">open</string>
    <string name="close_string">close</string>
    
    <!--####################  Home模块  #####################-->
    
    <!-- bottom navi -->
    <string name="free">休闲</string>
    <string name="news">资讯</string>
    <string name="beauty">风采</string>
    <string name="study">学习</string>
    <string name="contract">互动</string>
    
    <!--#####################  Free模块  #####################-->
    <!-- tab -->
    <string name="music">音乐</string>
    <string name="movie">电影</string>
    <string name="book">图书</string>
</resources>
```
### 样式（style）
style的name命名使用大驼峰命名法。
当某部分xml属性代码重复过多时，请将其变成 style 以便重复利用。
```xml
<style name="ContentText">
    <item name="android:textSize">@dimen/font_normal</item>
    <item name="android:textColor">@color/basic_black</item>
</style>
```
### 自定义属性（attr）
ttr的name命名使用大驼峰命名法。
在自定义控件或其他地方需要自定义属性名称时，除去直接加入attrs.xml中也可以新建一个 attr 文件，并在 attr 后加上功能名称。
如 attr_slider 表示一个轮播器控件的自定义属性。
### layout中id命名
命名模式为：模块名_view缩写，比如 search_btn
### 注释
#### 类注释
每个类都必须要写上
```xml
    1.创建时间
    2.作者
    3.类的作用描述
    4.版本和联系方式（可选）
```
这样团队就能知道这个类的作用是什么，原生产者是谁。例如：
```xml
/**
 * ​
 * author : cpacm
 * e-mail : xxx@xx
 * date   : 2017/03/21
 * description   : xxxx描述
 * version: 1.0
    */ 
    在 Android Studio 中 Settings → Editor → File and Code Templates → Includes → File Header，输入模板。
```
#### 方法注释
每个成员方法都应该有一个头注释，告诉我们这个方法做了什么，返回了什么。
```xml
/**
 * snackbar的显示
    */
```
 
设置Fix doc comment(Settings → Keymap → Fix doc comment)快捷键，AS便会生成模板。
#### 块/行注释
主要作用是为一些代码进行补充说明，防止自己或团队的其他人无法理解代码的含义。

//指向某个界面viewPager.setCurrentItem(2, false);
