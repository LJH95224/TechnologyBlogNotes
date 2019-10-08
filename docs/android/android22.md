# Android代码规范检查工具
在Android开发过程中，当你完成项目之后，就要对项目进行优化，提高代码质量，代码的规范就成了很重要的部分。本文主要介绍四个代码分析工具，帮助开发者使用代码规范检查工具扫描代码的规范以及存在的隐患。

<!--more-->

## CheckStyle
### CheckStyle是一个针对java的代码规范检查工具，它遵循Google的java编码规范和Sun的代码规范。但是我们需要定义检查规则并配置，在这里准备了一个Google的检查规则，网址为https://github.com/checkstyle/checkstyle/blob/master/src/main/resources/google_checks.xml然后在Android Studio中安装CheckStyle-IDEA插件，安装完之后再Other Settings中打开CheckStyle-IDEA插件，如图所示。
![](https://ooo.0o0.ooo/2017/06/18/59460eb75f5a4.png)
### 配置一下检查规则的文件，然后在Android Studio中底部出现CheckStyle面板，打开之后，在左上角选择你配置的规则文件，然后在检查的代码中右击Check Current File，即可检查代码。如图所示。
![](https://ooo.0o0.ooo/2017/06/18/59460f7a47006.png)
