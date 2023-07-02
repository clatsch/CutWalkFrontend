<template>

  <v-sheet width="680" class="mx-auto" v-if="machine">
    <h1>Edit Machine</h1>
    <v-form @submit.prevent="saveMachine">
      <v-text-field label="Name" type="text" v-model="name"></v-text-field>
      <v-select label="Type" v-model="type" :items="typeOptions"></v-select>
      <v-text-field label="Hourly Rate" type="number" v-model="rate" suffix="CHF"></v-text-field>
      <v-text-field label="Width" type="number" v-model="maxWidth" suffix="mm"></v-text-field>
      <v-text-field label="Length" type="number" v-model="maxLength" suffix="mm"></v-text-field>
      <v-text-field label="Height" type="number" v-model="maxHeight" suffix="mm"></v-text-field>

      <v-btn type="submit">Save</v-btn>
      <v-btn class="mx-2" @click="saveAndClose">Save and close</v-btn>
    </v-form>
  </v-sheet>


</template>

<script>
import {onMounted, ref} from "vue";
import router from "@/router";
import getMachine from "@/composables/machines/getMachine";
import {useStore} from "vuex";

export default {
  name: 'EditMaterial',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore();
    const authToken = store.getters.getAuthToken;
    const {machine, load, error} = getMachine(props.id, authToken);
    const name = ref('');
    const type = ref('');
    const typeOptions = ref(['CNC Router', 'Waterjet', 'Laser Cutter']);
    const rate = ref('')
    const maxWidth = ref('');
    const maxLength = ref('');
    const maxHeight = ref('');

    onMounted(async () => {
      await load();
      name.value = machine.value.name;
      type.value = machine.value.type;
      rate.value = machine.value.rate;
      maxWidth.value = machine.value.maxWidth;
      maxLength.value = machine.value.maxLength;
      maxHeight.value = machine.value.maxHeight;
    });

    const saveMachine = async () => {
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
        await fetch(`http://127.0.0.1:3000/api/v1/machines/${props.id}`, {
          method: 'PATCH',
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
      machine,
      name,
      type,
      typeOptions,
      rate,
      maxWidth,
      maxLength,
      maxHeight,
      saveMachine,
      saveAndClose,
      error,
    };
  }
};
</script>
