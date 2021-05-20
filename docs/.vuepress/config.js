module.exports = {
  title: 'Alfred个人主页',
  description: 'Alfred个人博客',
  base: process.env.NODE_ENV === 'production' ? '/blogsNote/' : '/',
  head: [
    ['link', { rel: 'icon', href: '/image/hero.png' }]
  ],
  themeConfig: {
    nav: require('./nav.js'),
    sidebar: require('./sidebar.js'),
    sidebarDepth: 2,
    // lastUpdated: 'lastUpdated',
    // searchMaxSuggestoins: 10,
    // serviceWorker: {
    //   updatePopup: {
    //     message: '有新的内容',
    //     buttonText: '更新'
    //   }
    // },
    // editLinks: true,
    // editLinkText: '在Github上编辑此页'
  }
}