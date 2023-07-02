<template>

  <v-sheet width="680" class="mx-auto">
    <h1>New Machine</h1>
    <v-form @submit.prevent="saveMachine">
      <v-text-field label="Name" type="text" v-model="name" :rules="inputRules"></v-text-field>
      <v-select label="Type" v-model="type" :items="typeOptions"></v-select>
      <v-text-field label="Hourly Rate" type="number" v-model="rate" :rules="inputRules" suffix="CHF"></v-text-field>
      <v-text-field label="Width" type="number" v-model="maxWidth" :rules="inputRules" suffix="mm"></v-text-field>
      <v-text-field label="Length" type="number" v-model="maxLength" :rules="inputRules" suffix="mm"></v-text-field>
      <v-text-field label="Height" type="number" v-model="maxHeight" :rules="inputRules" suffix="mm"></v-text-field>

      <v-btn type="submit">Save</v-btn>
      <v-btn class="mx-2" @click="saveAndClose">Save and close</v-btn>
    </v-form>
  </v-sheet>


</template>

<script>
import {computed, ref} from "vue";
import router from "@/router";
import {useStore} from "vuex";

export default {
  name: 'NewMachine',

  setup() {
    const store = useStore();
    const authToken = store.getters.getAuthToken;
    const name = ref('');
    const type = ref('');
    const rate = ref(120);
    const maxWidth = ref(null);
    const maxLength = ref(null);
    const maxHeight = ref(null);
    const inputRules = [(value) => !!value || 'Input is required'];
    const typeOptions = ref(['CNC Router', 'Waterjet', 'Laser Cutter']);

    const isInputValid = computed(() => {
      return [name.value, type.value, rate.value, maxWidth.value, maxLength.value, maxHeight.value].every(value => !!value);
    });


    const saveMachine = async () => {
      if (!isInputValid.value) {
        return; // Don't save if input is invalid
      }
      const timestamp = new Date().toISOString();
      const machineData = {
        name: name.value,
        type: type.value,
        rate: rate.value,
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
      if (!isInputValid.value) {
        return; // Don't save and close if input is invalid
      }
      await saveMachine();
      await router.push({name: 'Machines'});
    };

    return {
      name,
      type,
      rate,
      maxWidth,
      maxLength,
      maxHeight,
      typeOptions,
      saveMachine,
      saveAndClose,
      inputRules,
    };
  }
};
</script>
