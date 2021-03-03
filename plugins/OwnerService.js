export default function ({ $axios }, inject) {
  const OwnerService = {
    getOwners(page) {
      return $axios.get('/owners?page=' + page)
    },
    getOwnersNoPagination() {
      return $axios.get('/owners?no-pagination=1')
    },
    getOwner(id) {
      return $axios.get('/owners/' + id)
    },
    createOwner(form) {
      return $axios.post('/owners', form)
    },
    updateOwner(id, form) {
      return $axios.patch('/owners/' + id, form)
    },
    deleteOwner(id) {
      return $axios.delete('owners/' + id)
    },
  }

  inject('OwnerService', OwnerService)
}
