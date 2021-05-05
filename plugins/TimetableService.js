export default function ({ $axios }, inject) {
  const TimetableService = {
    getTimetables(page) {
      return $axios.get('/timetables?page=' + page)
    },
    getTimetablesNoPagination() {
      return $axios.get('/timetables?no-pagination=1')
    },
    getTimetable(id) {
      return $axios.get('/timetables/' + id)
    },
    createTimetable(form) {
      return $axios.post('/timetables', form)
    },
    updateTimetable(id, form) {
      return $axios.patch('/timetables/' + id, form)
    },
    deleteTimetable(id) {
      return $axios.delete('timetables/' + id)
    },
  }

  inject('TimetableService', TimetableService)
}
