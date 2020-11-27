import Vue from 'vue';
import Vuex from 'vuex';
import User from './modules/UserModule';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  getters: {
    CURRENT_TIME: (state) => new Date(),
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    User,
  },
});
