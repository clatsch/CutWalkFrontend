import {ref} from "vue";
import {fetchData} from "@/api";

const getCutOption = (id, authToken) => {
  const cutOption = ref(null)
  const error = ref(null);

  const load = async () => {
    try {
      const config = {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const data = await fetchData('cutoptions/' + id, config);
      cutOption.value = data.data;
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  };

  return {cutOption, error, load}
}

export default getCutOption
