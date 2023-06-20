import { ref } from "vue";
import { fetchData } from "@/api";

const getCutOptions = () => {
  const cutOptions = ref([]);
  const error = ref(null);

  const load = async () => {
    try {
      const response = await fetchData("cutoptions/", { credentials: "include" });
      cutOptions.value = response.data;
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  };

  const deleteCutOptionById = async (cutOptionId) => {
    try {
      await fetchData(`cutoptions/${cutOptionId}`, {
        method: "DELETE",
        // headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
    } catch (deleteError) {
      console.error(deleteError);
      throw new Error("Failed to delete cut option");
    }
  };

  return { cutOptions, error, load, deleteCutOptionById };
};

export default getCutOptions;
