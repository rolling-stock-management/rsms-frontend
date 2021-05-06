<template>
  <div class="my-2">
    <h4>Данни за ПС на влак</h4>
    <hr />
    <p><b>Единица ПС: </b>{{ rollingStockTrain.trainable.number }}</p>
    <p>
      <b>Влак: </b>
      {{ rollingStockTrain.train.number }}
    </p>
    <p><b>Дата: </b>{{ rollingStockTrain.date }}</p>
    <p><b>Позиция: </b>{{ rollingStockTrain.position }}</p>
    <p><b>Коментар: </b>{{ rollingStockTrain.comment }}</p>
    <p><b>Последна промяна: </b>{{ rollingStockTrain.updated_at }}</p>
    <div class="d-block d-sm-flex justify-content-end">
      <b-button
        variant="outline-primary"
        :to="'/dashboard/rolling-stock-trains?type=' + trainableType"
        class="mx-1 my-1 my-sm-0"
        >Списък ПС на влакове</b-button
      >
      <b-button
        variant="outline-success"
        :to="'/dashboard/rolling-stock-trains/create?type=' + trainableType"
        class="mx-1 my-1 my-sm-0"
        >Добавяне на нов запис</b-button
      >
      <b-button
        variant="outline-warning"
        class="mx-1 my-1 my-sm-0"
        :to="
          '/dashboard/rolling-stock-trains/' +
          rollingStockTrain.id +
          '/update?type=' +
          trainableType
        "
        >Промяна</b-button
      >
      <b-button
        variant="outline-danger"
        :to="
          '/dashboard/rolling-stock-trains/' +
          rollingStockTrain.id +
          '/delete?type=' +
          trainableType
        "
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
    auth: { permission: 'rolling-stock-train-view' },
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
          'Неуспешно взимане на информацията за ремонт ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    rollingStockTrain: (state) => state.rollingStockTrains.rollingStockTrain,
    trainableType() {
      switch (this.rollingStockTrain.trainable_type) {
        case 'App\\Models\\PassengerWagon':
          return '1'
        case 'App\\Models\\FreightWagon':
          return '2'
        case 'App\\Models\\TractiveUnit':
          return '3'
        default:
          return ''
      }
    },
  }),
}
</script>
