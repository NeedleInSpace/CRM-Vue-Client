import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Company from '@/models/Company';
import Contact from '@/models/Contact';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    companies: [] as Company[],
    contacts: [] as Contact[],
    currentCompany: {} as Company,
    companyContacts: [] as Contact[],
  },
  getters: {
    CURRENT_TIME: (state) => new Date(),
    COMPANIES: (state) => state.companies,
    CONTACTS: (state) => state.contacts,
    CURRENT_COMPANY: (state) => state.currentCompany,
    COMPANY_CONTACTS: (state) => state.companyContacts,
  },
  mutations: {
    SET_COMPANIES: (state, payload) => {
      state.companies = payload;
    },
    SET_CONTACTS: (state, payload) => {
      state.contacts = payload;
    },
    SET_CURRENT_COMPANY: (state, payload) => {
      state.currentCompany = payload;
    },
    SET_COMPANY_CONTACTS: (state, payload) => {
      state.companyContacts = payload;
    },
  },
  actions: {
    GET_COMPANIES: (context) => {
      axios
        .get('http://localhost:8090/api/companies')
        .then((response) => {
          context.commit('SET_COMPANIES', response.data);
        });
    },
    GET_COMPANY_BY_ID(context, id) {
      const apiUrl = 'http://localhost:8090/api/companies/';

      axios
        .get(apiUrl.concat(id))
        .then((response) => {
          context.commit('SET_CURRENT_COMPANY', response.data);
        });
    },
    GET_CONTACTS: (context) => {
      axios
        .get('http://localhost:8090/api/contacts')
        .then((response) => {
          context.commit('SET_CONTACTS', response.data);
        });
    },
    GET_COMPANY_CONTACTS(context, id) {
      const apiUrl = 'http://localhost:8090/api/contacts/company/';

      axios
        .get(apiUrl.concat(id))
        .then((response) => {
          context.commit('SET_COMPANY_CONTACTS', response.data);
        });
    },
    POST_NEW_COMPANY(state, [company]) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://localhost:8090/api/companies', company)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    POST_NEW_CONTACT(state, [contact]) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://localhost:8090/api/contacts', contact)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    POST_NOTE_TO_COMPANY(state, [note, id]) {
      const apiUrl = 'http://localhost:8090/api/companies/';

      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: apiUrl.concat(id),
          params: { note },
        })
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    PATCH_COMPANY(state, [company, id]) {
      const apiUrl = 'http://localhost:8090/api/companies/';
      alert(company.consumptionVolume);

      return new Promise((resolve, reject) => {
        axios
          .patch(apiUrl.concat(id), company)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    DELETE_COMPANY(state, id) {
      const apiUrl = 'http://localhost:8090/api/companies/';

      return new Promise((resolve, reject) => {
        axios
          .delete(apiUrl.concat(id))
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
  },
  modules: {
  },
});
