import { ref } from "vue";
import { fetchData } from "@/api";

const deleteMachine = () => {
  const error = ref(null);

  const deleteMachineById = async (authToken, machineId) => {
    try {
      const config = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      await fetchData(`machines/${machineId}`, config);
    } catch (deleteError) {
      console.error(deleteError);
      throw new Error("Failed to delete machine");
    }
  };

  return { error, deleteMachineById };
};

export default deleteMachine;
