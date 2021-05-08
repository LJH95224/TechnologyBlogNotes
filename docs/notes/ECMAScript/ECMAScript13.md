# 13. Proxy

> 1、概述
>
> 2、Proxy 实例的方法
>
> 3、Proxy.revocable()
>
> 4、this 问题
>
> 5、实例： web 服务的客户端

## 1、概述

 Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。 

Proxy 可以理解成，在目标对象之外架设一层 “拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来 “代理” 某些操作，可以译为代理器。

```js
var obj = new Proxy({}, {
  get: function (target, propKey, receiver) {
    console.log(`getting ${propKey}!`);
    return Reflect.get(target, propKey, receiver);
  },
  set: function (target, propKey, value, receiver) {
    console.log(`setting ${propKey}!`);
    return Reflect.set(target, propKey, value, receiver);
  }
});
```

上面代码对一个空对象架设了一层拦截，重定义了属性的读取（`get`）和设置（`set`）行为。这里暂时先不解释具体的语法，只看运行结果。对设置了拦截行为的对象`obj`，去读写它的属性，就会得到下面的结果。

```js
obj.count = 1
//  setting count!
++obj.count
//  getting count!
//  setting count!
//  2
```

 上面代码说明，Proxy 实际上重载（overload）了点运算符，即用自己的定义覆盖了语言的原始定义。 

 ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。 

```js
var proxy = new Proxy(target, handler);
```

 Proxy 对象的所有用法，都是上面这种形式，不同的只是`handler`参数的写法。其中，`new Proxy()`表示生成一个`Proxy`实例，`target`参数表示所要拦截的目标对象，`handler`参数也是一个对象，用来定制拦截行为。 

 下面是另一个拦截读取属性行为的例子 

```js
var proxy = new Proxy({}, {
  get: function(target, propKey) {
    return 35;
  }
});

proxy.time // 35
proxy.name // 35
proxy.title // 35
```

上面代码中 ， 作为构造函数，`Proxy` 接收两个参数，第一个参数是所要代理的目标对象（上面例子是一个空对象），即如果没有 `Proxy` 的介入，操作原来要访问的就是这个对象；第二个参数是一个配置对象，对于每一个被代理的操作，需要提供一个对应的处理函数，该函数将拦截对应的操作。 比如，上面代码中，配置对象有一个`get`方法，用来拦截对目标对象属性的访问请求。`get`方法的两个参数分别是目标对象和所要访问的属性。可以看到，由于拦截函数总是返回`35`，所以访问任何属性都得到`35`。 

 注意，要使得`Proxy`起作用，必须针对`Proxy`实例（上例是`proxy`对象）进行操作，而不是针对目标对象（上例是空对象）进行操作。 

 如果`handler`没有设置任何拦截，那就等同于直接通向原对象。 

```js
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'b';
target.a // "b"
```

 一个技巧是将 Proxy 对象，设置到`object.proxy`属性，从而可以在`object`对象上调用。 

```javascript
var object = { proxy: new Proxy(target, handler) };
```

 Proxy 实例也可以作为其他对象的原型对象。 

```javascript
var proxy = new Proxy({}, {
  get: function(target, propKey) {
    return 35;
  }
});

let obj = Object.create(proxy);
obj.time // 35
```

上面代码中，`proxy`对象是`obj`对象的原型，`obj`对象本身并没有`time`属性，所以根据原型链，会在`proxy`对象上读取该属性，导致被拦截。

同一个拦截器函数，可以设置拦截多个操作。

```javascript
var handler = {
  get: function(target, name) {
    if (name === 'prototype') {
      return Object.prototype;
    }
    return 'Hello, ' + name;
  },

  apply: function(target, thisBinding, args) {
    return args[0];
  },

  construct: function(target, args) {
    return {value: args[1]};
  }
};

var fproxy = new Proxy(function(x, y) {
  return x + y;
}, handler);

fproxy(1, 2) // 1
new fproxy(1, 2) // {value: 2}
fproxy.prototype === Object.prototype // true
fproxy.foo === "Hello, foo" // true
```

对于可以设置、但没有设置拦截的操作，则直接落在目标对象上，按照原先的方式产生结果。

下面是 Proxy 支持的拦截操作一览，一共 13 种。

- **get(target, propKey, receiver)**：拦截对象属性的读取，比如`proxy.foo`和`proxy['foo']`。
- **set(target, propKey, value, receiver)**：拦截对象属性的设置，比如`proxy.foo = v`或`proxy['foo'] = v`，返回一个布尔值。
- **has(target, propKey)**：拦截`propKey in proxy`的操作，返回一个布尔值。
- **deleteProperty(target, propKey)**：拦截`delete proxy[propKey]`的操作，返回一个布尔值。
- **ownKeys(target)**：拦截`Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)`、`Object.keys(proxy)`、`for...in`循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而`Object.keys()`的返回结果仅包括目标对象自身的可遍历属性。
- **getOwnPropertyDescriptor(target, propKey)**：拦截`Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象。
- **defineProperty(target, propKey, propDesc)**：拦截`Object.defineProperty(proxy, propKey, propDesc）`、`Object.defineProperties(proxy, propDescs)`，返回一个布尔值。
- **preventExtensions(target)**：拦截`Object.preventExtensions(proxy)`，返回一个布尔值。
- **getPrototypeOf(target)**：拦截`Object.getPrototypeOf(proxy)`，返回一个对象。
- **isExtensible(target)**：拦截`Object.isExtensible(proxy)`，返回一个布尔值。
- **setPrototypeOf(target, proto)**：拦截`Object.setPrototypeOf(proxy, proto)`，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
- **apply(target, object, args)**：拦截 Proxy 实例作为函数调用的操作，比如`proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`。
- **construct(target, args)**：拦截 Proxy 实例作为构造函数调用的操作，比如`new proxy(...args)`。

## 2 Proxy 实例的方法

下面是上面这些拦截方法的详细介绍

### get()

`get` 方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象，属性名和Proxy 实例本身（严格的来说，是操作行为所针对的对象），其中最后一个参数可选。

 `get`方法的用法，上文已经有一个例子，下面是另一个拦截读取操作的例子。 

```javascript
var person = {
  name: "张三"
};

var proxy = new Proxy(person, {
  get: function(target, propKey) {
    if (propKey in target) {
      return target[propKey];
    } else {
      throw new ReferenceError("Prop name \"" + propKey + "\" does not exist.");
    }
  }
});

proxy.name // "张三"
proxy.age // 抛出一个错误
```

 上面代码表示，如果访问目标对象不存在的属性，会抛出一个错误。如果没有这个拦截函数，访问不存在的属性，只会返回`undefined`。 

 `get`方法可以继承。 

```javascript
let proto = new Proxy({}, {
  get(target, propertyKey, receiver) {
    console.log('GET ' + propertyKey);
    return target[propertyKey];
  }
});

let obj = Object.create(proto);
obj.foo // "GET foo"
```

![1620378195323](F:\myGIthub\TechnologyBlogNotes\docs\.vuepress\public\image\es6\1620378195323.png)

 上面代码中，拦截操作定义在`Prototype`对象上面，所以如果读取`obj`对象继承的属性时，拦截会生效。 

 下面的例子使用`get`拦截，实现数组读取负数的索引。 

```javascript
function createArray(...elements) {
  let handler = {
    get(target, propKey, receiver) {
      let index = Number(propKey);
      if (index < 0) {
        propKey = String(target.length + index);
      }
      return Reflect.get(target, propKey, receiver);
    }
  };

  let target = [];
  target.push(...elements);
  return new Proxy(target, handler);
}

let arr = createArray('a', 'b', 'c');
arr[-1] // c
```

上面代码中，数组的位置参数是`-1`，就会输出数组的倒数第一个成员。

利用 Proxy，可以将读取属性的操作（`get`），转变为执行某个函数，从而实现属性的链式操作。

```javascript
var pipe = function (value) {
  var funcStack = [];
  var oproxy = new Proxy({} , {
    get : function (pipeObject, fnName) {
      if (fnName === 'get') {
        return funcStack.reduce(function (val, fn) {
          return fn(val);
        },value);
      }
      funcStack.push(window[fnName]);
      return oproxy;
    }
  });

  return oproxy;
}

var double = n => n * 2;
var pow    = n => n * n;
var reverseInt = n => n.toString().split("").reverse().join("") | 0;

pipe(3).double.pow.reverseInt.get; // 63
```

 上面代码设置 Proxy 以后，达到了将函数名链式使用的效果。 

 下面的例子则是利用`get`拦截，实现一个生成各种 DOM 节点的通用函数`dom`。 

```JavaScript
const dom = new Proxy({}, {
	get(target, property) {
	  return function(attrs = {}, ...children) {
	    const el = document.createElement(property);
	    for (let prop of Object.keys(attrs)) {
	      el.setAttribute(prop, attrs[prop]);
	    }
	    for (let child of children) {
	      if (typeof child === 'string') {
	        child = document.createTextNode(child);
	      }
	      el.appendChild(child);
	    }
	    return el;
	  }
	}
});

const el = dom.div({},
  'Hello, my name is ',
  dom.a({href: 'https://www.baidu.com'}, 'baidu'),
  '. I like:',
  dom.ul({},
    dom.li({}, 'The web'),
    dom.li({}, 'Food'),
    dom.li({}, '…actually that\'s it')
  )
);

document.body.appendChild(el);
```
![1620380256728](F:\myGIthub\TechnologyBlogNotes\docs\.vuepress\public\image\es6\1620380256728.png)

![1620380279379](F:\myGIthub\TechnologyBlogNotes\docs\.vuepress\public\image\es6\1620380279379.png)

 下面是一个`get`方法的第三个参数的例子，它总是指向原始的读操作所在的那个对象，一般情况下就是 Proxy 实例。 

```javascript
const proxy = new Proxy({}, {
  get: function(target, key, receiver) {
    return receiver;
  }
});
proxy.getReceiver === proxy // true
```

 上面代码中，`proxy`对象的`getReceiver`属性是由`proxy`对象提供的，所以`receiver`指向`proxy`对象。 

```javascript
const proxy = new Proxy({}, {
  get: function(target, key, receiver) {
    return receiver;
  }
});

const d = Object.create(proxy);
d.a === d // true
```

 上面代码中，`d`对象本身没有`a`属性，所以读取`d.a`的时候，会去`d`的原型`proxy`对象找。这时，`receiver`就指向`d`，代表原始的读操作所在的那个对象。 

 如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错。 

```javascript
const target = Object.defineProperties({}, {
  foo: {
    value: 123,
    writable: false,
    configurable: false
  },
});

const handler = {
  get(target, propKey) {
    return 'abc';
  }
};

const proxy = new Proxy(target, handler);

proxy.foo
// TypeError: Invariant check failed
```



### set()

 `set`方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。 

 假定`Person`对象有一个`age`属性，该属性应该是一个不大于 200 的整数，那么可以使用`Proxy`保证`age`的属性值符合要求。 

```js
let validator = {
	set: function(obj, prop, value) {
		if (prop === 'age') {
			if (!Number.isInteger(value)) {
				throw new TypeError('The age is not an integer')
			}
			if (value > 200) {
				throw new RangeError('The age seems invalid')
			}
		}
		// 对于满足条件的 age 属性以及其他属性，直接保存
    obj[prop] = value;
    return true;
	}
}
let person = new Proxy({}, validator)
```

![1620380899179](F:\myGIthub\TechnologyBlogNotes\docs\.vuepress\public\image\es6\1620380899179.png)

> 注：Number.isInteger 判断目标值是否为整数，如果目标值为整数，则返回true，否则返回false
>
> 如果值为 NaN 或者 Infinity 则返回 false，带小数点的整数也可以判断为 true
>
> ```js
> Number.isInteger(0);         // true
> Number.isInteger(1);         // true
> Number.isInteger(-100000);   // true
> Number.isInteger(99999999999999999999999); // true
> 
> Number.isInteger(0.1);       // false
> Number.isInteger(Math.PI);   // false
> 
> Number.isInteger(NaN);       // false
> Number.isInteger(Infinity);  // false
> Number.isInteger(-Infinity); // false
> Number.isInteger('10');      // false
> Number.isInteger(true);      // false
> Number.isInteger(false);     // false
> Number.isInteger([1]);       // false
> 
> Number.isInteger(5.0);       // true
> Number.isInteger(5.000000000000001); // false
> Number.isInteger(5.0000000000000001); // true
> ```

 上面代码中，由于设置了存值函数`set`，任何不符合要求的`age`属性赋值，都会抛出一个错误，这是数据验证的一种实现方法。利用`set`方法，还可以数据绑定，即每当对象发生变化时，会自动更新 DOM。 

 有时，我们会在对象上面设置内部属性，属性名的第一个字符使用下划线开头，表示这些属性不应该被外部使用。结合`get`和`set`方法，就可以做到防止这些内部属性被外部读写。

```js
const handler = {
				get(target, key) {
					invariant(key, 'get')
					return target[key]
				},
				set(target, key, value) {
					invariant(key, 'set')
					target[key] = value
					return true
				}
			}
			function invariant(key, action) {
				if (key[0] === '_') {
					throw new Error(`Invalid attempt to ${action} private "${key}" property`);
				}
			}
			const target = {}
			const proxy = new Proxy(target, handler)
```



![1620437943507](F:\myGIthub\TechnologyBlogNotes\docs\.vuepress\public\image\es6\1620437943507.png) 

 上面代码中，只要读写的属性名的第一个字符是下划线，一律抛错，从而达到禁止读写内部属性的目的。 

 下面是`set`方法第四个参数的例子。 

```javascript
const handler = {
  set: function(obj, prop, value, receiver) {
    obj[prop] = receiver;
    return true;
  }
};
const proxy = new Proxy({}, handler);
proxy.foo = 'bar';
proxy.foo === proxy // true
```

 上面代码中，`set`方法的第四个参数`receiver`，指的是原始的操作行为所在的那个对象，一般情况下是`proxy`实例本身，请看下面的例子。 

```javascript
const handler = {
  set: function(obj, prop, value, receiver) {
    obj[prop] = receiver;
    return true;
  }
};
const proxy = new Proxy({}, handler);
const myObj = {};
Object.setPrototypeOf(myObj, proxy);

myObj.foo = 'bar';
myObj.foo === myObj // true
```

 上面代码中，设置`myObj.foo`属性的值时，`myObj`并没有`foo`属性，因此引擎会到`myObj`的原型链去找`foo`属性。`myObj`的原型对象`proxy`是一个 Proxy 实例，设置它的`foo`属性会触发`set`方法。这时，第四个参数`receiver`就指向原始赋值行为所在的对象`myObj`。 

 注意，如果目标对象自身的某个属性不可写，那么`set`方法将不起作用。 

```javascript
const obj = {};
Object.defineProperty(obj, 'foo', {
  value: 'bar',
  writable: false
});

const handler = {
  set: function(obj, prop, value, receiver) {
    obj[prop] = 'baz';
    return true;
  }
};

const proxy = new Proxy(obj, handler);
proxy.foo = 'baz';
proxy.foo // "bar"
```

 上面代码中，`obj.foo`属性不可写，Proxy 对这个属性的`set`代理将不会生效。 

 注意，`set`代理应当返回一个布尔值。严格模式下，`set`代理如果没有返回`true`，就会报错。 

```js
'use strict';
const handler = {
  set: function(obj, prop, value, receiver) {
    obj[prop] = receiver;
    // 无论有没有下面这一行，都会报错
    return false;
  }
};
const proxy = new Proxy({}, handler);
proxy.foo = 'bar';
// TypeError: 'set' on proxy: trap returned falsish for property 'foo'
```

 上面代码中，严格模式下，`set`代理返回`false`或者`undefined`，都会报错。 

### apply()

`apply` 方法拦截函数的调用，`call` 和 `apply` 操作。

`apply` 方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（`this`）和目标对象的参数数组。

```js
var handler = {
    apply (target, ctx, args) {
        return Reflect.apply(...arguments)
    }
}
```

 下面是一个例子。 

```javascript
var target = function () { return 'I am the target'; };
var handler = {
  apply: function () {
    return 'I am the proxy';
  }
};

var p = new Proxy(target, handler);

p()
// "I am the proxy"
```

 上面代码中，变量`p`是 Proxy 的实例，当它作为函数调用时（`p()`），就会被`apply`方法拦截，返回一个字符串。 

 下面是另外一个例子。 

```js
var twice = {
  apply (target, ctx, args) {
    return Reflect.apply(...arguments) * 2;
  }
};
function sum (left, right) {
  return left + right;
};
var proxy = new Proxy(sum, twice);
proxy(1, 2) // 6
proxy.call(null, 5, 6) // 22
proxy.apply(null, [7, 8]) // 30
```

上面代码中，每当执行`proxy`函数（直接调用或`call`和`apply`调用），就会被`apply`方法拦截。

另外，直接调用`Reflect.apply`方法，也会被拦截。

```javascript
Reflect.apply(proxy, null, [9, 10]) // 38
```



### has()

`has()`方法用来拦截`HasProperty`操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是`in`运算符。

`has()`方法可以接受两个参数，分别是目标对象、需查询的属性名。

 下面的例子使用`has()`方法隐藏某些属性，不被`in`运算符发现。 

```javascript
var handler = {
  has (target, key) {
    if (key[0] === '_') {
      return false;
    }
    return key in target;
  }
};
var target = { _prop: 'foo', prop: 'foo' };
var proxy = new Proxy(target, handler);
'_prop' in proxy // false
```