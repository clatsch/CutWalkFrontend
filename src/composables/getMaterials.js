import {ref} from "vue";

const getMaterials = () => {
  const materials = ref([])
  const errorMaterials = ref(null);

  const loadMaterials = async () => {
    try {
      let data = await fetch('http://127.0.0.1:3000/api/v1/materials', {
        credentials: 'include'
      })
      if (!data.ok) {
        throw Error('no data available')
      }
      let importedData = await data.json()
      materials.value = importedData.data
    } catch (err) {
      errorMaterials.value = err.message
      console.log(errorMaterials.value)
    }
  }
  return {materials, errorMaterials, loadMaterials}
}

export default getMaterials
