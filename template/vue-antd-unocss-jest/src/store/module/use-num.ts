import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNum = defineStore('routerInfo', () => {
  const numInPinia = ref<number>(10086)
  const addNum = (data: number) => {
    numInPinia.value = numInPinia.value + data
    console.log(numInPinia.value)
  }
  return { numInPinia, addNum }
})
