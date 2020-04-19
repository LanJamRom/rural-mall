import consts from '@/src/consts.js'
import store from '@/src/store'
// 引入basic
import utils from '@/src/utils'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$store = store

Vue.prototype.$utils = utils
utils.common.log('安装$utils模块到Vue.prototype下，调用方式：this.$utils', Vue.prototype.$utils)

Vue.prototype.$loading = utils.common.toast.loading
Vue.prototype.$hideLoading = utils.common.toast.hideLoading
utils.common.log('安装$loading模块到Vue.prototype下，调用方式：this.$loading', Vue.prototype.$loading)
utils.common.log('安装$hideLoading模块到Vue.prototype下，调用方式：this.$hideLoading', Vue.prototype.$hideLoading)

Vue.prototype.$consts = consts
utils.common.log('安装$consts模块到Vue.prototype下，调用方式：this.$consts', Vue.prototype.$consts)

dayjs.locale('zh-cn')
Vue.prototype.$dayjs = dayjs
utils.common.log('安装$dayjs模块到Vue.prototype下，调用方式：this.$dayjs', Vue.prototype.$dayjs)

Vue.filter('dateFilter', function(value, format = 'YYYY.MM.DD HH:mm:ss') {
  if (!value) return ''
  return dayjs(value).format(format)
})
const app = new Vue({
  store,
  ...App
})
app.$mount()
