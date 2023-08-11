<template>
  <el-menu
      :default-active="activeMenu"
      mode="horizontal"
      @select="handleSelect"
      background-color="transparent"
  >
    <el-menu-item v-for="(item, index) in topMenus" :index="item.path" :key="item.path">
      <svg-icon :icon-class="item.meta.icon" />
      {{ item.meta.title }}
    </el-menu-item>

    <!-- 顶部菜单超出数量折叠 -->
<!--    <el-sub-menu index="more" v-if="topMenus.length > visibleNumber">-->
<!--      <template #title>更多菜单</template>-->
<!--      <template v-for="(item, index) in topMenus">-->
<!--        <el-menu-item-->
<!--            :index="item.path"-->
<!--            :key="index"-->
<!--            v-if="index >= visibleNumber"-->
<!--        ><svg-icon :icon-class="item.meta.icon" />-->
<!--          {{ item.meta.title }}</el-menu-item-->
<!--        >-->
<!--      </template>-->
<!--    </el-sub-menu>-->
  </el-menu>
</template>

<script setup>
import { constantRoutes } from "@/router"
import usePermissionStore from '@/store/modules/permission'
import useAppStore from "@/store/modules/app";
import { isHttp } from '@/utils/validate'

const permissionStore = usePermissionStore()
const appStore = useAppStore()

// 所有的路由信息
const routers = computed(() => permissionStore.topbarRouters);
const activeMenu = ref('1')
// 顶部栏初始数
const visibleNumber = ref(null);
const route = useRoute();
const router = useRouter();

// 顶部显示菜单
const topMenus = computed(() => {
  let topMenus = [];
  routers.value.map((menu) => {
    if (menu.hidden !== true) {
      // 兼容顶部栏一级菜单内部跳转
      if (menu.path === "/") {
        topMenus.push(menu.children[0]);
      } else {
        topMenus.push(menu);
      }
    }
  })
  return topMenus;
})


function setVisibleNumber() {
  const width = document.body.getBoundingClientRect().width / 3;
  visibleNumber.value = parseInt(width / 85);

}

function handleSelect(key, keyPath) {
  const route = routers.value.find(item => item.path === key);
  if (isHttp(key)) {
    // http(s):// 路径新窗口打开
    window.open(key, "_blank");
  } else if (!route || !route.children) {
    // 没有子路由路径内部打开
    router.push({ path: key });
    // appStore.toggleSideBarHide(true);
  } else {
    // 显示左侧联动菜单
    activeRoutes(key);
    // appStore.toggleSideBarHide(false);
  }
}

function activeRoutes(key) {
  let routes = [];
  if (childrenMenus.value && childrenMenus.value.length > 0) {
    childrenMenus.value.map((item) => {
      if (key == item.parentPath || (key == "index" && "" == item.path)) {
        routes.push(item);
      }
    });
  }
  if(routes.length > 0) {
    console.log('routes:', routes);
    permissionStore.setSidebarRouters(routes);
  }
  return routes;
}

// 设置子路由
const childrenMenus = computed(() => {
  let childrenMenus = [];
  routers.value.map((router) => {
    for (let item in router.children) {
      if (router.children[item].parentPath === undefined) {
        if(router.path === "/") {
          router.children[item].path = "/" + router.children[item].path;
        } else {
          if(!isHttp(router.children[item].path)) {
            router.children[item].path = router.path + "/" + router.children[item].path;
          }
        }
        router.children[item].parentPath = router.path;
      }
      childrenMenus.push(router.children[item]);
    }
  })
  return constantRoutes.concat(childrenMenus);
})
</script>

<style lang="scss">
.nav-list.el-menu--horizontal > .el-menu-item {
  float: left;
  height: 50px !important;
  line-height: 50px !important;
  color: #fff !important;
  padding: 0 5px !important;
  margin: 0 10px !important;
}

.nav-list.el-menu--horizontal {
  border-bottom: none;
}

.nav-list.el-menu--horizontal > .el-menu-item.is-active, .el-menu--horizontal > .el-sub-menu.is-active .el-submenu__title {
  border-bottom: 2px solid #{'var(--theme)'} !important;
  color: #303133;
}

/* sub-menu item */
.nav-list.el-menu--horizontal > .el-sub-menu .el-sub-menu__title {
  float: left;
  height: 50px !important;
  line-height: 50px !important;
  color: #999093 !important;
  padding: 0 5px !important;
  margin: 0 10px !important;
}
</style>
