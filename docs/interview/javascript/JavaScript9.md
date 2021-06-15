# 实现 Sleep 函数

## 方案1： while 循环的方式

```js
function sleep(ms) {
	let start = Date.now(), expire = start + ms
	while (Date.now() < expire)
  console.log('1111')
  return
}
```

 执行 sleep(1000)之后，休眠了 1000ms 之后输出了 1111。上述循环的方式缺点很明显， 容易造成死循环。 

## 方案2： 通过 promise 来实现

```js
function sleep(ms) {
  var temple = new Promise((resolve) => {
    console.log(111)
    setTimeout(resolve, ms)
  })
  return temple
}
sleep(500).then(function () {
  console.log(222)
})
//先输出了 111，延迟 500ms 后输出 222
```

## 方案3： 通过 async 封装

```js
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
async function test() {
  var temple = await sleep(1000)
  console.log(1111)
  return temple
}
test()
//延迟 1000ms 输出了 1111
```

## 方案4  **通过 generate 来实现**

```js
function* sleep(ms) {
  yield new Promise(function (resolve, reject) {
    console.log(111)
    setTimeout(resolve, ms)
  })
}
sleep(500).next().value.then(function () {
  console.log(2222)
})
```

