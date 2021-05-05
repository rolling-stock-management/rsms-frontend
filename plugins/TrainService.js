export default function ({ $axios }, inject) {
  const TrainService = {
    getTrains(page) {
      return $axios.get('/trains?page=' + page)
    },
    getTrain(id) {
      return $axios.get('/trains/' + id)
    },
    createTrain(form) {
      return $axios.post('/trains', form)
    },
    updateTrain(id, form) {
      return $axios.patch('/trains/' + id, form)
    },
    deleteTrain(id) {
      return $axios.delete('trains/' + id)
    },
  }

  inject('TrainService', TrainService)
}
