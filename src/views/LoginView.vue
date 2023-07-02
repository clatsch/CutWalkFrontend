<template>
  <v-form @submit.prevent="handleSubmit">
    <v-sheet width="680" class="mx-auto">
      <v-text-field v-model="email" label="Email"></v-text-field>
      <v-text-field v-model="password" label="Password" type="password"></v-text-field>
      <v-btn @click="handleSubmit" type="button" block class="mt-2">Login</v-btn>
      <p v-if="error" class="error">{{ error }}</p>
    </v-sheet>
  </v-form>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const email = ref('admin@admin.com');
    const password = ref('test1234');
    const error = ref('');
    const store = useStore();

    const handleSubmit = async () => {
      const user = {
        email: email.value,
        password: password.value,
      };

      try {
        await store.dispatch('login', user);
        // Login successful, handle redirection or other actions
      } catch (error) {
        // Handle login error, display error message
      }
    };

    return { email, password, error, handleSubmit };
  },
};
</script>

<style>
.error {
  color: red;
  margin-top: 10px;
}
</style>
