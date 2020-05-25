# 路由详解（二）—— 进阶

> **课程主要内容**<br>
1、 路由组件传参 <br>
2、 HTML5 History模式 <br>
3、 导航守卫 <br>
4、 路由元信息 <br>
5、 过渡效果 <br>

## 路由组件传参
如果在一个页面中，需要根据路由获取参数，来在页面上进行一些逻辑处理。首先可以在页面组件中使用router实例来获取相关参数，但是这样有一个缺点，我们的页面组件与路由进行了高度耦合；为了解耦，使我们的组件能够更大程度去复用，我们就会用到路由组件传参。

首先我们来看之前的路由配置，路由组件传参有三种形势。

### 第一种是 boolean模式

它适合在动态路匹配中，有动态路由参数的，路由配置中。比如我们之前的argu页面，他有动态参数 name。 在argu.vue中，之前页面上要获取route实例上的params里面的name的值来在页面上进行展示。那么我们为了把他们解耦，把name作为一个属性来传入。

属性怎么传入呢? 首先定义一个props,里面有name name是一个参数，我们可能接收他的type类型是**String**类型或者**Number**类型
```
props: {
    name: {
      type:[String, Number],
    }
}
```

如果这个name我们就想让他表示名字的意思,就直接要一个String就可以了

```
props: {
    name: {
      type:String,
    }
}
```
我们可以给他一个默认值，如果没有传进来值的话，我们可以直接叫他Lsion
```
  props: {
    name: {
      type:String,
      // 要是没由传入那么就会显示默认的
      default: 'lison'
    }
  }
```
修改完代码之后，我们上面template这一块也需要修改

```
<template>
  <div>{{ $route.params.name }}</div>
</template>

```
修改为
```
<template>
  <div>{{ name }}</div>
</template>

```
当我们在输入 http://localhost:8080/#/argu/ls 会显示如下效果
![image](43BBDA0AE2C34A4B905607DE998990B1)
通过效果图我们会发现，显示的不是我们传入的值，而是默认值。

如果想传入这个值呢，我们就需要在router.js中稍作配置，这里需要用到 **Boolean类型** 将***props设置为true*** 里面的参数会使用route的props 作为组件的属性，相当于我们 props 这个对象里面有一个 name 他就会将我们这个 name 传入组件中，把值传入 argu.vue 的 props 里面的 name 中。
代码为：

```
  {
    path: '/argu/:name',
    component: () => import('@/views/argu.vue'),
    props: true
  },
```


我们刷新一下页面，地址为： http://localhost:8080/#/argu/ls
![image](6A8C22DCDF7C43A18B71AA96901D8200)
里面的 name 也发生了改变

### 第二种 对象模式

第二种就是普通的页面，不是动态路由匹配的页面，比如说我们的 about，如果想给他传一个参数，首先我们在About.vue 中来定义一个属性food，定义一个about的类型，type是 string类型 然后再定义一个默认值apple，如果没有的话就会显示apple

```
<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
export default {
  props: {
    food: {
      type: String,
      default: 'apple'
    }
  }
}
</script>
```
现在已经有了food属性，怎么传入呢，在route.js中配置
假如我们想要传入一个banana，那么代码修改为

```
 {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
    props: {
      food: 'banana'
    }
  },
```
当切换到about页面的时候 http://localhost:8080/#/about
![image](5605D48F0A7342599D965CF58CD9AB20)

如果我们没有传值
```
 {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
    props: {
      // food: 'banana'
    }
  },
```
当切换到about页面的时候 http://localhost:8080/#/about 显示的就是apple了
![image](F287DA5F5B0A418CA7141186F1833B7F)

### 第三种 函数模式
函数模式适合于在传入的属性中，能够根据当前的路由来做一些处理逻辑，从而设置我们传入组件的属性值。比如我们在home页，传给他的呢，是一个函数，
我们用es6这种形式来写

首先，来看一下函数的结构，route是一个参数，代表当前路由对象 ，如果你想返回一个对象，

写法一：
```
  {
    path: '/',
    alias: 'home_page',
    name: 'home',
    component: Home,
    props: route => {
        return {
            
        } 
    }
  },
```
简便写法二：
```
  {
    path: '/',
    alias: 'home_page',
    name: 'home',
    component: Home,
    props: route => ({
      
    })
  },
```
我们可以在这个里面定义一个 food 属性，我们想根据路由里面的参数来显示这个food，通过 **route.query.food**（路由的query里面的food，来传入food属性，）
完整代码为：

```
 {
    path: '/',
    alias: 'home_page',
    name: 'home',
    component: Home,
    props: route => ({
      food: route.query.food
    })
  },
```


在home.vue中，修改代码,设food的默认值为pear（梨）
```
  props: {
    food: {
      type: String,
      default: 'pear'
    }
  },
```
在默认情况下 即 http://localhost:8080/#/ 显示默认值
![image](14E9DE3F2640481CA2453C663163D1F9)

在 http://localhost:8080/#/?food=banana 会显示 banana
![image](C41C36D0685C42E2B5C11AB2178DD124)

##  HTML5 History模式 
我们在平时开发的时候，在创建实例的时候，只传入了一个路由列表，其实他还有一个参数mode（模式）。默认值为 hash。就是在url里面使用一个 #。 在 # 后面做路由变化，页面是不会刷新的，就是使用这种模式，来模拟一个页面跳转。


```
import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: routes
})
```
但是在正式环境中在url中不希望看到 # 。 那么就需要用到 history 模式， HTML的history模式，他是使用 history 的一些 api 来做无刷新页面的页面的跳转。 但是如果想要用 history 模式，那么就需要后台的支持。

如果url是
http://localhost:8080/ 在后端设置它匹配你的index.html文件，当你url发生变化的时候，就匹配不到静态资源文件了，之后就会报404错误，当没有匹配到静态资源的时候，就返回index.html页面中。


```
export default new Router({
  mode: 'history',
  routes: routes
})
```

如果使用了 history，页面访问的时候，url里面是没有#号的。

如果使用了 history，所有匹配不到静态资源文件的url都会指向index.html。但这种还有一个问题，当如果你匹配不到静态资源，而且你的前端路由匹配不到组件的话，这个时候就会有问题，解决方法：在路由列表中最后添加一个路由匹配规则，

```
 {
    // path 为 * ，代表匹配任何的路径
    path: '*',
    component: () => import('@/views/error_404.vue')
  }
```

添加一个 404页面


```
error_404.vue

<template>
  <div>404-page</div>
</template>

```

测试：  http://localhost:8080/argu/lison/3  这个url匹配不到任何组件的，就会返回404页面
![image](1F0F018BE5904D81AEC4057E5C28E1E2)

>备注：
这个 * 的路由匹配规则一定要定义在路由列表最后，有一个优先级原则，上面的路由匹配规则高于下面的路由匹配规则，如果你同一个路径定义了两个，那么会按照前面的路由匹配规则来，将 * 匹配规则放在最后，不会影响前面的路由匹配规则。

## 导航守卫
导航守卫，能够在路由发生跳转，到导航结束这段时间内做一些逻辑处理，例如：我们在跳转到一个页面的时候需要判断用户有没有登录，没有登录的话需要跳转到登录页面， 已经登录的话，一些页面是可以跳转的。还有就是在做权限控制的时候。如果这个页面，用户没有权限浏览，那么做一些相应的处理。这些就是导航守卫要实现的功能。

### 全局守卫
全局守卫就是在全局设置一个守卫。

```
import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'

Vue.use(Router)

// 将创建实例单独拿出来，
const router = new Router({
  routes: routes
})

// 在router实例上进行全局守卫 router实例的beforeEach，这个方法可以注册一个全局前置守卫。
// to 和 from 都是路由对象，to表示即将跳转的路由对象，from表示当前你即将离开的路由对象
// next是一个函数，如果你确定要跳转回用到next函数
router.beforeEach((to, from, next) => {

})

export default router

```
比如我们在这里做一个简单的登录判断，我们将是否
登录，保存在一个常量里。但实际中状态的判断是通过接口来获取的，



```
const HAS_LOGINED = true

// 在router实例上进行全局守卫 router实例的beforeEach，这个方法可以注册一个全局前置守卫。
// to 和 from 都是路由对象，to表示即将跳转的路由对象，from表示当前你即将离开的路由对象
// next是一个函数，如果你确定要跳转会用到next函数
router.beforeEach((to, from, next) => {
  if (to.name !== 'login') {
    // 如果我们即将跳转的页面不是登录页面，来做一些处理
    if (HAS_LOGINED) {
      // 已经登录，直接跳转
      next()
    } else {
      // 还没有登录，跳转到登录页面
      next({ name: 'login' })
    }
  } else {
    // 如果跳转到的是登录页面，
    if (HAS_LOGINED) {
      // 已经登录，直接跳转
      next({ name: 'home' })
    } else {
      // 还没有登录，跳转到登录页面
      next()
    }
  }
})

export default router

```
如果已经登录即 HAS_LOGINED 为true，那么页面之间的跳转是正常的

![image](7AC235107908404D9E2F0728F455FF06)

如果没有登录即 HAS_LOGINED 为false， 那么页面之间是不可以跳转的，页面显示登录页面

![image](B443ED17809344FBBE829BD70068A107)

这个是在跳转之前的逻辑（router.beforeEach ）与之相对应的是后置钩子（router.afterEach）

比如在所有的页面跳转之后都可以加一个router.afterEach()。同样它有两个参数，to 和 from 但是他没有next 因为他不能阻止对你跳转页面进行操作，只能进行处理一些简单的逻辑。比如我们在跳转页面之前有一个loading动画，这可以在router.beforeEach设置开始，在router.afterEach设置结束。


```
router.afterEach((to, from) => {
    // logining = false
})
```


router.beforeResolve()它也是一个全局守卫，区别在于它 是在导航被确认之前，在所有组件内守卫和异步路由组件被解析之后，被调用。导航被确认之前指的是：确认的状态是你所有的导航钩子都结束，那么这个导航称之为被确认了，参数跟之前的beforeEach一样，(to， from， next)

路由独享的守卫，路由独享守卫是在路由列表里面进行控制，比如说，给home配置一个专供于home页的守卫，beforeEnter

```
{
    path: '/',
    alias: 'home_page',
    name: 'home',
    component: Home,
    props: route => ({
      food: route.query.food
    }),
    beforeEnter: (to, from, next) => {
      // 在里面我们可以做一些对逻辑的处理，
      if (from.name === 'login') {
        alert('这是从登陆页来的')
      } else {
        alert('这不是从登录页来的')
      }
      // 在所有逻辑处理完之后，一定要调用next函数， 否则页面是不会跳转的
      next()
    }
  },
```


### 组件内的守卫
每一个组件里面都可以有3个钩子，有三个钩子，普通的有两个钩子

####  beforeRouteEnter

beforeRouteEnter他由三个参数，这个是在渲染该组件确认路由之前调用。

```
to：当前路由对象
form： 上一个路由对象
beforeRouteEnter (to, from, next) {
    console.log(to.name)
    console.log(from.name)
    next()
  },
```

注意：这个地方是在路由进来页面的时候调用，这个时候页面还没有渲染，如果在里面使用this的时候，获取不到当前组件的实例的。如果你想在这个地方使用this呢，要像下面这样用。

```
beforeRouteEnter (to, from, next) {
    // vm表示的是这个组件的this实例
    next(vm => {
        console.log(vm)
    })
}
```

####  beforeRouteLeave
在一个页面，有一个编辑，你的编辑未保存，可以使用该钩子方法
beforeRouteLeave这个是在页面即将离开的时候调用这个方法。这个里面可以使用this

```
beforeRouteLeave (to, from, next) {
    const leave = confirm('您确定要离开吗？')
    if (leave) {
        next()
    } else {
        // next里面加上false，表示不能离开此页面
        next(false)
    }
}
```
####  beforeRouteUpdate

beforeRouteUpdate他是在你路由发生变化，组件被复用的时候才会调用。

```
beforeRouteUpdate (to, from, next) {
    console.log(to.name, from.name)
    next() 
}
```
当调用这个钩子的时候，这个组件已经被渲染了，使用this的时候是可以的。


#### 完整的导航解析流程

>1. 到导航被触发
>2. 在失活的组件（即将离开的页面组件）里调用离开守卫 beforeRouteLeave
>3. 调用全局的前置守卫 beforeEach
>4. 在重用的组件里调用 beforeRouteUpdate
>5. 调用路由独享的守卫 beforeEnter
>6. 解析异步路由组件
>7. 在被激活的组件里（即将进入的页面组件）里调用 beforeRouteEnter
>8. 调用全局的解析守卫 beforeResolve
>9. 导航被确认了
>10. 调用全局的后置守卫 afterEach
>11. 触发DOM更新
>12. 用创建好的实例调用 beforeRouteEnter守卫里传给next的回调函数

---
<br>

## 路由元信息
在 router.js里面，每一个路由对象可以配置一个mate字段，他里面可以存放一些，我们要定义的信息
比如定义about页面的title的值

```
// 在about里面添加了meta字段
{
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/About.vue"),
    props: {
      food: "banana"
    },
    meta: {
      title: "关于"
    }
  },
```

跟业务相关的工具方法定义在这个util.js里面
```
在 util.js 里面定义一个方法 setTitle

export const setTitle = (title) => {
  window.document.title = title || 'admin'
}

```
在router的index.js里面引入setTitle，并且在 beforeEach 里面进行判断

```
router.beforeEach((to, from, next) => {

  // 如果你这个to.meta是真的话， 就会执行后面的这个函数
  to.meta && setTitle(to.meta.title)
  
  
  if (to.name !== 'login') {
    // 如果我们即将跳转的页面不是登录页面，来做一些处理
    if (HAS_LOGINED) {
      // 已经登录，直接跳转
      next()
    } else {
      // 还没有登录，跳转到登录页面
      next({ name: 'login' })
    }
  } else {
    // 如果跳转到的是登录页面，
    if (HAS_LOGINED) {
      // 已经登录，直接跳转
      next({ name: 'home' })
    } else {
      // 还没有登录，跳转到登录页面
      next()
    }
  }
})
```

## 路由的切换动态效果
为一个页面设置一个过渡效果，需要用到 transition 组件，
在App.vue中，我们可以看到有三个 router-view。这里就需要用到transition-group组件。
在transition-group组件中，你需要对每一个router-view设置一个 key 值

```
<transition-group name="router">
    <router-view key="default"/>
    <router-view key="email" name="email" />
    <router-view key="tel" name="tel" />
</transition-group>

```
在css里面设置效果
```
<style lang="less">
// 先来设置页面进入的效果
.router-enter{
  // 代表页面，还没有显示，加载一开始的状态
  opacity: 0;
}
.router-enter-active{
  transition: opacity 1s ease;
}
.router-enter-to{
  // 页面完全显示的效果
  opacity: 1;
}
// 页面注销离开的效果
.router-leave{
  // 代表页面，还没有显示，加载一开始的状态
  opacity: 1;
}
.router-leave-active{
  transition: opacity 1s ease;
}
.router-leave-to{
  // 页面完全显示的效果
  opacity: 0;
}
</style>
```

如果将name 设置为一个帮定的值，就可以给某个页面设置特定的动态效果


```
<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{name: 'home'}">Home</router-link> |
      <router-link :to="{name: 'about'}">About</router-link>
    </div>
    <transition-group :name="routerTransiton">
      <router-view key="default"/>
      <router-view key="email" name="email" />
      <router-view key="tel" name="tel" />
    </transition-group>
  </div>
</template>
<script>
export default {
  data () {
    return {
      routerTransiton: ''
    }
  },
  watch: {
    '$route' (to) {
      // 首先我们先来判断to.query有没有值，有值的话再判断to.query.transitionName，有没有值，有值的话，将值赋值给routerTransiton
      to.query && to.query.transitionName && (this.routerTransiton = to.query.transitionName)
    }
  }
}
</script>


<style lang="less">
// 先来设置页面进入的效果
.router-enter{
  // 代表页面，还没有显示，加载一开始的状态
  opacity: 0;
}
.router-enter-active{
  transition: opacity 1s ease;
}
.router-enter-to{
  // 页面完全显示的效果
  opacity: 1;
}
// 页面注销离开的效果
.router-leave{
  // 代表页面，还没有显示，加载一开始的状态
  opacity: 1;
}
.router-leave-active{
  transition: opacity 1s ease;
}
.router-leave-to{
  // 页面完全显示的效果
  opacity: 0;
}
</style>

```

当访问这个页面的时候，动态效果的值是 router，那么这个页面就会有动态效果 http://localhost:8080/#/about?transitionName=router 






