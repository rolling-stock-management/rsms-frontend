export default function ({ $axios }, inject) {
  const PassengerReportService = {
    getPassengerReports(page) {
      return $axios.get('/passenger-reports?page=' + page)
    },
    getPassengerReport(id) {
      return $axios.get('/passenger-reports/' + id)
    },
    createPassengerReport(form) {
      return $axios.post('/passenger-reports', form)
    },
    updatePassengerReport(id, form) {
      return $axios.patch('/passenger-reports/' + id, form)
    },
    deletePassengerReport(id) {
      return $axios.delete('/passenger-reports/' + id)
    },
  }

  inject('PassengerReportService', PassengerReportService)
}
