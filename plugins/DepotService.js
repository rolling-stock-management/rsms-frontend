export default function ({ $axios }, inject) {
  const DepotService = {
    getDepots() {
      return $axios.get('/depots')
    },
    getDepot(id) {
      return $axios.get('/depots' + id)
    },
  }

  inject('DepotService', DepotService)
}
