import {ref} from "vue";
import {fetchData} from "@/api";

const getMaterial = (id, authToken) => {
  const material = ref(null)
  const error = ref(null);

  const load = async () => {
    try {
      const config = {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const data = await fetchData('materials/' + id, config);
      material.value = data.data;
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  };

  return {material, error, load}
}

export default getMaterial
