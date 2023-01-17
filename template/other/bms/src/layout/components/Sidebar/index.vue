<template>
  <div
    class="has-logo"
    :style="{
      backgroundColor: variables.menuLightBackground,
    }"
  >
    <Logo :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuLightBackground"
        :text-color="variables.menuLightColor"
        :unique-opened="true"
        active-text-color="#409EFF"
        :collapse-transition="false"
        mode="vertical"
      >
        <SidebarItem
          v-for="(route, index) in sidebarRouters"
          :key="route.path + index"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
    <img class="side-bg" :src="svgSidebar" alt="home-bg">
  </div>
</template>

<script setup name="SidebarComp">
import variables from '../../../assets/styles/variables.module.scss'
import useAppStore from '../../../store/modules/app'
import { constantRoutes } from '../../../router/index'
import svgSidebar from '../../../assets/svg/sidebar.svg'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
let sidebarRouters = []
constantRoutes.forEach((val) => {
  if (val.key === 'home')
    sidebarRouters = val.children
})
const routeInst = useRoute()
const appStore = useAppStore()
const isCollapse = computed(() => !appStore.sidebar.opened)
const activeMenu = computed(() => {
  const { meta, path } = routeInst
  if (meta.activeMenu)
    return meta.activeMenu

  return path
})
</script>

<style>
  .side-bg {
    position: absolute;
    z-index: 2;
    bottom: 2%;
    width: 100%;
    height: 14%;
  }
</style>
