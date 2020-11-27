import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../home/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/kb',
    name: 'KnowledgeBase',
    component: () => import('../knowledge-base/KnowledgeBase.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../login/Login.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
