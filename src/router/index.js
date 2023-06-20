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
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: '/login',
        name: 'LoginView',
        component: () => import(/* webpackChunkName: "home" */ '@/views/LoginView.vue'),
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: dashboardView
      },
      {
        path: 'jobs/:id',
        name: 'JobDetails',
        component: () => import('@/views/JobDetails.vue'),
        props: true
      },
      {
        path: 'create',
        name: 'CreateJob',
        component: () => import('@/views/CreateJob.vue'),
      },
      {
        path: 'machines',
        name: 'Machines',
        component: () => import('@/views/MachinesView.vue'),
      },
      {
        path: 'machines/:id',
        name: 'MachineDetails',
        component: () => import('@/views/MachineDetails.vue'),
        props: true
      },
      {
        path: 'materials',
        name: 'Materials',
        component: () => import('@/views/MaterialsView.vue'),
      },
      {
        path: 'materials/new',
        name: 'NewMaterial',
        component: () => import('@/views/MaterialNew.vue'),
      },
      {
        path: 'materials/:id',
        name: 'EditMaterial',
        component: () => import('@/views/MaterialEdit.vue'),
        props: true
      },
      {
        path: 'cutoptions',
        name: 'CutOptions',
        component: () => import('@/views/CutOptionsView.vue')
      },
      {
        path: 'cutoptions/new',
        name: 'NewCutOption',
        component: () => import('@/views/CutOptionNew.vue')
      },
      {
        path: 'cutoptions/:id',
        name: 'EditCutOption',
        component: () => import('@/views/CutOptionEdit.vue'),
        props: true
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
