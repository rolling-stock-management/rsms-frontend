export default function ({ $axios }, inject) {
  const RollingStockTrainService = {
    getRollingStockTrains(page, type) {
      return $axios.get(
        '/rolling-stock-trains?page=' + page + '&trainable_type=' + type
      )
    },
    getRollingStockTrainsWithFilters(page, type, filters) {
      return $axios.get(
        '/rolling-stock-trains' +
          filters +
          '&page=' +
          page +
          '&trainable_type=' +
          type
      )
    },
    getRollingStockTrain(id) {
      return $axios.get('/rolling-stock-trains/' + id)
    },
    createRollingStockTrain(form) {
      return $axios.post('/rolling-stock-trains', form)
    },
    updateRollingStockTrain(id, form) {
      return $axios.patch('/rolling-stock-trains/' + id, form)
    },
    deleteRollingStockTrain(id) {
      return $axios.delete('/rolling-stock-trains/' + id)
    },
  }

  inject('RollingStockTrainService', RollingStockTrainService)
}
