# 基础面试题

#### 1、[CSS] px、em、rem、%、vw、vh、vm这些单位的区别

- `px` 就是像素，也就是我们现在经常使用的单位，电脑分辨率是1920*1080，表示水平方向是1920个像素点，垂直方向是1080个像素点
- `em` 参考物是父元素的 `font-size`， 默认字体大小是 16px ,所以 1em 不是固定值，因为它会继承父元素的字体大小
- `rem` 参考物是相对于根元素，我们在使用的时候可以在根元素设置一个参考值即可，相对于 `em` 使用，减少很大运算工作量，例：`html` 大小为 10px，12rem就是120px
- `%` 是相对于父元素的大小设定的比率，`position:absolute` 的元素是相对于已经定位的父元素，`position: fixed` 的元素是相对可视窗口
- `vm` 相对于视口的宽度，视口被均分为 100单位。例：浏览器宽度1200px, 1 vw = 1200px/100 = 12 px
- `vh` 相对于视口的高度，视口被均分为100单位。例：浏览器高度900px, 1 vh = 900px/100 = 9 px

>  vw：视口的最大宽度，1vw=视口宽度的百分之一；

>  vh：视口得最大高度，1vh=视口高度的百分之一；

>  vmin/vm：相对于视口的宽度或高度中较小的那个。其中最小的那个被均分为100单位的vmin（即vm）。



#### 2、【数据类型】在不知道浮点数位数时应该怎样判断两个浮点数之和与第三数是否相等？

- 精度判断法

  ```js
  var delta = 1e-5; // 定义精度精确到0.00001
  var a = 0.1;
  var b = 0.2;
  var sum = 0.3;
  // 判断相差小于精度就认为相等
  if(a + b - sum < delta) {
      console.log('a + b == sum');
  }
  ```

- 使用toFixed()方法

  toFixed() 方法可以把 Number 四舍五入为指定小数的数字

  `NumberObject.toFixed(num)` // num 代表要保留的小数位数。

  但是 toFixed 存在不精确的问题

  ```javascript
  console.log(1.35.toFixed(1)); // 1.4 正确
  console.log(1.335.toFixed(2)); // 1.33 错误
  console.log(1.3335.toFixed(3)); // 1.333 错误
  console.log(1.33335.toFixed(4)); // 1.3334 正确
  console.log(1.333335.toFixed(5)); // 1.33333 错误
  console.log(1.3333335.toFixede(6)); // 1.333333 错误
  ```

  解决方法：

  重写 toFixed 方法

  ```javascript
  Number.prototype.toFixed = function (s) {
  	var times = Math.pow(10, s);
      //如果是正数，则+0.5，是负数，则-0.5
       const adjust = this >= 0 ? 0.5 : -0.5;
       var des = this * times + adjust;
       des = parseInt(des, 10) / times;
       return des + '';
  }
  console.log(1.335.toFixed(2)); // 1.34 正确
  ```

#### 3、[ES6]数组去重的方式?  let arr = ['1', '2', '3', '1', 'a', 'b', 'b']

- 使用 `Set`

`set` 是 ES6 中引入的新的数据类型。`set` 只允许存储不重复的值，所以当你放入一个数组，它会自动去掉重复的值。

```javascript
let arr = ['1', '2', '3', '1', 'a', 'b', 'b']

// 将数组转为set数据类型
const uniqueSet = new Set(arr)
// Set(5) {"1", "2", "3", "a", "b"}

// 将set数据类型转换为 array
const backToArray = [...uniqueSet]
// (5) ["1", "2", "3", "a", "b"]

// 使用 Array.from 来将 set 转为数组
Array.from(uniqueSet)
// (5) ["1", "2", "3", "a", "b"]
```

- 使用 `filter()`

```javascript
// 数组中重复的字段
arr.filter((item, index) => arr.indexOf(item) !== index);
// (2) ["1", "b"]
// 数组中不重复的字段
arr.filter((item, index) => arr.indexOf(item) === index);
// (5) ["1", "2", "3", "a", "b"]
```

- 使用 `reduce()`

`reduce()` 方法通过提供的 `reducer` 函数来 `reduce` 数组中的元素并且将他们合并为一个新的数组。

我们的`reducer`函数用来检查最终结果是否**已经**包含这个`item`。如果不包含，那么将它放入最终结果，如果已经包含，则丢弃（或者说跳过）这个`item`。

```javascript
let arr = ['1', '2', '3', '1', 'a', 'b', 'b']

arr.reduce((unique, item) => {
  return unique.includes(item) ? unique : [...unique, item]
}, []);
// (5) ["1", "2", "3", "a", "b"]
```































































