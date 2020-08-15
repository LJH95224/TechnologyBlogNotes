# Vue scoped (>>> || /deep/)穿透

Vue引用了第三方组件，需要在组件中局部修改第三方组件的样式，而又不想去除 scoped 属性造成组件之间的样式污染。此时只能通过 `>>>`，穿透 scoped。

有些Sass 之类的预处理器无法正确解析 >>>。可以使用 /deep/ 操作符 ( >>> 的别名)

```jsx
<style scoped>

  外层 >>> 第三方组件 {

    样式

  }

  /deep/  第三方组件 {

    样式

  }
    
   /deep/ {

       第三方组件class1 {
           样式
       }
	   第三方组件class2 {
           样式
       }
  }
</style>
```

ckeditor 为第三方组件，现在我需要修改里面一个 class="ck-content" 的标签，
 那么我需要在 ckeditor 外层自己新加一个div进行包裹它，不能直接在 ckeditor 身上设置class 或者 id，否则不会生效。然后在通过我自己新加的div的 class 去进行定位 .ck-content 。

```jsx
<div class="ckeditor">
   <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
</div>

<style scoped>
// 普通穿透
.ckeditor >>> .ck-content {
  height: 300px;
}
// 如果普通穿透不生效，添加 !important
.ckeditor >>> .ck-content {
  height: 300px !important;
}
</style>
```

