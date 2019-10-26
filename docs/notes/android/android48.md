# Mac中编译FFmpeg教程(Android版)
本篇文章主要介绍在Mac环境中，编译FFmpeg生成so库。

## FFmpeg简介
FFmpeg既是一款音视频编解码工具，同时也是一组音视频编解码开发套件，作为编解码开发套件，它为开发者提供了丰富的音视频处理的调用接口。
FFmpeg提供了多种媒体格式的封装和解封装，包括多种音视频编码、多种协议的流媒体、多种色彩格式转换、多种采样率转换、多种码率转换等。FFmpeg框架提供了多种丰富的插件模块，包含封装与解封装的插件、编码与解码的插件等。

## 开发环境
本次编译的环境如下：

+ macOS High Sierra(10.13.5)
+ FFmpeg源码(3.3.7)
+ ndk(android-ndk-r14b)

首先下载ndk，建议不要使用Android Studio自带的ndk-bundle，然后配置ndk的全局环境，在.bash_profile中添加一下配置：

```shell
export ANDROID_NDK_ROOT=/Users/jiangshuaijie/android-ndk-r14b/build
export PATH=${PATH}:${ANDROID_NDK_ROOT}
```

然后在命令行中输入ndk-build测试环境是否配置成功。

## 下载FFmpeg源码
FFmpeg的源码可以在 https://ffmpeg.org/download.html#releases 中下载，也可以使用git clone https://git.ffmpeg.org/ffmpeg.git ffmpeg 克隆到本地。建议下载3.3.x版本的库，最新的库编译的问题比较多，各种路径不正常等问题。

## 修改configure文件

下载FFmpeg源代码之后，首先需要对源代码中的configure文件进行修改。由于编译出来的动态库文件名的版本号在.so之后（例如“libavcodec.so.5.100.1”），而android平台不能识别这样文件名，所以需要修改这种文件名。在configure文件中找到下面几行代码：

```shell
SLIBNAME_WITH_MAJOR='$(SLIBNAME).$(LIBMAJOR)'
LIB_INSTALL_EXTRA_CMD='$$(RANLIB)"$(LIBDIR)/$(LIBNAME)"'
SLIB_INSTALL_NAME='$(SLIBNAME_WITH_VERSION)'
SLIB_INSTALL_LINKS='$(SLIBNAME_WITH_MAJOR)$(SLIBNAME)'
```

替换成

```shell
SLIBNAME_WITH_MAJOR='$(SLIBPREF)$(FULLNAME)-$(LIBMAJOR)$(SLIBSUF)'
LIB_INSTALL_EXTRA_CMD='$$(RANLIB)"$(LIBDIR)/$(LIBNAME)"'
SLIB_INSTALL_NAME='$(SLIBNAME_WITH_MAJOR)'
SLIB_INSTALL_LINKS='$(SLIBNAME)'
```

## 编写脚本生成类库
在ffmpeg中创建一个build_android.sh的脚本，并赋予可执行的权限，脚本内容如下：

```shell
#!/bin/bash

make clean
# NDK的路径，根据自己的安装位置进行设置
export TMPDIR=/Users/jiangshuaijie/ffmpeg-3.3.7/ffmpeg_install
export NDK=/Users/jiangshuaijie/android-ndk-r14b
export SYSROOT=$NDK/platforms/android-21/arch-arm/
export TOOLCHAIN=$NDK/toolchains/arm-linux-androideabi-4.9/prebuilt/darwin-x86_64
export CPU=arm
export PREFIX=$(pwd)/android/$CPU
export ADDI_CFLAGS="-marm"
function build_one
{
./configure \
    --prefix=$PREFIX \
    --target-os=linux \
    --cross-prefix=$TOOLCHAIN/bin/arm-linux-androideabi- \
    --arch=arm \
    --sysroot=$SYSROOT \
    --extra-cflags="-Os -fpic $ADDI_CFLAGS" \
    --extra-ldflags="$ADDI_LDFLAGS" \
    --cc=$TOOLCHAIN/bin/arm-linux-androideabi-gcc \
    --nm=$TOOLCHAIN/bin/arm-linux-androideabi-nm \
    --enable-shared \
    --enable-runtime-cpudetect \
    --enable-gpl \
    --enable-small \
    --enable-cross-compile \
    --disable-debug \
    --disable-static \
    --disable-doc \
    --disable-asm \
    --disable-ffmpeg \
    --disable-ffplay \
    --disable-ffprobe \
    --disable-ffserver \
    --enable-postproc \
    --enable-avdevice \
    --disable-symver \
    --disable-stripping \
$ADDITIONAL_CONFIGURE_FLAG
sed -i '' 's/HAVE_LRINT 0/HAVE_LRINT 1/g' config.h
sed -i '' 's/HAVE_LRINTF 0/HAVE_LRINTF 1/g' config.h
sed -i '' 's/HAVE_ROUND 0/HAVE_ROUND 1/g' config.h
sed -i '' 's/HAVE_ROUNDF 0/HAVE_ROUNDF 1/g' config.h
sed -i '' 's/HAVE_TRUNC 0/HAVE_TRUNC 1/g' config.h
sed -i '' 's/HAVE_TRUNCF 0/HAVE_TRUNCF 1/g' config.h
sed -i '' 's/HAVE_CBRT 0/HAVE_CBRT 1/g' config.h
sed -i '' 's/HAVE_RINT 0/HAVE_RINT 1/g' config.h
make clean
# 这里是定义用几个CPU编译，我用4个，一般在5分钟之内编译完成
make -j4
make install
}
build_one

```

其中：
+ TMPDIR为编译生成的临时文件存放的目录
+ SYSROOT为so文件支持的最低Android版本的平台目录
+ CPU为指定so文件支持的平台
+ PREFIX为生成的so文件存放目录
+ TOOLCHAIN为编译所使用的工具链目录
+ cross-prefix为编译所使用的工具链文件
+ enable和disable指定了需要编译的项
+ target-os为目标操作系统；

## 编译FFmpeg
在ffmpeg目录中，执行终端命令：

```shell
./build_android.sh
```
即可编译，然后等待生成so文件即可。

![](https://ws1.sinaimg.cn/large/006tKfTcly1ft8dad6vqwj31dm0gu0zg.jpg)

## 相关资料

[雷霄骅的博客](https://blog.csdn.net/leixiaohua1020/article/details/47008825)





