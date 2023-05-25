import {ref} from "vue";

const getJob = (id) => {
  const job = ref(null)
  const error = ref(null);

  const load = async () => {
    try {
      // simulate delay
      // await new Promise(resolve => {
      //   setTimeout(resolve, 2000)
      // })

      let data = await fetch('http://127.0.0.1:3000/api/v1/jobs/' + id)
      if (!data.ok) {
        throw Error('this job does not exist')
      }
      let importedData = await data.json()
      job.value = importedData.data
    } catch (err) {
      error.value = err.message
      console.log(error.value)
    }
  }

  return {job, error, load}
}

export default getJob
