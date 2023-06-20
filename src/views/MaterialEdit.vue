<template>

  <v-sheet width="680" class="mx-auto" v-if="material">
    <h1>Edit Material</h1>
    <v-form @submit.prevent="saveMaterial">
      <v-text-field label="Name" type="text" v-model="name"></v-text-field>
      <v-text-field label="Type" type="text" v-model="type"></v-text-field>

      <v-btn type="submit">Save</v-btn>
      <v-btn @click="saveAndClose">Save and close</v-btn>
    </v-form>
  </v-sheet>


</template>

<script>
import {onMounted, ref} from "vue";
import router from "@/router";
import getMaterial from "@/composables/getMaterial";

export default {
  name: 'EditMaterial',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const {material, load, error} = getMaterial(props.id);
    const name = ref('');
    const type = ref('');

    onMounted(async () => {
      await load();
      name.value = material.value.name;
      type.value = material.value.type;
    });

    const saveMaterial = async () => {
      const timestamp = new Date().toISOString();
      const materialData = {
        name: name.value,
        type: type.value,
        updated: timestamp
      };

      try {
        await fetch(`http://127.0.0.1:3000/api/v1/materials/${props.id}`, {
          method: 'PATCH',
          headers: {'Content-Type': 'application/json'},
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
      router.push({name: 'Materials'});
    };

    return {
      material,
      name,
      type,
      saveMaterial,
      saveAndClose,
      error,
    };
  }
};
</script>
