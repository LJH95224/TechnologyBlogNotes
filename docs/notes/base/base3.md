# JS + CSS 自适应屏幕

## 布局适配方式

**Media Query （媒体查询）**

现在比较主流的适配方案，可根据视口不同，编写不同样式达到适应效果，比如框架 bootstrap， 它完成了大部分项目需求。但是编写过于复杂。

**flex 布局**

主流布局方式，不仅仅适应于移动web，网页上也表现良好，也是现在使用最多的布局方式。

**固定高度，宽度百分比**

此方法只适合简单要求不高的 webApp，一般在适应要求不高，或者大屏显示没有要求时候可以使用。

**rem**

> rem（font size of the root element）是相对长度单位。相对于根元素（即html元素）font-size计算值的倍数

 原理：将px替换成rem，在脚本中使用JS动态修改html的font-size适配，它可以根据根视口大小去改变基准元素的字体，然后进行等比缩放来进行变化，达到各种屏幕适应。 

 控制的JS写法

```javascript
var htmlWidth = document.documentElement.clientWidth || document.body.clientWidth; //获取屏幕的宽度
```

```javascript
//获取HTML的Dom元素
var htmlDom = document.getElementsByTagName('html')[0];
//设置根元素字体
htmlDom.style.fontSize= htmlWidth/20 + 'px';
```

 这种方式目前常用于webapp上，主要是使用rem特性来灵活改变字体大小，达到窗口大小改变等比缩放元素。 



## 拓展部分

目前在自适应这块像对于互联网电视，由于开发时候对图片尺寸是有严格要求，因此，集成时候只需要设置视口大小就可以对任何屏幕进行等比缩放。

 一般会在meta标签中直接设置开发时候基准的大小 

```html
<meta name="page-view-size" content="1920*1080" />
```

