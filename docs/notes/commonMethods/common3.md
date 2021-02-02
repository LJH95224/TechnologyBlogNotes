# 其他的公用方法

#### 1、深拷贝

```javascript
const deepClone = (target) => {
  if (typeof target !== 'object' || target == null) {
    // obj 是null， 或者不是对象和数组，直接返回
    return target
  }

  let result
  if (target instanceof Array) {
    result = []
  } else {
    result = {}
  }
  for (let key in target) {
    // 保证 key 不是原型属性
    if (target.hasOwnProperty(key)) {
      result[key] = deepClone(target[key])
    }
  }
  return result
}
```



#### 2 、如何隐藏所有指定元素

```javascript
const hide = (...el) => [...el].forEach(e => (e.style.display = 'none'))

//示例： 隐藏页面上所有`<img>`元素
hide(document.querySelectorAll('img'))
```



#### 3、如果检查元素是否具有指定的类

页面 DOM 里的每个节点上都有一个 `classList` 对象，程序员可以使用里面的方法新增，删除，修改节点上的 css 类。使用 `classList`， 程序员还可以用它来判断某个节点是否被赋予某个 css 类

```javascript
const hasClass = (el, className) => el.classList.contains(className)

// 示例
hasClass(document.querySelector('p.special'), 'special') // true
```



#### 4、如何切换一个元素的类

```javascript
const toggleClass = (el, className) => el.classList.toggle(className)

// 示例：移除 p 具有类 'special' 的 special 类
toggleClass(document.querySelector('p.special'), 'special')
```



#### 5、如何平滑滚动到页面顶部

```javascript
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
}

// 事例
scrollToTop()
```

 `window.requestAnimationFrame()` 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。 

 `requestAnimationFrame`：优势：由系统决定回调函数的执行时机。60Hz的刷新频率，那么每次刷新的间隔中会执行一次回调函数，不会引起丢帧，不会卡顿。 



#### 6、如何检查父元素是否包含子元素

```javascript
const elementContains = (parent, child) => parent !== child && parent.contains(child);

// 示例
elementContains(document.querySelector('head'), document.querySelector('title')); 
// true
elementContains(document.querySelector('body'), document.querySelector('body')); 
// false
```



#### 7、如何检查指定元素在视口中是否可见？

```javascript
const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window
    return partiallyVisible ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
    
}

// 示例
elementIsVisibleInViewport(el); // 需要左右可见
elementIsVisibleInViewport(el, true); // 需要全屏(上下左右)可以见
```



#### 8、获取元素中的所有图像？

```javascript
const getImages = (el, includeDuplicates = false) => {
    const images = [...el.getElementsByTagName('img')].map(img => img.getAttribute('src'));
  return includeDuplicates ? images : [...new Set(images)];
}

// 示例 includeDuplicates 为 true 表示需要排除重复元素
getImages(document, true); // ['image1.jpg', 'image2.png', 'image1.png', '...']
getImages(document, false); // ['image1.jpg', 'image2.png', '...']
```



#### 9、如何确定设备是移动设备还是台式机/笔记本电脑？

```javascript
const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ? 'Mobile'
    : 'Desktop';

// 事例
detectDeviceType(); // "Mobile" or "Desktop"
```



#### 10、获取当前的URL

```javascript
const currentURL = () => window.location.href

// 事例
currentURL() // 'https://google.com'
```



#### 11、如何创建一个包含当前URL参数的对象？

```javascript
const getURLParameters = url =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a),
    {}
  );

// 事例
getURLParameters('http://url.com/page?n=Adam&s=Smith'); // {n: 'Adam', s: 'Smith'}
getURLParameters('google.com'); // {}
```



#### 12、如何将一组表单元素转为对象

```javascript
const formToObject = form =>
  Array.from(new FormData(form)).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value
    }),
    {}
  );

// 事例
formToObject(document.querySelector('#form')); 
// { email: 'test@email.com', name: 'Test Name' }
```



#### 13、如何从对象检索给定选择器指示的一组属性？

```javascript
const get = (from, ...selectors) =>
  [...selectors].map(s =>
    s
      .replace(/\[([^\[\]]*)\]/g, '.$1.')
      .split('.')
      .filter(t => t !== '')
      .reduce((prev, cur) => prev && prev[cur], from)
  );
const obj = { selector: { to: { val: 'val to select' } }, target: [1, 2, { a: 'test' }] };

// Example
get(obj, 'selector.to.val', 'target[0]', 'target[2].a', 'targets'); 
// ['val to select', 1, 'test', undefined]
```



#### 14、如何在等待指定时间后调用提供的函数？

```javascript
const delay = (fn, wait, ...args) => setTimeout(fn, wait, ...args);
delay(
  function(text) {
    console.log(text);
  },
  1000,
  'later'
); 

// 1秒后打印 'later'
```



#### 15、如何在给定元素上触发特定事件且能选择地传递自定义数据？

```javascript
const triggerEvent = (el, eventType, detail) =>
  el.dispatchEvent(new CustomEvent(eventType, { detail }));

// 事例
triggerEvent(document.getElementById('myId'), 'click');
triggerEvent(document.getElementById('myId'), 'click', { username: 'bob' });
```

 自定义事件的函数有 `Event`、`CustomEvent` 和 `dispatchEvent` 

```javascript
// 向 window派发一个resize内置事件
window.dispatchEvent(new Event('resize'))


// 直接自定义事件，使用 Event 构造函数：
var event = new Event('build');
var elem = document.querySelector('#id')
// 监听事件
elem.addEventListener('build', function (e) { ... }, false);
// 触发事件.
elem.dispatchEvent(event);
```

 `CustomEvent` 可以创建一个更高度自定义事件，还可以附带一些数据，具体用法如下： 

```javascript
var myEvent = new CustomEvent(eventname, options);
其中 options 可以是：
{
  detail: {
    ...
  },
  bubbles: true,    //是否冒泡
  cancelable: false //是否取消默认事件
}
```

其中 `detail` 可以存放一些初始化的信息，可以在触发的时候调用。其他属性就是定义该事件是否具有冒泡等等功能。

内置的事件会由浏览器根据某些操作进行触发，自定义的事件就需要人工触发。
`dispatchEvent` 函数就是用来触发某个事件：

```javascript
element.dispatchEvent(customEvent);
```

 上面代码表示，在 `element` 上面触发 `customEvent` 这个事件。 

```javascript
// add an appropriate event listener
obj.addEventListener("cat", function(e) { process(e.detail) });

// create and dispatch the event
var event = new CustomEvent("cat", {"detail":{"hazcheeseburger":true}});
obj.dispatchEvent(event);
使用自定义事件需要注意兼容性问题，而使用 jQuery 就简单多了：

// 绑定自定义事件
$(element).on('myCustomEvent', function(){});

// 触发事件
$(element).trigger('myCustomEvent');
// 此外，你还可以在触发自定义事件时传递更多参数信息：

$( "p" ).on( "myCustomEvent", function( event, myName ) {
  $( this ).text( myName + ", hi there!" );
});
$( "button" ).click(function () {
  $( "p" ).trigger( "myCustomEvent", [ "John" ] );
});
```



#### 16、如何从元素中移除事件监听器?

```javascript
const off = (el, evt, fn, opts = false) => el.removeEventListener(evt, fn, opts);

const fn = () => console.log('!');
document.body.addEventListener('click', fn);
off(document.body, 'click', fn); 
```



#### 17、如何获得给定毫秒数的可读格式？

```javascript
const formatDuration = ms => {
  if (ms < 0) ms = -ms;
  const time = {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000
  };
  return Object.entries(time)
    .filter(val => val[1] !== 0)
    .map(([key, val]) => `${val} ${key}${val !== 1 ? 's' : ''}`)
    .join(', ');
};

// 事例
formatDuration(1001); // '1 second, 1 millisecond'
formatDuration(34325055574); 
// '397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds'
```



#### 18、如何获得两个日期之间的差异（以天为单位）？

```javascript
const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);

// 事例
getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9
```



#### 19、如何对传递的URL发出POST请求？

````javascript
const httpPost = (url, data, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  request.onload = () => callback(request.responseText);
  request.onerror = () => err(request);
  request.send(data);
};

const newPost = {
  userId: 1,
  id: 1337,
  title: 'Foo',
  body: 'bar bar bar'
};
const data = JSON.stringify(newPost);
httpPost(
  'https://jsonplaceholder.typicode.com/posts',
  data,
  console.log
); 

// {"userId": 1, "id": 1337, "title": "Foo", "body": "bar bar bar"}
````



#### 20、如何为指定选择器创建具有指定范围，步长和持续时间的计数器？

```javascript
const counter = (selector, start, end, step = 1, duration = 2000) => {
  let current = start,
    _step = (end - start) * step < 0 ? -step : step,
    timer = setInterval(() => {
      current += _step;
      document.querySelector(selector).innerHTML = current;
      if (current >= end) document.querySelector(selector).innerHTML = end;
      if (current >= end) clearInterval(timer);
    }, Math.abs(Math.floor(duration / (end - start))));
  return timer;
};

// 事例
counter('#my-id', 1, 1000, 5, 2000); 
// 让 `id=“my-id”`的元素创建一个2秒计时器
```



#### 21、如何将字符串复制到剪贴板？

```javascript
const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

// 事例
copyToClipboard('Lorem ipsum'); 
// 'Lorem ipsum' copied to clipboard
```



#### 22、如何确定页面的浏览器选项卡是否聚焦？

```javascript
const isBrowserTabFocused = () => !document.hidden;

// 事例
isBrowserTabFocused(); // true
```



#### 23、如何创建目录（如果不存在）？

```javascript
const fs = require('fs');
const createDirIfNotExists = dir => (!fs.existsSync(dir) ? fs.mkdirSync(dir) : undefined);

// 事例
createDirIfNotExists('test'); 
```

