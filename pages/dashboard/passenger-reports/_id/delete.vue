<template>
  <div class="my-2">
    <h4>Изтриване на сигнал за нередност</h4>
    <hr />
    <b-card header="Влизане">
      <p>
        Наистина ли искате да изтриете сигнал от {{ passengerReport.date }} за
        {{ passengerReport.wagon_number }}. вагон на влак
        {{ passengerReport.train.data.number }}? Това действие е необратимо.
      </p>
      <div class="d-flex justify-content-end">
        <b-button
          type="button"
          :to="'/dashboard/passenger-reports/' + passengerReport.id"
          variant="outline-success"
          class="mx-1"
          >Отказ</b-button
        >
        <b-button variant="outline-danger" @click="handleDelete"
          >Изтриване</b-button
        >
      </div>
    </b-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  middleware: 'hasPermission',
  meta: {
    auth: { permission: 'passenger-report-delete' },
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
  methods: {
    async handleDelete() {
      try {
        await this.$store.dispatch(
          'passengerReports/deletePassengerReport',
          this.passengerReport.id
        )
        this.$router.push(
          '/dashboard/passenger-reports?page=' +
            this.$store.state.passengerReports.pagination.currentPage
        )
      } catch (error) {
        error({
          statusCode: 503,
          message:
            'Неуспешно изтриване на сигнал за нередност ' +
            this.$route.params.id +
            '. Моля, опитайте по-късно.',
        })
      }
    },
  },
}
</script>
