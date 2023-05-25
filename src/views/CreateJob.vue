<template>
  <v-sheet width="680" class="mx-auto">
    <v-file-input label="File input" @change="handleFileUpload"></v-file-input>
    <div v-if="machines.length">
      <v-select
        v-model="selectedMachine"
        :hint="`${selectedMachine.name}, ${selectedMachine.type}`"
        :items="machines"
        item-value="_id"
        item-title="type"
        label="Select a machine"
        return-object
      ></v-select>
    </div>
    <div v-else>
      <LoadingSpinner />
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
      <v-card>Total Length {{totalLength}}</v-card>
      <v-card>Contours: {{contourCount}}</v-card>
      <v-card>Bounding box width: {{boundingBox.width}}</v-card>
      <v-card>Bounding box height: {{boundingBox.height}}</v-card>


      <v-btn type="submit" block class="mt-2">Submit</v-btn>
    </v-form>
  </v-sheet>
</template>

<script>
import {ref} from "vue";
import {useRouter} from "vue-router";
import getMachines from "@/composables/getMachines";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

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
              console.log(res)
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

    const handleSubmit = async () => {
      const job = {
        jobName: jobName.value,
        fileId: fileId.value,
        tags: tags.value
      }

      await fetch('http://127.0.0.1:3000/api/v1/jobs', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(job)
      })
      router.push({name: 'Dashboard'})
    }


    return {jobName, file, tags, tag, fileUploaded, totalLength, contourCount, boundingBox,
      machines, selectedMachine, errorMachines, handleKeydown, handleFileUpload, handleSubmit}
  }
}

</script>
