(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{368:function(e,n,t){e.exports=t.p+"assets/img/image-20210307161704928.1cc194a9.png"},369:function(e,n,t){e.exports=t.p+"assets/img/image-20210307173251396.2c5e67fa.png"},370:function(e,n,t){e.exports=t.p+"assets/img/image-20210307173409175.f8c65d69.png"},547:function(e,n,t){"use strict";t.r(n);var o=t(44),s=Object(o.a)({},(function(){var e=this,n=e.$createElement,o=e._self._c||n;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("h1",{attrs:{id:"event-loop"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#event-loop"}},[e._v("#")]),e._v(" Event Loop")]),e._v(" "),o("p",[o("strong",[e._v("Event Loop：")]),e._v(" 也叫做事件循环，是指浏览器 或者 Node 环境的一种解决 JavaScript 单线程运行时不会阻塞的一种机制，也就是实现异步的原理。作为一种单线程语言， JavaScript 本身是没有异步这一说法的，是由其宿主环境提供的。")]),e._v(" "),o("blockquote",[o("p",[e._v("注意：Event Loop 并不是在 ECMAScript 标准中定义的，而是在 HTML 标准中定义的；")])]),e._v(" "),o("h2",{attrs:{id:"一、event-loop-知识铺垫"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#一、event-loop-知识铺垫"}},[e._v("#")]),e._v(" 一、Event Loop 知识铺垫")]),e._v(" "),o("p",[o("code",[e._v("javaScript")]),e._v(" 代码运行时，任务被分为两种，"),o("code",[e._v("宏任务（MacroTask/Task）")]),e._v(" 和 "),o("code",[e._v("微任务（MircoTask）")])]),e._v(" "),o("p",[e._v("Event Loop 在执行和协调各种任务时也将任务队列认为 "),o("code",[e._v("Task Quene（宏任务队列）")]),e._v(" 和 "),o("code",[e._v("MircoTask Quene（微任务队列）")]),e._v(" 分别对应管理 "),o("code",[e._v("宏任务（MacroTask/Task）")]),e._v(" 和 "),o("code",[e._v("微任务（MircoTask）")]),e._v("；作为队列，"),o("code",[e._v("Task Quene")]),e._v(" 和 "),o("code",[e._v("MircoTask Quene")]),e._v(" 也具备队列的特性："),o("code",[e._v("先进先出")])]),e._v(" "),o("h3",{attrs:{id:"_1、微任务-mircotask"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#_1、微任务-mircotask"}},[e._v("#")]),e._v(" 1、微任务(MircoTask)")]),e._v(" "),o("p",[e._v("在 HTML 标准中，并没有明确规定 MircoTask，但是实际开发中包含以下四种：")]),e._v(" "),o("ul",[o("li",[e._v("Promise 中的 "),o("code",[e._v("then, catch, finally")])]),e._v(" "),o("li",[e._v("MutationObserver（监视 DOM 变动的API，详情参考"),o("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver",target:"_blank",rel:"noopener noreferrer"}},[e._v("MDN"),o("OutboundLink")],1),e._v("）")]),e._v(" "),o("li",[e._v("Process.nextTick（Node环境，通常也被认为是微任务）")])]),e._v(" "),o("h3",{attrs:{id:"_2、宏任务-macrotask-task"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#_2、宏任务-macrotask-task"}},[e._v("#")]),e._v(" 2、宏任务（MacroTask/ Task）")]),e._v(" "),o("p",[e._v("基本上，JavaScript 中 "),o("code",[e._v("非 微任务")]),e._v(" 的所有任务都归为 宏任务， 比如：")]),e._v(" "),o("ul",[o("li",[e._v("script 中全部代码")]),e._v(" "),o("li",[e._v("DOM 操作")]),e._v(" "),o("li",[e._v("用户交互操作")]),e._v(" "),o("li",[e._v("所有的网络请求")]),e._v(" "),o("li",[e._v("定时器相关的 setTimeout， setInterval 等")]),e._v(" "),o("li",[e._v("...")])]),e._v(" "),o("h3",{attrs:{id:"_3、javascript-runtime"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#_3、javascript-runtime"}},[e._v("#")]),e._v(" 3、JavaScript runtime")]),e._v(" "),o("p",[o("code",[e._v("JavaScript runtime： 为 JavaScript 提供一些对象或者机制，使它能够与外界交互，是JavaScript的执行环境。")])]),e._v(" "),o("p",[e._v("javascript 运行时会创建一个 "),o("code",[e._v("main thread 主线程")]),e._v(" 和 "),o("code",[e._v("call - stack 调用栈(执行栈，遵循后进先出的规则)")]),e._v("。"),o("code",[e._v("所有的任务都会被放到 调用栈 / 执行栈等待主线程执行")])]),e._v(" "),o("p",[o("img",{attrs:{src:t(368),alt:"image-20210307161704928"}})]),e._v(" "),o("ol",[o("li",[e._v("主线程自上而下依次执行所有代码；")]),e._v(" "),o("li",[e._v("同步任务直接进入到主线程被执行；")]),e._v(" "),o("li",[e._v("异步任务进入到 "),o("code",[e._v("Event Table")]),e._v("， 当异步任务有结果后，将相对应的回调函数进行注册，放入 "),o("strong",[e._v("Event Quene")])]),e._v(" "),o("li",[e._v("主线程任务执行完空闲下来后，从 "),o("code",[e._v("Event Quene(FIFO)")]),e._v(" 中读取任务，放入主线程执行；")]),e._v(" "),o("li",[e._v("放入主线程的 "),o("strong",[e._v("Event Quene")]),e._v(" 任务继续从第一步开始，如此循环执行；")])]),e._v(" "),o("p",[e._v("上述步骤执行过程就是我们所说的事件循环(Event Loop)，上图展示了事件循环中的一个完整循环过程。")]),e._v(" "),o("h2",{attrs:{id:"二、-浏览器环境的-event-loop"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#二、-浏览器环境的-event-loop"}},[e._v("#")]),e._v(" 二、 浏览器环境的 Event Loop")]),e._v(" "),o("p",[e._v("不同的执行环境中，Event Loop 的执行机制是不同的；例如：Chrome 和 Nodejs 都使用了 V8 引擎。V8 实现并提供了 ECMAScript 标准中的所有"),o("strong",[e._v("数据类型，操作符，对象和方法（注意并没有DOM）")]),e._v("。但是他们的 Runtime 并不一样： "),o("code",[e._v("chrome 提供了 window、 Dom 而 Nodejs 则是 require、process 等等")]),e._v(" 在了解 浏览器中的 Event Loop 的具体表现前需要先整理 同步，异步，微任务， 宏任务之间的关系。")]),e._v(" "),o("h3",{attrs:{id:"_1、同步-异步-和-宏任务-微任务"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#_1、同步-异步-和-宏任务-微任务"}},[e._v("#")]),e._v(" 1、同步，异步 和 宏任务，微任务")]),e._v(" "),o("p",[e._v("宏任务和微任务是相对而言的，根据代码执行时循环的先后，将代码执行分层理解，在每一层（一次）的事件循环中，首先整体代码块看做一个宏任务，宏任务的 Promise（then，catch，finally），MutationObserver， Process.nextTick 就是该宏任务层的微任务；宏任务中的同步代码进入主线程中立即执行，宏任务中的"),o("strong",[e._v("非微任务")]),e._v("异步代码块将作为下一次循环的宏任务，进入调用栈等待执行，此时，调用栈中等待执行的队列分为两种，优先级较高的本层循环的"),o("strong",[e._v("微任务队列")]),e._v("，和优先级较低的下层循环执行的"),o("strong",[e._v("宏任务队列")]),e._v("，按照优先级进行执行。")]),e._v(" "),o("blockquote",[o("p",[e._v("注意："),o("code",[e._v("每一次/层循环，都是首先从宏任务开始，微任务结束;")])])]),e._v(" "),o("p",[o("img",{attrs:{src:t(369),alt:"image-20210307173251396"}})]),e._v(" "),o("h3",{attrs:{id:"_2、简单实例分析"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#_2、简单实例分析"}},[e._v("#")]),e._v(" 2、简单实例分析")]),e._v(" "),o("p",[e._v("上面描述的相对繁琐，结合代码和图片进行分析理解")]),e._v(" "),o("p",[o("img",{attrs:{src:t(370),alt:"image-20210307173409175"}})]),e._v(" "),o("p",[e._v("进行代码分析：这是一个简单而典型的"),o("strong",[e._v("双层循环")]),e._v("的"),o("strong",[e._v("事件循环")]),e._v("执行案例，在这个循环中可以按照以下步骤进行分析")]),e._v(" "),o("ol",[o("li",[o("p",[e._v("首先区分出该层的 "),o("strong",[e._v("宏任务")]),e._v(" 范围（整个代码）")])]),e._v(" "),o("li",[o("p",[e._v("区分 "),o("strong",[e._v("宏任务")]),e._v(" 中 "),o("strong",[e._v("同步代码")]),e._v(" 和 "),o("strong",[e._v("异步代码")])]),e._v(" "),o("p",[e._v("同步代码："),o("code",[e._v("console.log('script start');")]),e._v("、"),o("code",[e._v("console.log('enter promise');")]),e._v("和"),o("code",[e._v("console.log('script end');")]),e._v("；")]),e._v(" "),o("p",[e._v("异步代码块："),o("code",[e._v("setTimeout")]),e._v("和"),o("code",[e._v("Promise的then")]),e._v("（"),o("strong",[e._v("注意")]),e._v("："),o("code",[e._v("Promise中只有then、catch、finally的执行需要等到结果，Promise传入的回调函数属于同步执行代码")]),e._v("）;")])]),e._v(" "),o("li",[o("p",[e._v("在"),o("strong",[e._v("异步")]),e._v("中找出同层的"),o("strong",[e._v("微任务")]),e._v(" （代码中的"),o("code",[e._v("Promise的then")]),e._v("）和下层事件循环的"),o("code",[e._v("宏任务")]),e._v("（代码中的"),o("code",[e._v("setTimeout")]),e._v("）")])]),e._v(" "),o("li",[o("p",[o("strong",[e._v("宏任务")]),e._v(" 的 "),o("strong",[e._v("同步代码优先进入主线程")]),e._v("，按照自上而下的顺序执行完毕")]),e._v(" "),o("p",[e._v("输出顺序为：")]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("//同步代码执行输出\nscript start\nenter promise\nscript end\n")])])])]),e._v(" "),o("li",[o("p",[e._v("当主线程空闲时，执行该层的"),o("code",[e._v("微任务")])])])]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("\t//同层微任务队列代码执行输出\n\tpromise then 1\n\tpromise then 2\n\t```\n\t\n6. 首层事件循环结束，进入第二层事件循环（`setTimeout`包含的执行代码，只有一个同步代码）\n\n")])])]),o("p",[e._v("//第二层宏任务队列代码执行输出\nsetTimeout")]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("\n7. 综合分析最终得出数据结果为：\n\n")])])]),o("p",[e._v("//首层宏任务代码执行输出\nscript start\nenter promise\nscript end\n//首层微任务队列代码执行输出\npromise then 1\npromise then 2\n//第二层宏任务队列代码执行输出\nsetTimeout")]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("\n\n### 3、 复杂案例分析\n\n对于下列多循环的事件循环进行分析检验，给出你的结果：\n\n")])])]),o("p",[e._v("console.log('1')")]),e._v(" "),o("p",[e._v("setTimeout(function () {\nconsole.log('2')\nnew Promise(function (resolve) {\nconsole.log('3')\nresolve()\n}).then(() => {\nconsole.log('4')\n})\nsetTimeout(() => {\nconsole.log('5')\nnew Promise(function (resolve) {\nconsole.log('6')\nresolve()\n}).then(() => {\nconsole.log('7')\n})\n})\nconsole.log('14')\n})")]),e._v(" "),o("p",[e._v("new Promise((resolve) => {\nconsole.log('8')\nresolve()\n}).then(() => {\nconsole.log('9')\n})")]),e._v(" "),o("p",[e._v("setTimeout(() => {\nconsole.log('10')\nnew Promise((resolve) => {\nconsole.log('11')\nresolve()\n}).then(() => {\nconsole.log('12')\n})\n})")]),e._v(" "),o("p",[e._v("console.log('13')")]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("\n分析：如下图草稿所示，`左上角标a为宏任务队列，左上角标i为微任务队列`，同一层循环中，本层宏任务先执行，再执行微任务；本层宏任务中的非微任务异步代码块作为下层循环的宏任务进入下次循环，如此循环执行；\n\n![image-20210307175445336](../../.vuepress/public/image/css/image-20210307175445336.png)\n\n")])])]),o("p",[e._v("1->8->13->9->2->3->14->4->10->11->12->5->6->7")]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("\n## 三 、Node 环境下的 Event Loop\n\n在 **Node** 环境下，浏览器的 Event Loop 机制并不适用，切记不能混为一谈，Node 中的 Event Loop 是基于**[libuv](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)** 实现的。**libuv 是 Node 的新跨平台抽象层，libuv 使用异步，事件驱动的编程方式，核心是提供 I/O 的事件循环和异步回调，libuv 的 APi 包含有时间，非阻塞网络，异步文件操作，子进程等等。**\n\n### 1、 Event Loop 的6个阶段\n\n![image-20210307181449182](../../.vuepress/public/image/css/image-20210307181449182.png)\n\n**Node的Event loop一共分为`6个阶段`，每个细节具体如下：**\n\n- `timers:` 执行 setTimeout 和 setInterval 中到期的 callback。\n- `pending callback:` 上一轮循环中少数的 callback 会放在这一阶段执行。\n- `idle, prepare:` 仅在内部使用。\n- `poll:` 最重要的阶段，执行pending callback，在适当的情况下回阻塞在这个阶段。\n- `check:` 执行setImmediate的callback。\n- `close callbacks: ` 执行close事件的callback，例如socket.on(‘close’[,fn])或者http.server.on('close, fn)。\n\n**注意：上面六个阶段都不包括 `process.nextTick()`**\n\n![image-20210307182221140](../../.vuepress/public/image/css/image-20210307182221140.png)\n\n**重点：如上图所，`在Node.js中，一次宏任务可以认为是包含上述6个阶段、微任务microtask会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行microtask队列的任务。`**\n\n 资料参考自： https://blog.csdn.net/qq_31967985/article/details/110310685\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n")])])])])}),[],!1,null,null,null);n.default=s.exports}}]);