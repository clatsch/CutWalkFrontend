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
              <v-btn class="mx-2" small color="primary" @click="editMaterial(item)">
                <v-icon small left>mdi-pencil</v-icon>
              </v-btn>
              <v-btn small color="red" @click="confirmDeleteMaterial(item)">
                <v-icon small left>mdi-delete</v-icon>
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

    <v-dialog v-model="dialogOpen" max-width="500px">
      <v-card>
        <v-card-title class="headline">Confirm Deletion</v-card-title>
        <v-card-text>
          Are you sure you want to delete this machine?
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="dialogOpen = false">
            Cancel
          </v-btn>
          <v-btn color="red" text @click="deleteSelectedMaterial(item); dialogOpen = false">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import getMaterials from "@/composables/getMaterials";
import deleteMaterial from "@/composables/deleteMaterial";
import {useStore} from "vuex";


export default {
  name: 'MaterialEdit',
  components: {LoadingSpinner},
  setup() {
    const store = useStore();
    const authToken = store.getters.getAuthToken;
    const searchQuery = ref('');
    const router = useRouter();
    const {materials, error, load} = getMaterials(authToken);
    const {error: deleteError, deleteMaterialById} = deleteMaterial()
    const dialogOpen = ref(false);
    const itemToDelete = ref(null);

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
      router.push({name: "EditMaterial", params: {id: itemId}});
    };

    const confirmDeleteMaterial = (item) => {
      itemToDelete.value = item;
      dialogOpen.value = true;
    };

    const deleteSelectedMaterial = async () => {
      const itemId = itemToDelete.value.selectable._id;
      try {
        await deleteMaterialById(authToken, itemId);
        await load();
      } catch (error) {
        console.error(error);
      }
    };

    const createNewMaterial = () => {
      router.push({name: "NewMaterial"});
    };

    return {
      materials,
      error,
      deleteError,
      tableHeaders,
      searchQuery,
      editMaterial,
      confirmDeleteMaterial,
      deleteSelectedMaterial,
      dialogOpen,
      createNewMaterial
    };
  },
};
</script>
