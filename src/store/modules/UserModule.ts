import axios from 'axios';

export default {
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
    GET_USER: (context, [login, password]) => {
      const getUserPromise = new Promise((resolve, reject) => (
        axios
          .post('http://localhost:8080/api/auth/login', { login, password })
          .then((response) => {
            context.commit('SET_TOKEN', response.data.employee.token);
            context.commit('SET_USERNAME', response.data.employee.name);
            context.commit('SET_ROLE', response.data.employee.role.role);
          })
          .catch((error) => reject(error))
      ));
    },
    POST_LOGOUT: (context) => {
      axios
        .post('http://localhost:8080/api/auth/logout', context.state.token)
        .then(() => {
          context.commit('SET_TOKEN', '');
          context.commit('SET_USERNAME', '');
          context.commit('SET_ROLE', '');
        });
    },
    CHECK_SESSION: (context) => {
      const checkSessionPromise = new Promise((resolve, reject) => {
        axios
          .post('http://localhost:8080/api/auth/token', context.state.token)
          .then((response) => {
            context.commit('SET_TOKEN', response.data);
          })
          .catch((error) => reject(error));
      });
    },
  },
};
