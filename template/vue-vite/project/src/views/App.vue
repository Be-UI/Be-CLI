<script setup lang="ts" name="app">
import HelloWorld from '../components/HelloWorld.vue'
import { getHomeData } from '../api/api-home'

console.log('当前环境：', import.meta.env.VITE_PROJECT_ENV)
getHomeData({ appKey: 'abcdefg' })
</script>

<template>
  <div id="app_index">
    <HelloWorld msg="Be-CLI" />
    <router-view />
  </div>
</template>

