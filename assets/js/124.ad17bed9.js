(window.webpackJsonp=window.webpackJsonp||[]).push([[124],{576:function(e,i,t){"use strict";t.r(i);var v=t(44),n=Object(v.a)({},(function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"自定义控件详解"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#自定义控件详解"}},[e._v("#")]),e._v(" 自定义控件详解")]),e._v(" "),t("p",[e._v("自定义控件的三种方式：继承系统控件，组合系统控件，自定义绘制控件。\nAndroid应用与用户进行交互的界面一般由控件组成，常用的控件像按钮、输入框、文本框等，但需求是千变万化的，官方提供的控件满足不了各种应用场景和特效怎么办呢？这时候就需要自定义控件了。\n")]),e._v(" "),t("h2",{attrs:{id:"自定义控件的方式"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#自定义控件的方式"}},[e._v("#")]),e._v(" 自定义控件的方式")]),e._v(" "),t("ul",[t("li",[e._v("继承已有的控件，扩展其功能")]),e._v(" "),t("li",[e._v("将已有的控件组合起来，放在一个布局文件中，即组合式控件")]),e._v(" "),t("li",[e._v("完全自定义控件，自主完成控件的绘制布局和事件处理")])]),e._v(" "),t("h2",{attrs:{id:"如何自定义控件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#如何自定义控件"}},[e._v("#")]),e._v(" 如何自定义控件？")]),e._v(" "),t("ol",[t("li",[e._v("自定义属性的声明与获取\n"),t("ol",[t("li",[e._v("分析需要的自定义属性")]),e._v(" "),t("li",[e._v("在res/values/attrs.xml中定义自定义属性")]),e._v(" "),t("li",[e._v("在layout的xml文件中声明使用")]),e._v(" "),t("li",[e._v("在自定义view中的构造方法中获取使用")])])]),e._v(" "),t("li",[e._v("测量onMeasure\n"),t("ol",[t("li",[e._v("求出子视图的个数：通过getChildCount()方法获取子view的个数")]),e._v(" "),t("li",[e._v("测量子视图的宽度和高度\n"),t("ul",[t("li",[e._v("通过getChildAt()方法获取子view，然后通过子view的measure(int wSpec, int hSpec)方法测量。")]),e._v(" "),t("li",[e._v("通过ViewGroup的measureChild(subView, int wSpec, int hSpec);来测量某个子view的宽和高。")]),e._v(" "),t("li",[e._v("通过ViewGroup的measureChildren(int wSpec, int hSpec);方法来测量，前提是所有的子view都是宽高相同的，内部调用了measureChild方法。")]),e._v(" "),t("li",[e._v("通过 measureChildWithMargins(subView, intwSpec, int wUsed, int hSpec, int hUsed); 测量某一个子view，多宽，多高, 内部加上了viewGroup的padding值、margin值和传入的宽高wUsed、hUsed 。")])])]),e._v(" "),t("li",[e._v("根据子视图的宽度和高度来求出ViewGroup的宽度和高度，通过子view的getMeasuredWidth()方法和getMeasureHeight()方法来得到子view的宽和高。然后通过setMeasuredDimension(width, height);方法来设置ViewGroup的宽度和高度。")])])]),e._v(" "),t("li",[e._v("布局onLayout(ViewGroup)\n决定子View的位置，先获取子view然后通过view的layout方法来设置view的位置。")]),e._v(" "),t("li",[e._v("绘制onDraw\n如果是自定义ViewGroup，则不需要调用该方法绘制，因为系统会默认绘制子view。")]),e._v(" "),t("li",[e._v("onTouchEvent\n通过MotionEvent来获取用户的操作，进而实现相关的逻辑操作。\n如果返回值为true，则会告诉该ViewGroup的父view，该viewgroup已经处理好该事件。")]),e._v(" "),t("li",[e._v("onInterceptTouchEvent(ViewGroup)\n如果返回值为true，则代表该容器处理此拦截的事件，然后在onTouchEvent()方法中处理该事件。如果返回值为false，则代表容器不会处理拦截的事件，将会继续向下传递事件。")])])])}),[],!1,null,null,null);i.default=n.exports}}]);