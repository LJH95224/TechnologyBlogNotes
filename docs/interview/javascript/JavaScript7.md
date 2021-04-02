# Promise 实战题

## 01

```javascript
const promise = new Promise((resolve, reject) => {
    console.log(1)
    resolve()
    console.log(2)
})
promise.then(() => {
    console.log(3)
})
console.log(4)

// 打印结果
// 1
// 2
// 4
// 3
```

解析：

Promise 构造函数是同步执行的，promise.then 中的函数是异步执行的。



## 02

```javascript
const first = () => (new Promise((resolve, reject) => {
    console.log(3)
    let p = new Promise((resolve, reject) => {
        console.log(7)
        setTimeout(() => {
            console.log(5)
            resolve(6)
        }, 0)
        resolve(1)
    })
    resolve(2)
    p.then((arg) => {
        console.log(arg)
    })
}))
first().then(arg => {
    console.log(arg)
})
console.log(4)

// 打印结果
// => 3
// => 7
// => 4
// => 1
// => 2
// => 5
```

解析：

这道题主要理解 js 执行机制

第一轮时间循环，先执行宏任务，主script， new Promise 立即执行，输出3， 执行 p 这个 new Promise 操作， 输出 7 ，发现 setTimeout， 将回调函数放入下一轮任务队列（Event Quene），p的then 暂时命名为 then1， 放入微任务列，且 first 也有 then，命名为 then2 放入微任务队列 执行 console.log(4), 输出 4，宏任务执行结束。

再去执行微任务，执行 then1 输出1， 执行then2 输出 3。

第一轮时间循环结束，开始执行第二轮，第二轮时间循环先执行宏任务里面的，也就是 setTimeout 的回调，输出5， resolve(6)  不会生效， 因为 p 的 promise 状态一旦改变就不会再有变化了。



## 03

```javascript
const promise1 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('success')
	}, 1000)
})

const promise2 = promise1.then(() => {
	throw new Error('error!!!')
})

console.log('promise1', promise1)
console.log('promise2', promise2)

setTimeout(() => {
	console.log('promise1', promise1)
	console.log('promise2', promise2)
})
```

打印结果

```
promise1 Promise {<pending>}
promise2 Promise {<pending>}
Uncaught (in promise) Error: error!!!
    at <anonymous>
promise1 Promise {<resolved>: "success"}
promise2 Promise {<rejected>: Error: error!!!
    at <anonymous>}
```

 解释：promise 有 3 种状态：pending、fulfilled 或 rejected。状态改变只能是 pending->fulfilled 或者 pending->rejected，状态一旦改变则不能再变。上面 promise2 并不是 promise1，而是返回的一个新的 Promise 实例。 



## 04

```javascript
const promise = new Promise((resolve, reject) => {
	resolve('success1')
	reject('error')
	resolve('success2')
})
promise.then((res) => {
	console.log('then', res)
}).catch(err => {
	console.log('catch', err)
})
```

 解析：
构造函数中的 resolve 或 reject 只有第一次执行有效，多次调用没有任何作用，呼应代码二结论：promise 状态一旦改变则不能再变。 

 运行结果： 

```
then: success1
```



## 05

```javascript
Promise.resolve(1).then(res => {
	console.log(res)
	return 2
}).catch(err => {
	return 3
}).then(res => {
	console.log(res)
})
// 1
// 2
```

解析：
promise 可以链式调用。提起链式调用我们通常会想到通过 return this 实现，不过 Promise 并不是这样实现的。promise 每次调用 .then 或者 .catch 都会返回一个新的 promise，从而实现了链式调用



## 06

```javascript
const promise = new Promise((resolve, reject) => {
	setTimeout(() => {
		console.log('once')
		resolve('success')
	}, 1000)
})

const start = Date.now()
promise.then(res => {
	console.log(res, Date.now() - start)
})
promise.then(res => {
	console.log(res, Date.now() - start)
})
// once
// success 1680
// success 1680
```

 解析：
promise 的 .then 或者 .catch 可以被调用多次，但这里 Promise 构造函数只执行一次。或者说 promise 内部状态一经改变，并且有了一个值，那么后续每次调用 .then 或者 .catch 都会直接拿到该值。 



## 07

```
Promise.resolve().then(() => {
	return new Error('error!!!')
}).then(res => {
	console.log('then', res)
}).catch((err) => {
	console.log('catch', err)
})
// then Error: error!!!
```

解析：

.then 或者 .catch 中 return 一个 error 对象并不会抛出错误，所以不会被后续的 .catch 捕获，需要改成其中一种：

```js
// 方法一
return Promise.reject(new Error('error!!!'))
// 方法二
throw new Error('error!!!')
```



## 08

```
const promise = Promise.resolve().then(res => {
	return promise
})
promise.catch(console.error)

// Chaining cycle detected for promise #<Promise>
```

 解析：.then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环 。、



## 09

```js
Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log)
// 1
```

 解析：
.then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透。 

## 10

```javascript
Promise.resolve().then(function success (res) {
	throw new Error('error')
}, function fail (e) {
	console.error('fail', e)
}).catch(function fail2 (e) {
	console.error('catch', e)
})
// catch Error: error
```

解析：

.then 可以接收两个参数，第一个是处理成功的函数，第二个是处理错误的函数。

.catch 是 .then 第二个参数的简便写法，但是它们用法上有一点需要注意： .then 的第二个处理错误的函数捕获不了第一个处理成功的函数抛出的错误，而后续的 .catch 可以捕获之前的错误。

 当然以下代码也可以： 

```js
Promise.resolve().then(function success1 (res) {
  throw new Error('error')
}, function fail1 (e) {
  console.error('fail1: ', e)
})
.then(function success2 (res) {
}, function fail2 (e) {
  console.error('fail2: ', e)
})
// fail2:  Error: error
```



## 11

```js
process.nextTick(() => {
	console.log('nextTick')
})

Promise.resolve().then(() => {
	console.log('then')
})

setImmediate(() => {
	console.log('setImmediate')
})
console.log('end')
```

![1617354166898](F:\myGIthub\TechnologyBlogNotes\docs\.vuepress\public\image\css\1617354166898.png)

 process.nextTick 和 promise.then 都属于 microtask，而 setImmediate 属于 macrotask，在事件循环的 check 阶段执行。事件循环的每个阶段（macrotask）之间都会执行 microtask，事件循环的开始会先执行一次 microtask。 



## 12

 红灯3秒亮一次，绿灯1秒亮一次，黄灯2秒亮一次；如何使用Promise让三个灯不断交替重复亮灯？（海康威视笔试题） 

```js
function red(){
    console.log('red');
}
function green(){
    console.log('green');
}
function yellow(){
    console.log('yellow');
}
```

分析：
先看题目，题目要求红灯亮过后，绿灯才能亮，绿灯亮过后，黄灯才能亮，黄灯亮过后，红灯才能亮……所以怎么通过Promise实现？

换句话说，就是红灯亮起时，承诺2s秒后亮绿灯，绿灯亮起时承诺1s后亮黄灯，黄灯亮起时，承诺3s后亮红灯……这显然是一个Promise链式调用，看到这里你心里或许就有思路了，我们需要将我们的每一个亮灯动作写在then()方法中，同时返回一个新的Promise，并将其状态由pending设置为fulfilled，允许下一盏灯亮起。

```js
function red () {
	console.log('red')
}

function green () {
	console.log('green')
}

function yellow () {
	console.log('yellow')
}

let myLight = (timer, cb) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			cb()
			resolve()
		}, timer)
	})
}

let myStep = () => {
	Promise.resolve().then(() => {
		return myLight(3000, red)
	}).then(() => {
		return myLight(2000, green)
	}).then(() => {
		return myLight(1000, yellow)
	}).then(() => {
		myStep()
	})
}
myStep()
// red
// green
// yellow
// red
// green
// yellow
```

## 13

 请实现一个mergePromise函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组data中。 

```js
const timeout = ms => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
    }, ms);
});

const ajax1 = () => timeout(2000).then(() => {
    console.log('1');
    return 1;
});

const ajax2 = () => timeout(1000).then(() => {
    console.log('2');
    return 2;
});

const ajax3 = () => timeout(2000).then(() => {
    console.log('3');
    return 3;
});

const mergePromise = ajaxArray => {
    // 在这里实现你的代码
  // 保存数组中函数执行后的结果
  let data = []
  // Promise.resolve方法调用时不带参数，直接返回一个resolved状态的 Promise 对象。
  var sequence = Promise.resolve();

  ajaxArray.forEach(item => {
    // 第一次的 then 方法用来执行数组中的每个函数，
    // 第二次的 then 方法接受数组中的函数执行后返回的结果，
    // 并把结果添加到 data 中，然后把 data 返回。
    sequence = sequence.then(item).then(res => {
      data.push(res);
      return data;
    });
  });
  // 遍历结束后，返回一个 Promise，也就是 sequence， 他的 [[PromiseValue]] 值就是 data，
  // 而 data（保存数组中的函数执行后的结果） 也会作为参数，传入下次调用的 then 方法中。
  return sequence;
};
mergePromise([ajax1, ajax2, ajax3]).then(data => {
    console.log('done');
    console.log(data); // data 为 [1, 2, 3]
});

// 要求分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]
```

## 14

现有8个图片资源的url，已经存储在数组urls中，且已有一个函数function loading，输入一个url链接，返回一个Promise，该Promise在图片下载完成的时候resolve，下载失败则reject。

要求：任何时刻同时下载的链接数量不可以超过3个。
请写一段代码实现这个需求，要求尽可能快速地将所有图片下载完成。

```javascript
var urls = ['https://www.kkkk1000.com/images/getImgData/getImgDatadata.jpg', 'https://www.kkkk1000.com/images/getImgData/gray.gif', 'https://www.kkkk1000.com/images/getImgData/Particle.gif', 'https://www.kkkk1000.com/images/getImgData/arithmetic.png', 'https://www.kkkk1000.com/images/getImgData/arithmetic2.gif', 'https://www.kkkk1000.com/images/getImgData/getImgDataError.jpg', 'https://www.kkkk1000.com/images/getImgData/arithmetic.gif', 'https://www.kkkk1000.com/images/wxQrCode2.png'];

function loadImg(url) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
            console.log('一张图片加载完成');
            resolve();
        }
        img.onerror = reject;
        img.src = url;
    })
};
```

 **解析**
题目的意思是需要先并发请求3张图片，当一张图片加载完成后，又会继续发起一张图片的请求，让并发数保持在3个，直到需要加载的图片都全部发起请求。 

 用Promise来实现就是，先并发请求3个图片资源，这样可以得到3个Promise，组成一个数组promises，然后不断调用Promise.race来返回最快改变状态的Promise，然后从数组promises中删掉这个Promise对象，再加入一个新的Promise，直到全部的url被取完，最后再使用Promise.all来处理一遍数组promises中没有改变状态的Promise。 

```javascript
function limitLoad(urls, handler, limit) {
  // 对数组做一个拷贝
    const sequence = […urls];

  let promises = [];

  //并发请求到最大数
  promises = sequence.splice(0, limit).map((url, index) => {
    // 这里返回的 index 是任务在 promises 的脚标，用于在 Promise.race 之后找到完成的任务脚标
    return handler(url).then(() => {
      return index;
    });
  });

  // 利用数组的 reduce 方法来以队列的形式执行
  return sequence.reduce((last, url, currentIndex) => {
    return last.then(() => {
      // 返回最快改变状态的 Promise
      return Promise.race(promises)
    }).catch(err => {
      // 这里的 catch 不仅用来捕获前面 then 方法抛出的错误
      // 更重要的是防止中断整个链式调用
      console.error(err)
    }).then((res) => {
      // 用新的 Promise 替换掉最快改变状态的 Promise
      promises[res] = handler(sequence[currentIndex]).then(() => {
        return res
      });
    })
  }, Promise.resolve()).then(() => {
    return Promise.all(promises)
  })

}

limitLoad(urls, loadImg, 3);

/*
因为 limitLoad 函数也返回一个 Promise，所以当 所有图片加载完成后，可以继续链式调用

limitLoad(urls, loadImg, 3).then(() => {
    console.log('所有图片加载完成');
}).catch(err => {
    console.error(err);
})
*/
```



## 15

封装一个异步加载图片的方法

```js
function loadImageAsync(url) {
    return new Promise(function(resolve,reject) {
        var image = new Image();
        image.onload = function() {
            resolve(image) 
        };
        image.onerror = function() {
            reject(new Error('Could not load image at' + url));
        };
        image.src = url;
     });
}
```



 







