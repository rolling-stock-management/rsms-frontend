<template>
  <div class="my-2">
    <h4>Изтриване на ПС на влак</h4>
    <hr />
    <b-card header="Влизане">
      <p>
        Наистина ли искате да изтриете
        {{ rollingStockTrain.trainable.number }} на влак
        {{ rollingStockTrain.train.number }} на дата
        {{ rollingStockTrain.date }}? Това действие е необратимо.
      </p>
      <div class="d-flex justify-content-end">
        <b-button
          type="button"
          :to="'/dashboard/rolling-stock-trains/' + rollingStockTrain.id"
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
    auth: { permission: 'rolling-stock-train-delete' },
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch(
        'rollingStockTrains/fetchRollingStockTrainById',
        params.id
      )
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за ПС на влак ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    rollingStockTrain: (state) => state.rollingStockTrains.rollingStockTrain,
  }),
  methods: {
    async handleDelete() {
      try {
        await this.$store.dispatch(
          'rollingStockTrains/deleteRollingStockTrain',
          this.rollingStockTrain.id
        )
        this.$router.push(
          '/dashboard/rolling-stock-trains?page=' +
            this.$store.state.rollingStockTrains.pagination.currentPage +
            '&type=' +
            this.$route.query.type
        )
      } catch (error) {
        error({
          statusCode: 503,
          message:
            'Неуспешно изтриване на ПС на влак ' +
            this.$route.params.id +
            '. Моля, опитайте по-късно.',
        })
      }
    },
  },
}
</script>
