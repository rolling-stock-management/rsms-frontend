export default function ({ $axios }, inject) {
  const RepairTypeService = {
    getRepairTypes(page) {
      return $axios.get('/repair-types?page=' + page)
    },
    getRepairTypesNoPagination() {
      return $axios.get('/repair-types?no-pagination=1')
    },
    getRepairType(id) {
      return $axios.get('/repair-types/' + id)
    },
    createRepairType(form) {
      return $axios.post('/repair-types', form)
    },
    updateRepairType(id, form) {
      return $axios.patch('/repair-types/' + id, form)
    },
    deleteRepairType(id) {
      return $axios.delete('repair-types/' + id)
    },
  }

  inject('RepairTypeService', RepairTypeService)
}
