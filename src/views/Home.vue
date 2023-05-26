<template>
  <h1>Home</h1>
  <LoginView />
</template>

<script>
import LoginView from "@/views/LoginView.vue";
import {defineComponent} from "vue";

export default defineComponent({
  components: {LoginView}
})


</script>
