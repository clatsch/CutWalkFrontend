<template>
  <v-container>
    <v-alert color="error" icon="error" v-if="error">{{ error }}</v-alert>
    <h1>Materials</h1>
    <div v-if="materials.length">
      <v-text-field type="text" v-model="searchQuery" placeholder="Search Materials"/>
      <v-data-table :items="materials" :headers="tableHeaders" :search="searchQuery" item-key="_id">
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.columns.name }}</td>
            <td>{{ item.columns.type }}</td>
            <td>
              <v-btn small color="primary" @click="editMaterial(item)">
                <v-icon small left>mdi-pencil</v-icon>
                Edit
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>
    <div v-else>
      <LoadingSpinner/>
    </div>
    <v-btn @click="createNewMaterial">Create new Material</v-btn>
  </v-container>
</template>

<script>
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import getMaterials from "@/composables/getMaterials";

export default {
  name: 'MaterialEdit',
  components: {LoadingSpinner},
  setup() {
    const searchQuery = ref('');
    const router = useRouter();
    const {materials, error, load} = getMaterials();

    const tableHeaders = [
      {title: 'Material', key: 'name'},
      {title: 'Type', key: 'type'},
      {title: 'Edit', key: 'edit'},
    ];

    onMounted(() => {
      load();
    });

    const editMaterial = (item) => {
      const itemId = item.selectable._id
      router.push({name: "EditMaterial", params: {id: itemId }});
    };

    const createNewMaterial = () => {
      router.push({ name: "NewMaterial" });
    };

    return {materials, error, tableHeaders, searchQuery, editMaterial, createNewMaterial};
  },
};
</script>





<!--<template>-->
<!--  <v-container>-->
<!--    <v-alert color="error" icon="$error" v-if="error">{{ error }}</v-alert>-->
<!--    <h1>Materials</h1>-->
<!--    <div v-if="materials.length">-->
<!--      <MaterialList :materials="materials"/>-->
<!--    </div>-->
<!--    <div v-else>-->
<!--      <LoadingSpinner/>-->
<!--    </div>-->
<!--  </v-container>-->
<!--</template>-->

<!--<script>-->

<!--import LoadingSpinner from "@/components/LoadingSpinner.vue";-->
<!--import getMaterials from "@/composables/getMaterials";-->
<!--import MaterialList from "@/components/MaterialList.vue";-->

<!--export default {-->
<!--  name: 'MachinesView',-->
<!--  components: {MaterialList, LoadingSpinner},-->
<!--  setup() {-->
<!--    const {materials, error, load} = getMaterials()-->
<!--    load()-->
<!--    return {materials, error}-->
<!--  }-->
<!--}-->
<!--</script>-->
