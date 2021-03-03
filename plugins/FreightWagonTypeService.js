export default function ({ $axios }, inject) {
  const FreightWagonTypeService = {
    getFreightWagonTypes(page) {
      return $axios.get('/freight-wagon-types?page=' + page)
    },
    getFreightWagonTypesNoPagination() {
      return $axios.get('/freight-wagon-types?no-pagination=1')
    },
    getFreightWagonType(id) {
      return $axios.get('/freight-wagon-types/' + id)
    },
    createFreightWagonType(form) {
      return $axios.post('/freight-wagon-types', form)
    },
    updateFreightWagonType(id, form) {
      return $axios.patch('/freight-wagon-types/' + id, form)
    },
    deleteFreightWagonType(id) {
      return $axios.delete('freight-wagon-types/' + id)
    },
  }

  inject('FreightWagonTypeService', FreightWagonTypeService)
}
