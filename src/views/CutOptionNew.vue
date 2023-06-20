<template>

  <v-sheet width="680" class="mx-auto">
    <h1>New Cut Option</h1>
    <v-form @submit.prevent="saveCutOption">
      <v-select label="Select Machine" v-model="selectedMachine" :items="machines" :rules="inputRules" item-value="_id" item-title="name"
                    return-object required></v-select>
      <v-select label="Select Material" v-model="selectedMaterial" :items="materials" :rules="inputRules" item-value="_id" item-title="name"
                 return-object></v-select>
      <v-text-field label="Thickness" type="number" v-model="thickness" :rules="inputRules" suffix="mm"></v-text-field>
      <v-text-field label="Abrasive Flow" type="number" v-model="abrasiveFlow" suffix="g/min"></v-text-field>
      <v-text-field label="Pressure" type="number" v-model="pressure" suffix="bar"></v-text-field>
      <v-text-field label="Piercing" type="number" v-model="piercing" suffix="sec"></v-text-field>
      <v-text-field label="xRough" type="number" v-model="xRough" suffix="mm/min"></v-text-field>
      <v-text-field label="Rough" type="number" v-model="rough" suffix="mm/min"></v-text-field>
      <v-text-field label="Medium" type="number" v-model="medium" suffix="mm/min"></v-text-field>
      <v-text-field label="Fine" type="number" v-model="fine" suffix="mm/min"></v-text-field>
      <v-text-field label="xFine" type="number" v-model="xFine" suffix="mm/min"></v-text-field>
      <v-btn type="submit">Save</v-btn>
      <v-btn @click="saveAndClose">Save and close</v-btn>
    </v-form>
  </v-sheet>


</template>

<script>
import {onMounted, ref} from "vue";
import getMaterials from "@/composables/getMaterials";
import router from "@/router";
import getMachines from "@/composables/getMachines";

export default {
  name: 'NewCutOption',

  setup() {
    const {machines, error: errorMachines, load: loadMachines} = getMachines();
    const {materials, error: errorMaterials, load: loadMaterials} = getMaterials();
    const inputRules = [(value) => !!value || 'Input is required'];
    const selectedMaterial = ref('');
    const selectedMachine = ref('');
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
      await loadMachines();
      await loadMaterials();
    });

    const saveCutOption = async () => {
      const timestamp = new Date().toISOString();
      const cutOptionData = {
        machineId: selectedMachine.value._id,
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
        await fetch(`http://127.0.0.1:3000/api/v1/cutoptions`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
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
      router.push({name: 'CutOptions'});
    };

    return {
      selectedMachine,
      selectedMaterial,
      machines,
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
      errorMachines,
      errorMaterials,
      inputRules
    };
  }
};
</script>
