<template>
  <div class="job-list">
    <div v-for="job in jobs" :key="job._id">
      <SingleJob :job="job"/>
    </div>
  </div>
</template>

<script>
// component imports

import SingleJob from "@/components/SingleJob.vue";
import {onMounted, onUnmounted, onUpdated} from "vue";

export default {
  components: {SingleJob},
  props: ['jobs'],
  setup(props) {
    onMounted(() => {
      console.log('component mounted')
    })
    onUnmounted(() => console.log('component unmounted'))
    onUpdated(() => console.log('component updated'))
  }
}
</script>
