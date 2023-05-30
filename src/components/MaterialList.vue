<template>
  <div class="job-list">
    <div v-for="material in materials" :key="material._id">
      <SingleMaterial :material="material"/>
    </div>
  </div>
</template>

<script>
// component imports

import {onMounted, onUnmounted, onUpdated} from "vue";
import SingleMaterial from "@/components/SingleMaterial.vue";

export default {
  components: {SingleMaterial},
  props: ['materials'],
  setup(props) {
    onMounted(() => {
      console.log('component mounted')
    })
    onUnmounted(() => console.log('component unmounted'))
    onUpdated(() => console.log('component updated'))
  }
}
</script>
