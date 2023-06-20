<template>
  <v-dialog v-model="dialogOpen" max-width="500px">
    <v-card>
      <v-card-title class="headline">Confirm Deletion</v-card-title>
      <v-card-text>
        Are you sure you want to delete this cut option?
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" text @click="cancelDelete">
          Cancel
        </v-btn>
        <v-btn color="red" text @click="confirmDelete">
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref, defineEmits } from 'vue';

export default {
  emits: ['confirm', 'cancel'],
  setup(_, { emit }) {
    const dialogOpen = ref(false);
    const itemToDelete = ref(null);

    const confirmDelete = () => {
      emit('confirm');
    };

    const cancelDelete = () => {
      emit('cancel');
    };

    return { dialogOpen, itemToDelete, confirmDelete, cancelDelete };
  },
};
</script>
