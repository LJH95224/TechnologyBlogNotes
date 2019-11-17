# 数值的扩展

>1. 二进制和八进制表示法
>2. Number.isFinite(), Number.isNaN()
>3. Number.parseInt(), Number.parseFloat()
>4. Number.isInteger()
>5. Number.EPSILON
>6. 安全整数和 Number.isSafeInteger()
>7. Math 对象的扩展
>8. 指数运算符

--- 
<br>

# 1. 二进制和八进制表示法
ES6 提供了二进制和八进制数值的新的写法，分别用前缀 __0b__ （或 __0B__）和 __0o__ （或 __0O__）表示。

```
0b111110111 === 503 // true
0o767 === 503 // true
```
从 ES5 开始，在严格模式之中，八进制就不再允许使用前缀 __0__ 表示，ES6 进一步明确，要使用前缀 __0o__ 表示。

```
// 非严格模式
(function () {
    console.log(0o === 011);
})() // true


//严格模式
(function () {
    'use Strict';
    console.log(0o === 011);
})() // Uncaught SyntaxError: Octal literals are not allowed in strict mode.
```

如果要将 __0b__ 和 __0o__ 前缀的字符串数值转为十进制，要使用 __Number__ 方法。

```
Number('0b111')  // 7
Number('0o10')  // 8
```
---
<br>

# 2. Number.isFinite(), Number.isNaN()

ES6 在 __Number__ 对象上，新提供了 __Number.isFinite()__ 和 Number.isNaN() 两个方法。

__Number.isFinite()__ 用来检查一个数值是否为有限的 (finite), 即不是 __Infinity__。

```
Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite('foo'); // false
Number.isFinite('15'); // false
Number.isFinite(true); // false
```

注意， 如果参数类型不是数值， __Number.isFinite__ 一律返回 false。

__Number.isNaN()__ 用来检查一个值是否为 __NaN__。

```
Number.isNaN(NaN) // true
Number.isNaN(15) // false
Number.isNaN('15') // false
Number.isNaN(true) // false
Number.isNaN(9/NaN) // true
Number.isNaN('true' / 0) // true
Number.isNaN('true' / 'true') // true
```
如果参数类型不是 __NaN__，__Number.isNaN__ 一律返回 __false__。

它们与传统的全局方法 

__isFinite()__ 和 __isNaN()__ 的区别在于，传统方法先调用 __Number()__ 将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效， __Number.isFinite()__  对于非数值一律返回 __false__， __Number.isNaN()__ 只有对于 __NaN__ 才返回 __true__，非 __NaN__ 一律返回 __false。__

# 3. Number.parseInt(), Number.parseFloat()









