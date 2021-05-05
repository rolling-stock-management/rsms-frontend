<template>
  <div class="my-2">
    <h4>Данни за влак</h4>
    <hr />
    <p><b>Номер: </b>{{ train.number }}</p>
    <p><b>Маршрут: </b>{{ train.route }}</p>
    <p><b>Бележка: </b>{{ train.note }}</p>
    <p>
      <b>ГДВ: </b
      >{{
        train.timetable.start_date.substr(
          0,
          train.timetable.start_date.indexOf('T')
        )
      }}
      -
      {{
        train.timetable.end_date.substr(
          0,
          train.timetable.end_date.indexOf('T')
        )
      }}
    </p>
    <p><b>Последна промяна: </b>{{ train.updated_at }}</p>
    <div class="d-block d-sm-flex justify-content-end">
      <b-button
        variant="outline-primary"
        to="/dashboard/trains"
        class="mx-1 my-1 my-sm-0"
        >Списък влакове</b-button
      >
      <b-button
        variant="outline-success"
        to="/dashboard/trains/create"
        class="mx-1 my-1 my-sm-0"
        >Добавяне на нов запис</b-button
      >
      <b-button
        variant="outline-warning"
        class="mx-1 my-1 my-sm-0"
        :to="'/dashboard/trains/' + train.id + '/update'"
        >Промяна</b-button
      >
      <b-button
        variant="outline-danger"
        :to="'/dashboard/trains/' + train.id + '/delete'"
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
    auth: { permission: 'train-view' },
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('trains/fetchTrainById', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за влак ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    train: (state) => state.trains.train,
  }),
}
</script>
