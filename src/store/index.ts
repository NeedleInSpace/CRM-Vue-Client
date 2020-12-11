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
import createPersistedState from 'vuex-persistedstate';
import request from '../request';

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
    /** Поле с выбранной сейчас задачей */
    currentTask: {} as Task,
    currentStage: {} as Stage,
  },
  getters: {
    PROJECTS: (state) => state.projects,
    CURRENT_PROJECT: (state) => state.currentProject,
    CURRENT_STAGES: (state) => state.currentStages,
    CURRENT_STAGE: (state) => state.currentStage,
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
    CURRENT_TASK: (state) => state.currentTask,
    /* TOKEN: (state) => state.token,
    USERNAME: (state) => state.userName,
    ROLE: (state) => state.userRole,
    USER_ID: (state) => state.userId, */
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
    SET_CURRENT_TASK: (state, payload) => {
      state.currentTask = payload;
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
  },
  actions: {
    PATCH_PROJECT(state, [project]) {
      return new Promise((resolve, reject) => {
        request
          .patch('projects', project)
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
        request
          .patch('stages', stage)
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
        request
          .post('stages', stage)
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
      const apiUrl = 'stages/';

      return new Promise((resolve, reject) => {
        request
          .delete(apiUrl.concat(id))
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    POST_NEW_PROJECT(state, [project]) {
      return new Promise((resolve, reject) => {
        request
          .post('projects', project)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    DELETE_PROJECT(state, id) {
      return new Promise((resolve, reject) => {
        request
          .delete(`projects/${id}`)
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
      const apiUrl = 'stages/project/';

      request
        .get(apiUrl.concat(id))
        .then((response) => {
          context.commit('SET_CURRENT_STAGES', response.data);
        });
    },
    GET_PROJECTS: (context) => {
      request
        .get('projects')
        .then((response) => {
          context.commit('SET_PROJECTS', response.data);
        });
    },
    GET_PROJECT_BY_ID(context, id) {
      request
        .get(`projects/${id}`)
        .then((response) => {
          context.commit('SET_CURRENT_PROJECT', response.data);
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
        request({
          method: 'GET',
          url: 'employee/tasks',
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
    GET_TASK_BY_ID(context, id) {
      request
        .get(`tasks/${id}`)
        .then((response) => {
          context.commit('SET_CURRENT_TASK', response.data);
        });
    },
    /** Получает список всех компаний и помещает в companies. */
    GET_COMPANIES: (context) => {
      request
        .get('companies')
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
      const apiUrl = 'companies/';

      request
        .get(apiUrl.concat(id))
        .then((response) => {
          context.commit('SET_CURRENT_COMPANY', response.data);
        });
    },
    /** Получает список всех контактных лиц и помещает в contacts. */
    GET_CONTACTS: (context) => {
      request
        .get('contacts')
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
      const apiUrl = 'contacts/company/';

      request
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
        request
          .post('companies', company)
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
        request
          .post('contacts', contact)
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
      const apiUrl = 'companies/';

      return new Promise((resolve, reject) => {
        request({
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
      const apiUrl = 'companies/';

      return new Promise((resolve, reject) => {
        request
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
      const apiUrl = 'companies/';

      return new Promise((resolve, reject) => {
        request
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
      const apiUrl = 'contacts/';

      request
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
      const apiUrl = 'contacts/';

      return new Promise((resolve, reject) => {
        request
          .patch(apiUrl.concat(id), contact)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    PATCH_TASK(state, [task]) {
      const apiUrl = 'tasks';

      return new Promise((resolve, reject) => {
        request
          .patch(apiUrl, task)
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
      const apiUrl = 'contacts/';

      return new Promise((resolve, reject) => {
        request
          .delete(apiUrl.concat(id))
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    /**
     * Удаляет задачу из БД.
     *
     * @param {string} id - id удаляемой задачи.
     * @returns {Promise} - ответ от сервера.
     */
    DELETE_TASK(state, id) {
      const apiUrl = 'tasks/';

      return new Promise((resolve, reject) => {
        request
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
      const apiUrl = 'contacts/';

      return new Promise((resolve, reject) => {
        request({
          method: 'POST',
          url: apiUrl.concat(id),
          params: { note },
        })
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    POST_NEW_TASK(state, [task]) {
      return new Promise((resolve, reject) => {
        request
          .post('tasks', task)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
  },
  modules: {
    User: {
      state: () => ({
        token: '',
        userName: '',
        userLogin: '',
        userPassword: '',
        userRole: '',
        userId: '',
      }),
      getters: {
        TOKEN: (state) => state.token,
        USERNAME: (state) => state.userName,
        ROLE: (state) => state.userRole,
        USER_ID: (state) => state.userId,
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
        SET_USER_ID: (state, payload) => {
          state.userId = payload;
        },
      },
      actions: {
        GET_USER(context, [username, password]) {
          return new Promise((resolve, reject) => {
            axios
              .post('http://localhost:8090/api/auth/login', { username, password })
              .then((response) => {
                context.commit('SET_TOKEN', response.data.token);
                context.commit('SET_USERNAME', response.data.employee.name);
                context.commit('SET_ROLE', response.data.employee.role.role);
                context.commit('SET_USER_ID', response.data.employee.employee_id);
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
                context.commit('SET_USER_ID', '');
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
      },
    },
  },
  plugins: [
    createPersistedState({
      paths: ['User'],
    }),
  ],
});
