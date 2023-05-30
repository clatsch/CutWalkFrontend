<template>
  <v-app>
    <app-bar v-if="isLoggedIn" :isAdmin="isAdmin"/>
    <app-bar-visitor v-else />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './AppBar.vue';
import AppBarVisitor from './AppBarVisitor.vue';
import { watch, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  components: {
    AppBar,
    AppBarVisitor
  },
  setup() {
    const isLoggedIn = ref(false);
    const isAdmin = ref(false)
    const router = useRouter();

    const checkLoggedIn = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/api/v1/users/isloggedin', {credentials: 'include'});
        const data = await response.json();
        isLoggedIn.value = data.isLoggedIn;
        isAdmin.value = data.role === 'admin';
      } catch (error) {
        console.error(error);
      }
    };

    watch(() => router.currentRoute.value, () => {
      checkLoggedIn();
    });

    checkLoggedIn();

    return {
      isLoggedIn, isAdmin
    };
  }
};
</script>






