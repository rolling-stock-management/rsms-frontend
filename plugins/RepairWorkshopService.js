export default function ({ $axios }, inject) {
  const RepairWorkshopService = {
    getRepairWorkshops(page) {
      return $axios.get('/repair-workshops?page=' + page)
    },
    getRepairWorkshopsNoPagination() {
      return $axios.get('/repair-workshops?no-pagination=1')
    },
    getRepairWorkshop(id) {
      return $axios.get('/repair-workshops/' + id)
    },
    createRepairWorkshop(form) {
      return $axios.post('/repair-workshops', form)
    },
    updateRepairWorkshop(id, form) {
      return $axios.patch('/repair-workshops/' + id, form)
    },
    deleteRepairWorkshop(id) {
      return $axios.delete('repair-workshops/' + id)
    },
  }

  inject('RepairWorkshopService', RepairWorkshopService)
}
