import {ref} from "vue";
import {fetchData} from "@/api";

const getMachine = (id, authToken) => {
  const machine = ref(null)
  const error = ref(null);

  const load = async () => {
    try {
      const config = {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const data = await fetchData('machines/' + id, config);
      machine.value = data.data;
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  };

  return {machine, error, load}
}

export default getMachine
