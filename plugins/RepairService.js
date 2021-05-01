export default function ({ $axios }, inject) {
  const RepairService = {
    getRepairs(page, type) {
      return $axios.get('/repairs?page=' + page + '&repairable_type=' + type)
    },
    getRepairsWithFilters(page, type, filters) {
      return $axios.get(
        '/repairs' + filters + '&page=' + page + '&repairable_type=' + type
      )
    },
    getRepair(id) {
      return $axios.get('/repairs/' + id)
    },
    createRepair(form) {
      return $axios.post('/repairs', form)
    },
    updateRepair(id, form) {
      return $axios.patch('/repairs/' + id, form)
    },
    deleteRepair(id) {
      return $axios.delete('repairs/' + id)
    },
  }

  inject('RepairService', RepairService)
}
