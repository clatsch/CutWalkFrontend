<template>
  <v-alert color="error" icon="$error" v-if="error">{{ error }}</v-alert>
  <h1>Machines</h1>
  <div v-if="machines.length">
    <MachineList :machines="machines"/>
  </div>
  <div v-else>
    <LoadingSpinner />
  </div>


</template>

<script>

import LoadingSpinner from "@/components/LoadingSpinner.vue";
import getMachines from "@/composables/getMachines";
import MachineList from "@/components/MachineList.vue";
export default {
  name: 'MachinesView',
  components: {MachineList, LoadingSpinner},
  setup() {
    const {machines, error, load} = getMachines()
    load()
    return {machines, error}
  }
}
</script>
