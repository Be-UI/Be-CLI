<script lang="ts" setup name="system">
import { useRouter } from 'vue-router'
import { useNum } from '../../store/module/use-num'
import store from '../../store'
const storeNum = useNum(store)
const router = useRouter()
</script>

<template>
  <div class="card">
    <el-button type="button" size="large" @click="storeNum.addNum(1)">
      count is {{ storeNum.numInPinia }} (pinia)
    </el-button>
  </div>
  <el-button type="primary" @click="router.push('/')">
    click to home page
  </el-button>
</template>

<style scoped>
.card {
  margin: 10px 0;
}
</style>
