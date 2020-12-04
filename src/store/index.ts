import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
// Установить npm install --save vuex-persistedstate
import createPersistedState from 'vuex-persistedstate';
import request from '../request';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    token: '',
    userName: '',
    userLogin: '',
    userPassword: '',
    userRole: '',
  },
  getters: {
    TOKEN: (state) => state.token,
    USERNAME: (state) => state.userName,
    ROLE: (state) => state.userRole,
  },
  mutations: {
    SET_TOKEN: (state, payload) => {
      state.token = payload;
    },
    SET_USERNAME: (state, payload) => {
      state.userName = payload;
    },
    SET_ROLE: (state, payload) => {
      state.userRole = payload;
    },
  },
  actions: {
    GET_USER(context, [username, password]) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://localhost:8080/api/auth/login', { username, password })
          .then((response) => {
            context.commit('SET_TOKEN', response.data.token);
            context.commit('SET_USERNAME', response.data.employee.name);
            context.commit('SET_ROLE', response.data.employee.role.role);
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },
    POST_LOGOUT(context) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://localhost:8080/api/auth/logout', context.state.token)
          .then(() => {
            context.commit('SET_TOKEN', '');
            context.commit('SET_USERNAME', '');
            context.commit('SET_ROLE', '');
          })
          .catch((error) => reject(error));
      });
    },
    CHECK_SESSION(context) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://localhost:8080/api/auth/token', context.state.token)
          .then((response) => {
            context.commit('SET_TOKEN', response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  modules: {
  },
});
