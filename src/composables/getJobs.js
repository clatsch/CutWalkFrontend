import {ref} from "vue";
import {fetchData} from "@/api";

const getJobs = () => {
  const jobs = ref([])
  const error = ref(null);

  const load = async () => {
    try {
      const data = await fetchData('jobs/', {credentials: 'include'});
      jobs.value = data.data;
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  };

  return {jobs, error, load}
}

export default getJobs
