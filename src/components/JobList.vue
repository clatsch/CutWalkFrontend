<template>
  <div class="job-list">
    <v-text-field type="text" v-model="searchQuery" placeholder="Search jobs" />
    <div v-for="job in filteredJobs.slice().reverse()" :key="job._id" >
      <SingleJob :job="job"/>
    </div>
  </div>
</template>

<script>
import SingleJob from "@/components/SingleJob.vue";
import { ref, computed } from "vue";

export default {
  components: { SingleJob },
  props: ['jobs'],
  setup(props) {
    const searchQuery = ref('');

    const filteredJobs = computed(() => {
      const query = searchQuery.value.trim().toLowerCase();
      if (query === '') {
        return props.jobs; // Show all jobs if no search query is entered
      }
      return props.jobs.filter((job) => {
        const jobName = job.jobName.toLowerCase();
        const materialName = job.materialId.name.toLowerCase();
        const thickness = job.cutOptionsId.thickness.toString();
        const machine = job.machineId.name.toLowerCase();
        const tags = job.tags;
        return jobName.includes(query) || materialName.includes(query) || machine.includes(query) || thickness.includes(query)
      });
    });

    return {
      searchQuery,
      filteredJobs,
    };
  },
};

</script>
