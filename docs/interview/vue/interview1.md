# vue面试题汇总篇

### 1、讲一讲MVVM

MVVM是`Model-View-ViewModel` 缩写，也就是把`MVC` 中的`Controlller`演变成`ViewModel`。Model层代表数据模型，View层代表UI组件，ViewModel是View和Model层的桥梁，数据会绑定到viewModel层并自动将数据渲染到页面中，视图变化的时候会通知viewModel层更新数据。

### 2、简单说一下Vue2.x响应式数据原理

Vue在初始化数据的时候，会使用`Object.defineProperty`重新定义data中的所有属性，当页面使用对应属性时，首先会进行依赖收集（收集当前组件的`watcher`）如果属性发生变化会通知相关依赖进行更新操作（`发布订阅`）。

### 3、Vue3.x响应式数据原理

Vue3.x改用 `Proxy` 替代 `Object.defineProperty`。因为 Proxy 可以直接监听对象和数据的变化，并且有多达13种拦截方法。并且作为新标准，将受到浏览器厂商重点持续的性能优化。

> proxy 只会代理对象的第一层，那么Vue3又是怎么处理这个问题的呢？

判断当前 Reflect.get 的返回值是否为 Object， 如果是则再通过 `reactive` 方法做代理，这样就实现了深度观测。

> 监测数组的时候可能触发多次 get/set，那么如何防止触发多次呢？

我们可以判断key是否为当前被代理对象 target 自身属性，也可以判断旧值与新值是否相等，只有满足以上两个条件之一时，才有可能只需 trigger

### 4、Vue2.x中如何检测数组变化

使用函数劫持的方式，重写了数组的方法，Vue 将data 中的数组进行了原型链重写，指向了自己定义的数组原型方法。这样当调用数组 api 时，可以通知依赖更新。如果数组中包含着引用类型，会对数组中的引用类型再次递归进行监控。这样就实现了监测数组变化。

### 5、nextTick 实现原理

在下次 DOM 更新循环结束之后执行延迟回调。nextTick主要使用了宏任务和微任务。根据执行环境分别尝试才有

- Promise
- MutationObserver
- setImmediate
- 如果以上都不行则采用 setTimeout

定义了一个异步方法，多次调用 nextTick 会将方法存入队列中，通过这个异步方法清空当前队列。

### 6、 Vue生命周期

- `beforeCreate` 是 new Vue 之后触发的第一个钩子，在当前阶段 data，methods，computed以及 watch 以上的数据和方法都不能被访问。
- `created` 在实例创建完成后发生，当前阶段已经完成了数据观测，也就是可以使用数据，更改数据，在这里更改数据不会触发 updated 函数。可以做一些初始数据的获取，在当前阶段无法与 Dom 交互，如果非想要，可以通过 vm.$nextTick 来访问 Dom。
- `beforeMount` 发生在挂载之前，在这之前template模板已导入渲染函数编译。而当前阶段虚拟 Dom 已经创建完成，即将开始渲染。在此时也可以对数据进行更改，不会触发 updeted。
- `mounted` 在挂载完成后发生，在当前阶段，真实的 Dom 挂载完毕，数据完成双向绑定，可以访问到 Dom 节点，使用 $ref 属性对 Dom 进行操作。
- `beforeUpdate` 发生在更新之前，也就是响应式数据发生更新，虚拟dom 重新渲染之前被触发，你可以在当前阶段进行更改数据，不会造成重渲染。
- `updated` 发生在更新完成之后，当前阶段组件 Dom 已完成更新。需要注意的是避免在此期间更改数据，因为这可能会导致无线循环的更新。
- `beforeDestory` 发生在实例销毁之前，在当前阶段实例完全可以被使用，我们可以在这时进行善后收尾工作，比如清除定时器。
- `destoryed` 发生在实例销毁之后，这个时候只剩下了 dom 空壳，组件已被拆解，数据绑定被卸除，监听被移出，子实例也统统被销毁。

### 7、接口请求一般放在哪个声明周期中

接口请求一般放在 `mounted` 中，但需要注意的是服务端渲染时不支持 mounted，需要放到 `created` 中。

vue是数据驱动的(只关心data即可)，换句话说，就是，**只要我能操作到 data中的数据即可**。created时，data中的数据已经通过 Object.defineProperty 方法劫持、添加观察者模式。此时的数据已经支持双向绑定。从生命周期来看，created会在mounted之前调用，如果接口响应数据时间相同的话，放在created中， 能更快的获取并渲染视图，体验会更好~

### 8、 Computed 和 watch

`Computed` 本质是一个具备缓存的 `watcher`,依赖属性发生变化就会更新视图。适用于计算比较消耗性能的计算场景。当表达式过于复杂时，在模板中放入过多逻辑会让模板难以维护，可以将复杂的逻辑放入计算属性中处理。

`watch` 没有缓存性，更多的是观察的作用。可以监听某些数据执行回调。当我们需要深度监听对象中的属性时，可以打开 `deep: true` 选项，这样便会对对象中的每一项进行监听。这样会带来性能问题，优化的话，可以使用 `字符串形式` 监听，如果没有写到组建中，不要忘记 `watch 手动注销 `

```javascript
// 如果我们使用下面这样的方式写 watch，那么就要手动注销了，这种注销其实也很简单
const unWatch = app.$watch('text', (newVal, oldVal) => {
  console.log(`${newVal} : ${oldVal}`);
})
 
unWatch(); // 手动注销watch
```

### 9、v-if 和 v-show的区别

当条件不成立时，`v-if` 不会渲染 DOM 元素， `v-show` 操作的是样式 （display）,切换当前DOM的显示与隐藏。

### 10、组件中的 data 为什么是一个函数？

一个组件被重复调用多次的话，就会创建多个实例。本质上，`这些实例用的都是同一个构造函数`。如果 data 是对象的话，对象属于引用类型，会影响到所有的实例。所以为了保证组件不同的实例之间 data 不冲突，data 必须是一个函数。

### 11、 v-model 的原理

`v-model` 本质就是一个语法糖，可以看成是 `vue + input` 方法的语法糖。可以通过 model 属性的 `prop` 和 `event` 属性来进行自定义。原生 v-model 会根据标签的不同生成不同的事件和属性

### 12、 Vue 事件绑定原理

原生事件绑定是通过 `addEventListener` 绑定给真实元素的。组件事件绑定是通过 Vue 自定义的 `$on` 实现 的。

### 13、Vue 模板编译原理

简单说，Vue的编译过程就是将 `template` 转化为 `render` 函数的过程。会经历以下阶段：

- 生成AST树
- 优化
- codegen

首先解析模板，生成 `AST语法树`（一种用 JavaScript对象的形式来描绘整个模板）。使用大量的正则表达式对模板进行解析，遇到标签、文本的时候都会执行对应的钩子进行相关处理。

Vue的数据是响应式的，但其实模板中并不是所有的数据都是响应式的。有一些数据首次渲染后就不会再变化，对应的 DOM也不会变化。那么优化过程就是深度遍历 AST树，按照相关条件对树节点进行标记。这些被标记的节点（静态节点）我们就可以 `跳过对它们的比对`，对运行时的模板起到很大的优化作用。

编译的最后一步是 `将优化后的 AST树转换为可执行的代码`

### 14、 Vue2.x和Vue3.x 渲染器的diff算法

简单来说，diff算法有一下过程，

- 同级比较，再比较子节点
- 先判断一方有子节点一方没有子节点的情况。（如果新的children没有子节点，将旧的子节点移除）
- 比较都有子节点的情况（核心diff）
- 递归比较子节点

正常 diff 两个树的时间复杂度是 `O(n^3` ，但实际情况下，我们很少会进行 `跨层级的移动DOM`，所以 Vue 将 diff 进行了优化，从 `O(n^3) -> O(n)`，只有当新旧 children 都为多个子节点时才需要用核心的 Diff 算法进行同层级比较。

Vue2的核心Diff 算法采用了`双端比较`的算法，同时从新旧childrend的两端开始比较，借助 key 值找到可复用的节点，再进行相关操作。相比 React 的Diff 算法，同样情况下可以减少移动节点的次数，减少不必要的性能损耗，更加的优雅。

Vue3.x 借鉴了 ivi 算法 和 inferno 算法。在创建 VNode 时就确定其类型，以及在 `mount/patch` 的过程中采用 `位运算` 来判断一个 VNode 的类型，在这个基础上再配合核心的 Diff 算法，使得性能上较Vue2.x有了提升。（实际的实现可以结合 Vue3.x 源码看。）

该算法中还运用了 `动态规划` 的思想求解最长递归子序列。

### 15、 虚拟Dom以及key属性的作用

由于在浏览器中才做DOM是很昂贵的。频繁的操作DOM。会产生一定的性能问题。这就是虚拟DOM产生的原因

Vue2的 虚拟dom(Virtual DOM) 借鉴了开源库 `snabbdom` 实现

`Virtual DOM 本质就是用一个原生的JS对象去描述一个 DOM 节点。是对真实 DOM的一层抽象。`（也就是源码中的 VNode类，它定义在 `src/core/vdom/vnode.js` 中）

Virtual DOM 映射到真实 DOM 要经历 VNode 的 create，diff，patch等阶段、

<b>[ key 的作用是尽可能的复用 DOM 元素。]</b>

新旧 children 中的节点只有顺序是不同的时候，最佳的操作应该是通过移动元素的位置来达到更新的目的。

需要在新旧 children 中的节点只有顺序是不同的时候，最佳的操作应该是通过移动元素的位置来达到更新的目的。

需要在新旧 children 的节点中保存映射关系，以便能够在旧 children 的节点中找到可复用的节点。key也就是 children 中节点的唯一标识。

### 16、keep-alive 

`keep-alive` 可以实现组件缓存，当组件切换时不会对当前组件进行卸载。

常用的两个属性 `include/exclude`， 允许组件有条件的进行缓存。

两个生命周期 `activated/deactivated`， 用来得知当前组件是否处于活跃状态。

keep-alive 中还运用了` LRU（least recently used）`算法。

### 17、Vue 中组件生命周期调用顺序

组件的调用顺序都是 `先父后子`，渲染完成的顺序是 `先子后父`。

组件的销毁操作是 `先父后子`，销毁完成的顺序是 `先子后父`。

#### 加载渲染过程

> 父beforeCreate -> 父created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子beforeMount -> 子 mounted -> 父 mounted

#### 子组件更新过程

> 父beforeUpdate -> 子beforeUpdate -> 子updeted -> 父updated

#### 父组件更新过程

> 父 beforeUpdate -> 父 updated

#### 销毁过程

> 父 beforeDestory -> 子 beforeDestory -> 子 destroyed -> 父 destoryed

### 18、Vue2.x 组件通信有哪些方式？

- 父子组件通信

父 -> 子 `props` 

子 -> 父 `$on、$emit`

获取父子组件实例 `$parent、$children`

`Ref` 获取实例的方式调用组件的属性或者方法

`Provide、inject` 官方不推荐使用，但是写组件库时常用

- 兄弟组件通信

`Event Bus` 实现跨组件通信 `Vue.prototype.$bus = new Vue`

`Vuex`

- 跨级组件通信

`Vuex`

`$attrs、 $listeners`

`Provide、inject`

### 19 什么是 SSR

SSR也就是服务端渲染，`也就是将 Vue在客户端把标签渲染成 HTML的工作放在服务端完成，然后再把 html 直接返回给客户端`

SSR 有着更好的 SEO、并且首屏加载速度更快等优点，不过它也有一些缺点，比如我们的开发条件会收到限值，服务器端渲染只支持 `beforeCreate` 和 `created` 两个钩子，当我们需要一些外部拓展库时需要特殊处理，服务端渲染应用程序也需要处于 node 的运行环境，还有就是服务器会有更大的负载需求。

### 20 做过哪些 Vue的性能优化？

#### 编码阶段

- 尽量减少 data 中的数据，data 中的数据都会增加 getter 和 setter ，会收集对应的 watcher
- v-if 和 v-for 不能连用
- 如果需要使用 v-for 给每项元素绑定事件时使用事件代理
- SPA 页面采用 keep-alive 缓存组件
- 在更多的情况下，使用 v-fi 替代 v-show
- key 保证唯一
- 使用路由懒加载，异步组件
- 防抖，节流
- 第三方模块按需导入
- 长列表滚动到可视区域动态加载
- 图片懒加载

#### SEO 优化

- 预渲染
- 服务端渲染 SSR

#### 打包优化

- 压缩代码
- Tree shaking/scope Hoisting
- 使用 cdn 加载第三方模块
- 多线程打包 happypack
- splitChunks 抽离公共文件
- sourceMap 优化

#### 用户体验

- 骨架屏
- PWA

还可以使用缓存（客户端缓存、服务端缓存）优化、服务端开启gzip 压缩等。

### 21、 hash 路由和 history 路由实现原理

`location.hash` 的值实际就是 URL中 `#` 后面的东西

history 实际采用了 HTML5 中提供的API来实现。主要有 `history.pushState()` 和 `history.replaceState()`



###  22、Vue3.0 性能提升主要是通过哪几方面体现的？

#### 1、响应式系统提升

vue2在初始化的时候，对data中的每个属性都使用 definepropery 调用 getter 和 setter 使之变为响应式对象。如果属性值为对象，还会递归调用 defineproperty 使之变为响应式对象。

vue3 使用 proxy 对象重写响应式。proxy 的性能本来比 defineproperty好，proxy可以拦截属性的访问、赋值、删除等操作，不需要初始化的时候遍历所有属性，另外有多层属性嵌套的话，只有访问某个属性的时候，才回递归处理下一级的属性。

**优势：**

- 可以监听动态新增的属性；
- 可以监听删除的属性；
- 可以监听数组的索引和length属性；

#### 2、编译优化

优化编译和重写虚拟dom，让首次渲染和更新dom性能有更大的提升vue2通过标记静态根节点，优化diff 算法vue3标记和提升所有静态根节点，diff的时候只比较动态节点内容。

模板里面不用创建唯一根节点，可以直接放同级标签和文本内容

**静态提升**

patch flag,跳过静态节点，直接对比动态节点，缓存事件处理函数。

#### 3、 源码体积的优化

vue3 移除了一些不常用的api，例如：inline-tempalte、filter等 使用 tree-shaking



### 23、Composition API 与vue2.x使用的 options Api 有什么区别？

**options API**

包含一个描述组件选项（data、methods、props等）的对象 options；

API 开发复杂组件，同一个功能逻辑的代码被拆分到不同选项；

使用mixin 用公共代码，也有问题：命名冲突，数据来源不清晰

**composition Api**

vue3 新增的一组api, 他是基于函数的api，可以更灵活的组织组件的逻辑，

解决 options api 在大型项目中，options api 不好拆分和重用的问题



### 24、proxy 相对于 Object.defineproperty 有哪些优点

proxy的性能本来比 defineproperty好，proxy可以拦截属性的访问、赋值、删除等操作，不需要初始化的时候遍历所有属性，另外有多层属性嵌套，只有访问某个属性的时候，才会递归处理下一级的属性。

- 可以监听数组变化
- 可以劫持整个对象
- 操作时不时对原对象操作，是 new proxy 返回的一个新对象
- 可以劫持的操作有13种



### 25、vue3.0 在编译方面有哪些优化？

vue.js 3.x 中标记和提升所有静态节点，diff 的时候只需要对比动态节点内容：

#### Fragments（升级vetur插件):

template中不需要唯一根节点，可以直接放文本或者同级标签



静态提升（hoistStatic），当使用 hoistStatic 时，所有静态的节点都被提升到 `render` 方法之外，只会在应用启动的时候被创建一次，之后使用只需要应用提取的静态节点，跟随每次渲染被不停的复用。



patch flag， 在动态标签末尾加上相应的标记，只能带 patchFlag 的节点才被认为是动态的元素，会被追踪属性的修改，能快速的找到动态节点，而不用逐个逐层遍历。提高了虚拟dom diff 的性能。



缓存事件处理函数 cacheHandler，避免每次触发都要重新生成全新的 function 去更新之前的函数 tree shaking 通过摇树优化核心库体积，减少不必要的代码量

> Tree Shaking 在 Webpack 中的实现，是用来尽可能的删除没有被使用过的代码，一些被 `import` 了但其实没有被使用的代码。



### 26、Vue.js3.0 响应式系统的实现原理？

#### 1、reactive：

- 设置对象为响应式对象。接收一个参数，判断这个参数是否是对象。不是对象则直接返回这个参数，不做响应式处理。
- 创建拦截器对象 handerler 设置 get，set，deleteProperty
  - get 
    - 收集依赖（track）
    - 返回当前key的值
      - 如果当前key的值是对象，则为当前key的对象拦截器 handler 设置 get/set/deleteProperty
      - 如果当前的key 的值不是对象，则返回当前 key 的值
  - set
    - 设置新值和老值不相等时，更新为新值，并触发更新（trigger）
  - deleteProperty
    - 当前对象有这个key的时候，删除这个 key 并触发更新 （trigger）
- 返回 Proxy 对象

#### 2、effect：接收一个函数作为参数，作用是：访问响应式对象属性时去收集依赖

#### 3、track：

- 接收两个参数 target 和 key
- 如果没有 activeEffect，则说明没有创建 effect 依赖
- 如果有 activeEffect，则去判断 WeakMap 集合中是否有 target 属性。
  - WeakMap 集合中没有 target 属性，则 set（target，（depsMap = new Map()））
  - WeakMap 集合中有 target 属性，则判断 target 属性的 map 值的 depsMap 中是否有 key 属性
    - depsMap 中没有 key 属性，则 set(key, (dep = new Set()))
    - depsMap 中有 key 属性，则添加这个 activeEffect

#### 4、trigger：

- 判断 WeakMap 中是否有 target 属性
  - WeakMap 中没有 target 属性，则没有 target 相应的依赖
  - WeakMap 中有 target 属性，则判断 target 属性的 map 值中是否有 key 属性，有的话循环触发收集的 effect()



具体代码如下：

```javascript
const isObject = val => val !== null && typeof val === 'object'
const convert = target => isObject(target) ? reactive(target) : target
const hasOwnProperty = Object.prototype.hasOwnProperty
const hasOwn = (target, key) => hasOwnProperty.call(target, key)

export function reactive(target) {
  if (!isObject(target)) return target

  const handler = {
    get(target, key, receiver) {
      // 收集依赖
      track(target, key)
      const result = Reflect.get(target, key, receiver)
      return convert(result)
    },
    set(target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver)
      let result = true
      if (oldValue !== value) {
        result = Reflect.set(target, key, value, receiver)
        // 触发更新
        trigger(target, key)
      }
      return result
    },
    deleteProperty(target, key) {
      const hadKey = hasOwn(target, key)
      const result = Reflect.deleteProperty(target, key)
      if (hadKey && result) {
        // 触发更新
        console.log('delete', key)
        trigger(target, key)
      }
      return result
    }
  }

  return new Proxy(target, handler)
}

let activeEffect = null
export function effect(callback) {
  activeEffect = callback
  callback() // 访问响应式对象属性，去收集依赖
  activeEffect = null
}

let targetMap = new WeakMap()
export function track(target, key) {
  if (!activeEffect) return
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  dep.add(activeEffect)
}

export function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => {
      effect()
    })
  }
}

export function ref(raw) {
  // 判断 raw 是否是 ref 创建的对象，如果是的话直接返回
  if (isObject(raw) && raw.__v_isRef) {
    return
  }
  let value = convert(raw)
  const r = {
    __v_isRef: true,
    get value() {
      track(r, 'value')
      return value
    },
    set value(newValue) {
      if (newValue !== value) {
        raw = newValue;
        value = convert(raw)
        trigger(r, 'value')
      }
    }
  }
  return r
}

export function toRefs(proxy) {
  const ret = proxy instanceof Array ? new Array(proxy.length) : {}
  for (const key in proxy) {
    ret[key] = toProxyRef(proxy, key)
  }
  return ret
}

function toProxyRef(proxy, key) {
  const r = {
    __v_isRef: true,
    get value() {
      return proxy[key]
    },
    set value(newValue) {
      proxy[key] = newValue
    }
  }
  return r
}

export function computed(getter) {
  const result = ref()
  effect(() => (result.value = getter()))
  return result
}
```


























