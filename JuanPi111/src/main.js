// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// 引入路由
import router from './router/router'
// 引入axios
import axios from 'axios'
Vue.prototype.axios = axios
// 引入vuex文件
import store from './vuex/vuex'
// 重置样式表引进来
import './assets/css/reset.css'
//配置swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false

Vue.prototype.allPriceFlag = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store
})
