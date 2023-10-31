import './assets/main.css'

import { createApp } from 'vue'
import Cookies from 'js-cookie'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import '@/assets/styles/index.scss' // global css

import App from './App.vue'
import router from './router'

import SvgIcon from '@/components/SvgIcon'

import '@/assets/styles/index.scss' // global css
import { useDict } from '@/utils/dict'
import { resetForm } from '@/utils/ruoyi'
import { download } from '@/utils/request'
import '@/mock/index.js'
import './permission' // permission control

// 注册指令
import plugins from './plugins' // plugins

import Table from './components/Table'
import Pagination from './components/Pagination'
import DictTag from './components/DictTag'
import moment from 'moment';
import directive from "./directive";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(plugins)

// 全局挂载组件
app.component(SvgIcon)
app.component('Table', Table)
app.component('Pagination', Pagination)
app.component('DictTag', DictTag)

directive(app)

app.config.globalProperties.useDict = useDict
app.config.globalProperties.$moment = moment
app.config.globalProperties.resetForm = resetForm
app.config.globalProperties.download = download

// 使用element-plus 并且设置全局的大小
app.use(ElementPlus, {
    locale: zhCn,
    // 支持 large、default、small
    size: Cookies.get('size') || 'default'
})

app.mount('#app')
