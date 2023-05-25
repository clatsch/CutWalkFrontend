<template>
  <v-alert color="error" icon="$error" v-if="error">{{ error }}</v-alert>
  <div v-if="job">
    <h3>{{ job.jobName }}</h3>
    <h2>{{ job.materialId }}</h2>
  </div>
  <div v-else>
    <LoadingSpinner />
  </div>
</template>

<script>
import getJob from "@/composables/getJob";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import {useRoute} from "vue-router";

export default {
  components: {LoadingSpinner},
  props: ['id'],
  setup(props) {
    const route = useRoute()
    // const {job, error, load} = getJob(props.id)
    const {job, error, load} = getJob(route.params.id)

    load()

    return {job, error}
  },
}

</script>
