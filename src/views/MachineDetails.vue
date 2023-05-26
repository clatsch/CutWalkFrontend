<template>
  <v-alert color="error" icon="$error" v-if="error">{{ error }}</v-alert>
  <div v-if="machine">
    <h3>Name: {{ machine.name }}</h3>
  </div>
  <div v-else>
    <LoadingSpinner />
  </div>
</template>

<script>
import getMachine from "@/composables/getMachine";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import {useRoute} from "vue-router";

export default {
  components: {LoadingSpinner},
  props: ['id'],
  setup(props) {
    const route = useRoute()
    const {machine, error, load} = getMachine(props.id)
    // const {machine, error, load} = getMachine(route.params.id)

    load()

    return {machine, error}
  },
}

</script>
