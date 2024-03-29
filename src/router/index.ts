/* eslint import/no-cycle: [1, { ignoreExternal: true }] */
import VueRouter, { RouteConfig } from 'vue-router';
import Vue from 'vue';
import Home from '../home/Home.vue';
import ProjectDetail from '../deals/components/director/MainProjectPage.vue';
import ManagerDetails from '../deals/components/manager/Manager.vue';
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
    path: '/login',
    name: 'Login',
    component: () => import('../login/Login.vue'),
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
  {
    path: '/deals/taskDetails/:id',
    name: 'TaskDetails',
    component: () => import('../deals/components/manager/TaskDetails.vue'),
  },
  {
    path: '/deals/projectBoard/:id',
    name: 'ProjectDetails',
    component: ProjectDetail,
  },
  {
    path: '/deals/managerBoard/:id',
    name: 'managerDetails',
    component: ManagerDetails,
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: () => import('../analytics/Analytics.vue'),
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
