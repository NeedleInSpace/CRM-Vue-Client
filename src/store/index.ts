import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    companies: null,
    contacts: null,
  },
  plugins: [createPersistedState()],
  getters: {
    CURRENT_TIME: (state) => new Date(),
    COMPANIES: (state) => state.companies,
    CONTACTS: (state) => state.contacts,
  },
  mutations: {
    SET_COMPANIES: (state, payload) => {
      state.companies = payload;
    },
    SET_CONTACTS: (state, payload) => {
      state.contacts = payload;
    },
  },
  actions: {
    POST_NEW_COMPANY(state, [company]) {
      axios
        .post('http://localhost:8090/api/companies', company)
        .then((response) => {
          window.location.replace('http://localhost:8080/#/kb/');
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    POST_NEW_CONTACT(state, [contact]) {
      axios
        .post('http://localhost:8090/api/contacts', contact)
        .then((response) => {
          // window.location.replace('http://localhost:8080/#/kb/');
          router.back();
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    GET_COMPANIES: async (context, payload) => {
      const { data } = await axios.get('http://localhost:8090/api/companies');
      context.commit('SET_COMPANIES', data);
    },
    GET_CONTACTS: async (context, payload) => {
      const { data } = await axios.get('http://localhost:8090/api/contacts');
      context.commit('SET_CONTACTS', data);
    },
  },
  modules: {
  },
});
