export default function ({ $axios }, inject) {
  const FreightWagonService = {
    getFreightWagons(page) {
      return $axios.get('/freight-wagons?page=' + page)
    },
    getFreightWagonsWithFilters(page, filters) {
      return $axios.get('/freight-wagons' + filters + '&page=' + page)
    },
    getFreightWagon(id) {
      return $axios.get('/freight-wagons/' + id)
    },
    createFreightWagon(form) {
      return $axios.post('/freight-wagons', form)
    },
    updateFreightWagon(id, form) {
      return $axios.patch('/freight-wagons/' + id, form)
    },
    deleteFreightWagon(id) {
      return $axios.delete('freight-wagons/' + id)
    },
  }

  inject('FreightWagonService', FreightWagonService)
}
