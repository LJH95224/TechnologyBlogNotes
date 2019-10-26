# Android常用的流行框架。

<!--more-->

### 本文主要列举出比较流行的框架

## RxJava
观察者模式的事件消息交互框架

## RxAndroid
支持在Android 中通过Rx切换到主线程

## RxBus
提供如EventBus一般使用的Rx框架

## RxPermissions
提供在Rx上来管理Android M (Android6.0)的动态权限框架

## RxLifecycle
解决Rx因为观察者在订阅后Fragment持有context导致内存泄漏的问题

## Eventbus
翻译为事件总线,用于解决android中的事件交互和回调.同Rx一样也是观察者模式

## retrofit
android中的通讯注解框架,用于发送http请求.配合Rx能达到高效的开发速度

## butterknife
AS中通过自动导入生成注解,解放findViewById的痛苦.并且它是编译时注解,效率爆高

## BaseRecyclerViewAdapterHelper
如名字一样他是RecyclerView的适配器超类库.支持各种姿势写adapter,轻松减少大量重复代码.

## glide
目前最好的之一的图片加载框架.压缩质量高、效率高、性能好是他的特点

## AndroidAutoLayout
国内大神张鸿洋出的布局框架.很不错.减少大量布局调优工作

## zxing
老牌二维码扫描框架

## compressor
图片压缩框架,压缩率很高.支持配置.Api友好

## RxBinding
可以实现数据层与View层的绑定，当数据发生变化，View会自动更新UI。还有其他功能非常强大(MVVM)

## LitePal
ORM数据框架比原生好用.

## Jsoup
一个Html解析框架.用于爬网页后进行剔除数据

## ASimpleCache
一个为android制定的 轻量级的 开源缓存框架。轻量到只有一个java文件（由十几个类精简而来）。

## ARouter
用于在Android平台，从外部(浏览器等)，内部直接导航到页面、服务的中间件,你值得拥有.

## freeline
蚂蚁聚宝团队在Android平台上的动态替换的编译方案，稳定性方面：完善的基线对齐，进程级别异常隔离机制。性能方面：内部采用了类似Facebook的开源工具buck的多工程多任务并发思想, 并对代码及资源编译流程做了深入的性能优化。
## Logger
开源日志记录库，基于系统Log类基础上进行的封装，十分好用。Gtihub地址：https://github.com/orhanobut/logger