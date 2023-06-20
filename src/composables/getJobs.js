import { ref } from "vue";
import { fetchData } from "@/api";

const getJobs = (userId) => {
  const jobs = ref([]);
  const error = ref(null);

  const load = async () => {
    try {
      const data = await fetchData(`jobs/?userId=${userId}`, { credentials: "include" });
      jobs.value = data.data;
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  };

  return { jobs, error, load };
};

export default getJobs;

