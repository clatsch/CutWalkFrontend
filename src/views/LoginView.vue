<template>
  <v-container>
  <v-alert color="error" icon="$error" v-if="error">{{ error }}</v-alert>
  <v-form @submit.prevent="handleSubmit" class="py-5">
    <v-sheet width="680" class="mx-auto">
      <h1>Login</h1>
      <v-text-field v-model="email" label="Email"></v-text-field>
      <v-text-field v-model="password" label="Password" type="password"></v-text-field>
      <v-btn @click="handleSubmit" type="button" block class="mt-2" data-testid="login-button">Login</v-btn>
    </v-sheet>
  </v-form>
  </v-container>
</template>

<script>
import {ref} from 'vue';
import {useStore} from 'vuex';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
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
      } catch (err) {
        error.value = err.message || 'Login failed';
      }
    };

    return {email, password, error, handleSubmit};
  },
};
</script>

