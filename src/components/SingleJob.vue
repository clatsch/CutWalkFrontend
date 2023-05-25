<template>
  <div class="post">
    <router-link :to="{name: 'JobDetails', params: {id: job._id}}">
      <h3>{{ job.jobName }}</h3>
    </router-link>

    <h5>{{ job.materialId }}</h5>
  </div>
</template>

<script>
import {computed} from "vue";

export default {
  props: ['job'],
  setup(props) {
    const snippet = computed(() => {
      return props.job.body.substring(0, 3) + '....'
    })

    return {}
  },
}
</script>

<style>

</style>
