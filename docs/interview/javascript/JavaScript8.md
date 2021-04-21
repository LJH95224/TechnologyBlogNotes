# JavaScript 优化

### 1、如果有多个条件

我们可以在数组中存储多个值，并且可以使用数组 include 方法

```js
// longhand
if (x === 'abc' || x === 'def' || x === 'ghi' || x === 'jkl') {
	// 操作
}

// shorthand
if （['abc', 'def', 'ghi', 'jkl'].includes(x)） {
	// 操作
}

```

### 2、if true  ... else 简写

当我们具有不包含更大逻辑的 if -else 条件时，可以使用三元运算符实现

```js
// Longhand
let test: boolean;
if (x > 100) {
    test = true;
} else {
    test = false;
}
// Shorthand
let test = (x > 10) ? true : false;
//or we can use directly
let test = x > 10;
console.log(test);
```

 当我们有嵌套条件时，我们可以采用这种方式。 

```js
let x = 300,
test2 = (x > 100) ? 'greater 100' : (x < 50) ? 'less 50' : 'between 50 and 100';
console.log(test2); // "greater than 100"
```

### 3、声明变量

当我们要声明两个具有共同值或者共同类型的变量时，可以简写

```js
//Longhand 
let test1;
let test2 = 1;
//Shorthand 
let test1, test2 = 1;
```

### 4、空、未定义、空检查

当我们创建新变量时，有时我们想检查为其引用的变量是否为 null 或者 未定义。

```js
// Longhand
if (test1 !== null || test1 !== undefined || test1 !== '') {
    let test2 = test1;
}
// Shorthand
let test2 = test1 || '';
```

### 5、空值检查和分配默认值

```js
let text1 = null,
	text2 =  text1 || ''
console.log("null check", test2); 
// output will be ""
```

### 6、未定义值检查和分配默认值

```js
let test1 = undefined,
    test2 = test1 || '';
console.log("undefined check", test2); // output will be ""
```

 正常值检查 

```js
let test1 = 'test',
    test2 = test1 || '';
console.log(test2); // output: 'test'
```

空位合并运算符

空合并运算符？？ 如果左侧为 null 或者 未定义， 则返回右侧的值。默认情况下，它将返回左侧的值

```js
const text = null ?? 'default'
console.log(text)
// expected output: "default"const test1 = 0 ?? 2;
console.log(test1);
// expected output: 0
```



### 7、给多个变量赋值

 当我们处理多个变量并希望将不同的值分配给不同的变量

```js
//Longhand 
let test1, test2, test3;
test1 = 1;
test2 = 2;
test3 = 3;
//Shorthand 
let [test1, test2, test3] = [1, 2, 3];
```



### 8、赋值运算符的简写

 我们在编程中处理很多算术运算符。这是将运算符分配给JavaScript变量的有用技术之一。 

```js
// Longhand
test1 = test1 + 1;
test2 = test2 - 1;
test3 = test3 * 20;
// Shorthand
test1++;
test2--;
test3 *= 20;
```



### 9、如果存在

```js
// Longhand
if (test1 === true)

// Shorthand
if (test1)
```



### 10、多个条件的 AND（&&）运算符

 如果仅在变量为true的情况下才调用函数，则可以使用&&运算符 

```js
//Longhand 
if (test1) {
 callMethod(); 
} 
//Shorthand 
test1 && callMethod();
```



### 11、forEach 循环

```js
// Longhand
for (var i = 0; i < testData.length; i++)

// Shorthand
for (let i in testData) or  for (let i of testData)
```

 每个变量的数组 

```js
function testData(element, index, array) {
  console.log('test[' + index + '] = ' + element);
}

[11, 24, 32].forEach(testData);
// logs: test[0] = 11, test[1] = 24, test[2] = 32
```

### 12、比较返回值

 可以在return语句中使用比较 

```js
// Longhand
let test;
function checkReturn() {
    if (!(test === undefined)) {
        return test;
    } else {
        return callMe('test');
    }
}
var data = checkReturn();
console.log(data); //output test
function callMe(val) {
    console.log(val);
}
// Shorthand
function checkReturn() {
    return test || callMe('test');
}
```

### 13、箭头函数

```js
//Longhand 
function add(a, b) { 
   return a + b; 
} 
//Shorthand 
const add = (a, b) => a + b;
```

 更多示例。 

```js
function callMe(name) {
  console.log('Hello', name);
}
callMe = name => console.log('Hello', name);
```



### 14、短函数调用

 我们可以使用三元运算符来实现这些功能。 

```js
// Longhand
function test1() {
  console.log('test1');
};
function test2() {
  console.log('test2');
};
var test3 = 1;
if (test3 == 1) {
  test1();
} else {
  test2();
}
// Shorthand
(test3 === 1? test1:test2)();
```

### 15、Switch 有时候也可以写成对象

 我们可以将条件保存在键值对象中，并可以根据条件使用。 

```js

// Longhand
switch (data) {
  case 1:
    test1();
  break;

  case 2:
    test2();
  break;

  case 3:
    test();
  break;
  // And so on...
}

// Shorthand
var data = {
  1: test1,
  2: test2,
  3: test
};

data[something] && data[something]();
```

### 16、隐式返回

 使用箭头功能，我们可以直接返回值，而不必编写return语句。 

```js
//longhand
function calculate(diameter) {
  return Math.PI * diameter
}
//shorthand
calculate = diameter => (
  Math.PI * diameter;
)
```

### 17、小数基指数

```js
// Longhand
for (var i = 0; i < 10000; i++) { ... }

// Shorthand
for (var i = 0; i < 1e4; i++) {
```

### 18、默认参数值

```js
//Longhand
function add(test1, test2) {
  if (test1 === undefined)
    test1 = 1;
  if (test2 === undefined)
    test2 = 2;
  return test1 + test2;
}
//shorthand
add = (test1 = 1, test2 = 2) => (test1 + test2);
add() //output: 3
```

### 19、点差运算符

```js
//Longhand
function add(test1, test2) {
  if (test1 === undefined)
    test1 = 1;
  if (test2 === undefined)
    test2 = 2;
  return test1 + test2;
}
//shorthand
add = (test1 = 1, test2 = 2) => (test1 + test2);
add() //output: 3
```

 对于克隆，我们也可以使用`...`运算符。

```js
//longhand

// cloning arrays
const test1 = [1, 2, 3];
const test2 = test1.slice()
//shorthand

// cloning arrays
const test1 = [1, 2, 3];
const test2 = [...test1];
```

### 20、模板字符串

```js
//longhand
const welcome = 'Hi ' + test1 + ' ' + test2 + '.'
//shorthand
const welcome = `Hi ${test1} ${test2}`;
```

### 21、多行字符串

```js

//longhand
const data = 'abc abc abc abc abc abc\n\t'
    + 'test test,test test test test\n\t'
//shorthand
const data = `abc abc abc abc abc abc
         test test,test test test test`
```

### 22、对象属性

```js
let test1 = 'a'; 
let test2 = 'b';
//Longhand 
let obj = {test1: test1, test2: test2}; 
//Shorthand 
let obj = {test1, test2};
```

### 23、字符串转数字

```js

//Longhand 
let test1 = parseInt('123'); 
let test2 = parseFloat('12.3'); 
//Shorthand 
let test1 = +'123'; 
let test2 = +'12.3';
```

### 24、解构赋值

```js
//longhand
const test1 = this.data.test1;
const test2 = this.data.test2;
const test2 = this.data.test3;
//shorthand
const { test1, test2, test3 } = this.data;
```

### 25、查找对象数组中的值

```js

const data = [{
        type: 'test1',
        name: 'abc'
    },
    {
        type: 'test2',
        name: 'cde'
    },
    {
        type: 'test1',
        name: 'fgh'
    },
]
function findtest1(name) {
    for (let i = 0; i < data.length; ++i) {
        if (data[i].type === 'test1' && data[i].name === name) {
            return data[i];
        }
    }
}
//Shorthand
filteredData = data.find(data => data.type === 'test1' && data.name === 'fgh');
console.log(filteredData); // { type: 'test1', name: 'fgh' }
```

### 26、Object.entries()

 此功能有助于将对象转换为对象数组。 

```js

const data = { test1: 'abc', test2: 'cde', test3: 'efg' };
const arr = Object.entries(data);
console.log(arr);
/** Output:
[ [ 'test1', 'abc' ],
  [ 'test2', 'cde' ],
  [ 'test3', 'efg' ]
]
**/
```

### 27、Object.values()

 这也是ES8中引入的一项新功能，它执行与Object.entries（）类似的功能，但没有键部分： 

```js
const data = { test1: 'abc', test2: 'cde' };
const arr = Object.values(data);
console.log(arr);
/** Output:
[ 'abc', 'cde']
**/
```

### 28、重复一个字符串多次

```js
//longhand 
let test = ''; 
for(let i = 0; i < 5; i ++) { 
  test += 'test '; 
} 
console.log(str); // test test test test test 
//shorthand 
'test '.repeat(5);
```

### 29、 在数组中查找最大值和最小值

```js
const arr = [1, 2, 3]; 
Math.max(…arr); // 3
Math.min(…arr); // 1
```

### 30、从字符串中获取字符

```js
let str = 'abc';
//Longhand 
str.charAt(2); // c
//Shorthand 
Note: If we know the index of the array then we can directly use index insted of character.If we are not sure about index it can throw undefined
str[2]; // c
```

### 31、 数学指数幂函数的简写 

```js
//longhand
Math.pow(2,3); // 8
//shorthand
2**3 // 8
```







































