<template>
  <div class="my-2">
    <h4>Данни за депо</h4>
    <hr />
    <p><b>Име: </b>{{ depot.name }}</p>
    <p><b>Бележка: </b>{{ depot.note }}</p>
    <p><b>Последна промяна: </b>{{ depot.last_updated }}</p>
    <div class="d-block d-sm-flex justify-content-end">
      <b-button
        variant="outline-primary"
        to="/dashboard/depots"
        class="mx-1 my-1 my-sm-0"
        >Списък депа</b-button
      >
      <b-button
        variant="outline-success"
        to="/dashboard/depots/create"
        class="mx-1 my-1 my-sm-0"
        >Добавяне на нов запис</b-button
      >
      <b-button
        variant="outline-warning"
        class="mx-1 my-1 my-sm-0"
        :to="'/dashboard/depots/' + depot.id + '/update'"
        >Промяна</b-button
      >
      <b-button
        variant="outline-danger"
        :to="'/dashboard/depots/' + depot.id + '/delete'"
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
    auth: { permission: 'depot-view' },
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('depots/fetchDepotById', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за депо ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    depot: (state) => state.depots.depot,
  }),
}
</script>
