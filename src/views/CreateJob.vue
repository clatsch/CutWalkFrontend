<template>
  <v-sheet width="680" class="mx-auto">
    <v-file-input label="File input" @change="handleFileUpload"></v-file-input>
    <div v-if="machines.length">
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
    <div v-else>
      <LoadingSpinner/>
    </div>

    <v-form @submit.prevent="handleSubmit" v-if="fileUploaded">
      <v-text-field v-model="jobName" label="Job Name"></v-text-field>
      <v-text-field
        v-model="tag"
        label="Tags"
        @keydown.enter.prevent="handleKeydown"
      ></v-text-field>
      <v-row justify="center" align="center">
        <div v-for="tag in tags" :key="tag">
          <v-chip>{{ tag }}</v-chip>
        </div>
      </v-row>
      <v-card>Total Length {{ totalLength }}</v-card>
      <v-card>Contours: {{ contourCount }}</v-card>
      <v-card>Bounding box width: {{ boundingBox.width }}</v-card>
      <v-card>Bounding box height: {{ boundingBox.height }}</v-card>

      <div v-if="selectedQuality">
        <div>Price: {{ price }}</div>
      </div>


      <v-btn type="submit" block class="mt-2">Submit</v-btn>
    </v-form>
  </v-sheet>
</template>

<script>
import {ref, watch} from "vue";
import {useRouter} from "vue-router";
import getMachines from "@/composables/getMachines";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import getCutOptionsByMachine from "@/composables/getCutOptionsByMachine";
import getMaterials from "@/composables/getMaterials";


export default {
  components: {LoadingSpinner},
  setup() {
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
          body: formData
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

    const {machines, error: errorMachines, load: loadMachines} = getMachines();
    loadMachines()

    const {materials, errorMaterials, loadMaterials} = getMaterials()
    loadMaterials()

    const {cutOptionsByMachine, errorCutOptionsByMachine, loadCutOptionsByMachine} = getCutOptionsByMachine()

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
      const job = {
        jobName: jobName.value,
        fileId: fileId.value,
        machineId: selectedMachine.value,
        materialId: selectedMaterial.value,
        cutOptionsId: selectedCutOption.value,
        totalLength: totalLength.value,
        price: price.value,
        quality: selectedQuality.value,
        tags: tags.value

      }

      await fetch('http://127.0.0.1:3000/api/v1/jobs', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(job)
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
