<template>
  <v-sheet width="680" class="mx-auto py-10">
    <v-alert class="my-4" color="error" icon="$error" v-if="error">{{ error }}</v-alert>
    <v-form @submit.prevent="handleSubmit">
      <v-file-input label="File input" @change="handleFileUpload"></v-file-input>
      <v-container v-if="fileUploaded">
        <p>Total Length: {{ totalLength.toFixed(1) }} mm</p>
        <p>Contours: {{ contourCount }}</p>
      </v-container>
      <div v-if="fileUploaded">
        <v-select
          v-model="selectedMachine"
          :hint="`${selectedMachine.name}, ${selectedMachine.type}`"
          :items="sortedMachines"
          item-value="name"
          item-title="type"
          label="Select a machine"
          return-object
        ></v-select>

      </div>
      <div v-if="selectedMachine">
        <v-select
          v-model="selectedMaterial"
          :items="sortedMaterials"
          item-value="_id"
          item-title="name"
          label="Select a material"
          return-object
        ></v-select>
      </div>
      <div v-if="selectedMaterial">
        <v-select
          v-model="selectedCutOption"
          :items="cutOptionsByMachine"
          item-value="_id"
          item-title="thickness"
          label="Select a thickness"
          return-object
          no-data-text="No cutting options available for this material"
        ></v-select>
      </div>
      <div v-if="selectedCutOption">
        <v-radio-group v-model="selectedQuality">
          <template v-for="(value, property) in selectedCutOption.quality">
            <v-radio
              v-if="isQualityOption(property)"
              :key="property"
              :label="generateLabel(property, value)"
              :value="property"
            ></v-radio>
          </template>
        </v-radio-group>
      </div>


      <v-text-field v-if="selectedQuality" v-model="jobName" label="Job Name"></v-text-field>
      <v-text-field v-if="jobName" v-model="tag" label="Tags" @keydown.enter.prevent="handleKeydown"></v-text-field>
      <v-row justify="center" align="center">
        <div v-for="tag in tags" :key="tag">
          <v-chip class="mr-2">{{ tag }}</v-chip>
        </div>
      </v-row>
      <div class="my-4" v-if="selectedQuality">
        <h3>Price: {{ price.toFixed(2) }} CHF exkl. VAT</h3>
      </div>


      <v-btn color="primary" :disabled="price <= 0" type="submit" class="mt-5">Submit</v-btn>
      <v-btn class="mt-5 mx-2" @click="cancel">Cancel</v-btn>
    </v-form>
  </v-sheet>
</template>

<script>
import {computed, ref, watch} from "vue";
import {useRouter} from "vue-router";
import getMachines from "@/composables/machines/getMachines";
import getCutOptionsByMachine from "@/composables/cutOptions/getCutOptionsByMachine";
import getMaterials from "@/composables/materials/getMaterials";
import {useStore} from "vuex";



export default {
  setup() {
    const store = useStore();
    const jobName = ref('');
    const fileId = ref('');
    const file = ref('');
    const fileUploaded = ref('')
    const tag = ref('');
    const tags = ref([]);
    const contourCount = ref(0);
    const totalLength = ref(0);
    const selectedMachine = ref('')
    const selectedMaterial = ref('')
    const selectedCutOption = ref('')
    const selectedQuality = ref(null);
    const price = ref(0);
    const error = ref('')

    const router = useRouter();
    const authToken = store.getters.getAuthToken;

    watch(selectedMachine, () => {
      selectedMaterial.value = null;
      price.value = 0;
    })

    watch(selectedMaterial, () => {
      selectedCutOption.value = null;
      price.value = 0;
    });

    const sortedMachines = computed(() => {
      return machines.value.slice().sort((a, b) => a.name.localeCompare(b.name));
    });

    // Create a computed property for sorted materials
    const sortedMaterials = computed(() => {
      return materials.value.slice().sort((a, b) => a.name.localeCompare(b.name));
    });

    const handleKeydown = () => {
      tag.value = tag.value.replace(/\s/g, '') // remove all whitespace
      if (!tags.value.includes(tag.value)) {
        tags.value.push(tag.value)
      }
      tag.value = ''
    }

    const handleFileUpload = (event) => {
      error.value = '';
      const uploadedFile = event.target.files[0];
      const allowedExtensions = ['dxf'];
      const fileExtension = uploadedFile.name.split('.').pop();

      if (allowedExtensions.includes(fileExtension.toLowerCase())) {
        const formData = new FormData();

        formData.append("file", uploadedFile);

        fetch('http://127.0.0.1:3000/api/v1/files/upload', {
          method: "POST",
          body: formData,
          credentials: 'include', headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
          .then((res) => {
            if (res.ok) {
              fileUploaded.value = true;
              file.value = uploadedFile;
              return res.json()
            } else {
              throw new Error("File upload failed.");
            }
          }).then((data) => {
          fileId.value = data.id;
          totalLength.value = data.totalLength;
          contourCount.value = data.contourCount;
        })
          .catch((err) => {
            console.error(err);
            error.value = err.message
          });
      } else {
        error.value = "Not a DXF file! Please upload only DXF files...";
      }
    };

    const {machines, error: errorMachines, load: loadMachines} = getMachines(authToken);
    loadMachines()

    const {materials, error: errorMaterials, load: loadMaterials} = getMaterials(authToken)
    loadMaterials()

    const {cutOptionsByMachine, errorCutOptionsByMachine, loadCutOptionsByMachine} = getCutOptionsByMachine(authToken)

    watch([selectedMachine, selectedMaterial], async ([selectedMachine, selectedMaterial]) => {
      if (selectedMachine && selectedMaterial) {
        let machineId = selectedMachine._id;
        let materialId = selectedMaterial._id
        await loadCutOptionsByMachine(machineId, materialId).then((data) => {
          cutOptionsByMachine.value = data;
        });
      }
    });

    watch(selectedQuality, () => {
      if (selectedQuality.value) {
        const quality = cutOptionsByMachine.value[0].quality;
        const selectedValue = quality[selectedQuality.value];
        const piercing = cutOptionsByMachine.value[0].piercing
        const handling = 55

        price.value =
          totalLength.value / selectedValue * 60 / 3600 * selectedMachine.value.rate +
          contourCount.value * piercing / 3600 * selectedMachine.value.rate +
          handling
      }
    });

    const handleSubmit = async () => {
      const userId = store.getters.getCurrentUser._id;
      const timestamp = new Date().toISOString();
      const job = {
        jobName: jobName.value,
        fileId: fileId.value,
        machineId: selectedMachine.value,
        materialId: selectedMaterial.value,
        cutOptionsId: selectedCutOption.value,
        totalLength: totalLength.value,
        contourCount: contourCount.value,
        price: price.value,
        quality: selectedQuality.value,
        tags: tags.value,
        date: timestamp,
        userId: userId,
      }

      await fetch('http://127.0.0.1:3000/api/v1/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(job),
        credentials: 'include'
      })
      router.push({name: 'Dashboard'})
    }

    const generateLabel = (property) => {
      const label = {
        xRough: "X-Rough",
        rough: "Rough",
        medium: "Medium",
        fine: "Fine",
        xFine: "X-Fine"
      };
      const photo = selectedCutOption.value.quality[`${property}Photo`];
      return photo ? `${label[property]} (${photo})` : label[property];
    };

    const isQualityOption = (property) => {
      return ['xRough', 'rough', 'medium', 'fine', 'xFine'].includes(property);
    };

    const cancel = async () => {
      await router.push({name: 'Dashboard'});
    }


    return {
      jobName, file, tags, tag, fileUploaded, totalLength, contourCount,
      machines, selectedMachine, errorMachines,
      materials, selectedMaterial, errorMaterials,
      cutOptionsByMachine, errorCutOptionsByMachine, selectedCutOption,
      selectedQuality, generateLabel, isQualityOption,
      handleKeydown, handleFileUpload, handleSubmit, cancel, error, sortedMachines, sortedMaterials,
      price
    }
  }
}

</script>
