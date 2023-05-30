<template>
  <v-container>
    <v-alert color="error" icon="$error" v-if="error">{{ error }}</v-alert>
    <div v-if="material">
      <h3>Name: {{ material.name }}</h3>
    </div>
    <div v-else>
      <LoadingSpinner />
    </div>
  </v-container>
</template>

<script>
import getMaterial from "@/composables/getMaterial.js";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import {useRoute} from "vue-router";

export default {
  components: {LoadingSpinner},
  props: ['id'],
  setup(props) {
    const route = useRoute()
    const {material, error, load} = getMaterial(props.id)
    // const {machine, error, load} = getMachine(route.params.id)

    load()

    return {material, error}
  },
}

</script>
