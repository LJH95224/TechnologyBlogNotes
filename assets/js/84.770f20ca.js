(window.webpackJsonp=window.webpackJsonp||[]).push([[84],{527:function(n,t,e){"use strict";e.r(t);var a=e(44),s=Object(a.a)({},(function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[e("h1",{attrs:{id:"_7-函数的扩展"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_7-函数的扩展"}},[n._v("#")]),n._v(" 7. 函数的扩展")]),n._v(" "),e("blockquote",[e("ol",[e("li",[n._v("函数参数的默认值")]),n._v(" "),e("li",[n._v("rest 函数")]),n._v(" "),e("li",[n._v("严格模式")]),n._v(" "),e("li",[n._v("name 属性")]),n._v(" "),e("li",[n._v("箭头函数")]),n._v(" "),e("li",[n._v("双冒号运算符")]),n._v(" "),e("li",[n._v("尾调用优化")]),n._v(" "),e("li",[n._v("函数参数的尾逗号")])])]),n._v(" "),e("h2",{attrs:{id:"_1-函数参数的默认值"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-函数参数的默认值"}},[n._v("#")]),n._v(" 1. 函数参数的默认值")]),n._v(" "),e("h3",{attrs:{id:"基本用法"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#基本用法"}},[n._v("#")]),n._v(" 基本用法")]),n._v(" "),e("p",[n._v("ES6之前， 不能直接为函数的参数指定默认值，只能采用变通的方法")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("function log(x, y) {\n    y = y | 'World';\n}\nlog('Hello') // Hello World\nlog('Hello', 'China') // Hello China\nlog('Hello', '') // Hello World\n")])])]),e("p",[n._v("上面代码检查函数，"),e("strong",[n._v("log")]),n._v(" 的参数 "),e("strong",[n._v("y")]),n._v(" 有没有赋值，如果没有，则指定默认值 "),e("strong",[n._v("world")]),n._v(" 。这种写法的缺点在于，如果参数 "),e("strong",[n._v("y")]),n._v(" 赋值了，但是对应的布尔值为 false， 则该赋值不起作用。就像上面代码的最后一行，参数 "),e("strong",[n._v("y")]),n._v(" 等于空字符，结果被改为默认值。")]),n._v(" "),e("p",[n._v("为了避免这个问题，通过需要先判断一下参数 "),e("strong",[n._v("y")]),n._v(" 是否被赋值，如果没有， 再等于默认值")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("if (typeof y === 'undefined') {\n    y = 'World';\n}\n")])])]),e("p",[n._v("ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("function log(x, y = 'World') {\n    console.log(x, y);\n}\nlog('Hello') // Hello World\nlog('Hello', 'China') // Hello China\nlog('Hello', '') // Hello\n")])])]),e("p",[n._v("可以看到， ES6的写法比ES5简洁许多，而且非常自然。 下面是另一个例子。")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("function Point(x = 0, y = 0) {\n    this.x = x;\n    this.y = y;\n}\n\nconst p = new Point();\np // {x: 0, y: 0}\n")])])]),e("p",[n._v("除了简洁，ES6的写法还有两个好处： 首先阅读代码的人，可以立刻意识到哪些参数是可以省略的，不用查看函数体或文档；其次，有利于将来的代码优化，即使未来的版本在对外接口中，彻底拿掉这个参数，也不会导致以前的代码无法运行。")]),n._v(" "),e("p",[n._v("参数变量是默认声明的，所以不能用 "),e("strong",[n._v("let")]),n._v(" 或 "),e("strong",[n._v("const")]),n._v(" 再次声明。")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("function foo (x = 5) {\n  let x = 1; // error\n  const x = 2; // error\n}\n")])])]),e("p",[n._v("上面代码中，参数变量 "),e("strong",[n._v("x")]),n._v(" 是默认声明的，在函数体中，不能用 "),e("strong",[n._v("let")]),n._v(" 或 "),e("strong",[n._v("const")]),n._v(" 再次声明，否则会报错。")]),n._v(" "),e("p",[n._v("使用参数默认值时，函数不能有同名参数。")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("// 不报错\nfunction foo(x, x, y) {\n  // ...\n}\n\n// 报错\nfunction foo(x, x, y = 1) {\n  // ...\n}\n// SyntaxError: Duplicate parameter name not allowed in this context\n")])])]),e("p",[n._v("另外，一个容易忽略的地方是，参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("let x = 99;\nfunction foo(p = x + 1) {\n  console.log(p);\n}\n\nfoo() // 100\n\nx = 100;\nfoo() // 101\n")])])]),e("p",[n._v("上面代码中，参数 "),e("strong",[n._v("p")]),n._v(" 的默认值是 "),e("strong",[n._v("x + 1")]),n._v("。这时，每次调用函数 "),e("strong",[n._v("foo")]),n._v("，都会重新计算 "),e("strong",[n._v("x + 1")]),n._v(" ，而不是默认 "),e("strong",[n._v("p")]),n._v(" 等于 "),e("strong",[n._v("100")]),n._v("。")]),n._v(" "),e("p",[n._v("与解构赋值默认值结合使用")]),n._v(" "),e("h3",{attrs:{id:"与解构赋值默认值结合使用"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#与解构赋值默认值结合使用"}},[n._v("#")]),n._v(" 与解构赋值默认值结合使用")]),n._v(" "),e("p",[n._v("参数默认值可以与解构赋值的默认值，结合起来使用。")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("function foo({x, y = 5}) {\n  console.log(x, y);\n}\n\nfoo({}) // undefined 5\nfoo({x: 1}) // 1 5\nfoo({x: 1, y: 2}) // 1 2\nfoo() // TypeError: Cannot read property 'x' of undefined\n")])])]),e("p",[n._v("上面代码只使用了对象的解构赋值默认值，没有使用函数参数的默认值。只有当函数 "),e("strong",[n._v("foo")]),n._v(" 的参数是一个对象时，变量 "),e("strong",[n._v("x")]),n._v(" 和 "),e("strong",[n._v("y")]),n._v(" 才会通过解构赋值生成。如果函数 "),e("strong",[n._v("foo")]),n._v(" 调用时没提供参数，变量 "),e("strong",[n._v("x")]),n._v(" 和 "),e("strong",[n._v("y")]),n._v(" 就不会生成，从而报错。通过提供函数参数的默认值，就可以避免这种情况。")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("function foo({x, y = 5} = {}) {\n  console.log(x, y);\n}\n\nfoo() // undefined 5\n")])])]),e("p",[n._v("上面代码指定，如果没有提供参数，函数 "),e("strong",[n._v("foo")]),n._v(" 的参数默认为一个空对象。")]),n._v(" "),e("p",[n._v("下面是另一个解构赋值默认值的例子。")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("function fetch(url, { body = '', method = 'GET', headers = {} }) {\n  console.log(method);\n}\n\nfetch('http://example.com', {})\n// \"GET\"\n\nfetch('http://example.com')\n// 报错\n")])])]),e("p",[n._v("上面代码中，如果函数 "),e("strong",[n._v("fetch")]),n._v(" 的第二个参数是一个对象，就可以为它的三个属性设置默认值。这种写法不能省略第二个参数，如果结合函数参数的默认值，就可以省略第二个参数。这时，就出现了双重默认值。")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {\n  console.log(method);\n}\nfetch('http://example.com')\n// \"GET\"\n")])])]),e("p",[n._v("上面代码中， 函数 "),e("strong",[n._v("fetch")]),n._v(" 没有第二个参数时，函数参数的默认值就会生效，然后才是解构赋值的默认值生效，变量 "),e("strong",[n._v("method")]),n._v(" 才会取到默认值 "),e("strong",[n._v("GET")]),n._v("。")]),n._v(" "),e("p",[n._v("请问下面两种写法有什么差别呢？")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("// 写法一\nfunction m1({x = 0, y = 0} = {}) {\n    return [x, y];\n}\n\n// 写法二\nfunction m2({x, y} = { x: 0, y: 0}) {\n    return [x, y];\n}\n")])])]),e("p",[n._v("上面两种写法都对函数的参数设定了默认值，区别是写法一函数参数的默认值是空对象，但是设置了对象解构赋值的默认值； 写法二函数参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值。")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("// 写法一\nfunction m1({x = 0, y = 0} = {}) {\n    return [x, y];\n}\n\n// 写法二\nfunction m2({x, y} = { x: 0, y: 0}) {\n    return [x, y];\n}\n\n// 函数没有参数的情况\nm1() // [0, 0]\nm2() // [0, 0]\n\n// x 和 y 都有值的情况\nm1({x: 3, y: 8}) // [3, 8]\nm2({x: 3, y: 8}) // [3, 8]\n\n// x 有值，y 无值的情况\nm1({x: 3}) // [3, 0]\nm2({x: 3}) // [3, undefined]\n\n// x 和 y 都无值的情况\nm1({}) // [0, 0];\nm2({}) // [undefined, undefined]\n\nm1({z: 3}) // [0, 0]\nm2({z: 3}) // [undefined, undefined]\n")])])]),e("h3",{attrs:{id:"函数默认值的位置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#函数默认值的位置"}},[n._v("#")]),n._v(" 函数默认值的位置")]),n._v(" "),e("p",[n._v("通常情况下，定义了默认值得参数，应该是函数的尾参数，因为这样比较容易看出来，到底省略了哪些参数。如果非尾部的参数设置默认值，实际上这个参数是没法省略的。")])])}),[],!1,null,null,null);t.default=s.exports}}]);