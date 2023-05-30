<template>
  <v-container>
    <v-alert color="error" icon="$error" v-if="error">{{ error }}</v-alert>
    <h1>Materials</h1>
    <div v-if="materials.length">
      <MaterialList :materials="materials"/>
    </div>
    <div v-else>
      <LoadingSpinner/>
    </div>
  </v-container>
</template>

<script>

import LoadingSpinner from "@/components/LoadingSpinner.vue";
import getMaterials from "@/composables/getMaterials";
import MaterialList from "@/components/MaterialList.vue";

export default {
  name: 'MachinesView',
  components: {MaterialList, LoadingSpinner},
  setup() {
    const {materials, error, load} = getMaterials()
    load()
    return {materials, error}
  }
}
</script>
