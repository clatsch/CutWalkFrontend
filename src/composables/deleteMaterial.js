import {ref} from "vue";
import {fetchData} from "@/api";

const deleteMaterial = () => {
  const error = ref(null);

  const deleteMaterialById = async (authToken, materialId) => {
    try {
      const config = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      await fetchData(`materials/${materialId}`, config);
    } catch (deleteError) {
      console.error(deleteError);
      throw new Error("Failed to delete material");
    }
  };

  return {error, deleteMaterialById};
};

export default deleteMaterial;
