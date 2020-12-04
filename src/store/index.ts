import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Company from '@/models/Company';
import Contact from '@/models/Contact';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /** Поле со всеми компаниями */
    companies: [] as Company[],
    /** Поле со всеми контактными лицами */
    contacts: [] as Contact[],
    /** Поле с выбранной сейчас компанией */
    currentCompany: {} as Company,
    /** Поле со всеми контактными лицами для выбранной компании */
    companyContacts: [] as Contact[],
    /** Поле с выбранной сейчас контактным лицом */
    currentContact: {} as Contact,
  },
  getters: {
    CURRENT_TIME: (state) => new Date(),
    COMPANIES: (state) => state.companies,
    CONTACTS: (state) => state.contacts,
    CURRENT_COMPANY: (state) => state.currentCompany,
    COMPANY_CONTACTS: (state) => state.companyContacts,
    CURRENT_CONTACT: (state) => state.currentContact,
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
    SET_CURRENT_CONTACT: (state, payload) => {
      state.currentContact = payload;
    },
  },
  actions: {
    /** Получает список всех компаний и помещает в companies. */
    GET_COMPANIES: (context) => {
      axios
        .get('http://localhost:8090/api/companies')
        .then((response) => {
          context.commit('SET_COMPANIES', response.data);
        });
    },

    /**
     * Получает компанию по id и помещает её в currentCompany.
     *
     * @param {string} id - id компании.
     */
    GET_COMPANY_BY_ID(context, id) {
      const apiUrl = 'http://localhost:8090/api/companies/';

      axios
        .get(apiUrl.concat(id))
        .then((response) => {
          context.commit('SET_CURRENT_COMPANY', response.data);
        });
    },
    /** Получает список всех контактных лиц и помещает в contacts. */
    GET_CONTACTS: (context) => {
      axios
        .get('http://localhost:8090/api/contacts')
        .then((response) => {
          context.commit('SET_CONTACTS', response.data);
        });
    },
    /**
     * Получает все контактные лица у компании и помещает в companyContacts.
     *
     * @param {string} id - id компании.
     */
    GET_COMPANY_CONTACTS(context, id) {
      const apiUrl = 'http://localhost:8090/api/contacts/company/';

      axios
        .get(apiUrl.concat(id))
        .then((response) => {
          context.commit('SET_COMPANY_CONTACTS', response.data);
        });
    },
    /**
     * Сохраняет новую компанию в БД.
     *
     * @param {Company} company - id компании.
     * @returns {Promise} - ответ от сервера.
     */
    POST_NEW_COMPANY(state, [company]) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://localhost:8090/api/companies', company)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    /**
     * Сохраняет новое контактное лицо в БД.
     *
     * @param {Сontact} contact - id компании.
     * @returns {Promise} - ответ от сервера.
     */
    POST_NEW_CONTACT(state, [contact]) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://localhost:8090/api/contacts', contact)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    /**
     * Добавляет новую заметку для компании в БД.
     *
     * @param {string} note - добавляемая заметка.
     * @param {string} id - id компании.
     * @returns {Promise} - ответ от сервера.
     */
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
    /**
     * Изменяет информацию о компании в БД.
     *
     * @param {string} company - новая версия компании.
     * @param {string} id - id изменяемой компании.
     * @returns {Promise} - ответ от сервера.
     */
    PATCH_COMPANY(state, [company, id]) {
      const apiUrl = 'http://localhost:8090/api/companies/';

      return new Promise((resolve, reject) => {
        axios
          .patch(apiUrl.concat(id), company)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    /**
     * Удаляет компанию из БД.
     *
     * @param {string} id - id удаляемой компании.
     * @returns {Promise} - ответ от сервера.
     */
    DELETE_COMPANY(state, id) {
      const apiUrl = 'http://localhost:8090/api/companies/';

      return new Promise((resolve, reject) => {
        axios
          .delete(apiUrl.concat(id))
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    /**
     * Получает контакт по id и помещает её в currentContact.
     *
     * @param {string} id - id контакта.
     */
    GET_CONTACT_BY_ID(context, id) {
      const apiUrl = 'http://localhost:8090/api/contacts/';

      axios
        .get(apiUrl.concat(id))
        .then((response) => {
          context.commit('SET_CURRENT_CONTACT', response.data);
        });
    },
    /**
     * Изменяет информацию о контактном лице в БД.
     *
     * @param {string} contact - новая версия контактного лица.
     * @param {string} id - id изменяемого контакта.
     * @returns {Promise} - ответ от сервера.
     */
    PATCH_CONTACT(state, [contact, id]) {
      const apiUrl = 'http://localhost:8090/api/contacts/';

      return new Promise((resolve, reject) => {
        axios
          .patch(apiUrl.concat(id), contact)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    /**
     * Удаляет контакт из БД.
     *
     * @param {string} id - id удаляемого контакта.
     * @returns {Promise} - ответ от сервера.
     */
    DELETE_CONTACT(state, id) {
      const apiUrl = 'http://localhost:8090/api/contacts/';

      return new Promise((resolve, reject) => {
        axios
          .delete(apiUrl.concat(id))
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    /**
     * Добавляет новую заметку для компании в БД.
     *
     * @param {string} note - добавляемая заметка.
     * @param {string} id - id компании.
     * @returns {Promise} - ответ от сервера.
     */
    POST_NOTE_TO_CONTACT(state, [note, id]) {
      const apiUrl = 'http://localhost:8090/api/contacts/';

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
  },
  modules: {
  },
});
