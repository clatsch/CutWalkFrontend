import {ref} from "vue";
import {fetchData} from "@/api";

const getMachine = (id) => {
  const machine = ref(null)
  const error = ref(null);

  const load = async () => {
    try {
      const data = await fetchData('machines/' + id, { credentials: 'include' });
      machine.value = data.data;
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  };

  return {machine, error, load}
}

export default getMachine
