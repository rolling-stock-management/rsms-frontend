<template>
  <div class="my-2">
    <h4>Данни за депо</h4>
    <hr />
    <p><b>Име: </b>{{ depot.name }}</p>
    <p><b>Бележка: </b>{{ depot.note }}</p>
    <p><b>Последна промяна: </b>{{ depot.last_updated }}</p>
    <div class="d-flex justify-content-end">
      <b-button variant="outline-success" to="/dashboard/depots/create"
        >Добавяне на нов запис</b-button
      >
      <b-button variant="outline-primary" class="mx-1" to="/dashboard/depots"
        >Списък депа</b-button
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('depots/fetchDepotById', params.id)
    } catch (e) {
      console.log(e)
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
