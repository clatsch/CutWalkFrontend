<template>

  <v-sheet width="680" class="mx-auto" v-if="cutOption">
    <h1>Edit Cut Option</h1>
    <v-form @submit.prevent="saveCutOption">
      <v-text-field label="Machine" type="text" v-model="cutOption.machineId.name" disabled></v-text-field>
      <v-select v-model="selectedMaterial" :items="materials" item-value="_id" item-title="name"
                label="Select a material" return-object></v-select>
      <v-text-field label="Thickness" type="number" v-model="thickness" suffix="mm"></v-text-field>
      <v-text-field label="Abrasive Flow" type="number" v-model="abrasiveFlow" suffix="g/min"></v-text-field>
      <v-text-field label="Pressure" type="number" v-model="pressure" suffix="bar"></v-text-field>
      <v-text-field label="Piercing" type="number" v-model="piercing" suffix="sec"></v-text-field>
      <v-text-field label="xRough" type="number" v-model="xRough" suffix="mm/min"></v-text-field>
      <v-text-field label="Rough" type="number" v-model="rough" suffix="mm/min"></v-text-field>
      <v-text-field label="Medium" type="number" v-model="medium" suffix="mm/min"></v-text-field>
      <v-text-field label="Fine" type="number" v-model="fine" suffix="mm/min"></v-text-field>
      <v-text-field label="xFine" type="number" v-model="xFine" suffix="mm/min"></v-text-field>

      <v-btn color="primary" @click="saveAndClose">Save and close</v-btn>
      <v-btn class="mx-2" type="submit">Save</v-btn>
      <v-btn @click="cancel">Cancel</v-btn>
    </v-form>
  </v-sheet>


</template>

<script>
import {onMounted, ref} from "vue";
import getCutOption from "@/composables/cutOptions/getCutOption";
import getMaterials from "@/composables/materials/getMaterials";
import router from "@/router";
import {useStore} from "vuex";

export default {
  name: 'CutOptionEdit',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore();
    const authToken = store.getters.getAuthToken;
    const {cutOption, load, error} = getCutOption(props.id, authToken);
    const {materials, error: errorMaterials, load: loadMaterials} = getMaterials(authToken);
    const selectedMaterial = ref('');
    const thickness = ref('');
    const abrasiveFlow = ref('');
    const pressure = ref('');
    const piercing = ref('');
    const xRough = ref('');
    const rough = ref('');
    const medium = ref('');
    const fine = ref('');
    const xFine = ref('');

    onMounted(async () => {
      await load();
      await loadMaterials();
      selectedMaterial.value = cutOption.value.materialId;
      thickness.value = cutOption.value.thickness;
      abrasiveFlow.value = cutOption.value.abrasiveFlow;
      pressure.value = cutOption.value.pressure;
      piercing.value = cutOption.value.piercing;
      xRough.value = cutOption.value.quality.xRough;
      rough.value = cutOption.value.quality.rough;
      medium.value = cutOption.value.quality.medium;
      fine.value = cutOption.value.quality.fine;
      xFine.value = cutOption.value.quality.xFine;
    });

    const saveCutOption = async () => {
      const timestamp = new Date().toISOString();
      const cutOptionData = {
        materialId: selectedMaterial.value._id,
        thickness: thickness.value,
        abrasiveFlow: abrasiveFlow.value,
        pressure: pressure.value,
        piercing: piercing.value,
        quality: {
          xRough: xRough.value,
          rough: rough.value,
          medium: medium.value,
          fine: fine.value,
          xFine: xFine.value
        },
        updated: timestamp
      };

      try {
        await fetch(`http://127.0.0.1:3000/api/v1/cutoptions/${props.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          },
          body: JSON.stringify(cutOptionData),
          credentials: 'include'
        });
        console.log('saved successfully');

      } catch (error) {
        console.error(error);
      }
    };

    const saveAndClose = async () => {
      await saveCutOption();
      await router.push({name: 'CutOptions'});
    };

    const cancel = async () => {
      await router.push({name: 'CutOptions'});
    }

    return {
      cutOption,
      selectedMaterial,
      materials,
      thickness,
      abrasiveFlow,
      pressure,
      piercing,
      xRough,
      rough,
      medium,
      fine,
      xFine,
      saveCutOption,
      saveAndClose,
      cancel,
      error,
      errorMaterials
    };
  }
};
</script>
