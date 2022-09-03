<script setup lang="ts">
defineProps<{ msg: string }>()
</script>

<template>
  <div class="title">
    <img src="src/assets/images/logo.png">
    <h1>
      {{ msg }}
    </h1>
  </div>
  <p class="description">
    A cli for quickly generating project templates, supporting vite, vue3, react, element-plus, ant design, windicss, unocss
  </p>
  <div class="logo">
    <a href="https://vuejs.org/" target="_blank">
      <img src="src/assets/images/vue.png">
    </a>
    <a href="https://vitejs.dev/" target="_blank">
      <img src="src/assets/images/vite.png" class="vite-logo">
    </a>
    <a href="https://element-plus.org/" target="_blank">
      <img src="src/assets/images/element.png">
    </a>
    <a href="https://github.com/Be-UI/Be-CLI" target="_blank">
      <img src="src/assets/images/logo.png">
    </a>
  </div>
</template>

<style scoped lang="scss">
.title{
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  h1{
    margin: 0;
  }
  img{
    width: 40px;
    height: 40px;
    margin: 0 10px;
  }
}
.description{
  margin: 10px 0;
  width: 200px;
  text-align: center;
}
.logo{
  display: flex;
  justify-content: space-between;
  align-items: center;
  img{
    width: 40px;
    height: 40px;
    margin: 0 10px;
  }
}
</style>
