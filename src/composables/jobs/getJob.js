import {ref} from "vue";
import {fetchData} from "@/api";

const getJob = (id) => {
  const job = ref(null)
  const error = ref(null);

  const load = async () => {
    try {
      const data = await fetchData('jobs/' + id, { credentials: 'include' });
      job.value = data.data;
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  };

  return {job, error, load}
}

export default getJob
