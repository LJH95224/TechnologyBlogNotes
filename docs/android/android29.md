# jni初探

jni是Java Native Interface的缩写，表示Java本地接口。在Android系统中，jni是连接Java部分和C/C++部分的桥梁。在Android中通过提供jni的方式，让Java程序可以调用c语言程序。

<!--more-->

## jni的使用步骤
1. 在java中，编写native方法
2. 通过javah命令，生成.h头文件
3. 复制.h头文件到cpp工程中
4. 实现.h头文件中声明的函数

## C的函数名称
Java_完整类名_函数名

## JNIEnv
结构体指针，代表Java运行环境，调用Java中的代码