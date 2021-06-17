# 每日一题

### 1. 输出什么？

```
const add = x => x + x;

function myFunc(num = 2, value = add(num)) {
	console.log(num, value)
}

myFunc();
myFunc(3);
```

- A: `2` `4` and `3` `6`
- B: `2` `NaN` and `3` `NaN`
- C: `2` `Error` and `3` `6`
- D: `2` `4` and `3` `Error`

#### 答案及解析：A

首先我们不传递任何参数调用 `myFunc()`。因为我们没有传递参数， `num` 和 `value` 获取它们各自的默认值：`num` 为 `2`，而 `value` 为函数 `add` 的返回值。对于函数 `add` 我们传递的数值为 `2` 的 `num` 作为参数，函数 `add` 返回 `4` 作为 `value` 的值。

然后，我们调用 myFunc(3) 并传递 num 的值为 3，我们没有给 value 传递值， 因为我们没有给参数 `value` 传递值，它获取默认值：函数 `add` 的返回值。对于函数 `add`，我们传递值为3的 `num`给它。函数 `add` 返回 `6` 作为 `value` 的值。 
