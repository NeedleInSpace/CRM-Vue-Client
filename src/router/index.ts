import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../home/Home.vue';
import store from '../store';

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
    path: '/deals',
    name: 'Deals',
    component: () => import('../deals/Deals.vue'),
  },
  {
    path: '/manager',
    name: 'Manager',
    component: () => import('../manager/Manager.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../login/Login.vue'),
  },
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

router.beforeEach((to, from, next) => {
  if (store.getters.TOKEN === '' && to.name !== 'Login') {
    next({
      path: '/login',
      params: { nextUrl: to.fullPath },
    });
  } else {
    next();
  }
});

export default router;
