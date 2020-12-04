import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Project from '@/models/Project';
import Stage from '@/models/Stage';
import { format } from 'date-fns';
import Task from '@/models/Task';
import Company from '@/models/Company';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    projects: [] as Project[],
    currentProject: {} as Project,
    /** Поле с этапами для текущего проекта */
    currentStages: [] as Stage[],
    tasks: [] as Task[][],
    companies: [] as Company[],
  },
  getters: {
    CURRENT_TIME: (state) => new Date(),
    PROJECTS: (state) => state.projects,
    CURRENT_PROJECT: (state) => state.currentProject,
    CURRENT_STAGES: (state) => state.currentStages,
    TASKS: (state) => state.tasks,
    COMPANIES: (state) => state.companies,
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
    SET_CURRENT_STAGES: (state, payload) => {
      state.currentStages = payload;
    },
    SET_TASKS: (state, [payload, index]) => {
      state.tasks[index] = payload;
    },
    SET_COMPANIES: (state, payload) => {
      state.companies = payload;
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
  },
  actions: {
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
    GET_THREE_DAY_TASKS(context, [employeeId, firstDay]) {
      const secondDay = new Date();
      const thirdDay = new Date();

      secondDay.setDate(firstDay.getDate() + 1);
      thirdDay.setDate(firstDay.getDate() + 2);

      this.dispatch('GET_DAY_TASKS', [employeeId, format(firstDay, 'yyyy-MM-dd'), 0]);
      this.dispatch('GET_DAY_TASKS', [employeeId, format(secondDay, 'yyyy-MM-dd'), 1]);
      this.dispatch('GET_DAY_TASKS', [employeeId, format(thirdDay, 'yyyy-MM-dd'), 2]);
    },
    GET_DAY_TASKS(context, [employeeId, date, index]) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: 'http://localhost:8090/api/employee/tasks',
          params: {
            employeeId,
            date,
          },
        })
          .then((response) => {
            context.commit('SET_TASKS', [response.data, index]);
          })
          .catch((error) => reject(error));
      });
    },
    GET_COMPANIES: (context) => {
      axios
        .get('http://localhost:8090/api/companies')
        .then((response) => {
          context.commit('SET_COMPANIES', response.data);
        });
    },
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
  },
  modules: {
  },
});
