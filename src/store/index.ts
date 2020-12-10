import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Company from '@/models/Company';
import Contact from '@/models/Contact';
import Project from '@/models/Project';
import Stage from '@/models/Stage';
import { format } from 'date-fns';
import Task from '@/models/Task';
// Установить npm install --save vuex-persistedstate
// import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  // plugins: [createPersistedState()],
  state: {
    projects: [] as Project[],
    currentProject: {} as Project,
    /** Поле с этапами для текущего проекта */
    currentStages: [] as Stage[],
    tasks: [] as Task[],
    firstDay: null,
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
    token: '',
    userName: '',
    userLogin: '',
    userPassword: '',
    userRole: '',
  },
  getters: {
    PROJECTS: (state) => state.projects,
    CURRENT_PROJECT: (state) => state.currentProject,
    CURRENT_STAGES: (state) => state.currentStages,
    TASKS: (state) => state.tasks
      .sort((prev, next) => prev.taskDate.getDate() - next.taskDate.getDate()),
    FIRST_DAY: (state) => state.firstDay,
    /* FIRST_DAY: (state) => {
      alert(state.firstDay);
      return state.firstDay;
    }, */
    CURRENT_TIME: (state) => new Date(),
    COMPANIES: (state) => state.companies,
    CONTACTS: (state) => state.contacts,
    CURRENT_COMPANY: (state) => state.currentCompany,
    COMPANY_CONTACTS: (state) => state.companyContacts,
    CURRENT_CONTACT: (state) => state.currentContact,
    TOKEN: (state) => state.token,
    USERNAME: (state) => state.userName,
    ROLE: (state) => state.userRole,
  },
  mutations: {
    SET_PROJECTS: (state, payload) => {
      state.projects = payload;
    },
    SET_CURRENT_PROJECT: (state, payload) => {
      state.currentProject = payload;
    },
    SET_CURRENT_PROJECT_BY_ID: (state, id) => {
      state.projects.forEach((project) => {
        if (project.id === id) {
          state.currentProject = project;
        }
      });
    },
    /**
     * Удаление этапа из CURRENT_STAGES
     *
     * @param {number} stageId - id этапа.
     */
    DELETE_STAGE: (state, stageId: number) => {
      for (let i = 0; i < state.currentStages.length; i += 1) {
        if (state.currentStages[i].id === stageId) {
          state.currentStages.splice(i, 1);
        }
      }
    },
    SET_CURRENT_STAGES: (state, payload) => {
      state.currentStages = payload;
    },
    SET_TASKS: (state, payload) => {
      const tempArr = [] as Task[];

      if (payload[0] !== undefined) {
        for (let i = 0; i < payload.length; i += 1) {
          const task: Task = payload[i];
          task.taskDate = new Date(payload[i].taskDate);
          state.tasks.push(payload[i]);
        }
      }
    },
    SET_FIRST_DAY: (state, payload) => {
      state.firstDay = payload;
    },
    CLEAR_TASKS: (state) => {
      state.tasks = [];
    },
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
    PATCH_PROJECT(state, [project]) {
      return new Promise((resolve, reject) => {
        axios
          .patch('http://localhost:8090/api/projects', project)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    /**
     * Изменяет информацию об этапе в БД.
     *
     * @param {Stage} stage - новая версия этапа.
     */
    PATCH_STAGE(state, stage: Stage) {
      return new Promise((resolve, reject) => {
        axios
          .patch('http://localhost:8090/api/stages', stage)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    /**
     * Добавляет новый этап в БД.
     *
     * @param {Stage} stage - добавляемый этап.
     */
    POST_NEW_STAGE(state, stage: Stage) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://localhost:8090/api/stages', stage)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    /**
     * Удаляет этап из БД.
     *
     * @param {string} id - id удаляемого этапа.
     */
    DELETE_STAGE(state, id: string) {
      const apiUrl = 'http://localhost:8090/api/stages/';

      return new Promise((resolve, reject) => {
        axios
          .delete(apiUrl.concat(id))
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    POST_NEW_PROJECT(state, [project]) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://localhost:8090/api/projects', project)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    DELETE_PROJECT(state, id) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`http://localhost:8090/api/projects/${id}`)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    /**
     * Получает все этапы проекта и помещает в currentStages
     *
     * @param {number} id - id проекта.
     */
    GET_PROJECT_STAGES: (context, id: string) => {
      const apiUrl = 'http://localhost:8090/api/stages/project/';

      axios
        .get(apiUrl.concat(id))
        .then((response) => {
          context.commit('SET_CURRENT_STAGES', response.data);
        });
    },
    GET_THREE_DAY_TASKS(context, firstDay) {
      if (this.getters.FIRST_DAY === null
        || this.getters.FIRST_DAY.getDate() !== firstDay.getDate()) {
        this.commit('CLEAR_TASKS');

        const secondDay = new Date(firstDay.getFullYear(), firstDay.getMonth());
        const thirdDay = new Date(firstDay.getFullYear(), firstDay.getMonth());

        secondDay.setDate(firstDay.getDate() + 1);
        thirdDay.setDate(firstDay.getDate() + 2);

        this.commit('SET_FIRST_DAY', firstDay);

        this.dispatch('GET_DAY_TASKS', [this.getters.USERNAME, format(firstDay, 'yyyy-MM-dd')]);
        this.dispatch('GET_DAY_TASKS', [this.getters.USERNAME, format(secondDay, 'yyyy-MM-dd')]);
        this.dispatch('GET_DAY_TASKS', [this.getters.USERNAME, format(thirdDay, 'yyyy-MM-dd')]);
      }
    },
    GET_DAY_TASKS(context, [username, date]) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: 'http://localhost:8090/api/employee/tasks',
          params: {
            username,
            date,
          },
        })
          .then((response) => {
            context.commit('SET_TASKS', response.data);
          })
          .catch((error) => reject(error));
      });
    },
    GET_PROJECTS: (context) => {
      axios
        .get('http://localhost:8090/api/projects')
        .then((response) => {
          context.commit('SET_PROJECTS', response.data);
        });
    },
    GET_PROJECT_BY_ID(context, id) {
      axios
        .get(`http://localhost:8090/api/projects/${id}`)
        .then((response) => {
          context.commit('SET_CURRENT_PROJECT', response.data);
        });
    },
    GET_USER(context, [username, password]) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://localhost:8090/api/auth/login', { username, password })
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
          .post('http://localhost:8090/api/auth/logout', context.state.token)
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
          .post('http://localhost:8090/api/auth/token', context.state.token)
          .then((response) => {
            context.commit('SET_TOKEN', response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
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
