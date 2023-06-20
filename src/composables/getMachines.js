import {ref} from "vue";
import {fetchData} from "@/api";

const getMachines = (authToken) => {
  const machines = ref([])
  const error = ref(null);

  const load = async () => {
    try {
      const config = {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const data = await fetchData('machines/', config);
      machines.value = data.data;
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  };

  return {machines, error, load}
}

export default getMachines
