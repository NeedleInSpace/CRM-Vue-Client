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
    path: '/kb/addCompany',
    name: 'AddCompany',
    component: () => import('../addCompany/AddCompany.vue'),
  },
  {
    path: '/kb/addContact',
    name: 'AddContact',
    component: () => import('../addContact/AddContact.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
