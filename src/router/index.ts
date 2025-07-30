import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router';
import HomeLayout from '../layouts/HomeLayout.vue';
import HomePage from '../pages/HomePage.vue';


const routes: Array<RouteRecordRaw> = [
    {
      path: '/',
      component: HomeLayout,
      children: [
        {
          path: '',
          component: HomePage,
        },
      ]
    }
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router