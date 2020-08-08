# 路由详解（一）——基础

> **课程主要内容**<br>
1、 router-link 和 router-view组件 <br>
2、 路由配置 <br> &emsp;&emsp;a. 动态路由<br> &emsp;&emsp;b. 嵌套路由<br>  &emsp;&emsp;c. 命名路由 <br> &emsp;&emsp;d. 命名视图 <br>
3、 JS操作路由 <br>
4、 重定向和别名 <br>

## router-link和router-view组件

### router文件夹 -> index.js解析
index.js里面创建的是路由实例，在router.js里面，放置的是路由列表

```
import Vue from 'vue'
import Router from 'vue-router'
<!--引进路由列表-->
import routes from './router'
<!--Router插件要想引进来的话需要用Vue.use方法加载进来-->
Vue.use(Router)

export default new Router({
  routes: routes
})

```

### App.vue里面示例分析
在App.vue示例里面，有两个router-link组件，一个router-view组件。
router-link这个组件，它其实是封装了一个 **a** 标签，也就是链接标签，里面有一个重要属性 **to** 它指定的值是一个路径，在 router-link 中间你可以包含一些内容。

router-view组件是一个视图渲染组件，通过 router-link 跳转到的页面加载的组件都会在 router-view 这个地方渲染

```
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

```
对于router-link 定义的路径，对应的要渲染的组件在 **router文件夹** 的 **router.js** 路由列表里面定义

### router文件夹 -> router.js解析
首先，路由列表是一个数组，里面包含着路由对象，一个基本的路由对象必须包含两个属性，一个是 **path** 一个是 **component**。 <br> **path** 指代的是路径，也就是你在url里面输入的路径。<br> **component** 指代的是组件，也就是你 path 里面的路径要对应的那个组件。

第一个路由对象：我们引入了一个 **Home** 组件 @ 符号指代的是 src 路径。在vue.config.js里面配置的。
第二个路由对象：path路径是 '/about' 。component 里面跟第一个路由对象写法不一样，我们看注释可以看出，这样写法可以起到一个懒加载（lazy-loaded）的作用，就是说当我们访问到这个页面的时候，他才会加载这个页面组件，这样起到一个优化的作用。

```
import Home from '@/views/Home.vue'
export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  }
]
```

## 路由配置-动态路由
首先我们来创建一个路由对象， (:name) 这是一个动态路由参数,然后创建一个argu.vue页面组件，在argu.vue页面显示一下 **$route.params.name**


```
router.js:
{
    path: '/argu/:name',
    component: () => import('@/views/argu.vue')
}
```

```
argu.vue:
<template>
  <div>{{ $route.params.name }}</div>
</template>
<script>
export default {
  //
}
</script>
```
当你在浏览器中输入 http://localhost:8080/#/argu/lision 时，页面会显示 argu 后面的值，当改变 lision 的时候，页面上也会随之改变。

![image](195BBB0659264445AAEB74349A8CD59E)

**$route**：代表的是当前加载页面的路由对象，它里面包含一个 **params** 参数，**params** 也是一个对象，里面包含一个叫 **name** 的值，name的值就是动态路由上 “:name”, 无论name是什么，匹配到的都是 ** path: '/argu/:name'这个对应的路由对象** 加载的都是 **argu.vue** 文件。这样就能起到一个组件的复用，只需要传不同的参数，呈现同一个页面可以处理不同的逻辑。

## 路由配置-嵌套路由
在实际开发过程中我们经常用到多层嵌套的组件，那么这些嵌套的组件可以通过嵌套路由进行渲染。

router.js:
```
// 嵌套路由
  {
    path: '/parent',
    component: () => import('@/views/parent.vue'),
    // children属性是一个数组，里面包含嵌套在parent组件里面的子集页面
    children: [
      {
        // 子集的path里面是不需要斜线的,只有父级的path才需要写 加 "/"。作为嵌套路由，他会自动补全子集里面的 "/" 所以path的值直接就是 'child'
        path: 'child',
        component: () => import('@/views/child.vue')
      }
    ]
  }
```

parent.vue
```
<template>
  <div>
    I am parent
    <!-- 用来渲染路由视图 -->
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  //
}
</script>
```

child.vue
```
<template>
  <div>
    I am child
  </div>
</template>
<script>
export default {
  //
}
</script>

```

代码运行显示效果图：当路径为 http://localhost:8080/#/parent/child
![image](A31545F6B3F64310B9C1C3D3D8B554D7)

## 路由配置-命名路由
在路由对象中，还有一个属性，那就是 name 属性。当你给路由对象设置一个name属性，也就是给这个路由对象命名。在 **App.vue** 中，有两个 **router-link**， 通过 **to** 这个属性，给他设置一个路径，点击这个地方，就会跳转到对应的路径，我们使用命名路由的时候，将路由对象的 **name** 值给 **router-link** 里面的 **to** 属性的时候。我们就可以通过 **name** 值来进行跳转。

router.js

```
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
```

App.vue
```
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>
```

首先要给 **to** 传入一个对象，如果要是对象的话，那么 router-link 里面的 to 属性就不能像以前那样写了,修改如下：

```
<router-link v-bind:to="{name: 'about'}">About</router-link>
或
<router-link :to="{name: 'about'}">About</router-link>
```

运行效果入下：

http://localhost:8080/#/

![image](29BE7C5BB2744CF8B2F4CDF0A59FFC2B)

点击 about 按钮之后

http://localhost:8080/#/about
![image](0CF23429107E4559AF90F2A60983F168)

在上文App.vue中，router-link 是双标签， router-view 是单标签。那是因为 router-link 里面有东西，我们需要在它中间放一些东西。如果组件中间不需要放东西的时候，我们也可以将 router-link 写成单标签。

## 路由配置-命名视图
在 App.vue 中只有一个 router-view 这么一个标签，那么如果我们想在同一个页面上显示多个视图，而且让每个视图显示在指定的位置。

在App.vue中加入两个 router-view
```
<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{name: 'home'}">Home</router-link> |
      <router-link v-bind:to="{name: 'about'}">About</router-link>
    </div>
    <router-view/>
    <router-view name="email" />
    <router-view name="tel" />
  </div>
</template>
```

==使用的是特别要注意的是，name为router列表里面的name的值，name如果使用path的话，就会出错==


router.js
```
 // 命名视图
  {
    path: '/named_view',
    // 这个是 components 之前的都是 component 没有 s。 加上 s 之后说明我们要加载多个组件
    components: {
      // 如果在之前的 app.vue 中的 router-view 没有命名的话，那么就加载 default 对应的组件的
      default: () => import('@/views/child.vue'),
      email: () => import('@/views/email.vue'),
      tel: () => import('@/views/tel.vue')
    }
  }
```

email.vue
```
<template>
  <div>
    email: 991538766@qq.com
  </div>
</template>
<script>
export default {
  //
}
</script>
```
tel.vue
```
<template>
  <div>
    tel: 16855555555
  </div>
</template>
<script>
export default {
  //
}
</script>
```

运行效果图如下：
![image](44ECE0E999B64BC2AB0A043BC0CF8848)

![image](936CC00B608F499091283B501DB1BE3A)

## 重定向
重定向能够帮我们把当前要访问的 url 定向到 另一个 url。比如：
```
// 重定向
  {
    // 当我们要访问 main 这个路径的时候，他会重定向到 "/" 也就是 home 页
    path: '/main1',
    redirect: '/'
  },
  {
    // 当我们要访问 main 这个路径的时候，他会重定向到 name 为 home 的页面
    path: '/main2',
    redirect: {
      name: 'home'
    }
  },
  // 还可以向其中插入一个方法函数
  {
    // 当我们要访问 main 这个路径的时候，他会重定向到 name 为 home 的页面
    path: '/main3',
    redirect: to => {
      console.log(to)
      return {
        name: 'home'
      }
      // 或者我们还可以返回一个路径 "/" 最后的显示效果都是一样的
      return '/'
    }
  }
  // 如果使用 ES6 里面的简写，那么也是可以的
  {
    // 当我们要访问 main 这个路径的时候，他会重定向到 name 为 home 的页面
    path: '/main3',
    redirect: to => "/"
```
http://localhost:8080/#/main3

![image](BD10F60DF88B4275A83CD213D972C15B)


## 别名
当我们访问一个路径的时候，可以给他定义一个别名，生成另外一个路径，访问路径的时候与访问别名的时候效果相同。
router.js 我们给 home路由对象定义一个别名
```
  {
    path: '/',
    alias: '/home_page',
    name: 'home',
    component: Home
  },
```
当我们访问首页的时候

http://localhost:8080/#/ 与 http://localhost:8080/#/home_page 显示相同。

## JS操作路由
编程式的导航，通过js控制页面的跳转，返回

### 返回上一页
我们使用编程时导航的时候，需要用到一个路由实例。 路由实例就是 this.$router<br>
路由实例有很多的方法，我们现在要返回上一页。我们可以用 this.$router.go(-1)。 返回后面的一页<br>
如果 this.$router.go(1) 那么就是前进到下一页。<br>
除了可以用这种方式可以后退的，我们还可以用 this.$router.back()

### 跳转到指定页面 push
跳转到指定页面，要使用路由实例中的 **push** 方法

### 替换到指定页面 replace
push和replace有什么区别呢？当我们使用push的时候，会在我们的浏览历史里加入一个浏览记录，当我们回退的时候就能回退到之前的页面；如果用replace呢？他就会把当前的浏览历史，替换成parent这个页面，如果这时候点击回退的时候，会回退到 parent 页面，不会回退到之前的页面。


当我在push的时候添加了一些其他的信息，当我们点击跳转的时候，顶部url变成了 http://localhost:8080/#/parent?name=Alfred 多了一个参数

![image](C72D3B2BA8EF471ABCEDE92C27C24DAA)


我们的argu.vue中有  {{ $route.params.name }}  当我们将跳转到parent页面转变成跳转到 argu页面之后

```
<template>
  <div>{{ $route.params.name }}</div>
</template>
```
```
this.$router.push({
  name: 'argu',
  // 同时我们也可以在对象里面添加一些信息，比如：
  params: {
    name: "Alfred"
  }
})
```

顶部的地址栏变成了 http://localhost:8080/#/argu/Alfred 我们可以看到，匹配到了该页面，而且还带了一个参数。

![image](2FEC0684AC77495F9F2B660794DE6F9B)

如果我们使用 ES6 的模板语法：
```
const name = 'Alfred'
this.$router.push({
  path: `/argu/${name}`
})
```
这样效果也是可以的，我们需要注意一下 path 的写法。path后面定义的params是无效的。

Home.vue全部源码

```
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/img/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="handleClick('back')">返回上一页</button>
    <button @click="handleClick('push')">跳转到parent</button>
    <button @click="handleClick('replace')">替换到parent</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  methods: {
    handleClick (type) {
      // 我们使用编程时导航的时候，需要用到一个路由实例。 路由实例就是 this.$router
      if (type === 'back') {
        // 路由实例有很多的方法，我们现在要返回上一页。我们可以用 this.$router.go(-1)。 返回后面的一页
        // 如果 this.$router.go(1) 那么就是前进到下一页。
        // this.$router.go(-1)
        // 除了可以用这种方式可以后退的，我们还可以用 this.$router.back()
        this.$router.back()
      } else if (type === 'push') {
        // 通过路径的方式
        // this.$router.push('/parent')
        // 命名路由的方式
        /*
        this.$router.push({
          name: 'parent',
          // 同时我们也可以在对象里面添加一些信息，比如：
          query: {
            name: "Alfred"
          }
        })*/
        /*
        // 跳转到 argu 页面
        this.$router.push({
          name: 'argu',
          // 同时我们也可以在对象里面添加一些信息，比如：
          params: {
            name: "Alfred"
          }
        })*/
        // 使用 ES6 的模板语法
        const name = 'Alfred'
        this.$router.push({
          path: `/argu/${name}`
        })
      } else if (type === 'replace') {
        this.$router.replace({
          name: 'parent'
        })
      }
    }
  }
}
</script>
```



