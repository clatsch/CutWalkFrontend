<template>
  <v-app-bar :elevation="2" flat>
    <v-app-bar-title>
      <v-img width="28px" src="../../../public/logo-32x32.png"></v-img>
      <h3>CutWalk</h3>
    </v-app-bar-title>
    <div class="button-container">
      <v-btn :to="{ name: 'Dashboard' }" class="px-5">Dashboard</v-btn>
      <v-btn :to="{ name: 'CreateJob' }" class="px-5">CreateJob</v-btn>
      <v-btn v-if="isAdmin" :to="{ name: 'Machines' }" class="px-5">Machines</v-btn>
      <v-btn v-if="isAdmin" :to="{ name: 'Materials' }" class="px-5">Materials</v-btn>
      <v-btn v-if="isAdmin" :to="{ name: 'CutOptions' }" class="px-5">Cut Options</v-btn>
      <v-btn v-if="isLoggedIn" @click="handleLogout">Log Out</v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import { useStore } from 'vuex';
import router from '@/router';

export default {
  setup() {
    const store = useStore();

    const isLoggedIn = store.getters.getIsLoggedIn;
    const isAdmin = store.getters.getRole === 'admin';
    const handleLogout = async () => {
      try {
        // Perform the logout logic
        await fetch('http://127.0.0.1:3000/api/v1/users/logout', {
          credentials: 'include'
        });
        console.log('Logged out successfully');
        store.commit('setCurrentUser', null); // Reset the current user to null
        store.commit('setIsLoggedIn', false); // Update the isLoggedIn state in Vuex
        store.commit('setRole', null); // Reset the role to null
        store.commit('setAuthToken', null); // Reset the authToken to null
        store.commit('setError', null); // Reset the error to null
        await router.push({ name: 'Home' });
      } catch (err) {
        console.error('Error:', err);
      }
    };

    return {
      isLoggedIn,
      isAdmin,
      handleLogout
    };
  }
};
</script>
