<template>
  <div class="navbar">
    <div class="logo" @click="clickLogo">
      <img src="../../assets/images/logo.png" />
      <div class="logo-font">XX管理系统</div>
    </div>

<!--    <top-nav id="top-container" class="nav-list"/>-->

    <div class="right-menu">

<!--      <div class="avatar-wrapper">-->
<!--        <img :src="userStore.avatar" class="user-avatar" />-->
<!--        <el-icon><caret-bottom /></el-icon>-->
<!--      </div>-->
<!--      -->
<!--      <div class="logout">-->
<!--        <span>退出登录</span>-->
<!--      </div>-->
    </div>


  </div>
</template>

<script setup>

import TopNav from '@/components/TopNav'
import variables from '@/assets/styles/variables.module.scss'

const clickLogo = () => {}

</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.module.scss';

.navbar {
  height: $top-nav-height;
  overflow: hidden;
  position: relative;
  background-image: url('../../assets/images/navbar_bgimg.png');
  background-size: cover;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 20px 9px 60px;

  .nav-list {
    width: 400px;
  }

  .logo {
    // width: 520px;
    width: fit-content;
    height: 49px;
    background-size: cover;
    cursor: pointer;
    display: flex;
    align-items: center;
    img{
      height: 100%;
      user-drag: none;
      -webkit-user-drag:none;
    }

    &-font {
      font-weight: 700;
      color: #dfdddd;
      font-size: 24px;
      margin-left: 10px;
    }
  }

  .navbar-right {
    width: calc(100% - 520px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding-left: 240px;

    @media all and (max-width:1600px) {
      padding-left: 220px;
    }

    @media all and (max-width:1440px) {
      padding-left: 200px;
    }

    @media all and (max-width:1300px) {
      padding-left: 140px;
    }
  }
}
</style>
