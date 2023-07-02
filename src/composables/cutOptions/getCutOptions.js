import { ref } from "vue";
import { fetchData } from "@/api";

const getCutOptions = (authToken) => {
  const cutOptions = ref([]);
  const error = ref(null);

  const load = async () => {
    try {
      const config = {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      let data = await fetch('http://127.0.0.1:3000/api/v1/cutoptions', config)
      if (!data.ok) {
        throw Error('no data available')
      }
      let importedData = await data.json()
      cutOptions.value = importedData.data
    } catch (err) {
      error.value = err.message
      console.log(error.value)
    }
  }


  return { cutOptions, error, load };
};

export default getCutOptions;
