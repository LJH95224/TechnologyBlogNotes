# JavaScript 数据类型

## JavaScript 中数据类型那些可能会中招的细节

### 1、number 类型注意事项

number 类型包括：正数，负数，0，小数，NaN

> NaN： 意思是 not a number 不是一个有效数字，但是它是属于 number 类型的

#### （1） = 和 == 和 === 的区别

- `=` 是赋值
- `==` 是判断左右两边的值是否相等（非严格相等，只要字面相等则相等）
- `===` 是判断左右两边是否相等，严格判断（包括数据类型。类型和字面量相等才相等）

#### （2） NaN

- NaN 和 NaN 是不相等的， NaN === NaN 返回的是 false
- isNaN(); 检测一个值不是有效数字的命题是否成立，是有效数字则返回 false，不是有效数字返回的才是 true

> isNaN() 如果检测的值不是 number 类型，浏览器会默认把值转化为 number 类型，然后再判断是否为有效数字

```javascript
// 例如：
console.log(isNaN('123')) // 打印结果是 true
// 步骤
// 1、首先把 ‘123’ 转化为 number 类型的，使用 Number() 转换方法
// 2、然后判断 number 类型的值是否满足 isNaN() 的条件
```

> Number() 方法强制将其他数据类型转为 number 类型（强制数据类型转换）

```
 Number()方法 强制将其他数据类型转为number类型，
 要求：如果是字符串，字符串中一定都需要是数字才可以转换
 例如：Number("12")返回的结果是12，Number("12px")返回的结果就是NaN 
```

> 非强制数据类型转换 parseInt() /parseFloat()

```javascript
parseInt: 从左到右，一个个字符串查找，把是数字的转为有效数字，中途如果遇到了一个非有效数字，就不在继续查找了
parseFloat： 和上面一样，但是可以多识别一个小数点
例如： parseInt('12px')的值为 12
      parseFloat('12.5px')的值为 12.5
```

### 2、 数据类型的转换规则

#### （1） 常见的 boolean 转换符号

- `!` 一个感叹号是取反，首先将值转化为布尔类型的值，然后取反
- `!!` 两个感叹号是将其他的数据类型转换为 boolean 类型，相当于 **Boolean()**

##### 转换规则

**1、如果只有一个值，判断这个值是真还是假，遵循： 只有 `0`， `NaN`， `''`， `null`， `undefined` 这五个是假，其余的都是真**

```javascript
console.log(!3) // false
console.log(![]) // false
console.log(!{}) // false
console.log(!null) // true
console.log(!0) // true
console.log(!undefined) // true
console.log(!'') // true
```

> 注意：此处数字 0 才为假，如果是字符串 ‘0’ 同样为真

```javascript
if(0){
    console.log("为真")
}else{
    console.log("为假")
}
// 为假

if('0'){
    console.log("为真")
}else{
    console.log("为假")
}
// 为真
```

**2、如果是两个值比较相等，遵循这个规则**

 val1 == val2 两个值可能不是同一数据类型的，如果是 == 比较的话，会进行默认的数据类型转换 

- 1) 对象 == 对象 永远不相等

- 2) 对象 == 字符串 先将对象转化为字符串 （调用toString的方法），然后再进行比较

```javascript
  [] 转换为字符串 ""
  {} 转换为字符串 "[object Object]" 
  
  所以:  [] == "" 为 true
        {} == "" 为 false
```

- 3)  对象 == 布尔类型 对象先转化为字符串（toString），然后把字符串转化为数字（ Number ） 布尔类型也转换为数字(true是1 false 是0)，最后让两个数字比较 

```
例如：
        console.log([] == false) // 为 true
        解析：首先 []转为字符串"",然后字符串转为数字类型number，Number("")结果为0，false
        转为数字类型，Number(false) 结果也为0，所以 [] == false, 就解析成了 0与0的比较，所以相等，
        返回true
```

- 4)  对象 == 数字 对象先转为字符串(toString)，然后把字符串转换为数字(Number) 

- 5) 数字 == 布尔 布尔类型转换为数字
- 6) 数字 == 字符串，字符串转换为数字

```
例如：5 == '5' // 为 true
```

- 7) 字符串 == 布尔 都转换为数字
- 8) null === undefined 结果是true

```javascript
console.log(null == undefined) // true
```

- 9) null和undefined 和其他任何数据类型都不相等 

```javascript
console.log(null == 0) // false
console.log(undefined == 0) // false
```

##### 3、除了== 是比较，===也是比较(绝对比较)，如果数据类型不一样肯定不相等

```javascript
console.log(0 == false) // true
console.log(0 === fasle) // false

console.log(5 == "5") // true
console.log(5 === "5") // false

console.log(null == undefined) // true
console.log(null === undefined) // false
```



#### 3、typeof（数据类型检测）

>  typeof 用来检测数据类型的，用法：typeof + 要检查的值, 

返回一个字符串，包含了数据类型的字符( "number","string","boolean","undefined","function","object")

- **typeof null** 返回的结果是 **"object"**
- typeof undefined 返回的结果是 "undefined"

>  虽然null 和 undefined 同为number数据类型，但是通过typeof检测的值不是number，而且也不相同。 

- typeof null 结果是 "object"
- typeof [] 结果是 "object"

> 注意：同为对象数据类型的 数组、正则、对象的检测类型都是"object"

> **typeof 局限性**：不能具体的检查object下细分的类型

```
  console.log(typeof typeof typeof typeof []) // "string"  此处打印的是"string"
```

> tip：因为typeof 返回的值就是一个字符串，如果用到了两个以及两个以上的typeof 返回的都是 "string"类型



### 4、基本数据类型和引用数据类型的本质区别

```
情景一:
    var num1 = 12;
    var num2 = num1;
    num2++;
    console.log(num1);
   
    
情景二:
    var obj1 = {"name":"张三"};
    var obj2 = obj1;
    obj2.name = "李四";
    console.log(obj1.name);

    情景一打印的值为 12, 情景二打印的值为 "李四"

```

>  分析：基本数据类型的值是具体的值，此处的var num2=num1;就是将num1的值 12给num2，此时num2和num1的值同为12，但是和num1的num2的值互不相关，所以不论num2怎么变，num1都是12，都不会改变。引用数据类型，存储的是数据内存的地址，var obj1 = {"name":"张三"} 是开辟一个空间来存放{"name":"张三"}值，然后将obj1指向存储值的地址，此时，var obj2 = obj1,就是将obj1指向内存空间的地址赋值给obj2，两个都指向同一个内存地址，对应的同一个值。所以后面obj2更改内存空间里面name的值后，obj1的值也会改变。 