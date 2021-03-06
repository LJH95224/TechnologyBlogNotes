# 7. 函数的扩展

> 1. 函数参数的默认值
> 2. rest 函数
> 3. 严格模式
> 4. name 属性
> 5. 箭头函数
> 6. 双冒号运算符
> 7. 尾调用优化
> 8. 函数参数的尾逗号

## 1. 函数参数的默认值

### 基本用法
ES6之前， 不能直接为函数的参数指定默认值，只能采用变通的方法
```
function log(x, y) {
    y = y | 'World';
}
log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello World
```
上面代码检查函数，__log__ 的参数 __y__ 有没有赋值，如果没有，则指定默认值 __world__ 。这种写法的缺点在于，如果参数 __y__ 赋值了，但是对应的布尔值为 false， 则该赋值不起作用。就像上面代码的最后一行，参数 __y__ 等于空字符，结果被改为默认值。

为了避免这个问题，通过需要先判断一下参数 __y__ 是否被赋值，如果没有， 再等于默认值

```
if (typeof y === 'undefined') {
    y = 'World';
}
```

ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。

```
function log(x, y = 'World') {
    console.log(x, y);
}
log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello
```
可以看到， ES6的写法比ES5简洁许多，而且非常自然。 下面是另一个例子。

```
function Point(x = 0, y = 0) {
    this.x = x;
    this.y = y;
}

const p = new Point();
p // {x: 0, y: 0}
```
除了简洁，ES6的写法还有两个好处： 首先阅读代码的人，可以立刻意识到哪些参数是可以省略的，不用查看函数体或文档；其次，有利于将来的代码优化，即使未来的版本在对外接口中，彻底拿掉这个参数，也不会导致以前的代码无法运行。

参数变量是默认声明的，所以不能用 __let__ 或 __const__ 再次声明。

```
function foo (x = 5) {
  let x = 1; // error
  const x = 2; // error
}
```
上面代码中，参数变量 __x__ 是默认声明的，在函数体中，不能用 __let__ 或 __const__ 再次声明，否则会报错。

使用参数默认值时，函数不能有同名参数。

```
// 不报错
function foo(x, x, y) {
  // ...
}

// 报错
function foo(x, x, y = 1) {
  // ...
}
// SyntaxError: Duplicate parameter name not allowed in this context
```

另外，一个容易忽略的地方是，参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。

```
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}

foo() // 100

x = 100;
foo() // 101
```

上面代码中，参数 __p__ 的默认值是 __x + 1__。这时，每次调用函数 __foo__，都会重新计算 __x + 1__ ，而不是默认 __p__ 等于 __100__。

与解构赋值默认值结合使用

### 与解构赋值默认值结合使用
参数默认值可以与解构赋值的默认值，结合起来使用。

```
function foo({x, y = 5}) {
  console.log(x, y);
}

foo({}) // undefined 5
foo({x: 1}) // 1 5
foo({x: 1, y: 2}) // 1 2
foo() // TypeError: Cannot read property 'x' of undefined
```
上面代码只使用了对象的解构赋值默认值，没有使用函数参数的默认值。只有当函数 __foo__ 的参数是一个对象时，变量 __x__ 和 __y__ 才会通过解构赋值生成。如果函数 __foo__ 调用时没提供参数，变量 __x__ 和 __y__ 就不会生成，从而报错。通过提供函数参数的默认值，就可以避免这种情况。

```
function foo({x, y = 5} = {}) {
  console.log(x, y);
}

foo() // undefined 5
```
上面代码指定，如果没有提供参数，函数 __foo__ 的参数默认为一个空对象。

下面是另一个解构赋值默认值的例子。

```
function fetch(url, { body = '', method = 'GET', headers = {} }) {
  console.log(method);
}

fetch('http://example.com', {})
// "GET"

fetch('http://example.com')
// 报错
```
上面代码中，如果函数 __fetch__ 的第二个参数是一个对象，就可以为它的三个属性设置默认值。这种写法不能省略第二个参数，如果结合函数参数的默认值，就可以省略第二个参数。这时，就出现了双重默认值。

```
function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {
  console.log(method);
}
fetch('http://example.com')
// "GET"
```
上面代码中， 函数 __fetch__ 没有第二个参数时，函数参数的默认值就会生效，然后才是解构赋值的默认值生效，变量 __method__ 才会取到默认值 __GET__。

请问下面两种写法有什么差别呢？
```
// 写法一
function m1({x = 0, y = 0} = {}) {
    return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0}) {
    return [x, y];
}
```
上面两种写法都对函数的参数设定了默认值，区别是写法一函数参数的默认值是空对象，但是设置了对象解构赋值的默认值； 写法二函数参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值。

```
// 写法一
function m1({x = 0, y = 0} = {}) {
    return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0}) {
    return [x, y];
}

// 函数没有参数的情况
m1() // [0, 0]
m2() // [0, 0]

// x 和 y 都有值的情况
m1({x: 3, y: 8}) // [3, 8]
m2({x: 3, y: 8}) // [3, 8]

// x 有值，y 无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]

// x 和 y 都无值的情况
m1({}) // [0, 0];
m2({}) // [undefined, undefined]

m1({z: 3}) // [0, 0]
m2({z: 3}) // [undefined, undefined]
```

### 函数默认值的位置
通常情况下，定义了默认值得参数，应该是函数的尾参数，因为这样比较容易看出来，到底省略了哪些参数。如果非尾部的参数设置默认值，实际上这个参数是没法省略的。




























