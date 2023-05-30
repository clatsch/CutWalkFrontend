<template>
  <v-app-bar flat >
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-4"/>
      CutWalk
    </v-app-bar-title>
    <div class="button-container">
      <v-btn :to="{ name: 'Dashboard' }" class="px-5">Dashboard</v-btn>
      <v-btn :to="{ name: 'CreateJob' }" class="px-5">CreateJob</v-btn>
      <v-btn v-if="isAdmin" :to="{ name: 'Machines' }" class="px-5">Machines</v-btn>
      <v-btn v-if="isAdmin" :to="{ name: 'Materials' }" class="px-5">Materials</v-btn>
      <v-btn @click="handleLogout">Log Out</v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import router from '@/router';

export default {
  props: { isAdmin: Boolean },
  setup() {
    const handleLogout = async () => {
      try {
        // Perform the logout logic
        await fetch('http://127.0.0.1:3000/api/v1/users/logout', {
          credentials: 'include'
        });
        console.log('Logged out successfully');
        router.push({name: 'Home'});
      } catch (err) {
        console.error('Error:', err);
      }
    };

    return {
      handleLogout
    };
  }
};
</script>
