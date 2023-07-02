import {ref} from "vue";

const getMaterials = (authToken) => {
  const materials = ref([])
  const error = ref(null);

  const load = async () => {
    try {
      const config = {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      let data = await fetch('http://127.0.0.1:3000/api/v1/materials', config)
      if (!data.ok) {
        throw Error('no data available')
      }
      let importedData = await data.json()
      materials.value = importedData.data
    } catch (err) {
      error.value = err.message
      console.log(error.value)
    }
  }
  return {materials, error, load}
}

export default getMaterials
