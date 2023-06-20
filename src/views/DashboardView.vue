<template>
  <v-container>
    <v-alert color="error" icon="$error" v-if="error">{{ error }}</v-alert>
    <h1>Dashboard</h1>
    <div v-if="jobs.length">
        <JobList :jobs="jobs"/>
    </div>
    <div v-else>
      <LoadingSpinner />
    </div>
  </v-container>


</template>

<script>

import JobList from "@/components/JobList.vue";
import getJobs from "@/composables/getJobs";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { fetchData } from "@/api";
import {onMounted, ref} from "vue";

export default {
  name: "DashboardView",
  components: { JobList, LoadingSpinner },
  setup() {
    const currentUser = ref(null);
    const jobs = ref([]);
    const error = ref(null);

    const load = async () => {
      try {
        const response = await fetchData("user/isloggedin", {
          credentials: "include",
        });

        if (response.data.isLoggedIn) {
          currentUser.value = response.data;
          const { jobs, error } = getJobs(currentUser.value.id);
          await jobs.load();
          jobs.value = jobs.jobs;
          error.value = jobs.error;
        } else {
          // User is not logged in, handle accordingly
        }
      } catch (err) {
        error.value = err.message;
        console.log(error.value);
      }
    };

    onMounted(load);

    return { jobs, error };
  },
};


</script>
