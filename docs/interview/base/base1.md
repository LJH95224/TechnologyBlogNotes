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

### 2. 输出什么？

```javascript
class Counter {
	#number = 10

	increment() {
		this.#number++
	}
	getNum() {
		return this.#number
	}
}

const counter = new Counter()
counter.increment()
console.log(counter.#number)


```

- A: `10`
- B: `11`
- C: `undefined`
- D: `SyntaxError`

#### 答案及解析：D 

 在 ES2020 中，通过 `#` 我们可以给 class 添加私有变量。在 class 的外部我们无法获取该值。当我们尝试输出 `counter.#number`，语法错误被抛出：我们无法在 class `Counter` 外部获取它!  `Uncaught SyntaxError: Private field '#number' must be declared in an enclosing class`

