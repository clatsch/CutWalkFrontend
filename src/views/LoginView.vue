<template>
  <v-form @submit.prevent="handleSubmit">
    <v-sheet width="680" class="mx-auto">
      <v-text-field v-model="email" label="email"></v-text-field>
      <v-text-field v-model="password" label="password"></v-text-field>
      <v-btn type="submit" block class="mt-2">Login</v-btn>
    </v-sheet>
  </v-form>
</template>

<script>
import {ref} from "vue";
import router from "@/router";

export default {
  setup() {
    const email = ref('admin@admin.com')
    const password = ref('test1234')

    const handleSubmit = async () => {
      const user = {
        email: email.value,
        password: password.value,
      }

      fetch('http://127.0.0.1:3000/api/v1/users/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user),
        credentials: 'include'
      }).then(
        router.push({name: 'Dashboard'})
      ).catch(error => {
          // Handle any errors that occurred during the request
          console.error('Error:', error);
        });

    }
    return {email, password, handleSubmit}
  }
}

</script>
