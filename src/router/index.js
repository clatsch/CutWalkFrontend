// Composables
import {createRouter, createWebHistory} from 'vue-router'

import Home from '@/views/Home.vue';
import LoginView from '@/views/LoginView.vue';
import DashboardView from "@/views/DashboardView.vue";
import CutOptionsView from "@/views/CutOptionsView.vue";
import EditMaterial from '@/views/MaterialEdit.vue';
import MachinesView from "@/views/MachinesView.vue";
import CutOptionNew from "@/views/CutOptionNew.vue";
import MaterialNew from "@/views/MaterialNew.vue";
import CutOptionEdit from "@/views/CutOptionEdit.vue";



const requireAuth = (store) => (to, from, next) => {
  if (store.getters.getIsLoggedIn) {
    next();
  } else {
    next({ name: 'Home' });
  }
};

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
      },
      {
        path: 'login',
        name: 'LoginView',
        component: LoginView,
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: DashboardView,
        beforeEnter: requireAuth
      },
      {
        path: 'jobs/:id',
        name: 'JobDetails',
        component: () => import('@/views/JobDetails.vue'),
        props: true,
      },
      {
        path: 'create',
        name: 'CreateJob',
        component: () => import('@/views/CreateJob.vue'),
      },
      {
        path: 'machines',
        name: 'Machines',
        component: MachinesView,
      },
      {
        path: 'machines/new',
        name: 'NewMachine',
        component: () => import('@/views/MachineNew.vue'),
      },
      {
        path: 'machines/:id',
        name: 'EditMachine',
        component: () => import('@/views/MachineEdit.vue'),
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
        component: MaterialNew.vue,
      },
      {
        path: 'materials/:id',
        name: 'EditMaterial',
        component: EditMaterial,
        props: true
      },
      {
        path: 'cutoptions',
        name: 'CutOptions',
        component: CutOptionsView,
      },
      {
        path: 'cutoptions/new',
        name: 'NewCutOption',
        component: CutOptionNew,
      },
      {
        path: 'cutoptions/:id',
        name: 'EditCutOption',
        component: CutOptionEdit,
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
