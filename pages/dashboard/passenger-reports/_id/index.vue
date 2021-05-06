<template>
  <div class="my-2">
    <h4>Данни за сигнал за нередност</h4>
    <hr />
    <p><b>Email: </b>{{ passengerReport.email }}</p>
    <p><b>Влак: </b>{{ passengerReport.train.data.number }}</p>
    <p><b>Дата: </b>{{ passengerReport.date }}</p>
    <p><b>Вагон номер: </b>{{ passengerReport.wagon_number }}</p>
    <p>
      <b>Вагон: </b
      >{{
        passengerReport.wagon ? passengerReport.wagon.data.stylized_number : '-'
      }}
    </p>
    <p>
      <b>Описание на проблема: </b>{{ passengerReport.problem_description }}
    </p>
    <p><b>Последна промяна: </b>{{ passengerReport.updated_at }}</p>
    <div class="d-block d-sm-flex justify-content-end">
      <b-button
        variant="outline-primary"
        to="/dashboard/passenger-reports"
        class="mx-1 my-1 my-sm-0"
        >Списък сигнали</b-button
      >
      <b-button
        variant="outline-warning"
        class="mx-1 my-1 my-sm-0"
        :to="'/dashboard/passenger-reports/' + passengerReport.id + '/update'"
        >Промяна</b-button
      >
      <b-button
        variant="outline-danger"
        :to="'/dashboard/passenger-reports/' + passengerReport.id + '/delete'"
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
    auth: { permission: 'passenger-report-view' },
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch(
        'passengerReports/fetchPassengerReportById',
        params.id
      )
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за сигнал за нередност ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    passengerReport: (state) => state.passengerReports.passengerReport,
  }),
}
</script>
