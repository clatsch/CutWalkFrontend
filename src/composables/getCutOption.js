import {ref} from "vue";
import {fetchData} from "@/api";

const getCutOption = (id) => {
  const cutOption = ref(null)
  const error = ref(null);

  const load = async () => {
    try {
      const data = await fetchData('cutoptions/' + id, { credentials: 'include' });
      cutOption.value = data.data;
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  };

  return {cutOption, error, load}
}

export default getCutOption
