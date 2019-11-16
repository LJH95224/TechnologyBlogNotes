# Markdown 表格
Markdown 制作表格使用 <span style="background: #ccc"> | </span> 来分隔不同的单元格， 使用 <span style="background: #ccc"> - </span> 来分隔表头和其他行

语法格式如下：
```markdown
| 表头 | 表头 |
| ---- | ---- |
| 单元格 | 单元格 |
| 单元格 | 单元格 |
```

以上代码显示结果如下： 

<img src="../../.vuepress/public/image/markdown/markdown8-1.jpg"/>

对齐方式

**我们可以设置表格的对齐方式:**

- `-:` 设置内容和标题栏居右对齐。
- `:-` 设置内容和标题栏居左对齐。
- `:-:` 设置内容和标题栏居中对齐。

实例如下：

```markdown
| 左对齐 | 右对齐 | 居中对齐 |
| :---- | -----: | :-----: |
| 单元格 | 单元格 | 单元格 |
| 单元格 | 单元格 | 单元格 |
```

以上代码显示结果如下：
<img src="../../.vuepress/public/image/markdown/markdown8-2.jpg"/>
