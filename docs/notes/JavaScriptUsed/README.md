# JavaScript 中常用的一些方法

## 深拷贝

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

