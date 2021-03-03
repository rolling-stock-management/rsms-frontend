export default function ({ $axios }, inject) {
  const PassengerInteriorTypeService = {
    getPassengerInteriorTypes(page) {
      return $axios.get('/passenger-interior-types?page=' + page)
    },
    getPassengerInteriorTypesNoPagination() {
      return $axios.get('/passenger-interior-types?no-pagination=1')
    },
    getPassengerInteriorType(id) {
      return $axios.get('/passenger-interior-types/' + id)
    },
    createPassengerInteriorType(form) {
      return $axios.post('/passenger-interior-types', form)
    },
    updatePassengerInteriorType(id, form) {
      return $axios.patch('/passenger-interior-types/' + id, form)
    },
    deletePassengerInteriorType(id) {
      return $axios.delete('passenger-interior-types/' + id)
    },
  }

  inject('PassengerInteriorTypeService', PassengerInteriorTypeService)
}
