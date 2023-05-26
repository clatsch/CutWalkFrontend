<template>
  <div class="post">
    <router-link :to="{name: 'MachineDetails', params: {id: machine._id}}">
      <h3>{{ machine.name }}</h3>
    </router-link>

    <h5>{{ machine.name }} </h5>
  </div>
</template>

<script>
import {computed} from "vue";

export default {
  props: ['machine'],
  setup(props) {
    const snippet = computed(() => {
      return props.machine.body.substring(0, 3) + '....'
    })

    return {}
  },
}
</script>

<style>

</style>
