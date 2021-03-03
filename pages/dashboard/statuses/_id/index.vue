<template>
  <div class="my-2">
    <h4>Данни за статус</h4>
    <hr />
    <p><b>Име: </b>{{ status.name }}</p>
    <p><b>Последна промяна: </b>{{ status.updated_at }}</p>
    <div class="d-block d-sm-flex justify-content-end">
      <b-button
        variant="outline-primary"
        to="/dashboard/statuses"
        class="mx-1 my-1 my-sm-0"
        >Списък статуси</b-button
      >
      <b-button
        variant="outline-success"
        to="/dashboard/statuses/create"
        class="mx-1 my-1 my-sm-0"
        >Добавяне на нов запис</b-button
      >
      <b-button
        variant="outline-warning"
        class="mx-1 my-1 my-sm-0"
        :to="'/dashboard/statuses/' + status.id + '/update'"
        >Промяна</b-button
      >
      <b-button
        variant="outline-danger"
        :to="'/dashboard/statuses/' + status.id + '/delete'"
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
    auth: { permission: 'status-view' },
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('statuses/fetchStatusById', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за статус ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    status: (state) => state.statuses.status,
  }),
}
</script>
