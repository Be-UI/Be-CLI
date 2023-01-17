<template>
  <div class="navbar">
    <Hamburger
      id="hamburger-container"
      :is-active="appStore.sidebar.opened"
      class="hamburger-container"
      @toggle-click="toggleSideBar"
    />
    <Breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="appStore.device !== 'mobile'">
        <el-popover popper-class="cur-env--popover">
          <template #reference>
            <span class="cur-env">
              当前环境:
              <span class="cur-env--val">{{ curEnv }} </span>
            </span>
          </template>
          <a
            v-for="item in EVN_LIST"
            :key="item.value + 'env'"
            target="_blank"
            :href="item.link"
            @click.prevent="e => handleClickEnv(e, item)"
          >
            <p>
              {{ item.env }}
            </p>
          </a>
        </el-popover>
        <Screenfull id="screenfull" class="right-menu-item hover-effect" />
      </template>

      <div class="avatar-container">
        <el-dropdown class="right-menu-item hover-effect" trigger="click" @command="handleCommand">
          <div class="avatar-wrapper">
            <el-avatar :size="40" :src="userSvg" />
            <el-icon><caret-bottom /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="logout">
                <span>退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus'
import Breadcrumb from '../../components/Breadcrumb'
import Hamburger from '../../components/Hamburger'
import Screenfull from '../../components/Screenfull'
import useAppStore from '../../store/modules/app'
import { EVN_LIST } from '../../utils/constant'
import userSvg from '../../assets/svg/user.svg'
import router from '../../router'
import { removeToken } from '../../utils/auth'
const appStore = useAppStore()
function toggleSideBar() {
  appStore.toggleSideBar()
}

function handleCommand(command: string) {
  switch (command) {
    case 'logout':
      logout()
      break
    default:
      break
  }
}

function logout() {
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      removeToken()
      router.push('/login')
    })
    .catch((err) => {
      console.error(err)
    })
}
let curEnv = import.meta.env.VITE_APP_ENV
const setCurEnv = () => {
  for (let i = 0; i < EVN_LIST.length; i++) {
    if (EVN_LIST[i].env === curEnv)
      curEnv = EVN_LIST[i].value
  }
}
setCurEnv()

const handleClickEnv = (e: MouseEvent, item: typeof EVN_LIST[0]) => {
  if (item.value === curEnv)
    return

  window.open(item.link, '_blank')
}
</script>

<style lang="scss" scoped>
  .cur-env--popover {
    p {
      margin: 5px 0;
      &:hover {
        color: #409eff;
      }
    }
  }
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .topmenu-container {
      position: absolute;
      left: 50px;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;
      display: flex;
      .cur-env {
        font-size: 12px;
        .cur-env--val {
          color: #409eff;
        }
      }
      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
        }
      }

      .avatar-container {
        margin-right: 40px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          i {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
