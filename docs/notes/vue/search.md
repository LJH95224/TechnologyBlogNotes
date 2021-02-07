# 一个关于搜索的demo

此demo使用的是vue3.0

```vue
<template>
  <div>
    Search for <input v-model="searchInput" />
    <div>
      <p>Loading: {{ loading }}</p>
      <p>Error: {{ error }}</p>
      <p>Number of events: {{ results }}</p>
    </div>
  </div>
</template>
<<script>
import { ref, watch } from '@vue/composition-api'
import eventApi from '@/api/event.js'
import usePromise from '@/usePromise.js'
export default {
	setup () {
		const searchInput = ref('')
		const getEvents = usePromise(search =>
			eventApi.getEventCount(search.value)
		)

		watch(searchInput, () => {
			if (searchInput.value !== '') {
				getEvents.createPromise(searchInput)
			} else {
				getEvents.results.value = null
			}
		})

		return { searchInput, ...getEvents }
	}
}
</script>
```



```javascript
// userPromise.js
import { ref } from '@vue/composition-api'
export default function usePromise (fn) {
	const results = ref(null)
	const loading = ref(false)
	const error =  ref(null)
	const createPromise = async (...args) => {
		loading.value = true
		error.value = null
		results.value = null
		try {
			results.value = await fn(...args)
		} catch （err）{
			error.value = err
		} finally {
			loading.value =  false
		}
	}
	return { results, loading, error, createPromise }
}
```

