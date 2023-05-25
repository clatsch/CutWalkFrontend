<template>
  <v-alert color="error" icon="$error" v-if="error">{{ error }}</v-alert>
  <div v-if="job">
    <h3>Name: {{ job.jobName }}</h3>
    <h4>Machine: {{ job.machineId.name }}</h4>
    <h4>Material: {{ job.materialId.name }}</h4>
    <h4>Thickness: {{ job.cutOptionsId.thickness }}mm</h4>
    <h2>Price: {{ job.price }}</h2>
    <h4>Tags:
      <v-chip class="mx-1" v-for="tag in job.tags" :key="tag">{{tag}}</v-chip>
    </h4>
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
