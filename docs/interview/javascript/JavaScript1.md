# 防抖和节流

## 防抖

> 触发高频事件后 n 秒内函数只会执行一次，如果 n 秒内高频事件再次被触发，则重新计算时间

![1022151-20180613144209623-862434090](F:\myGIthub\TechnologyBlogNotes\docs\.vuepress\public\image\css\1612313541971.png)

- 思路

> 每次触发事件时都取消之前的延时调用方法

```javascript
/**
 * 防抖函数
 * @description: 触发高频事件后 n 秒内，函数只会执行一次，如果 n 秒内高频事件再次被触发，则重新计算时间
 * @param {fn} 需要做防抖处理的高频事件
 * @param {number} delay 毫秒 防抖期限值 默认值为 500毫秒
 * @param {boolean} isImmediate 是否立即执行 默认值是 false
 */
function debounce (fn, delay = 500, isImmediate = false) {
  // 创建一个标记，用来存放定时器的返回值
  let timeout = null
  let flag = true
  if (isImmediate) {
    return function () {
      clearTimeout(timeout)
      if (flag) {
        fn.apply(this, arguments)
        flag = false
      }
      timeout = setTimeout(() => {
        flag = true
      }, delay)
    }
  }
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}
```



## 节流

> 高频事件触发，但在 n 秒内只会执行一次，所以节流会稀释函数的执行频率

![1022151-20180613144342847-660853255](F:\myGIthub\TechnologyBlogNotes\docs\.vuepress\public\image\css\1022151-20180613144342847-660853255.jpg)

- 思路

> 每次触发事件时都判断当前是否有等待执行的延时函数

```javascript
/**
 * 节流函数
 * @description: 高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率
 * @param {fn} 需要做节流处理的高频事件
 * @param {number} delay 毫秒 节流期限值 默认值为 500毫秒
 * @param {boolean} isImmediate 是否立即执行 默认值是 false
 */
function throttle (fn, delay = 500, isImmediate = false) {
  // 通过闭包创建一个标记
  let flag = true
  if (isImmediate) {
    return function () {
      // 在函数开头判断标记是否为 true， 不为 true 则 return
      if (!flag) return
      flag = false
      fn.apply(this, arguments)
      setTimeout(() => {
        flag = true
      }, delay)
    }
  }
  return function () {
    // 在函数开头判断标记是否为 true， 不为 true 则 return
    if (!flag) return
    // 立即设置为 false
    flag =  false
    // 将外部传入的函数的执行放在 setTimeout 中
    setTimeout(() => {
      fn.apply(this, arguments)
      // 最后在 setTimeout 执行完毕后，再把标记设置为 true （关键）表示可以执行下一次循环
      // 当定时器没有执行的时候标记永远为 false， 在开头被 return 掉
      flag = true
    }, delay)
  }
}
```



## 实现demo 源码

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    body{height: 1200px;}
  	div{width: 100%;background-color: lightcyan;overflow: hidden;}
	p{float: left;width: 10px;height:10px;background-color: pink;margin: 1px;}
  </style>
</head>
<body>
    防抖(非立即执行) <div id="d1_1"></div>
    防抖(立即执行) <div id="d1_2"></div>
    节流(非立即执行) <div id="d2_1"></div>
    节流(立即执行) <div id="d2_2"></div>
</body>
<script>

/**
 * 防抖函数
 * @description: 触发高频事件后 n 秒内，函数只会执行一次，如果 n 秒内高频事件再次被触发，则重新计算时间
 * @param {fn} 需要做防抖处理的高频事件
 * @param {number} delay 毫秒 防抖期限值 默认值为 500毫秒
 * @param {boolean} isImmediate 是否立即执行 默认值是 false
 */
function debounce (fn, delay = 500, isImmediate = false) {
  // 创建一个标记，用来存放定时器的返回值
  let timeout = null
  let flag = true
  if (isImmediate) {
    return function () {
      clearTimeout(timeout)
      if (flag) {
        fn.apply(this, arguments)
        flag = false
      }
      timeout = setTimeout(() => {
        flag = true
      }, delay)
    }
  }
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

/**
 * 节流函数
 * @description: 高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率
 * @param {fn} 需要做节流处理的高频事件
 * @param {number} delay 毫秒 节流期限值 默认值为 500毫秒
 * @param {boolean} isImmediate 是否立即执行 默认值是 false
 */
function throttle (fn, delay = 500, isImmediate = false) {
  // 通过闭包创建一个标记
  let flag = true
  if (isImmediate) {
    return function () {
      // 在函数开头判断标记是否为 true， 不为 true 则 return
      if (!flag) return
      flag = false
      fn.apply(this, arguments)
      setTimeout(() => {
        flag = true
      }, delay)
    }
  }
  return function () {
    // 在函数开头判断标记是否为 true， 不为 true 则 return
    if (!flag) return
    // 立即设置为 false
    flag =  false
    // 将外部传入的函数的执行放在 setTimeout 中
    setTimeout(() => {
      fn.apply(this, arguments)
      // 最后在 setTimeout 执行完毕后，再把标记设置为 true （关键）表示可以执行下一次循环
      // 当定时器没有执行的时候标记永远为 false， 在开头被 return 掉
      flag = true
    }, delay)
  }
}

//定义事件函数
function debounceNoImmediate(){ addElement(d1_1) }
function debounceImmediate(){ addElement(d1_2) }
function throttleNoImmediate(){ addElement(d2_1) }
function throttleImmediate(){ addElement(d2_2) }


//注册事件
var body = document.getElementsByTagName('body')[0]
body.addEventListener("mousemove", debounce(debounceNoImmediate, 500, false))
body.addEventListener("mousemove", debounce(debounceImmediate, 500, true))
body.addEventListener("mousemove", throttle(throttleNoImmediate, 500, false))
body.addEventListener("mousemove", throttle(throttleImmediate, 500, true))
// body.addEventListener("mousemove",origin)


//辅助函数
function addElement(f){
  var node=document.createElement("p");
	f.appendChild(node);
}
</script>
</html>
```





