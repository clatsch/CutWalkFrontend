<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-4" />
      CutWalk
    </v-app-bar-title>
    <router-link :to="{ name: 'Home'}" class="px-5">Home</router-link>
    <router-link :to="{ name: 'Dashboard'}" class="px-5">Dashboard</router-link>
    <router-link :to="{ name: 'CreateJob'}" class="px-5">CreateJob</router-link>
  </v-app-bar>
</template>

<script>
  //
</script>
