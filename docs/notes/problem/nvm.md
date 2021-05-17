# nvm 安装与使用

## 1. nvm 是什么

  nvm全名node.js version management，顾名思义是一个nodejs的版本管理工具。通过它可以安装和切换不同版本的nodejs。下面列出下载、安装及使用方法。 

## 2. 下载

  可在[点此在github](https://github.com/coreybutler/nvm-windows/releases)上下载最新版本,本次下载安装的是windows版本。打开网址我们可以看到有两个版本：

- nvm-noinstall.zip：绿色免安装版，但使用时需进行配置。
- nvm-setup.zip：安装版，推荐使用

## 3. 安装

 本次演示的是安装版。

  1、双击安装文件 nvm-setup.exe

 ![img](F:\myGIthub\TechnologyBlogNotes\docs\.vuepress\public\image\base\775046-20190411160657751-1529010875.png) 

  2、选择nvm安装路径 

 ![img](F:\myGIthub\TechnologyBlogNotes\docs\.vuepress\public\image\base\775046-20190411160816834-99504468.png) 

  3、选择nodejs路径 

 ![img](F:\myGIthub\TechnologyBlogNotes\docs\.vuepress\public\image\base\775046-20190411161045308-1947410693.png) 

  4、确认安装即可 

 ![img](F:\myGIthub\TechnologyBlogNotes\docs\.vuepress\public\image\base\775046-20190411171705646-891139870.png) 

5、安装完确认

  打开CMD，输入命令 nvm 

## 4. 安装和管理nodejs

 1、查看本地安装的所有版本；有可选参数available，显示所有可下载的版本。 

> ```
> nvm list [available]
> ```

  2、安装，命令中的版本号可自定义，具体参考命令1查询出来的列表 

```
nvm install 11.13.0
```

 3、使用特定版本

```
nvm use 11.13.0
```

  4、卸载

```
nvm uninstall 11.13.0
```

## 5. 命令提示

1. nvm arch ：显示node是运行在32位还是64位。
2. nvm install <version> [arch] ：安装node， version是特定版本也可以是最新稳定版本latest。可选参数arch指定安装32位还是64位版本，默认是系统位数。可以添加--insecure绕过远程服务器的SSL。
3. nvm list [available] ：显示已安装的列表。可选参数available，显示可安装的所有版本。list可简化为ls。
4. nvm on ：开启node.js版本管理。
5. nvm off ：关闭node.js版本管理。
6. nvm proxy [url] ：设置下载代理。不加可选参数url，显示当前代理。将url设置为none则移除代理。
7. nvm node_mirror [url] ：设置node镜像。默认是https://nodejs.org/dist/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。
8. nvm npm_mirror [url] ：设置npm镜像。https://github.com/npm/cli/archive/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。
9. nvm uninstall <version> ：卸载指定版本node。
10. nvm use [version] [arch] ：使用制定版本node。可指定32/64位。
11. nvm root [path] ：设置存储不同版本node的目录。如果未设置，默认使用当前目录。
12. nvm version ：显示nvm版本。version可简化为v。

