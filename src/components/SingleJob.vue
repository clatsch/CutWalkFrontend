<template>
  <v-card :elevation="5" @click="showDetails = !showDetails" class="pointer mt-5 pa-5">
    <h3>{{ job.jobName }}</h3>
    <h5>{{ job.materialId.name }} - {{ job.cutOptionsId.thickness }}mm</h5>
    <p class="date">{{ formatTimestamp(job.date) }}</p>
    <div v-if="showDetails" class="my-5">
      <p><span class="font-weight-bold">CHF {{ job.price.toFixed(2) }}</span> excl. VAT </p>
      <p>Date: {{ formatTimestamp(job.date) }}</p>
      <p>Machine: {{ job.machineId.name }} - {{ job.machineId.type}}</p>
      <p>Cutting Length: {{ job.totalLength.toFixed(1) }} mm</p>
      <p>Total Contours: {{ job.contourCount }}</p>
      <p class="mt-2" v-if="job.tags.length">Tags:
        <v-chip class="mx-1" v-for="tag in job.tags" :key="tag">{{ tag }}</v-chip>
      </p>
    </div>
  </v-card>
</template>

<script>
import { ref } from "vue";

export default {
  props: ['job'],
  setup() {
    const showDetails = ref(false);

    const formatTimestamp = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleString('de-CH', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    return { showDetails, formatTimestamp };
  },
};
</script>

<style>

.date {
  font-size: 11px;
  color: gray;
  float: right;
}
</style>
