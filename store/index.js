import Vue from 'vue'
import Vuex from 'vuex'
import time from './modules/time'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    time
  }
})

export default store
