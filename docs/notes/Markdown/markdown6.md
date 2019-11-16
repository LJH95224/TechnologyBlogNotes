# Markdown 链接
Markdown链接使用方法如下：

```markdown
[链接名称](链接地址)

或者

<链接地址>
```

例如：

```markdown
这是一个链接 [菜鸟教程](https://www.runoob.com)
```

显示结果如下：

<img src="../../.vuepress/public/image/markdown/markdown6-1.jpg"/>

直接使用链接地址：

```markdown
<https://www.runoob.com>
```

显示结果如下：

<img src="../../.vuepress/public/image/markdown/markdown6-2.jpg"/>

--------------------------------

### 高级链接
```markdown
链接也可以用变量来代替，文档末尾附带变量地址：
这个链接用 1 作为变量地址[Google][1]
这个链接用 runoob 作为网址变量 [Runoob][runoob]
然后在文档的结尾为变量赋值（网址）

[1]: http://www.google.com/
[runoob]: http://www.runoob.com/
```

显示结果如下：
<img src="../../.vuepress/public/image/markdown/markdown6-3.jpg"/>

链接也可以用变量来代替，文档末尾附带变量地址：
这个链接用 1 作为变量地址[Google][1]
这个链接用 runoob 作为网址变量 [Runoob][runoob]
然后在文档的结尾为变量赋值（网址）

[1]: http://www.google.com/
[runoob]: http://www.runoob.com/
