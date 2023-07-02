import axios from "axios";

//todo: move api creation to eg. vuetify axios plugin/boot file...
export const machinesApi = axios.create()

axios.defaults.headers = {"TestIfIamSetToalreadCreatedApiINstances": "my value"}

export function loadMachines () {
  // return axios.get('api/machines').then(value => value.data)
  return machinesApi.get('api/machines').then(value => value.data)
  /*return new Promise((resolve, reject) => {
    axios.get('api/machines')
      .then(value => resolve(value.data))
      .catch(reject)
  })*/

}

export function deleteMachine (id) {
  // return axios.delete(`api/machines`, {params: {id: id}}).then(value => value.data)
  return machinesApi.delete(`api/machines`, {params: {id: id}}).then(value => value.data)

}
