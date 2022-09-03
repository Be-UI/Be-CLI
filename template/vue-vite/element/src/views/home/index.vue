<script lang="ts" setup name="home">
import { useNum } from '../../store/module/use-num'
import store from '../../store'
const storeNum = useNum(store)
</script>

<template>
  <div>{{ storeNum.numInPinia }}</div>
  <span @click="storeNum.addNum(1)">addNum</span>
</template>

<style scoped>

</style>
