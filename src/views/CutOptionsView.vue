<template>
  <v-container fluid>
    <v-alert color="error" icon="error" v-if="error">{{ error }}</v-alert>
    <h1>Cut Options</h1>
    <div v-if="cutOptions.length">
      <v-text-field type="text" v-model="searchQuery" placeholder="Search Cut Options"/>
      <v-data-table :items="cutOptions" :headers="tableHeaders" :search="searchQuery" :group-by="groupBy" item-key="_id">
        <template v-slot:item="{ item }">
          <tr>
            <td></td>
            <td>{{ item.columns.materialId.name }}</td>
            <td>{{ item.columns.thickness }}</td>
            <td>{{ item.columns.abrasiveFlow }}</td>
            <td>{{ item.columns.pressure }}</td>
            <td>{{ item.columns.xRough }}</td>
            <td>{{ item.columns.rough }}</td>
            <td>{{ item.columns.medium }}</td>
            <td>{{ item.columns.fine }}</td>
            <td>{{ item.columns.xFine }}</td>
            <td>{{ item.columns.piercing }}</td>
            <td>
              <v-btn class="mx-2" small color="primary" @click="editCutOption(item)">
                <v-icon small left>mdi-pencil</v-icon>
              </v-btn>
              <v-btn small color="red" @click="confirmDeleteCutOption(item)">
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
    <v-btn @click="createNewCutOption">Create new Cut Option</v-btn>
    <v-dialog v-model="dialogOpen" max-width="500px">
      <v-card>
        <v-card-title class="headline">Confirm Deletion</v-card-title>
        <v-card-text>
          Are you sure you want to delete this cut option?
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="dialogOpen = false">
            Cancel
          </v-btn>
          <v-btn color="red" text @click="deleteSelectedCutOption(item); dialogOpen = false">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import getCutOptions from "@/composables/cutOptions/getCutOptions";
import deleteCutOption from "@/composables/cutOptions/deleteCutOption";
import {useStore} from "vuex";

export default {
  name: 'CutOptionsView',
  components: { LoadingSpinner },
  setup() {
    const store = useStore();
    const authToken = store.getters.getAuthToken;
    const searchQuery = ref('');
    const router = useRouter();
    const { cutOptions, error, load } = getCutOptions(authToken);
    const {error: deleteError, deleteCutOptionById} = deleteCutOption()
    const dialogOpen = ref(false);
    const itemToDelete = ref(null);



    const tableHeaders = [
      { title: 'Material', key: 'materialId' },
      { title: 'Thickness', key: 'thickness' },
      { title: 'Abrasive Flow', key: 'abrasiveFlow' },
      { title: 'Pressure', key: 'pressure' },
      { title: 'xRough', key: 'xRough', value: 'quality.xRough' },
      { title: 'Rough', key: 'rough', value: 'quality.rough' },
      { title: 'Medium', key: 'medium', value: 'quality.medium' },
      { title: 'Fine', key: 'fine', value: 'quality.fine' },
      { title: 'xFine', key: 'xFine', value: 'quality.xFine' },
      { title: 'Piercing', key: 'piercing' },
      { title: 'Edit', key: 'edit' },
    ];

    onMounted(() => {
      load();
    });

    const groupBy = [{ title: 'Machine', key: 'machineId.name', value: 'machineId.name' }];

    const editCutOption = (item) => {
      const itemId = item.selectable._id;
      router.push({ name: "EditCutOption", params: { id: itemId } });
    };

    const confirmDeleteCutOption = (item) => {
      itemToDelete.value = item;
      dialogOpen.value = true;
    };

    const deleteSelectedCutOption = async () => {
      const itemId = itemToDelete.value.selectable._id;
      try {
        await deleteCutOptionById(authToken, itemId);
        await load(); // Reload the cut options after deletion
      } catch (error) {
        console.error(error);
      }
    };

    const createNewCutOption = () => {
      router.push({ name: "NewCutOption" });
    };

    return {
      cutOptions,
      error,
      deleteError,
      tableHeaders,
      searchQuery,
      groupBy,
      editCutOption,
      confirmDeleteCutOption,
      deleteSelectedCutOption,
      dialogOpen,
      createNewCutOption,
      itemToDelete, };
  },
};
</script>

