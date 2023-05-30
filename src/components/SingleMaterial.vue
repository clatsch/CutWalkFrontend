<template>
  <div class="post">
    <router-link :to="{name: 'MaterialDetails', params: {id: material._id}}">
      <h3>{{ material.name }}</h3>
    </router-link>

    <h5>{{ material.name }} </h5>
  </div>
</template>

<script>

export default {
  props: ['material'],
  setup() {

  },
}
</script>

<style>

</style>
