# 20. Class 的基本语法

> 1. 简介
> 2. 静态方法
> 3. 实例属性的新写法
> 4. 静态属性
> 5. 私有方法和私有属性
> 6. new.target 属性

## 1. 简介
### 类的由来
Javascript 语言中，生成实例对象的传统方法是通过构造函数。下面是一个例子。

```javascript
function Point(x, y) {
  this.x = x
  this.y = y
}
Point.prototype.toString = function () {
  return '(' + this.x + ',' + this.y')'
}
var p = new Point(1, 2)
```

上面这种写法跟传统的面向对象语言（比如 C++ 和 Java）差异很大，很容易让新学习这门语言的程序员感到困惑。

ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过`class`关键字，可以定义类。

 基本上，ES6 的`class`可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的`class`写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。上面的代码用 ES6 的`class`改写，就是下面这样。 

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```

上面代码定义了一个“类”，可以看到里面有一个`constructor`方法，这就是构造方法，而`this`关键字则代表实例对象。也就是说，ES5 的构造函数`Point`，对应 ES6 的`Point`类的构造方法。

`Point`类除了构造方法，还定义了一个`toString`方法。注意，定义“类”的方法的时候，前面不需要加上`function`这个关键字，直接把函数定义放进去了就可以了。另外，方法之间不需要逗号分隔，加了会报错。

 ES6 的类，完全可以看作构造函数的另一种写法。 

```javascript
class Point {
  // ...
}

typeof Point // "function"
Point === Point.prototype.constructor // true
```

上面代码表明，类的数据类型就是函数，类的本身就指向构造函数。

使用的时候，也是直接对类使用 `new` 命令， 跟构造函数的用法完全一致。

```javascript
class Bar {
  doStuff () {
      console.log('stuff')
  }
}
var b = new Bar()
b.doStuff() // 'stuff'
```

 构造函数的`prototype`属性，在 ES6 的“类”上面继续存在。事实上，类的所有方法都定义在类的`prototype`属性上面。 

```javascript
class Point {
  constructor() {
    // ...
  }

  toString() {
    // ...
  }

  toValue() {
    // ...
  }
}

// 等同于

Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};
```

 在类的实例上面调用方法，其实就是调用原型上的方法。 

```javascript
class B {}
let b = new B();

b.constructor === B.prototype.constructor // true
```

 上面代码中，`b`是`B`类的实例，它的`constructor`方法就是`B`类原型的`constructor`方法。 



 由于类的方法都定义在`prototype`对象上面，所以类的新方法可以添加在`prototype`对象上面。`Object.assign`方法可以很方便地一次向类添加多个方法。 

```javascript
class Point {
  constructor(){
    // ...
  }
}

Object.assign(Point.prototype, {
  toString(){},
  toValue(){}
});
```

> 注意： ` Object.assign() `  方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
>
> ```javascript
> const target = { a: 1, b: 2 };
> const source = { b: 4, c: 5 };
> 
> const returnedTarget = Object.assign(target, source);
> 
> console.log(target);
> // expected output: Object { a: 1, b: 4, c: 5 }
> 
> console.log(returnedTarget);
> // expected output: Object { a: 1, b: 4, c: 5 }
> ```

 `prototype`对象的`constructor`属性，直接指向“类”的本身，这与 ES5 的行为是一致的。 

```javascript
Point.prototype.constructor === Point // true
```

另外，类的内部所有定义的方法，都是不可枚举的（non-enumerable）

```javascript
class Point {
  constructor(x, y) {
    // ...
  }

  toString() {
    // ...
  }
}

Object.keys(Point.prototype)
// []
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
```

 上面代码中，`toString`方法是`Point`类内部定义的方法，它是不可枚举的。这一点与 ES5 的行为不一致。 

```javascript
var Point = function (x, y) {
  // ...
};

Point.prototype.toString = function() {
  // ...
};

Object.keys(Point.prototype)
// ["toString"]
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
```



-----------

### constructor方法

 `constructor`方法是类的默认方法，通过`new`命令生成对象实例时，自动调用该方法。一个类必须有`constructor`方法，如果没有显式定义，一个空的`constructor`方法会被默认添加。 

``` javascript
class Point {
}

// 等同于
class Point {
  constructor() {}
}
```

上面代码中，定义了一个空的类 `Point` , JavaScript 引擎会自动为他添加一个空的 `constructor` 方法。

`constructor` 方法默认返回实例对象（即 `this`）, 完全可以指定返回另外一个对象。

```javascript
class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo
// false
```

上面代码中，`constructor`函数返回一个全新的对象，结果导致实例对象不是`Foo`类的实例。 

> 注意：  **`instanceof`** **运算符**用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。 
>
> 语法： `object instanceof constructor`  
>
> 参数： `object`: 某个实例对象，  `constructor`: 某个构造函数



 类必须使用`new`调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用`new`也可以执行。 

```javascript
class Foo {
  constructor() {
    return Object.create(null);
  }
}

Foo()
// TypeError: Class constructor Foo cannot be invoked without 'new'
```



------------------------

### 类的实例

 生成类的实例的写法，与 ES5 完全一样，也是使用`new`命令。前面说过，如果忘记加上`new`，像函数那样调用`Class`，将会报错。 

```javascript
class Point {
  // ...
}

// 报错
var point = Point(2, 3);

// 正确
var point = new Point(2, 3);
```

 与 ES5 一样，实例的属性除非显式定义在其本身（即定义在`this`对象上），否则都是定义在原型上（即定义在`class`上）。 

```javascript
//定义类
class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

}

var point = new Point(2, 3);

point.toString() // (2, 3)

point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true
```

> 注意： **`hasOwnProperty()`**  方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。 
>
> 语法：`obj.hasOwnProperty(prop)`
>
> 参数： `prop` 要检测的属性的 `String` 字符串形式表示的名称， 或者 `Symbol`
>
> 返回值： 用来判断某个对象是否含有指定的属性的布尔值 `Boolean`。

上面代码中， `x` 和 `y` 都是实例对象 `point` 的自身属性（因为定义在 `this` 变量上）， 所以 `hasOwnProperty` 方法返回 `true`, 而 `toString` 是原型对象的属性（因为定义在 `point` 类上）， 所以 `hasOwnProperty` 方法返回    `false` 。这些都与 ES5 的行为保持一致。



 与 ES5 一样，类的所有实例共享一个原型对象。 

```javascript
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__ === p2.__proto__
//true
```

上面代码中，`p1`和 `p2` 都是 `Point` 的实例， 他们的原型都是 `Point.prototype`, 所以 `__proto__` 属性是相等的。

这也意味着，可以通过实例的 `__proto__` 属性为 “类” 添加方法。

 `__proto__` 并不是语言本身的特性，这是各大厂商具体实现时添加的私有属性，虽然目前很多现代浏览器的 JS 引擎中都提供了这个私有属性，但依旧不建议在生产中使用该属性，避免对环境产生依赖。生产环境中，我们可以使用 `Object.getPrototypeOf` 方法来获取实例对象的原型，然后再来为原型添加方法/属性。 

```javascript
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__.printName = function () { return 'Oops' };

p1.printName() // "Oops"
p2.printName() // "Oops"

var p3 = new Point(4,2);
p3.printName() // "Oops"
```

 上面代码在`p1`的原型上添加了一个`printName`方法，由于`p1`的原型就是`p2`的原型，因此`p2`也可以调用这个方法。而且，此后新建的实例`p3`也可以调用这个方法。这意味着，使用实例的`__proto__`属性改写原型，必须相当谨慎，不推荐使用，因为这会改变“类”的原始定义，影响到所有实例。 



-------------------------

### 取值函数（getter）和存值函数（setter）

 与 ES5 一样，在“类”的内部可以使用`get`和`set`关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。 

```javascript
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'
```

 上面代码中，`prop`属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了。 

存值函数和取值函数是设置在属性的 Descriptor 对象上的。

```javascript
class CustomHTMLElement {
  constructor(element) {
    this.element = element;
  }

  get html() {
    return this.element.innerHTML;
  }

  set html(value) {
    this.element.innerHTML = value;
  }
}
var descriptor = Object.getOwnPropertyDescriptor(
  CustomHTMLElement.prototype, "html"
);

"get" in descriptor  // true
"set" in descriptor  // true
```

> 注意：  **`Object.getOwnPropertyDescriptor()`** 方法返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性） 
>
> 语法：`Object.getOwnPropertyDescriptor(obj, prop)`
>
> 参数：`obj` 需要查找的目标对象， `prop` 目标对象内的属性名称
>
> 返回值：  如果指定的属性存在于对象上，则返回其属性描述符对象（property descriptor），否则返回 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)。 

上面代码中，存值函数和取值函数是定义在`html`属性的描述对象上面，这与 ES5 完全一致。 



--------------

### 属性表达式

 类的属性名，可以采用表达式。 

```javascript
let methodName = 'getArea';

class Square {
  constructor(length) {
    // ...
  }

  [methodName]() {
    // ...
  }
}
```

 上面代码中，`Square`类的方法名`getArea`，是从表达式得到的。 



------------

### Class 表达式

 与函数一样，类也可以使用表达式的形式定义。 

```javascript
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
```

 上面代码使用表达式定义了一个类。需要注意的是，这个类的名字是`Me`，但是`Me`只在 Class 的内部可用，指代当前类。在 Class 外部，这个类只能用`MyClass`引用。 

```javascript
let inst = new MyClass();
inst.getClassName() // Me
Me.name // ReferenceError: Me is not defined
```

 上面代码表示，`Me`只在 Class 内部有定义。 

如果类的内部没用到的话，可以省略 `Me`, 也就是可以写成下面的形式。

```javascript
const MyClass = class {/*.............*/}
```

采用 Class 表达式，可以写出立即执行的 Class。

```javascript
let person = new class {
    constructor (name) {
        this.name = name
    }
    sayName () {
        console.log(this.name)
    }
}('张三')
person.sayName() // '张三'
```

上面代码中， `person` 是一个立即执行的类的实例



----------------------------------------------



-----------------

### 注意点

__（1)  严格模式__

​	类和模块的内部，默认就是严格模式，所以不需要使用`use strict`指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式 

__(2)  不存在提升__

类不存在变量提升（hoist），这一点与 ES5 完全不同。

```javascript
new Foo() //new Foo(); // ReferenceError
class Foo {}
```

 上面代码中，`Foo`类使用在前，定义在后，这样会报错，因为 ES6 不会把类的声明提升到代码头部。这种规定的原因与下文要提到的继承有关，必须保证子类在父类之后定义。 

``` javascript
{
  let Foo = class {};
  class Bar extends Foo {
  }
}
```

上面代码不会报错， 因为`Bar` 继承 `Foo` 的时候, `Foo` 已经有定义了。但是，如果存在 `class` 的提升， 上面代码就会报错，因为 `class` 会被提升到代码头部，而 `let` 命令是不提升的，所以导致 `Bar` 继承 `Foo` 的时候， `Foo` 还没有定义。

__(3)  name 属性__

由于本质上， ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被 `Class` 继承， 包括 `name` 属性。

```javascript
class Point {}
Point.name // "Point"
```

`name` 属性总是返回紧跟在 `class` 关键字后面的类名。

__(4)  Generator 方法__

如果某个方法之前加上星号 （`*`）,就表示该方法是一个 Generator 函数。

```javascript
class Foo {
  constructor(...args) {
    this.args = args;
  }
  * [Symbol.iterator]() {
    for (let arg of this.args) {
      yield arg;
    }
  }
}

for (let x of new Foo('hello', 'world')) {
  console.log(x);
}
// hello
// world
```

>注意：  `yield` 关键字用来暂停和恢复一个生成器函数（([`function*`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*) 或[遗留的生成器函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/Legacy_generator_function)） 
>
>语法： [rv] = yield [expression]
>
>参数： `rv` : 返回传递给生成器的 `next()` 方法的可选值，以恢复其执行。

 上面代码中，`Foo`类的`Symbol.iterator`方法前有一个星号，表示该方法是一个 Generator 函数。`Symbol.iterator`方法返回一个`Foo`类的默认遍历器，`for...of`循环会自动调用这个遍历器。 

__(5)  this 的指向__

 类的方法内部如果含有`this`，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。 

``` javascript
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
```

 上面代码中，`printName`方法中的`this`，默认指向`Logger`类的实例。但是，如果将这个方法提取出来单独使用，`this`会指向该方法运行时所在的环境（由于 class 内部是严格模式，所以 this 实际指向的是`undefined`），从而导致找不到`print`方法而报错。 

一个比较简单的解决方法是，在构造方法中绑定 `this`, 这样就不会找不到 `print` 方法了。

``` javascript
class Logger {
  constructor() {
    this.printName = this.printName.bind(this);
  }

  // ...
}
```

另一种解决方法是使用箭头函数。

```javascript
class Obj {
  constructor() {
    this.getThis = () => this;
  }
}

const myObj = new Obj();
myObj.getThis() === myObj // true
```

箭头函数内部的 `this` 总是指定定义时所在的对象。上面代码中，箭头函数位于构造函数内部， 它的定义生效的时候，是在构造函数执行的时候。这时，箭头函数所在的运行环境，肯定是实例对象， 所以 `this` 会总是指向实例对象。



还有一种解决方法是使用 `Proxy`, 获取方法的时候，自动绑定 `this`。

``` javascript
function selfish(target) {
    const cache = new WeakMap();
    const handler = {
        get (target, key) {
            const value = Reflect.get(target, key);
            if (typeof value !== 'function' {
                return value
            }
            if (!cache.has(value)) {
                cache.set(value, value.bind(target));
            }
            return cache.get(value)
        }
    };
    const proxy = new Proxy(target, handler);
    return proxy
}

const logger = selfish(new Logger())
```



------------------------------

## 2. 静态方法

 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上`static`关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。 

```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
```

上面代码中， `Foo` 类的 `classMethod` 方法前有 `static`  关键字, 表明该方法是一个静态方法，可以直接在 `Foo` 类上调用（`Foo.classMethod()`）， 而不是在 `Foo` 类的实例上调用。如果在实例上调用静态方法，会抛出一个错误，表示不存在该方法。



注意： 如果静态方法包含 `this` 关键字，这个 `this` 指的是类，而不是实例。

```javascript
class Foo {
  static bar() {
    this.baz();
  }
  static baz() {
    console.log('hello');
  }
  baz() {
    console.log('world');
  }
}

Foo.bar() // hello
```

上面代码中，静态方法 `bar` 调用了 `this.baz` ,  这里的 `this` 值得是 `Foo` 类， 而不是 `Foo` 的实例，等同于调用 `Foo.baz` 。另外 ，从这个例子还可以看出，静态方法可以与非静态方法重名。 

 父类的静态方法，可以被子类继承。 

```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
}

Bar.classMethod() // 'hello'
```

上面代码中， 父类 `Foo` 有一个静态方法，子类 `bar` 可以调用这个方法。

静态方法也是可以从 `super` 对象上调用的。

``` javascript
class Foo {
	static classMethod () {
        return 'hello'
    }
}
class Bar extends Foo {
    static classMethod () {
        return super.classMethod() + ', too';
    }
}

Bar.classMethod() // 'hello, too'
```



------------------

## 3. 实例属性的新写法

实例属性除了定义在 `constructor()` 方法里面的 `this` 上面，也可以定义在类的最顶层。

```javascript
class IncreasingCounter {
    constructor () {
        this._count = 0;
    }
    get value () {
    	console.log('Getting the current value!');
        return this._count;
    }
    increment () {
        this._count++;
    }
}
```

上面代码中，实例属性 `this._count` 定义在 `constructor()` 方法里面。另一种写法是， 这个属性也可以定义在类的最顶层，其他都不变。

``` javascript
class IncreasingCounter {
  _count = 0;
  get value() {
    console.log('Getting the current value!');
    return this._count;
  }
  increment() {
    this._count++;
  }
}
```

上面代码中，实例属性 `_count` 与取值函数 `value()` 和 `increment()` 方法，处于同一个层级。这时，不需要再实例属性前面加上 `this`。

这种新写法的好处是， 所有实例对象自身的属性都定义在类的头部，看上去比较整齐，一眼就能看出这个类有哪些实例属性。

``` javascript
class foo {
  bar = 'hello';
  baz = 'world';

  constructor() {
    // ...
  }
}
```

 上面的代码，一眼就能看出，`foo`类有两个实例属性，一目了然。另外，写起来也比较简洁。 



----------------

## 4. 静态属性

静态属性指的是 Class 本身的属性，即 `Class.propName`， 而不是定义在实例对象（`this`）上的属性。

``` javscript
class Foo {
}

Foo.prop = 1
Foo.prop // 1
```

上面的写法为`Foo`类定义了一个静态属性`prop`。

目前，只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。现在有一个[提案](https://github.com/tc39/proposal-class-fields)提供了类的静态属性。



------------------------------

## 5. 私有方法和私有属性

### 现有的解决方案

私有方法和私有属性，是只能在类的内部访问的方法和属性，外部不能访问。这是常见需求，有利于代码的封装，但 ES6 不提供，只能通过变通方法模拟实现。

一种做法是在命名上加以区别。

``` javascript
class Widget {

  // 公有方法
  foo (baz) {
    this._bar(baz);
  }

  // 私有方法
  _bar(baz) {
    return this.snaf = baz;
  }

  // ...
}
```

 上面代码中，`_bar`方法前面的下划线，表示这是一个只限于内部使用的私有方法。但是，这种命名是不保险的，在类的外部，还是可以调用到这个方法。 

 另一种方法就是索性将私有方法移出模块，因为模块内部的所有方法都是对外可见的。 

```javascript
class Widget {
  foo (baz) {
    bar.call(this, baz);
  }

  // ...
}

function bar(baz) {
  return this.snaf = baz;
}
```

上面代码中， `foo` 是公开方法，内部调用了 `bar.call(this, baz)` 这使得 `bar` 实际上成为了当前模块的私有方法。

 还有一种方法是利用`Symbol`值的唯一性，将私有方法的名字命名为一个`Symbol`值。 

``` javascript
const bar = Symbol('bar');
const snaf = Symbol('snaf');

export default class myClass{

  // 公有方法
  foo(baz) {
    this[bar](baz);
  }

  // 私有方法
  [bar](baz) {
    return this[snaf] = baz;
  }

  // ...
};
```

 上面代码中，`bar`和`snaf`都是`Symbol`值，一般情况下无法获取到它们，因此达到了私有方法和私有属性的效果。但是也不是绝对不行，`Reflect.ownKeys()`依然可以拿到它们。 

``` javascript
const inst = new myClass();

Reflect.ownKeys(myClass.prototype)
// [ 'constructor', 'foo', Symbol(bar) ]
```

 上面代码中，Symbol 值的属性名依然可以从类的外部拿到。 



----------------------

## 6. new.target 属性

 `new`是从构造函数生成实例对象的命令。ES6 为`new`命令引入了一个`new.target`属性，该属性一般用在构造函数之中，返回`new`命令作用于的那个构造函数。如果构造函数不是通过`new`命令或`Reflect.construct()`调用的，`new.target`会返回`undefined`，因此这个属性可以用来确定构造函数是怎么调用的。 

```javascript
function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

// 另一种写法
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

var person = new Person('张三'); // 正确
var notAPerson = Person.call(person, '张三');  // 报错
```

 上面代码确保构造函数只能通过`new`命令调用。 

``` javascript
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    this.length = length;
    this.width = width;
  }
}

var obj = new Rectangle(3, 4); // 输出 true
```

需要注意的是，子类继承父类时， `new.target` 会返回子类。

``` javascript
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    // ...
  }
}

class Square extends Rectangle {
  constructor(length) {
    super(length, width);
  }
}

var obj = new Square(3); // 输出 false
```

 利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。 

```javascript
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}

var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确
```

上面代码中，`Shape`类不能被实例化，只能用于继承。

注意，在函数外部，使用`new.target`会报错。



