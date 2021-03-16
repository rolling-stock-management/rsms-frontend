export default function ({ $axios }, inject) {
  const PassengerWagonService = {
    getPassengerWagons(page) {
      return $axios.get('/passenger-wagons?page=' + page)
    },
    getPassengerWagonsWithFilters(page, filters) {
      return $axios.get('/passenger-wagons' + filters + '&page=' + page)
    },
    getPassengerWagon(id) {
      return $axios.get('/passenger-wagons/' + id)
    },
    createPassengerWagon(form) {
      return $axios.post('/passenger-wagons', form)
    },
    updatePassengerWagon(id, form) {
      return $axios.patch('/passenger-wagons/' + id, form)
    },
    deletePassengerWagon(id) {
      return $axios.delete('passenger-wagons/' + id)
    },
  }

  inject('PassengerWagonService', PassengerWagonService)
}
