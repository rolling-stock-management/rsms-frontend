<template>
  <div class="my-2">
    <h4>Данни за ГДВ</h4>
    <hr />
    <p><b>Дата от: </b>{{ timetable.start_date }}</p>
    <p><b>Дата до: </b>{{ timetable.end_date }}</p>
    <p><b>Последна промяна: </b>{{ timetable.updated_at }}</p>
    <div class="d-block d-sm-flex justify-content-end">
      <b-button
        variant="outline-primary"
        to="/dashboard/timetables"
        class="mx-1 my-1 my-sm-0"
        >Списък ГДВ</b-button
      >
      <b-button
        variant="outline-success"
        to="/dashboard/timetables/create"
        class="mx-1 my-1 my-sm-0"
        >Добавяне на нов запис</b-button
      >
      <b-button
        variant="outline-warning"
        class="mx-1 my-1 my-sm-0"
        :to="'/dashboard/timetables/' + timetable.id + '/update'"
        >Промяна</b-button
      >
      <b-button
        variant="outline-danger"
        :to="'/dashboard/timetables/' + timetable.id + '/delete'"
        class="mx-1 my-1 my-sm-0"
        >Изтриване</b-button
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  middleware: 'hasPermission',
  meta: {
    auth: { permission: 'timetable-view' },
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('timetables/fetchTimetableById', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за ГДВ ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    timetable: (state) => state.timetables.timetable,
  }),
}
</script>
