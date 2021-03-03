export default function ({ $axios }, inject) {
  const PassengerWagonTypeService = {
    getPassengerWagonTypes(page) {
      return $axios.get('/passenger-wagon-types?page=' + page)
    },
    getPassengerWagonTypesNoPagination() {
      return $axios.get('/passenger-wagon-types?no-pagination=1')
    },
    getPassengerWagonType(id) {
      return $axios.get('/passenger-wagon-types/' + id)
    },
    createPassengerWagonType(form) {
      return $axios.post('/passenger-wagon-types', form)
    },
    updatePassengerWagonType(id, form) {
      return $axios.patch('/passenger-wagon-types/' + id, form)
    },
    deletePassengerWagonType(id) {
      return $axios.delete('passenger-wagon-types/' + id)
    },
  }

  inject('PassengerWagonTypeService', PassengerWagonTypeService)
}
