<template>
  <v-sheet width="680" class="mx-auto">
    <v-form @submit.prevent="handleSubmit">
      <v-file-input label="File input" @change="handleFileUpload"></v-file-input>
      <v-container>
        <p>Total Length {{ totalLength }} mm</p>
        <p>Contours: {{ contourCount }}</p>
        <p>Bounding box width: {{ boundingBox.width }}</p>
        <p>Bounding box height: {{ boundingBox.height }}</p>
      </v-container>
      <div v-if="fileUploaded">
        <v-select
          v-model="selectedMachine"
          :hint="`${selectedMachine.name}, ${selectedMachine.type}`"
          :items="machines"
          item-value="name"
          item-title="type"
          label="Select a machine"
          return-object
        ></v-select>

      </div>
      <div v-if="selectedMachine">
        <v-select
          v-model="selectedMaterial"
          :items="materials"
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
          <v-chip>{{ tag }}</v-chip>
        </div>
      </v-row>
      <div v-if="selectedQuality">
        <h3>Price: {{ price.toFixed(2) }} CHF exkl. VAT</h3>
      </div>


      <v-btn :disabled="price <= 0" type="submit" block class="mt-2">Submit</v-btn>
    </v-form>
  </v-sheet>
</template>

<script>
import {ref, watch} from "vue";
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
    const boundingBox = ref([]);
    const contourCount = ref('');
    const totalLength = ref('');
    const selectedMachine = ref('')
    const selectedMaterial = ref('')
    const selectedCutOption = ref('')
    const selectedQuality = ref(null);
    const price = ref(0);

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

    const handleKeydown = () => {
      tag.value = tag.value.replace(/\s/g, '') // remove all whitespace
      if (!tags.value.includes(tag.value)) {
        tags.value.push(tag.value)
      }
      tag.value = ''
    }

    const handleFileUpload = (event) => {
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
            Authorization: `Bearer ${authToken}`, // Include the token in the request headers
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
          boundingBox.value = data.boundingBox;
          contourCount.value = data.contourCount;
        })
          .catch((err) => {
            console.error(err);
            // Handle error condition
          });
      } else {
        console.error("Not a DXF file! Please upload only DXF files...");
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
          totalLength.value / selectedValue * 60 / 3600 * 110 +
          contourCount.value * piercing * 60 / 3600 * 110 +
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


    return {
      jobName, file, tags, tag, fileUploaded, totalLength, contourCount, boundingBox,
      machines, selectedMachine, errorMachines,
      materials, selectedMaterial, errorMaterials,
      cutOptionsByMachine, errorCutOptionsByMachine, selectedCutOption,
      selectedQuality, generateLabel, isQualityOption,
      handleKeydown, handleFileUpload, handleSubmit,
      price
    }
  }
}

</script>
