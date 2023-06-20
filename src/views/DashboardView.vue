<template>
  <v-container>
    <v-alert color="error" icon="$error" v-if="error">{{ error }}</v-alert>
    <h1>Dashboard</h1>
    <div v-if="loadedJobs.length">
      <JobList :jobs="loadedJobs" />
    </div>
    <div v-else>
      <LoadingSpinner />
    </div>
  </v-container>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import getJobs from '@/composables/getJobs';
import JobList from "@/components/JobList.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default {
  components: {LoadingSpinner, JobList},
  // ...component configuration

  setup() {
    const store = useStore();
    const loadedJobs = ref([]);
    const error = ref(null);

    const loadJobs = async () => {
      try {
        // Get the current user from the Vuex store
        const currentUser = store.getters.getCurrentUser;
        if (currentUser) {
          const authToken = store.getters.getAuthToken;
          const { jobs, error, load } = getJobs(currentUser._id, authToken);
          await load();
          loadedJobs.value = jobs.value; // Assign to loadedJobs, not jobs
          error.value = error;
        } else {
          console.log('NOT AVAILABLE')
        }
      } catch (err) {
        error.value = err.message;
        console.log(error.value);
      }
    };

    onMounted(loadJobs);

    return { loadedJobs, error }; // Return loadedJobs, not jobs
  },
};
</script>
