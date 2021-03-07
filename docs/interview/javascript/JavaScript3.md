# 深拷贝

## 深拷贝实现方法一

```
const obj = {
	name: 'Alfred',
	age: 26,
	address: {
		city: beijing
	},
	arr: ['a', 'b', 'c']
}

/**
 * 深拷贝
 * @param {Object} obj 要拷贝的对象
 * @description 思路：
 * 1、首先用typeof判断传入的对象的类型是不是 Array， Object 或者传入对象是不是为 null
 * 2、如果不是类型不是 Array 和 Object 或者传入对象为 null 。则不需要深拷贝，直接返回就可以
 * 3、如果传入的对象的typeof 为 object 说明传入对象可能是数组也可能为对象类型。
 * 4、首先初始化 返回结果result，再用 instanceof 具体判断传入的对象是不是 Array, 是 Array 则将 result 赋值为一个空数组。
 * 5、不是Array 类型，则肯定就是对象，那么就需要将 result 赋值为一个空对象
 * 6、使用 for in 循环 开始循环遍历数组或者对象的属性，遍历的时候需要使用 hasOwnProperty 来判断，保证 key 不是原型的数学。
 * 7、将obj[key] 递归遍历 赋值给 result[key]
 * 8、最后再返回 result 就是 深拷贝之后的对象
 */
function deepClone (obj ={}) {
	if (typeof obj !== 'object' || obj == null) {
    return obj
	}
  // 初始化返回结果
  let result;
  if (obj instanceof Array) {
    result = []
  } else {
    result = {}
  }

  for (let key in obj) {
    // 保证 key 不是原型的属性
    if (obj.hasOwnProperty(key)) {
      // 递归调用
      result[key] = deepClone(obj[key])
    }
  }
  return result
}
```

