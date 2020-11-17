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
    path: '/deals',
    name: 'Deals',
    component: () => import('../deals/Deals.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
