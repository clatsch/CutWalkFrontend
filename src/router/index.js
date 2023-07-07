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
import MaterialsView from "@/views/MaterialsView.vue";
import store from "@/store/store";

const requireAuth = (to, from, next) => {
  if (store.getters.getIsLoggedIn) {
    console.log('logged in');
    next();
  } else {
    console.log('not logged in');
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
        path: 'create',
        name: 'CreateJob',
        component: () => import('@/views/CreateJob.vue'),
        beforeEnter: requireAuth
      },
      {
        path: 'machines',
        name: 'Machines',
        component: MachinesView,
        beforeEnter: requireAuth,
      },
      {
        path: 'machines/new',
        name: 'NewMachine',
        component: () => import('@/views/MachineNew.vue'),
        beforeEnter: requireAuth
      },
      {
        path: 'machines/:id',
        name: 'EditMachine',
        component: () => import('@/views/MachineEdit.vue'),
        props: true,
        beforeEnter: requireAuth
      },
      {
        path: 'materials',
        name: 'Materials',
        component: MaterialsView,
        beforeEnter: requireAuth,
      },
      {
        path: 'materials/new',
        name: 'NewMaterial',
        component: MaterialNew,
        beforeEnter: requireAuth,
      },
      {
        path: 'materials/:id',
        name: 'EditMaterial',
        component: EditMaterial,
        props: true,
        beforeEnter: requireAuth
      },
      {
        path: 'cutoptions',
        name: 'CutOptions',
        component: CutOptionsView,
        beforeEnter: requireAuth,
      },
      {
        path: 'cutoptions/new',
        name: 'NewCutOption',
        component: CutOptionNew,
        beforeEnter: requireAuth,
      },
      {
        path: 'cutoptions/:id',
        name: 'EditCutOption',
        component: CutOptionEdit,
        props: true,
        beforeEnter: requireAuth,
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
