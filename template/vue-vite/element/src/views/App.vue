<script setup lang="ts" name="app">
import { useRouter } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import { getHomeData } from '../api/api-home'
// test env
console.log('当前环境：', import.meta.env.VITE_PROJECT_ENV)
// test request
getHomeData({ appKey: 'appKey' })
</script>

<template>
  <div id="app_index">
    <HelloWorld msg="Be-CLI" />
    <router-view />
  </div>
</template>

<style lang="scss">
@import "src/assets/style/app.scss";
</style>

