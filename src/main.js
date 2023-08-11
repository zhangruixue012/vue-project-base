import './assets/main.css'

import { createApp } from 'vue'
import Cookies from 'js-cookie'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import App from './App.vue'
import router from './router'

import SvgIcon from '@/components/SvgIcon'

import '@/assets/styles/index.scss' // global css

import '@/mock/index.js'


import './permission' // permission control

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 全局挂载组件
app.component(SvgIcon)

// 使用element-plus 并且设置全局的大小
app.use(ElementPlus, {
    locale: zhCn,
    // 支持 large、default、small
    size: Cookies.get('size') || 'default'
})

app.mount('#app')
