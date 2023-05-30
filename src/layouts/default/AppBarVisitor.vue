<template>
  <v-app-bar :elevation="2" flat>
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-4"/>
      CutWalk
    </v-app-bar-title>
    <div class="button-container">
      <v-btn text :to="{ name: 'Home' }" class="px-10 home-button">Home</v-btn>
      <v-btn text href="#section2" @click="scrollToSection('#section2')">How it Works</v-btn>
      <v-btn text href="#section3" @click="scrollToSection('#section3')">Machines</v-btn>
      <v-btn text href="#section4" @click="scrollToSection('#section4')">Materials</v-btn>
      <v-btn text href="#section5" @click="scrollToSection('#section5')">Pricing</v-btn>
      <v-btn text to="/login" class="px-5 login-button">Login</v-btn>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    scrollToSection(sectionId) {
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({behavior: 'smooth'});
      }
    }
  }
};
</script>

<style>
.button-container {
  display: flex;
  gap: 30px;
}
</style>
