import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import * as d3 from 'd3'
import store from './assets/store'
import '@/mock'
import 'url-search-params-polyfill';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueAxios,axios);


Object.defineProperty(Vue.prototype, '$d3', {value: d3});

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
