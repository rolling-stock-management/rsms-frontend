export default function ({ $axios }, inject) {
  const DepotService = {
    getDepots(page) {
      return $axios.get('/depots?page=' + page)
    },
    getDepot(id) {
      return $axios.get('/depots/' + id)
    },
    createDepot(form) {
      return $axios.post('/depots', form)
    },
    updateDepot(id, form) {
      return $axios.patch('/depots/' + id, form)
    },
    deleteDepot(id) {
      return $axios.delete('depots/' + id)
    },
  }

  inject('DepotService', DepotService)
}
