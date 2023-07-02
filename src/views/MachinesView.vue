<template>
  <v-container>
    <v-alert color="error" icon="error" v-if="error">{{ error }}</v-alert>
    <h1>Machines</h1>
    <div v-if="machines.length">
      <v-text-field type="text" v-model="searchQuery" placeholder="Search Materials"/>
      <v-data-table :items="machines" :headers="tableHeaders" :search="searchQuery" item-key="_id">
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.columns.name }}</td>
            <td>{{ item.columns.type }}</td>
            <td>{{ item.columns.rate }}</td>
            <td>{{ item.columns.maxWidth }}</td>
            <td>{{ item.columns.maxLength }}</td>
            <td>{{ item.columns.maxHeight }}</td>
            <td>
              <v-btn class="mx-2" small color="primary" @click="editMachine(item)">
                <v-icon small left>mdi-pencil</v-icon>
              </v-btn>
              <v-btn small color="red" @click="confirmDeleteMachine(item)">
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
    <v-btn @click="createNewMachine">Create new Machine</v-btn>

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
          <v-btn color="red" text @click="deleteSelectedMachine(item); dialogOpen = false">
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
import getMachines from "@/composables/machines/getMachines";
import deleteMachine from "@/composables/machines/deleteMachine";
import {useStore} from "vuex";

export default {
  name: 'MaterialEdit',
  components: { LoadingSpinner },
  setup() {
    const store = useStore();
    const authToken = store.getters.getAuthToken;
    const searchQuery = ref('');
    const router = useRouter();
    const {machines, error, load} = getMachines(authToken);
    const {error: deleteError, deleteMachineById} = deleteMachine()
    const dialogOpen = ref(false);
    const itemToDelete = ref(null);

    const tableHeaders = [
      {title: 'Machine', key: 'name'},
      {title: 'Type', key: 'type'},
      {title: 'Hourly Rate [CHF]', key: 'rate'},
      {title: 'Width [mm]', key: 'maxWidth'},
      {title: 'Length [mm]', key: 'maxLength'},
      {title: 'Height [mm]', key: 'maxHeight'},
      {title: 'Edit', key: 'edit'},
    ];

    onMounted(() => {
      load();
    });

    const editMachine = (item) => {
      const itemId = item.selectable._id
      router.push({name: "EditMachine", params: {id: itemId }});
    };

    const confirmDeleteMachine = (item) => {
      itemToDelete.value = item;
      dialogOpen.value = true;
    };

    const deleteSelectedMachine = async () => {
      const itemId = itemToDelete.value.selectable._id;
      try {
        await deleteMachineById(authToken, itemId);
        await load();
      } catch (error) {
        console.error(error);
      }
    };


    const createNewMachine = () => {
      router.push({ name: "NewMachine" });
    };

    return {
      machines,
      error,
      deleteError,
      tableHeaders,
      searchQuery,
      editMachine,
      confirmDeleteMachine,
      deleteSelectedMachine,
      dialogOpen,
      createNewMachine};
  },
};
</script>


