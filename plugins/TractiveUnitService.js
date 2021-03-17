export default function ({ $axios }, inject) {
  const TractiveUnitService = {
    getTractiveUnits(page) {
      return $axios.get('/tractive-units?page=' + page)
    },
    getTractiveUnitsWithFilters(page, filters) {
      return $axios.get('/tractive-units' + filters + '&page=' + page)
    },
    getTractiveUnit(id) {
      return $axios.get('/tractive-units/' + id)
    },
    createTractiveUnit(form) {
      return $axios.post('/tractive-units', form)
    },
    updateTractiveUnit(id, form) {
      return $axios.patch('/tractive-units/' + id, form)
    },
    deleteTractiveUnit(id) {
      return $axios.delete('tractive-units/' + id)
    },
  }

  inject('TractiveUnitService', TractiveUnitService)
}
