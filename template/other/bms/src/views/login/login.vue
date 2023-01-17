<template>
  <div class="login">
    <div class="login-left">
      <img alt="logo" src="../../assets/images/logo.png">
      <div class="title">
        <h1>XXX平台</h1>
        <h1>管理后台</h1>
      </div>
      <p>Copyright © 2018-2022 chabaidao All Rights Reserved.</p>
      <div class="area">
        <ul class="circles">
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
        </ul>
      </div>
    </div>
    <div class="login-right">
      <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
        <h1 class="title">
          登录
        </h1>
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            type="text"
            size="large"
            autocomplete="off"
            placeholder="账号"
          >
            <template #prefix>
              <svg-icon
                icon-class="user"
                class="el-input__icon input-icon"
              />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            size="large"
            autocomplete="off"
            placeholder="密码"
            @keyup.enter="handleLogin"
          >
            <template #prefix>
              <svg-icon
                icon-class="password"
                class="el-input__icon input-icon"
              />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button
            :loading="loading"
            size="large"
            type="primary"
            style="width: 100%; margin-top: 2rem"
            @click.prevent="handleLogin"
          >
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
          <div v-if="register" style="float: right">
            <router-link class="link-type" to="/register">
              立即注册
            </router-link>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'
import { useRouter } from 'vue-router'
import useUserStore from '../../store/modules/user'
import { setToken } from '../../utils/auth'
import type { ComponentPublicInstance } from 'vue'
  interface ILoginForm extends ComponentPublicInstance {
    $refs: {
      loginRef: {
        validate: Function
      }
    }
  }
const userStore = useUserStore()
const router = useRouter()
const proxy = getCurrentInstance()?.proxy

const loginForm = ref({
  username: '',
  password: '',
})

const loginRules = {
  username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
  password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }],
}

const loading = ref(false)
// 注册开关
const register = ref(false)
const redirect = ref(undefined)

function handleLogin() {
  ;(proxy as ILoginForm).$refs.loginRef.validate((valid: boolean) => {
    if (valid) {
      loading.value = true
      // 调用action的登录方法
      userStore
        .login(loginForm.value)
        .then(() => {
          setToken(Number(new Date()).toString())
          router.push({ path: redirect.value || '/' })
        })
        .catch(() => {
          loading.value = false
        })
    }
  })
}
</script>

<style lang="scss">
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100vw;
    position: relative;
    overflow-x: hidden;
    overflow-y: hidden;
  }
  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #707070;
  }

  .login-form {
    border-radius: 6px;
    position: relative;
    z-index: 2;
    background: #ffffff;
    width: 400px;
    padding: 25px 25px 5px 25px;
    margin-left: 7rem;
    box-shadow: 0 6px 30px 5px #0000000d, 0 16px 24px 2px #0000000a, 0 8px 10px -5px #00000014;
    .el-input {
      height: 40px;
      input {
        height: 40px;
      }
    }
    .input-icon {
      height: 39px;
      width: 14px;
      margin-left: 0px;
    }
  }
  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }
  .login-code {
    width: 33%;
    height: 40px;
    float: right;
    img {
      cursor: pointer;
      vertical-align: middle;
    }
  }

  .login-right {
    flex: 3;
    height: 100vh;
    display: flex;
    align-items: center;
    background: 50% / cover no-repeat url('../../assets/images/login.jpg');

  }
  .login-left {
    flex: 1;
    height: 100vh;
    background-color: #366ef4;
    color: #fff;
    font-size: 12px;
    letter-spacing: 1px;
    position: relative;
    font-family: Mono, sans-serif;

    img {
      margin: 20px;
      height: 40px;
    }
    .title {
      margin: 16rem 0;
      font-size: 20px;
      color: #fff;
    }
    p {
      position: absolute;
      bottom: 30px;
      text-align: center;
      width: 100%;
    }
  }
  .login-code-img {
    height: 40px;
    padding-left: 12px;
  }

  .circles{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .circles li{
    position: absolute;
    display: block;
    list-style: none;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.2);
    animation: animate 25s linear infinite;
    bottom: -150px;

  }

  .circles li:nth-child(1){
    left: 25%;
    width: 80px;
    height: 80px;
    animation-delay: 0s;
  }

  .circles li:nth-child(2){
    left: 10%;
    width: 20px;
    height: 20px;
    animation-delay: 2s;
    animation-duration: 12s;
  }

  .circles li:nth-child(3){
    left: 70%;
    width: 20px;
    height: 20px;
    animation-delay: 4s;
  }

  .circles li:nth-child(4){
    left: 40%;
    width: 60px;
    height: 60px;
    animation-delay: 0s;
    animation-duration: 18s;
  }

  .circles li:nth-child(5){
    left: 65%;
    width: 20px;
    height: 20px;
    animation-delay: 0s;
  }

  .circles li:nth-child(6){
    left: 75%;
    width: 110px;
    height: 110px;
    animation-delay: 3s;
  }

  .circles li:nth-child(7){
    left: 35%;
    width: 150px;
    height: 150px;
    animation-delay: 7s;
  }

  .circles li:nth-child(8){
    left: 50%;
    width: 25px;
    height: 25px;
    animation-delay: 15s;
    animation-duration: 45s;
  }

  .circles li:nth-child(9){
    left: 20%;
    width: 15px;
    height: 15px;
    animation-delay: 2s;
    animation-duration: 35s;
  }

  .circles li:nth-child(10){
    left: 85%;
    width: 150px;
    height: 150px;
    animation-delay: 0s;
    animation-duration: 11s;
  }

  @keyframes animate {

    0%{
      transform: translateY(0) rotate(0deg);
      opacity: 1;
      border-radius: 0;
    }

    100%{
      transform: translateY(-1000px) rotate(720deg);
      opacity: 0;
      border-radius: 50%;
    }

  }
</style>
