<template>
  <div class="app-wrapper">
    <navbar />
    <div class="main-container" :class="classObj">
      <Sidebar/>

      <router-view v-slot="{ Component, route }">
        <transition name="fade-transform" mode="out-in">
          <component :is="Component" :key="route.path"/>
        </transition>
      </router-view>
    </div>
  </div>
</template>


<script setup>
import { Navbar, Sidebar } from './components/index.js'
import useAppStore from '@/store/modules/app'

const sidebar = computed(() => useAppStore().sidebar);

const classObj = computed(() => ({
  hideSidebar: !sidebar.value.opened,
  openSidebar: sidebar.value.opened,
  // withoutAnimation: sidebar.value.withoutAnimation,
  // mobile: device.value === 'mobile'
}))


const route = useRoute()


</script>


<style lang="scss" scoped>
.app-wrapper {
  height: 100%;
}
</style>
