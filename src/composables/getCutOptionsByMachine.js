import {ref} from "vue";

const getCutOptionsByMachine = () => {
  const cutOptionsByMachine = ref([])
  const errorCutOptionsByMachine = ref(null);

  const loadCutOptionsByMachine = async (machineId, materialId) => {

    try {
      let response  = await fetch(`http://127.0.0.1:3000/api/v1/cutoptions?machineId=${machineId}&materialId=${materialId}`)
      if (!response .ok) {
        throw Error('no data available')
      }
      let data  = await response.json()
      return data.data;
    } catch (err) {
      errorCutOptionsByMachine.value = err.message
    }
  }
  return {cutOptionsByMachine, errorCutOptionsByMachine, loadCutOptionsByMachine}
}

export default getCutOptionsByMachine
