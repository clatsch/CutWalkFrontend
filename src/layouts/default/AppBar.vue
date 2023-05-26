<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-4"/>
      CutWalk
    </v-app-bar-title>
    <router-link :to="{ name: 'Home'}" class="px-5">Home</router-link>
    <router-link :to="{ name: 'Dashboard'}" class="px-5">Dashboard</router-link>
    <router-link :to="{ name: 'CreateJob'}" class="px-5">CreateJob</router-link>
    <v-btn @click="handleLogout">Log Out</v-btn>
  </v-app-bar>
</template>

<script>

import router from "@/router";

export default {
  setup() {
    const handleLogout = async () => {
      try {
        await fetch('http://127.0.0.1:3000/api/v1/users/logout', {
          credentials: 'include'
        });
        console.log('i am out dude')
        console.log(document.cookie)
        router.push({name: 'Home'});
      } catch (err) {
        // Handle any errors that occurred during the logout request
        console.error('Error:', err);
      }
    };

    return {handleLogout}
  }

}
//
</script>
