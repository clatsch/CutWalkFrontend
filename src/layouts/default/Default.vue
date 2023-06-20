<template>
  <v-app>
    <app-bar v-if="isLoggedIn" :isAdmin="isAdmin" />
    <app-bar-visitor v-else />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './AppBar.vue';
import AppBarVisitor from './AppBarVisitor.vue';

export default {
  components: {
    AppBar,
    AppBarVisitor
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.getIsLoggedIn;
    },
    isAdmin() {
      return this.$store.getters.getRole === 'admin';
    }
  }
};
</script>
