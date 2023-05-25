import {ref} from "vue";

const getJobs = () => {
  const jobs = ref([])
  const error = ref(null);

  const load = async () => {
    try {
      // simulate delay
      // await new Promise(resolve => {
      //   setTimeout(resolve, 2000)
      // })
      let data = await fetch('http://127.0.0.1:3000/api/v1/jobs')
      if (!data.ok) {
        throw Error('no data available')
      }
      let importedData = await data.json()
      jobs.value = importedData.data
      console.log(jobs.value)
    } catch (err) {
      error.value = err.message
      console.log(error.value)
    }
  }

  return {jobs, error, load}
}

export default getJobs
