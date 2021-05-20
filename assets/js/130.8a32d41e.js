(window.webpackJsonp=window.webpackJsonp||[]).push([[130],{582:function(a,s,t){"use strict";t.r(s);var v=t(44),r=Object(v.a)({},(function(){var a=this,s=a.$createElement,t=a._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"热修复与插件化入门知识点详解"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#热修复与插件化入门知识点详解"}},[a._v("#")]),a._v(" 热修复与插件化入门知识点详解")]),a._v(" "),t("h2",{attrs:{id:"class-dex文件详解"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#class-dex文件详解"}},[a._v("#")]),a._v(" class&dex文件详解")]),a._v(" "),t("h3",{attrs:{id:"class文件结构深入解析"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#class文件结构深入解析"}},[a._v("#")]),a._v(" class文件结构深入解析")]),a._v(" "),t("h4",{attrs:{id:"class文件基本概念"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#class文件基本概念"}},[a._v("#")]),a._v(" class文件基本概念")]),a._v(" "),t("p",[a._v("它是能够被JVM识别，加载并执行的class文件的格式。")]),a._v(" "),t("h4",{attrs:{id:"如何生成class文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#如何生成class文件"}},[a._v("#")]),a._v(" 如何生成class文件")]),a._v(" "),t("ul",[t("li",[a._v("通过IDE自动帮我们build生成class文件")]),a._v(" "),t("li",[a._v("手动通过javac去生成class文件，通过java命令去执行class文件")])]),a._v(" "),t("h4",{attrs:{id:"class文件的作用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#class文件的作用"}},[a._v("#")]),a._v(" class文件的作用")]),a._v(" "),t("p",[a._v("记录一个类文件的所有信息，记住是所有，例如类名称和类的所有方法和变量等。class包含的信息远远多于源代码的信息，虽然类中没有定义this和super这样的方法，但是生成class的时候java虚拟机帮我们记录了this和super的信息。")]),a._v(" "),t("h4",{attrs:{id:"class文件结构"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#class文件结构"}},[a._v("#")]),a._v(" class文件结构")]),a._v(" "),t("ul",[t("li",[a._v("一种8位字节的二进制流文件")]),a._v(" "),t("li",[a._v("各个数据按顺序紧密的排列，无间隙")]),a._v(" "),t("li",[a._v("每个类或接口都单独占据一个class文件")])]),a._v(" "),t("h4",{attrs:{id:"class文件弊端"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#class文件弊端"}},[a._v("#")]),a._v(" class文件弊端")]),a._v(" "),t("ul",[t("li",[a._v("内存占用大，不适合移动端")]),a._v(" "),t("li",[a._v("堆栈的加栈模式，加载速度慢")]),a._v(" "),t("li",[a._v("文件IO操作多，类查找慢")])]),a._v(" "),t("h3",{attrs:{id:"dex文件结构深入解析"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#dex文件结构深入解析"}},[a._v("#")]),a._v(" dex文件结构深入解析")]),a._v(" "),t("h4",{attrs:{id:"什么是dex文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#什么是dex文件"}},[a._v("#")]),a._v(" 什么是dex文件")]),a._v(" "),t("p",[a._v("它是能够被DVM识别，加载并执行的文件格式。")]),a._v(" "),t("h4",{attrs:{id:"如何生成dex文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#如何生成dex文件"}},[a._v("#")]),a._v(" 如何生成dex文件")]),a._v(" "),t("ul",[t("li",[a._v("通过IDE自动帮我们build生成dex文件")]),a._v(" "),t("li",[a._v("手动通过dx命令去生成dex文件")])]),a._v(" "),t("h4",{attrs:{id:"dex文件作用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#dex文件作用"}},[a._v("#")]),a._v(" dex文件作用")]),a._v(" "),t("ul",[t("li",[a._v("记录整个工程中所有类文件的信息，记住是整个工程所有的类文件。")])]),a._v(" "),t("h4",{attrs:{id:"dex文件结构"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#dex文件结构"}},[a._v("#")]),a._v(" dex文件结构")]),a._v(" "),t("ul",[t("li",[a._v("一种8位字节的二进制流文件")]),a._v(" "),t("li",[a._v("各个数据按顺序紧密的排列，无间隙")]),a._v(" "),t("li",[a._v("整个应用中所有java源文件都放在一个dex中")])]),a._v(" "),t("h3",{attrs:{id:"class文件与dex文件对比"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#class文件与dex文件对比"}},[a._v("#")]),a._v(" class文件与dex文件对比")]),a._v(" "),t("ul",[t("li",[a._v("本质上他们都是一样的，dex是从class文件演变而来的")]),a._v(" "),t("li",[a._v("class文件存在许多冗余信息，dex会去除冗余，并整合。")])]),a._v(" "),t("h2",{attrs:{id:"虚拟机详解"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#虚拟机详解"}},[a._v("#")]),a._v(" 虚拟机详解")]),a._v(" "),t("h2",{attrs:{id:"java内存结构"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#java内存结构"}},[a._v("#")]),a._v(" Java内存结构")]),a._v(" "),t("h3",{attrs:{id:"java栈区"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#java栈区"}},[a._v("#")]),a._v(" Java栈区")]),a._v(" "),t("p",[a._v("它存放的是Java方法执行时的所有的数据，它由栈帧组成，一个栈帧代表一个方法的执行。")]),a._v(" "),t("h3",{attrs:{id:"java栈帧"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#java栈帧"}},[a._v("#")]),a._v(" Java栈帧")]),a._v(" "),t("p",[a._v("每个方法从调用到执行完成就对应一个栈帧在虚拟机栈中入栈到出栈。每一个栈帧包含：局部变量表、栈操作数、动态链接、方法出口。")]),a._v(" "),t("h3",{attrs:{id:"本地方法栈"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#本地方法栈"}},[a._v("#")]),a._v(" 本地方法栈")]),a._v(" "),t("p",[a._v("本地方法栈是专门为native方法服务的。")]),a._v(" "),t("h3",{attrs:{id:"方法区"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#方法区"}},[a._v("#")]),a._v(" 方法区")]),a._v(" "),t("p",[a._v("存储被虚拟机加载的类信息、常量、静态变量、即时编译器编译后等数据。")]),a._v(" "),t("h3",{attrs:{id:"堆区"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#堆区"}},[a._v("#")]),a._v(" 堆区")]),a._v(" "),t("p",[a._v("所有通过new创建的对象的内存都在堆中分配，是虚拟机中最大的一块内存，是GC要回收的部分。")]),a._v(" "),t("h2",{attrs:{id:"垃圾回收-gc"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#垃圾回收-gc"}},[a._v("#")]),a._v(" 垃圾回收(GC)")]),a._v(" "),t("h3",{attrs:{id:"垃圾收集算法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#垃圾收集算法"}},[a._v("#")]),a._v(" 垃圾收集算法")]),a._v(" "),t("ul",[t("li",[a._v("引用记数算法(标记对象是不是垃圾对象，创建一个对象时会有一个引用计数器并加一，每次有新的引用到子对象时，引用计数器会加一，引用销毁时，引用计数器会减一，为0的时候代表对象时垃圾对象可以被回收了,存在的问题是两个对象之间互相引用，不能被回收。)")]),a._v(" "),t("li",[a._v("可达性算法(路径可达的话，对象不可以被回收，不可达的话就是垃圾对象，可以被回收)")])]),a._v(" "),t("h3",{attrs:{id:"引用的类型"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#引用的类型"}},[a._v("#")]),a._v(" 引用的类型")]),a._v(" "),t("p",[a._v("引用的类型主要包括强引用，软引用，弱引用，虚引用，最常使用的是强引用和弱引用。")]),a._v(" "),t("h4",{attrs:{id:"强引用的创建"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#强引用的创建"}},[a._v("#")]),a._v(" 强引用的创建")]),a._v(" "),t("div",{staticClass:"language-java extra-class"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Object")]),a._v(" obj "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("new")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Object")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])]),t("h4",{attrs:{id:"弱引用的创建"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#弱引用的创建"}},[a._v("#")]),a._v(" 弱引用的创建")]),a._v(" "),t("div",{staticClass:"language-java extra-class"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("WeakReference")]),t("span",{pre:!0,attrs:{class:"token generics"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Object")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v(" wf "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("new")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("WeakReference")]),t("span",{pre:!0,attrs:{class:"token generics"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Object")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("obj"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])]),t("h3",{attrs:{id:"垃圾回收算法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#垃圾回收算法"}},[a._v("#")]),a._v(" 垃圾回收算法")]),a._v(" "),t("ul",[t("li",[a._v("标记-清除算法")]),a._v(" "),t("li",[a._v("复制算法")]),a._v(" "),t("li",[a._v("标记-整理算法")])]),a._v(" "),t("h3",{attrs:{id:"触发回收"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#触发回收"}},[a._v("#")]),a._v(" 触发回收")]),a._v(" "),t("ul",[t("li",[a._v("Java虚拟机无法再为新的对象分配内存空间")]),a._v(" "),t("li",[a._v("手动调用System.gc()方法(强烈不推荐)")]),a._v(" "),t("li",[a._v("低优先级的GC线程，被运行时就会执行GC")])]),a._v(" "),t("h3",{attrs:{id:"dalvik与jvm的不同"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#dalvik与jvm的不同"}},[a._v("#")]),a._v(" Dalvik与JVM的不同")]),a._v(" "),t("ul",[t("li",[a._v("执行的文件不同，Dalvik执行的是dex，JVM执行的是class")]),a._v(" "),t("li",[a._v("类加载的系统与JVM区别比较大")]),a._v(" "),t("li",[a._v("JVM只能承载一个DVM，Dalvik可以承载多个")]),a._v(" "),t("li",[a._v("Dalvik是基于寄存器的，JVM是基于栈的")])]),a._v(" "),t("h3",{attrs:{id:"art与dalvik的不同"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#art与dalvik的不同"}},[a._v("#")]),a._v(" ART与Dalvik的不同")]),a._v(" "),t("ul",[t("li",[a._v("DVM使用JIT来将字节码转换成机器码，效率低，ART使用AOT预编译技术，执行速度更快。")]),a._v(" "),t("li",[a._v("ART会占用更多的应用安装时间和存储空间")])])])}),[],!1,null,null,null);s.default=r.exports}}]);