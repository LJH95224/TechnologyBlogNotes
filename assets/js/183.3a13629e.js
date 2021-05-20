(window.webpackJsonp=window.webpackJsonp||[]).push([[183],{651:function(e,t,a){"use strict";a.r(t);var n=a(44),r=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"路由详解-二-进阶"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#路由详解-二-进阶"}},[e._v("#")]),e._v(" 路由详解（二）—— 进阶")]),e._v(" "),a("blockquote",[a("p",[a("strong",[e._v("课程主要内容")]),a("br"),e._v("\n1、 路由组件传参 "),a("br"),e._v("\n2、 HTML5 History模式 "),a("br"),e._v("\n3、 导航守卫 "),a("br"),e._v("\n4、 路由元信息 "),a("br"),e._v("\n5、 过渡效果 "),a("br")])]),e._v(" "),a("h2",{attrs:{id:"路由组件传参"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#路由组件传参"}},[e._v("#")]),e._v(" 路由组件传参")]),e._v(" "),a("p",[e._v("如果在一个页面中，需要根据路由获取参数，来在页面上进行一些逻辑处理。首先可以在页面组件中使用router实例来获取相关参数，但是这样有一个缺点，我们的页面组件与路由进行了高度耦合；为了解耦，使我们的组件能够更大程度去复用，我们就会用到路由组件传参。")]),e._v(" "),a("p",[e._v("首先我们来看之前的路由配置，路由组件传参有三种形势。")]),e._v(" "),a("h3",{attrs:{id:"第一种是-boolean模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#第一种是-boolean模式"}},[e._v("#")]),e._v(" 第一种是 boolean模式")]),e._v(" "),a("p",[e._v("它适合在动态路匹配中，有动态路由参数的，路由配置中。比如我们之前的argu页面，他有动态参数 name。 在argu.vue中，之前页面上要获取route实例上的params里面的name的值来在页面上进行展示。那么我们为了把他们解耦，把name作为一个属性来传入。")]),e._v(" "),a("p",[e._v("属性怎么传入呢? 首先定义一个props,里面有name name是一个参数，我们可能接收他的type类型是"),a("strong",[e._v("String")]),e._v("类型或者"),a("strong",[e._v("Number")]),e._v("类型")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("props: {\n    name: {\n      type:[String, Number],\n    }\n}\n")])])]),a("p",[e._v("如果这个name我们就想让他表示名字的意思,就直接要一个String就可以了")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("props: {\n    name: {\n      type:String,\n    }\n}\n")])])]),a("p",[e._v("我们可以给他一个默认值，如果没有传进来值的话，我们可以直接叫他Lsion")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("  props: {\n    name: {\n      type:String,\n      // 要是没由传入那么就会显示默认的\n      default: 'lison'\n    }\n  }\n")])])]),a("p",[e._v("修改完代码之后，我们上面template这一块也需要修改")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("<template>\n  <div>{{ $route.params.name }}</div>\n</template>\n\n")])])]),a("p",[e._v("修改为")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("<template>\n  <div>{{ name }}</div>\n</template>\n\n")])])]),a("p",[e._v("当我们在输入 http://localhost:8080/#/argu/ls 会显示如下效果\n"),a("img",{attrs:{src:"43BBDA0AE2C34A4B905607DE998990B1",alt:"image"}}),e._v("\n通过效果图我们会发现，显示的不是我们传入的值，而是默认值。")]),e._v(" "),a("p",[e._v("如果想传入这个值呢，我们就需要在router.js中稍作配置，这里需要用到 "),a("strong",[e._v("Boolean类型")]),e._v(" 将***props设置为true*** 里面的参数会使用route的props 作为组件的属性，相当于我们 props 这个对象里面有一个 name 他就会将我们这个 name 传入组件中，把值传入 argu.vue 的 props 里面的 name 中。\n代码为：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("  {\n    path: '/argu/:name',\n    component: () => import('@/views/argu.vue'),\n    props: true\n  },\n")])])]),a("p",[e._v("我们刷新一下页面，地址为： http://localhost:8080/#/argu/ls\n"),a("img",{attrs:{src:"6A8C22DCDF7C43A18B71AA96901D8200",alt:"image"}}),e._v("\n里面的 name 也发生了改变")]),e._v(" "),a("h3",{attrs:{id:"第二种-对象模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#第二种-对象模式"}},[e._v("#")]),e._v(" 第二种 对象模式")]),e._v(" "),a("p",[e._v("第二种就是普通的页面，不是动态路由匹配的页面，比如说我们的 about，如果想给他传一个参数，首先我们在About.vue 中来定义一个属性food，定义一个about的类型，type是 string类型 然后再定义一个默认值apple，如果没有的话就会显示apple")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("<template>\n  <div class=\"about\">\n    <h1>This is an about page</h1>\n  </div>\n</template>\n<script>\nexport default {\n  props: {\n    food: {\n      type: String,\n      default: 'apple'\n    }\n  }\n}\n<\/script>\n")])])]),a("p",[e._v("现在已经有了food属性，怎么传入呢，在route.js中配置\n假如我们想要传入一个banana，那么代码修改为")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v(" {\n    path: '/about',\n    name: 'about',\n    // route level code-splitting\n    // this generates a separate chunk (about.[hash].js) for this route\n    // which is lazy-loaded when the route is visited.\n    component: () => import(/* webpackChunkName: \"about\" */ '@/views/About.vue'),\n    props: {\n      food: 'banana'\n    }\n  },\n")])])]),a("p",[e._v("当切换到about页面的时候 http://localhost:8080/#/about\n"),a("img",{attrs:{src:"5605D48F0A7342599D965CF58CD9AB20",alt:"image"}})]),e._v(" "),a("p",[e._v("如果我们没有传值")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v(" {\n    path: '/about',\n    name: 'about',\n    // route level code-splitting\n    // this generates a separate chunk (about.[hash].js) for this route\n    // which is lazy-loaded when the route is visited.\n    component: () => import(/* webpackChunkName: \"about\" */ '@/views/About.vue'),\n    props: {\n      // food: 'banana'\n    }\n  },\n")])])]),a("p",[e._v("当切换到about页面的时候 http://localhost:8080/#/about 显示的就是apple了\n"),a("img",{attrs:{src:"F287DA5F5B0A418CA7141186F1833B7F",alt:"image"}})]),e._v(" "),a("h3",{attrs:{id:"第三种-函数模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#第三种-函数模式"}},[e._v("#")]),e._v(" 第三种 函数模式")]),e._v(" "),a("p",[e._v("函数模式适合于在传入的属性中，能够根据当前的路由来做一些处理逻辑，从而设置我们传入组件的属性值。比如我们在home页，传给他的呢，是一个函数，\n我们用es6这种形式来写")]),e._v(" "),a("p",[e._v("首先，来看一下函数的结构，route是一个参数，代表当前路由对象 ，如果你想返回一个对象，")]),e._v(" "),a("p",[e._v("写法一：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("  {\n    path: '/',\n    alias: 'home_page',\n    name: 'home',\n    component: Home,\n    props: route => {\n        return {\n            \n        } \n    }\n  },\n")])])]),a("p",[e._v("简便写法二：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("  {\n    path: '/',\n    alias: 'home_page',\n    name: 'home',\n    component: Home,\n    props: route => ({\n      \n    })\n  },\n")])])]),a("p",[e._v("我们可以在这个里面定义一个 food 属性，我们想根据路由里面的参数来显示这个food，通过 "),a("strong",[e._v("route.query.food")]),e._v("（路由的query里面的food，来传入food属性，）\n完整代码为：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v(" {\n    path: '/',\n    alias: 'home_page',\n    name: 'home',\n    component: Home,\n    props: route => ({\n      food: route.query.food\n    })\n  },\n")])])]),a("p",[e._v("在home.vue中，修改代码,设food的默认值为pear（梨）")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("  props: {\n    food: {\n      type: String,\n      default: 'pear'\n    }\n  },\n")])])]),a("p",[e._v("在默认情况下 即 http://localhost:8080/#/ 显示默认值\n"),a("img",{attrs:{src:"14E9DE3F2640481CA2453C663163D1F9",alt:"image"}})]),e._v(" "),a("p",[e._v("在 http://localhost:8080/#/?food=banana 会显示 banana\n"),a("img",{attrs:{src:"C41C36D0685C42E2B5C11AB2178DD124",alt:"image"}})]),e._v(" "),a("h2",{attrs:{id:"html5-history模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#html5-history模式"}},[e._v("#")]),e._v(" HTML5 History模式")]),e._v(" "),a("p",[e._v("我们在平时开发的时候，在创建实例的时候，只传入了一个路由列表，其实他还有一个参数mode（模式）。默认值为 hash。就是在url里面使用一个 #。 在 # 后面做路由变化，页面是不会刷新的，就是使用这种模式，来模拟一个页面跳转。")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("import Vue from 'vue'\nimport Router from 'vue-router'\nimport routes from './router'\n\nVue.use(Router)\n\nexport default new Router({\n  mode: 'hash',\n  routes: routes\n})\n")])])]),a("p",[e._v("但是在正式环境中在url中不希望看到 # 。 那么就需要用到 history 模式， HTML的history模式，他是使用 history 的一些 api 来做无刷新页面的页面的跳转。 但是如果想要用 history 模式，那么就需要后台的支持。")]),e._v(" "),a("p",[e._v("如果url是\nhttp://localhost:8080/ 在后端设置它匹配你的index.html文件，当你url发生变化的时候，就匹配不到静态资源文件了，之后就会报404错误，当没有匹配到静态资源的时候，就返回index.html页面中。")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("export default new Router({\n  mode: 'history',\n  routes: routes\n})\n")])])]),a("p",[e._v("如果使用了 history，页面访问的时候，url里面是没有#号的。")]),e._v(" "),a("p",[e._v("如果使用了 history，所有匹配不到静态资源文件的url都会指向index.html。但这种还有一个问题，当如果你匹配不到静态资源，而且你的前端路由匹配不到组件的话，这个时候就会有问题，解决方法：在路由列表中最后添加一个路由匹配规则，")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v(" {\n    // path 为 * ，代表匹配任何的路径\n    path: '*',\n    component: () => import('@/views/error_404.vue')\n  }\n")])])]),a("p",[e._v("添加一个 404页面")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("error_404.vue\n\n<template>\n  <div>404-page</div>\n</template>\n\n")])])]),a("p",[e._v("测试：  http://localhost:8080/argu/lison/3  这个url匹配不到任何组件的，就会返回404页面\n"),a("img",{attrs:{src:"1F0F018BE5904D81AEC4057E5C28E1E2",alt:"image"}})]),e._v(" "),a("blockquote",[a("p",[e._v("备注：\n这个 * 的路由匹配规则一定要定义在路由列表最后，有一个优先级原则，上面的路由匹配规则高于下面的路由匹配规则，如果你同一个路径定义了两个，那么会按照前面的路由匹配规则来，将 * 匹配规则放在最后，不会影响前面的路由匹配规则。")])]),e._v(" "),a("h2",{attrs:{id:"导航守卫"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#导航守卫"}},[e._v("#")]),e._v(" 导航守卫")]),e._v(" "),a("p",[e._v("导航守卫，能够在路由发生跳转，到导航结束这段时间内做一些逻辑处理，例如：我们在跳转到一个页面的时候需要判断用户有没有登录，没有登录的话需要跳转到登录页面， 已经登录的话，一些页面是可以跳转的。还有就是在做权限控制的时候。如果这个页面，用户没有权限浏览，那么做一些相应的处理。这些就是导航守卫要实现的功能。")]),e._v(" "),a("h3",{attrs:{id:"全局守卫"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#全局守卫"}},[e._v("#")]),e._v(" 全局守卫")]),e._v(" "),a("p",[e._v("全局守卫就是在全局设置一个守卫。")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("import Vue from 'vue'\nimport Router from 'vue-router'\nimport routes from './router'\n\nVue.use(Router)\n\n// 将创建实例单独拿出来，\nconst router = new Router({\n  routes: routes\n})\n\n// 在router实例上进行全局守卫 router实例的beforeEach，这个方法可以注册一个全局前置守卫。\n// to 和 from 都是路由对象，to表示即将跳转的路由对象，from表示当前你即将离开的路由对象\n// next是一个函数，如果你确定要跳转回用到next函数\nrouter.beforeEach((to, from, next) => {\n\n})\n\nexport default router\n\n")])])]),a("p",[e._v("比如我们在这里做一个简单的登录判断，我们将是否\n登录，保存在一个常量里。但实际中状态的判断是通过接口来获取的，")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("const HAS_LOGINED = true\n\n// 在router实例上进行全局守卫 router实例的beforeEach，这个方法可以注册一个全局前置守卫。\n// to 和 from 都是路由对象，to表示即将跳转的路由对象，from表示当前你即将离开的路由对象\n// next是一个函数，如果你确定要跳转会用到next函数\nrouter.beforeEach((to, from, next) => {\n  if (to.name !== 'login') {\n    // 如果我们即将跳转的页面不是登录页面，来做一些处理\n    if (HAS_LOGINED) {\n      // 已经登录，直接跳转\n      next()\n    } else {\n      // 还没有登录，跳转到登录页面\n      next({ name: 'login' })\n    }\n  } else {\n    // 如果跳转到的是登录页面，\n    if (HAS_LOGINED) {\n      // 已经登录，直接跳转\n      next({ name: 'home' })\n    } else {\n      // 还没有登录，跳转到登录页面\n      next()\n    }\n  }\n})\n\nexport default router\n\n")])])]),a("p",[e._v("如果已经登录即 HAS_LOGINED 为true，那么页面之间的跳转是正常的")]),e._v(" "),a("p",[a("img",{attrs:{src:"7AC235107908404D9E2F0728F455FF06",alt:"image"}})]),e._v(" "),a("p",[e._v("如果没有登录即 HAS_LOGINED 为false， 那么页面之间是不可以跳转的，页面显示登录页面")]),e._v(" "),a("p",[a("img",{attrs:{src:"B443ED17809344FBBE829BD70068A107",alt:"image"}})]),e._v(" "),a("p",[e._v("这个是在跳转之前的逻辑（router.beforeEach ）与之相对应的是后置钩子（router.afterEach）")]),e._v(" "),a("p",[e._v("比如在所有的页面跳转之后都可以加一个router.afterEach()。同样它有两个参数，to 和 from 但是他没有next 因为他不能阻止对你跳转页面进行操作，只能进行处理一些简单的逻辑。比如我们在跳转页面之前有一个loading动画，这可以在router.beforeEach设置开始，在router.afterEach设置结束。")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("router.afterEach((to, from) => {\n    // logining = false\n})\n")])])]),a("p",[e._v("router.beforeResolve()它也是一个全局守卫，区别在于它 是在导航被确认之前，在所有组件内守卫和异步路由组件被解析之后，被调用。导航被确认之前指的是：确认的状态是你所有的导航钩子都结束，那么这个导航称之为被确认了，参数跟之前的beforeEach一样，(to， from， next)")]),e._v(" "),a("p",[e._v("路由独享的守卫，路由独享守卫是在路由列表里面进行控制，比如说，给home配置一个专供于home页的守卫，beforeEnter")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("{\n    path: '/',\n    alias: 'home_page',\n    name: 'home',\n    component: Home,\n    props: route => ({\n      food: route.query.food\n    }),\n    beforeEnter: (to, from, next) => {\n      // 在里面我们可以做一些对逻辑的处理，\n      if (from.name === 'login') {\n        alert('这是从登陆页来的')\n      } else {\n        alert('这不是从登录页来的')\n      }\n      // 在所有逻辑处理完之后，一定要调用next函数， 否则页面是不会跳转的\n      next()\n    }\n  },\n")])])]),a("h3",{attrs:{id:"组件内的守卫"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#组件内的守卫"}},[e._v("#")]),e._v(" 组件内的守卫")]),e._v(" "),a("p",[e._v("每一个组件里面都可以有3个钩子，有三个钩子，普通的有两个钩子")]),e._v(" "),a("h4",{attrs:{id:"beforerouteenter"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#beforerouteenter"}},[e._v("#")]),e._v(" beforeRouteEnter")]),e._v(" "),a("p",[e._v("beforeRouteEnter他由三个参数，这个是在渲染该组件确认路由之前调用。")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("to：当前路由对象\nform： 上一个路由对象\nbeforeRouteEnter (to, from, next) {\n    console.log(to.name)\n    console.log(from.name)\n    next()\n  },\n")])])]),a("p",[e._v("注意：这个地方是在路由进来页面的时候调用，这个时候页面还没有渲染，如果在里面使用this的时候，获取不到当前组件的实例的。如果你想在这个地方使用this呢，要像下面这样用。")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("beforeRouteEnter (to, from, next) {\n    // vm表示的是这个组件的this实例\n    next(vm => {\n        console.log(vm)\n    })\n}\n")])])]),a("h4",{attrs:{id:"beforerouteleave"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#beforerouteleave"}},[e._v("#")]),e._v(" beforeRouteLeave")]),e._v(" "),a("p",[e._v("在一个页面，有一个编辑，你的编辑未保存，可以使用该钩子方法\nbeforeRouteLeave这个是在页面即将离开的时候调用这个方法。这个里面可以使用this")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("beforeRouteLeave (to, from, next) {\n    const leave = confirm('您确定要离开吗？')\n    if (leave) {\n        next()\n    } else {\n        // next里面加上false，表示不能离开此页面\n        next(false)\n    }\n}\n")])])]),a("h4",{attrs:{id:"beforerouteupdate"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#beforerouteupdate"}},[e._v("#")]),e._v(" beforeRouteUpdate")]),e._v(" "),a("p",[e._v("beforeRouteUpdate他是在你路由发生变化，组件被复用的时候才会调用。")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("beforeRouteUpdate (to, from, next) {\n    console.log(to.name, from.name)\n    next() \n}\n")])])]),a("p",[e._v("当调用这个钩子的时候，这个组件已经被渲染了，使用this的时候是可以的。")]),e._v(" "),a("h4",{attrs:{id:"完整的导航解析流程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#完整的导航解析流程"}},[e._v("#")]),e._v(" 完整的导航解析流程")]),e._v(" "),a("blockquote",[a("ol",[a("li",[e._v("到导航被触发")]),e._v(" "),a("li",[e._v("在失活的组件（即将离开的页面组件）里调用离开守卫 beforeRouteLeave")]),e._v(" "),a("li",[e._v("调用全局的前置守卫 beforeEach")]),e._v(" "),a("li",[e._v("在重用的组件里调用 beforeRouteUpdate")]),e._v(" "),a("li",[e._v("调用路由独享的守卫 beforeEnter")]),e._v(" "),a("li",[e._v("解析异步路由组件")]),e._v(" "),a("li",[e._v("在被激活的组件里（即将进入的页面组件）里调用 beforeRouteEnter")]),e._v(" "),a("li",[e._v("调用全局的解析守卫 beforeResolve")]),e._v(" "),a("li",[e._v("导航被确认了")]),e._v(" "),a("li",[e._v("调用全局的后置守卫 afterEach")]),e._v(" "),a("li",[e._v("触发DOM更新")]),e._v(" "),a("li",[e._v("用创建好的实例调用 beforeRouteEnter守卫里传给next的回调函数")])])]),e._v(" "),a("hr"),e._v(" "),a("br"),e._v(" "),a("h2",{attrs:{id:"路由元信息"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#路由元信息"}},[e._v("#")]),e._v(" 路由元信息")]),e._v(" "),a("p",[e._v("在 router.js里面，每一个路由对象可以配置一个mate字段，他里面可以存放一些，我们要定义的信息\n比如定义about页面的title的值")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('// 在about里面添加了meta字段\n{\n    path: "/about",\n    name: "about",\n    // route level code-splitting\n    // this generates a separate chunk (about.[hash].js) for this route\n    // which is lazy-loaded when the route is visited.\n    component: () =>\n      import(/* webpackChunkName: "about" */ "@/views/About.vue"),\n    props: {\n      food: "banana"\n    },\n    meta: {\n      title: "关于"\n    }\n  },\n')])])]),a("p",[e._v("跟业务相关的工具方法定义在这个util.js里面")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("在 util.js 里面定义一个方法 setTitle\n\nexport const setTitle = (title) => {\n  window.document.title = title || 'admin'\n}\n\n")])])]),a("p",[e._v("在router的index.js里面引入setTitle，并且在 beforeEach 里面进行判断")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("router.beforeEach((to, from, next) => {\n\n  // 如果你这个to.meta是真的话， 就会执行后面的这个函数\n  to.meta && setTitle(to.meta.title)\n  \n  \n  if (to.name !== 'login') {\n    // 如果我们即将跳转的页面不是登录页面，来做一些处理\n    if (HAS_LOGINED) {\n      // 已经登录，直接跳转\n      next()\n    } else {\n      // 还没有登录，跳转到登录页面\n      next({ name: 'login' })\n    }\n  } else {\n    // 如果跳转到的是登录页面，\n    if (HAS_LOGINED) {\n      // 已经登录，直接跳转\n      next({ name: 'home' })\n    } else {\n      // 还没有登录，跳转到登录页面\n      next()\n    }\n  }\n})\n")])])]),a("h2",{attrs:{id:"路由的切换动态效果"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#路由的切换动态效果"}},[e._v("#")]),e._v(" 路由的切换动态效果")]),e._v(" "),a("p",[e._v("为一个页面设置一个过渡效果，需要用到 transition 组件，\n在App.vue中，我们可以看到有三个 router-view。这里就需要用到transition-group组件。\n在transition-group组件中，你需要对每一个router-view设置一个 key 值")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('<transition-group name="router">\n    <router-view key="default"/>\n    <router-view key="email" name="email" />\n    <router-view key="tel" name="tel" />\n</transition-group>\n\n')])])]),a("p",[e._v("在css里面设置效果")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('<style lang="less">\n// 先来设置页面进入的效果\n.router-enter{\n  // 代表页面，还没有显示，加载一开始的状态\n  opacity: 0;\n}\n.router-enter-active{\n  transition: opacity 1s ease;\n}\n.router-enter-to{\n  // 页面完全显示的效果\n  opacity: 1;\n}\n// 页面注销离开的效果\n.router-leave{\n  // 代表页面，还没有显示，加载一开始的状态\n  opacity: 1;\n}\n.router-leave-active{\n  transition: opacity 1s ease;\n}\n.router-leave-to{\n  // 页面完全显示的效果\n  opacity: 0;\n}\n</style>\n')])])]),a("p",[e._v("如果将name 设置为一个帮定的值，就可以给某个页面设置特定的动态效果")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('<template>\n  <div id="app">\n    <div id="nav">\n      <router-link :to="{name: \'home\'}">Home</router-link> |\n      <router-link :to="{name: \'about\'}">About</router-link>\n    </div>\n    <transition-group :name="routerTransiton">\n      <router-view key="default"/>\n      <router-view key="email" name="email" />\n      <router-view key="tel" name="tel" />\n    </transition-group>\n  </div>\n</template>\n<script>\nexport default {\n  data () {\n    return {\n      routerTransiton: \'\'\n    }\n  },\n  watch: {\n    \'$route\' (to) {\n      // 首先我们先来判断to.query有没有值，有值的话再判断to.query.transitionName，有没有值，有值的话，将值赋值给routerTransiton\n      to.query && to.query.transitionName && (this.routerTransiton = to.query.transitionName)\n    }\n  }\n}\n<\/script>\n\n\n<style lang="less">\n// 先来设置页面进入的效果\n.router-enter{\n  // 代表页面，还没有显示，加载一开始的状态\n  opacity: 0;\n}\n.router-enter-active{\n  transition: opacity 1s ease;\n}\n.router-enter-to{\n  // 页面完全显示的效果\n  opacity: 1;\n}\n// 页面注销离开的效果\n.router-leave{\n  // 代表页面，还没有显示，加载一开始的状态\n  opacity: 1;\n}\n.router-leave-active{\n  transition: opacity 1s ease;\n}\n.router-leave-to{\n  // 页面完全显示的效果\n  opacity: 0;\n}\n</style>\n\n')])])]),a("p",[e._v("当访问这个页面的时候，动态效果的值是 router，那么这个页面就会有动态效果 http://localhost:8080/#/about?transitionName=router")])])}),[],!1,null,null,null);t.default=r.exports}}]);