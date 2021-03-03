export default function ({ $axios }, inject) {
  const StatusService = {
    getStatuses(page) {
      return $axios.get('/statuses?page=' + page)
    },
    getStatusesNoPagination() {
      return $axios.get('/statuses?no-pagination=1')
    },
    getStatus(id) {
      return $axios.get('/statuses/' + id)
    },
    createStatus(form) {
      return $axios.post('/statuses', form)
    },
    updateStatus(id, form) {
      return $axios.patch('/statuses/' + id, form)
    },
    deleteStatus(id) {
      return $axios.delete('statuses/' + id)
    },
  }

  inject('StatusService', StatusService)
}
