import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Project from '@/models/Project';
import Stage from '@/models/Stage';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    projects: [] as Project[],
    currentProject: {} as Project,
    currentStages: [] as Stage[],
  },
  getters: {
    CURRENT_TIME: (state) => new Date(),
    PROJECTS: (state) => state.projects,
    CURRENT_PROJECT: (state) => state.currentProject,
    CURRENT_STAGES: (state) => state.currentStages,
  },
  mutations: {
    SET_PROJECTS: (state, payload) => {
      state.projects = payload;
    },
    SET_CURRENT_PROJECT: (state, payload) => {
      state.currentProject = payload;
    },
    SET_CURRENT_STAGES: (state, payload) => {
      state.currentStages = payload;
    },
    DELETE_STAGE: (state, stageId) => {
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
    GET_PROJECT_STAGES: (context, id: string) => {
      const apiUrl = 'http://localhost:8090/api/stages/project/';

      axios
        .get(apiUrl.concat(id))
        .then((response) => {
          context.commit('SET_CURRENT_STAGES', response.data);
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
    PATCH_STAGE(state, [stage]) {
      return new Promise((resolve, reject) => {
        axios
          .patch('http://localhost:8090/api/stages', stage)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    DELETE_STAGE(state, id) {
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
