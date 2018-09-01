import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);


import global_store from '../store/global_store';

export default new Vuex.Store({
    modules:{
      globalStore:global_store,
    }
  }
)
