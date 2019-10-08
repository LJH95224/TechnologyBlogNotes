
# c语言知识点

<!--more-->

引入包含标准输入输出接口的头文件

```java
	#include<stdio.h>
```

引入c标准库
```java
	#include<stdlib.h>
```

主函数
```java
	int main(int argc, const char * argv[]) {
	    // insert code here...
	    printf("Hello, World!\n");
	    return 0;
	}
```

基本数据类型

int short long float double char

等待输入
getchar()

获取输入对象的字节数
sizeof()

printf输出时，规定数据输出方式

- int %d 
- short %d 
- long %ld 
- float %f 
- double %lf 
- char %c 
- 十六进制 %x 
- 八进制 %o 
- 字符串 %s   

for循环
```java
	for(int n=0;n<10;n++){
	}
```

输入函数

scanf("%d",&i);

输出函数

printf("请输入一个整数：");

取地址符&

指针：
指针存储的是变量的内存地址

```java
	int main(int argc, const char * argv[]) {
	    int i = 0;
	    //指针变量,p的值就是变量i的内存地址
	    int* p = &i;
	    return 0;
	}
```

指针为什么要有类型？

指针有类型，地址没有类型，地址只是开始的位置，类型读到什么位置结束。空指针的默认值为0，指针保存的是变量的地址，保存的这个变量还可以是一个指针变量。

指针的运算

一般在数组遍历时才有意义，基于数组在内存中线性排列的方式

定义数组

```java
	int ids[]=[1,3,3,4,4];
```
数组变量名：ids就是数组的首地址

函数指针

int(*fun_p)(char* msg,char* title)=msg;函数返回值类型，函数指针的名称，函数的参数列表。

```java
	int add(int a,int b){
		return a+b;
	}	
	void msg(int(*func_p)(int a,int b),int m,int n){
		intr = func_p(m,n);
		printf("%d\n",r);
	}
	void main(){
		msg(add,10,20);
	}
```

c语言执行的流程

- 编译：形成目标代码(.obj)
- 连接：将目标代码与c函数库连接合并，形成最终的可执行文件
- 执行

预编译

预编译又叫预处理，为编译做准备工作，完成代码文本的替换工作。头文件告诉编译器有这样一个函数，连接器负责找到这个函数的实现。

define指令

- 定义标示
- 定义常数
- 定义"宏函数"

如何避免同一个文件被include多次

+ "#ifndef"方式
+ "#pragma once"方式

"#ifndef"方式

```java
	#ifndef __SOMEFILE_H__
	#define __SOMEFILE_H__
	... ...//一些生命语句
	#endif
```

"#pragma once"方式

```java
	#pragma once
	... ...//一些声明语句
```

定义宏函数的常见用法

```java
//NAME是参数
#define jni(NAME) dn_com_jni_##NAME();
```

```java
	//日志输出
	//__VA__ARGS__可变参数
	#define LOG(FORMAT,...) printf(##FORMAT,__VA_ARGS__);
```



