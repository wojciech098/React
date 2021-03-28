import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from "vuex-persist";

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    token: null,
    isAuth: false,
    email: null
  },
  mutations: {
    setToken(state, token){
      state.token=token
    },
    setAuth(state, status){
      state.isAuth=status
    },
    setEmail(state, email){
      state.email=email
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
