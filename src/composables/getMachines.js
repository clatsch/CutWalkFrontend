import {ref} from "vue";
import {fetchData} from "@/api";

const getMachines = () => {
  const machines = ref([])
  const error = ref(null);

  const load = async () => {
    try {
      const data = await fetchData('machines/', {credentials: 'include'});
      machines.value = data.data;
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  };

  return {machines, error, load}
}

export default getMachines
