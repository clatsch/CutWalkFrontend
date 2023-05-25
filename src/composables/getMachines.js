import {ref} from "vue";

const getMachines = () => {
  const machines = ref([])
  const error = ref(null);

  const load = async () => {
    try {
      let data = await fetch('http://127.0.0.1:3000/api/v1/machines')
      if (!data.ok) {
        throw Error('no data available')
      }
      let importedData = await data.json()
      machines.value = importedData.data
    } catch (err) {
      error.value = err.message
      console.log(error.value)
    }
  }
  return {machines, error, load}
}

export default getMachines
