/*
 * @Author: your name
 * @Date: 2020-11-29 14:45:31
 * @LastEditTime: 2021-06-22 16:00:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \TechnologyBlogNotes\docs\.vuepress\nav.js
 */
module.exports = [
  {
    text: '主页',
    link: '/'
  },
  {
    text: '开源项目',
    items: [
      { text: '常用问题', link: '/notes/problem/' },
      { text: '公用方法', link: '/notes/commonMethods/' },
      { text: 'vscode', link: '/notes/vscodePage/'},
      { text: '大文件上传和断点续传', link:'' }
    ]
  },
  {
    text: '技术笔记',
    items: [
      { text: 'Linux', link: '/notes/linux/' },
      // { text: 'android', link: '/notes/android/' },
      { text: 'cordova', link: '/notes/cordova/'},
      { text: '打包工具', link: '/notes/buildTools/'},
      { text: '基础知识', link: '/notes/base/'},
      { text: 'Markdown', link: '/notes/Markdown/'},
      { text: 'vue技术栈', link: '/notes/vue/' },
      { text: 'typeScript', link: '/notes/typeScript/' },
      { text: 'ECMAScript 6 入门', link: '/notes/ECMAScript/' },
    ]
  },
  {
    text: '面试题',
    items: [
      { text: 'JS 题', link: '/interview/javascript/' },
      { text: 'Vue 题', link: '/interview/vue/' },
      { text: '编程题', link: '/interview/programme/'},
      { text: '基本面试题', link: '/interview/base/'}
    ]
  },
  { text: '关于我', link: '/aboutMe/' },
  {
    text: '工具箱',
    items: [
      {
        text: '在线服务',
        items: [
          { text: '阿里云', link: 'https://www.aliyun.com/' }
        ]
      },
      {
        text: '在线博客',
        items: [
          {
            text: '掘金',
            link: 'https://juejin.im/'
          },
          {
            text: '知乎',
            link: 'https://www.zhihu.com/'
          },
          {
            text: '简书',
            link: 'https://www.jianshu.com/'
          },
          {
            text: 'csdn',
            link: 'https://blog.csdn.net/'
          },
          {
            text: 'segmentfault',
            link: 'https://segmentfault.com'
          }
        ]
      }
    ]
  },
  {
    text: 'Github',
    link: 'https://github.com/LJH95224'
  }
]