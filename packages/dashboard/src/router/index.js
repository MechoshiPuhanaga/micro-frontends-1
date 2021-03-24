import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/dashboard/tab-1',
    name: 'Tab1',
    component: () => import(/* webpackChunkName: "tab-1" */ '../pages/Tab1.vue')
  },
  {
    path: '/dashboard/tab-2',
    name: 'Tab2',
    component: () => import(/* webpackChunkName: "tab-2" */ '../pages/Tab2.vue')
  }
];

const router = new VueRouter({
  mode: 'abstract',
  routes
});

export const createRouter = (mode) => {
  return new VueRouter({
    mode,
    routes
  });
};

export default router;
