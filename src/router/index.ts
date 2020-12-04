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
    component: () => import('../knowledge-base/views/AddCompany.vue'),
  },
  {
    path: '/kb/addContact',
    name: 'AddContact',
    component: () => import('../knowledge-base/views/AddContact.vue'),
  },
  {
    path: '/kb/companyDetails/:id',
    name: 'CompanyDetails',
    component: () => import('../knowledge-base/views/CompanyDetails.vue'),
  },
  {
    path: '/kb/contactDetails/:id',
    name: 'ContactDetails',
    component: () => import('../knowledge-base/views/ContactDetails.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
