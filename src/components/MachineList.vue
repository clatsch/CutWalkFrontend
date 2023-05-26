<template>
  <div class="job-list">
    <div v-for="machine in machines" :key="machine._id">
      <SingleMachine :machine="machine"/>
    </div>
  </div>
</template>

<script>
// component imports

import {onMounted, onUnmounted, onUpdated} from "vue";
import SingleMachine from "@/components/SingleMachine.vue";

export default {
  components: {SingleMachine},
  props: ['machines'],
  setup(props) {
    onMounted(() => {
      console.log('component mounted')
    })
    onUnmounted(() => console.log('component unmounted'))
    onUpdated(() => console.log('component updated'))
  }
}
</script>
