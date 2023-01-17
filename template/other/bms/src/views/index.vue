<template>
  <div class="app-container home">
    <div class="home">
      <h1>欢迎使用XXX平台管理后台系统</h1>
      <img src="../assets/images/cbd.png" style="width: 10rem;height: 10rem;">
      <img class="home-bg" :src="svgHome" alt="home-bg">
    </div>
  </div>
</template>

<script setup name="Index">
import svgHome from '../assets/svg/home.svg'
</script>

<style scoped lang="scss">
  .home {
    font-family: 'open sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 13px;
    color: #676a6c;
    overflow-x: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    height: 100%;
    h1 {
      font-size: 2rem;
    }
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    img {
      margin: 1rem 0;
    }
    h2 {
      width: 24rem;
      text-align: center;
      line-height: 36px;
    }

    .home-bg {
      position: fixed;
      top: 45%;
      z-index: -1;
      width: 54%;
      height: 40%;
    }
  }
</style>
