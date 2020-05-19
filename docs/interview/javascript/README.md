# JavaScript 面试题

### 1. typeof 能判断哪些类型

考点: `JS变量类型`

```javascript
let a;   				typeof a // undefined
const str = 'abc'  		typeof str // string
const n = 100 			typeof n // number
const b = true      	typeof b // boolean
const s = Symbol('s')	typeof s // symbol
typeof function () {}  	// 'function'
typeof console.log 		// 'function'
```

typeof 能识别 undefined、string、number、 boolean、 symbol

```javascript
typeof null 		// object
typeof ['a', 'b'] 	// object
typeof { x: 100 }	// object
```

typeof 不能识别 null，Array和 object



### 2. 何时使用 === 何时使用 ==

考点： `强制类型转换`

```javascript
// 除了 == null 之外，其他都一律用 === ， 例如：
const obj = { x: 100 }
if (obj.a == null) {}
// 相当于：
// if (obj.a === null || obj.a === undefined) {}
```



### 3. window.onload 和 DOMContentLoaded 的区别

考点： `页面加载过程`





### 4. JS 创建10个\<a> 标签，点击的时候弹出对应的序号

考点：`JS作用域`





### 5. 手写节流 throttle、防抖 debounce

考点：`性能、体验优化`





### 6. Promise 解决了什么问题

考点：`JS异步`







