<template>

  <v-sheet width="680" class="mx-auto">
    <h1>New Material</h1>
    <v-form @submit.prevent="saveMaterial">
      <v-text-field label="Name" type="text" v-model="name"></v-text-field>
      <v-select label="Type" v-model="type" :items="typeOptions"></v-select>

      <v-btn color="primary" @click="saveAndClose">Save and close</v-btn>
      <v-btn class="mx-2" type="submit">Save</v-btn>
      <v-btn @click="cancel">Cancel</v-btn>
    </v-form>
  </v-sheet>


</template>

<script>
import {ref} from "vue";
import router from "@/router";
import {useStore} from "vuex";

export default {
  name: 'NewMaterial',

  setup() {
    const store = useStore();
    const authToken = store.getters.getAuthToken;
    const name = ref('');
    const type = ref('');
    const typeOptions = ref(['composite', 'foam', 'metal', 'plastic', 'stone', 'wood', 'other']);


    const saveMaterial = async () => {
      const timestamp = new Date().toISOString();
      const materialData = {
        name: name.value,
        type: type.value,
        updated: timestamp
      };

      try {
        await fetch(`http://127.0.0.1:3000/api/v1/materials`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          },
          body: JSON.stringify(materialData),
          credentials: 'include'
        });
        console.log('saved successfully');

      } catch (error) {
        console.error(error);
      }
    };

    const saveAndClose = async () => {
      await saveMaterial();
      await router.push({name: 'Materials'});
    };

    const cancel = async () => {
      await router.push({name: 'Materials'});
    }

    return {
      name,
      type,
      typeOptions,
      saveMaterial,
      saveAndClose,
      cancel
    };
  }
};
</script>
