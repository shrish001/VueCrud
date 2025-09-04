import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StudentCreate from '../views/Student/CreateView.vue';
import StudentUpdate from '../views/Student/UpdateView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/create',
      name: 'create',
      component: StudentCreate,
    },
    {
      path: '/update/:id',
      name: 'update',
      component: StudentUpdate,
    },
  ],
})

export default router
