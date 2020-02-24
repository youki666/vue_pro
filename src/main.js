import Vue from 'vue'
import App from './App.vue'
import {Button,Icon, Layout,Menu,Drawer,Radio} from 'ant-design-vue'
import router from './router'
import store from './store'

import Authorized from "./components/Authorized";

import Auth from './directives/auth'

Vue.component('Authorized', Authorized)

Vue.use(Auth)
Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Icon)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Drawer)
Vue.use(Radio)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
