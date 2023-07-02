import { ref } from "vue";
import { fetchData } from "@/api";

const deleteCutOption = () => {
  const error = ref(null);

  const deleteCutOptionById = async (authToken, cutOptionId) => {
    try {
      const config = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      await fetchData(`cutoptions/${cutOptionId}`, config);
    } catch (deleteError) {
      console.error(deleteError);
      throw new Error("Failed to delete cut option");
    }
  };

  return { error, deleteCutOptionById };
};

export default deleteCutOption;
