# JS数组中 forEach() 和 map() 的区别

今天我们来看一下 Array中 Array.forEach()和 Array.map()方法之间的区别。

forEach()和map()方法通常用于遍历Array元素，但几乎没有区别，我们来一一介绍。

## 1、返回值

forEach() 方法返回 undefined， 而 map() 返回一个包含已转换元素的新数组。

```javascript
const numbers = [1, 2, 3, 4, 5];

// 使用 forEach()
const squareUsingForEach = [];
numbers.forEach(x => squareUsingForEach.push(x * x));

// 使用 map()
const squareUsingMap = numbers.map(x => x * x)

console.log(squareUsingForEach); // [1, 4, 9, 16, 25]
console.log(squareUsingMap);     // [1, 4, 9, 16, 25]
```

![1612313541971](F:\myGIthub\TechnologyBlogNotes\docs\.vuepress\public\image\base\1612313541971.png)

由于forEach()返回undefined，所以我们需要传递一个空数组来创建一个新的转换后的数组。map()方法不存在这样的问题，它直接返回新的转换后的数组。在这种情况下，建议使用map()方法。 



## 2、链接其他方法

map()方法输出可以与其他方法(如reduce()、sort()、filter())链接在一起，以便在一条语句中执行多个操作。

另一方面，forEach()是一个终端方法，这意味着它不能与其他方法链接，因为它返回undefined。

 我们使用以下两种方法找出数组中每个元素的平方和： 

```javascript
const numbers = [1, 2, 3, 4, 5];

// 使用forEach()
const squareUsingForEach = []
let sumOfSquareUsingForEach = 0
numbers.forEach(x => squareUsingForEach.push(x * x))
squareUsingForEach.forEach(square => sumOfSquareUsingForEach += square);

// 使用 map()
const sumOfSquareUsingMap = numbers.map(x => x * x).reduce((total, value) => total + value);

console.log(sumOfSquareUsingForEach); // 55
console.log(sumOfSquareUsingMap);     // 55
```

 当需要多个操作时，使用forEach()方法是一项非常乏味的工作。我们可以在这种情况下使用map()方法。 



## 3、性能

```javascript
// Array:
var numbers = [];
for ( var i = 0; i < 1000000; i++ ) {
    numbers.push(Math.floor((Math.random() * 1000) + 1));
}

// 1. forEach()
console.time("forEach");
const squareUsingForEach = [];
numbers.forEach(x => squareUsingForEach.push(x*x));
console.timeEnd("forEach");

// 2. map()
console.time("map");
const squareUsingMap = numbers.map(x => x*x);
console.timeEnd("map");

// forEach: 20.946044921875 ms
// map: 17.570068359375 ms
```

 显然，map()方法比forEach()转换元素要好。 



## 4、中断便利

 这两种方法都不能用 break 中断，否则会引发异常： 

```javascript
const numbers = [1, 2, 3, 4, 5];

// break; inside forEach()
const squareUsingForEach = [];
numbers.forEach(x => { 
  if(x == 3) break; // <- SyntaxError 
  squareUsingForEach.push(x*x);
});

// break; inside map()
const squareUsingMap = numbers.map(x => {
  if(x == 3) break; // <- SyntaxError 
  return x*x;
});
```

 上面代码会抛出 SyntaxError： 

>  ⓧ Uncaught SyntaxError: Illegal break statement 

 如果需要中断遍历，则应使用简单的for循环或for-of/for-in循环。 

```javascript
const numbers = [1, 2, 3, 4, 5];

//break;insidefor-ofloop
const squareUsingForEach = [];
for(x of numbers){
  if(x == 3) break;
  squareUsingForEach.push(x*x);
};

console.log(squareUsingForEach); //[1,4]
```



## 5、总结

建议使用map()转换数组的元素，因为它语法短，可链接且性能更好。

如果不想返回的数组或不转换数组的元素，则使用forEach() 方法。

最后，如果要基于某种条件停止或中断数组的便利，则应使用简单的for循环或for-of / for-in循环。







