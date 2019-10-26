# Android Studio常用插件
开发者在使用Android studio开发过程中，为了使开发更便捷，不得不使用一些插件和工具来省去一些麻烦的事情，使开发更高效。这里列举一些常用的开发插件和工具。
<!-- more -->
### Genymotion
当你运行App的时候，你会发现Android studio自带的模拟器异常的慢，所以Genymotion是Android开发者唯一的选择。你可以在Genymotion官网中(https://wwww.genymotion.com)下载Genymotion模拟器，然后在Android studio中安装Genymotion插件即可使用。

### Vysor
如果你不想在模拟器上开发app，但是想像模拟器一样的方便显示在电脑上，那么在这推荐一个vysor工具，他可以将你手机的镜像显示在电脑上，而且你也可以使用它来向团队实时演示app demo。

### Android WiFi ADB
当你使用真机调试app的时候，不得不用数据线连接手机和电脑，但是现在你通过在Android studio中安装Android WiFi ADB插件，你就可以通过Wi-Fi从Android studio运行app了,但是前提是你必须手机和电脑在同一个网段下。你就不需要用数据线把设备和电脑连接，享受无线调试带来的乐趣。

### FindBugs
它是一个免费的Android studio插件，可以在开发早期检测出常见的Java Bug。通常我们在App上线之后，发现各种错误，尤其是空指针异常。这样对于用户的体验是非常不好的，而且对于代码来说，没有用过的变量也没有删除，这样app有很多潜在的问题。所以使用这个工具来检测bug是非常有必要的。

### Material Design Icon Generator
这是一个自动生成Material Design图标的Android studio插件。

### APK DeGuard
它是一个反编译工具，使用机器学习来分析各种app，确保每次都能输出最佳的结果。当我想知道一些app是如何实现某种功能的时候，这个工具很有用。

### BlockCanary
BlockCanary是一个强大的性能检测库，它可以帮你找出app界面卡顿元凶的开源工具。设置很简单，类似于LeakCanary。

### LeakCanary
LeakCanary是由Square开发的一个开源工具，让复杂的内存泄漏检测变得更简单。它可以在内存泄漏的时候显示通知，并提供一个完整的泄漏轨迹。

### Android Asset Studio
它是一个可以生成各种类型图标(launcher,notification,generic,app shortcut icons)的工具集合。

### GsonFormat
它是Android studio开发中常用的将json字符串转为java类的插件。