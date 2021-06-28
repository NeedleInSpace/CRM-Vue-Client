/* eslint import/no-cycle: [1, { ignoreExternal: true }] */
import axios from 'axios';
import store from './store';
import router from './router';

const instance = axios.create({
  baseURL: 'http://localhost:8090/api/',
});

instance.interceptors.request.use((req) => {
  console.log('qwerty');
  store.dispatch('CHECK_SESSION')
    .then((response) => {
      Promise.resolve(response);
    })
    .catch((error) => {
      router.push('/login');
    });
  return req;
}, (error) => {
  console.log('kfhk');
  Promise.reject(error);
});

export default instance;
