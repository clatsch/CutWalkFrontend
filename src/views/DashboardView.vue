<template>
  <v-alert color="error" icon="$error" v-if="error">{{ error }}</v-alert>
  <h1>Dashboard</h1>
  <div v-if="jobs.length">
  <JobList :jobs="jobs"/>
  </div>
  <div v-else>
<LoadingSpinner />
  </div>


</template>

<script>

import JobList from "@/components/JobList.vue";
import getJobs from "@/composables/getJobs";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
export default {
  name: 'DashboardView',
  components: {JobList, LoadingSpinner},
  setup() {
    const {jobs, error, load} = getJobs()

    load()

    return {jobs, error}
  }
}

// data() {
// return {
//   jobs: []
// }
// },
// mounted() {
// fetch('http://127.0.0.1:3000/api/v1/jobs')
//   .then(res => res.json())
//   .then(data => this.jobs = data.data.data)
//   .catch(err => console.log(err.message))
// }
// }
</script>
