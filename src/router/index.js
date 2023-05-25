// Composables
import {createRouter, createWebHistory} from 'vue-router'
import dashboardView from "@/views/DashboardView.vue";

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: dashboardView
      },
      {
        path: 'jobs/:id',
        name: 'JobDetails',
        component: () => import(/* webpackChunkName: "home" */ '@/views/JobDetails.vue'),
        props: true
      },
      {
        path: 'create',
        name: 'CreateJob',
        component: () => import(/* webpackChunkName: "home" */ '@/views/CreateJob.vue'),
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
