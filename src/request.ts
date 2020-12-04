import axios from 'axios';
import store from './store';
import router from './router';

const instance = axios.create({
})

instance.interceptors.request.use((req) => {
    store.dispatch('CHECK_SESSION')
      .then(() => {})
      .catch((error) => {
        router.push('/login');
      });
    return req;
  }, function (error) {
    return Promise.reject(error);
  }); 

export default instance