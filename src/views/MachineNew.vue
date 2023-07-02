<template>

  <v-sheet width="680" class="mx-auto">
    <h1>New Machine</h1>
    <v-form @submit.prevent="saveMachine">
      <v-text-field label="Name" type="text" v-model="name"></v-text-field>
      <v-text-field label="Type" type="text" v-model="type"></v-text-field>
      <v-text-field label="Width" type="number" v-model="maxWidth" suffix="mm"></v-text-field>
      <v-text-field label="Length" type="number" v-model="maxLength" suffix="mm"></v-text-field>
      <v-text-field label="Height" type="number" v-model="maxHeight" suffix="mm"></v-text-field>

      <v-btn type="submit">Save</v-btn>
      <v-btn class="mx-2" @click="saveAndClose">Save and close</v-btn>
    </v-form>
  </v-sheet>


</template>

<script>
import {ref} from "vue";
import router from "@/router";
import {useStore} from "vuex";

export default {
  name: 'NewMachine',

  setup() {
    const store = useStore();
    const authToken = store.getters.getAuthToken;
    const name = ref('');
    const type = ref('');
    const maxWidth = ref(null);
    const maxLength = ref(null);
    const maxHeight = ref(null);


    const saveMachine = async () => {
      const timestamp = new Date().toISOString();
      const machineData = {
        name: name.value,
        type: type.value,
        maxWidth: maxWidth.value,
        maxLength: maxLength.value,
        maxHeight: maxHeight.value,
        updated: timestamp
      };

      try {
        await fetch(`http://127.0.0.1:3000/api/v1/machines`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          },
          body: JSON.stringify(machineData),
          credentials: 'include'
        });
        console.log('saved successfully');

      } catch (error) {
        console.error(error);
      }
    };

    const saveAndClose = async () => {
      await saveMachine();
      await router.push({name: 'Machines'});
    };

    return {
      name,
      type,
      maxWidth,
      maxLength,
      maxHeight,
      saveMachine,
      saveAndClose,
    };
  }
};
</script>
