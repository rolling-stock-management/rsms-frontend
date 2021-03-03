<template>
  <div class="my-2">
    <h4>Данни за собственик</h4>
    <hr />
    <p><b>Име: </b>{{ owner.name }}</p>
    <p><b>Бележка: </b>{{ owner.note }}</p>
    <p><b>Последна промяна: </b>{{ owner.updated_at }}</p>
    <div class="d-block d-sm-flex justify-content-end">
      <b-button
        variant="outline-primary"
        to="/dashboard/owners"
        class="mx-1 my-1 my-sm-0"
        >Списък собственици</b-button
      >
      <b-button
        variant="outline-success"
        to="/dashboard/owners/create"
        class="mx-1 my-1 my-sm-0"
        >Добавяне на нов запис</b-button
      >
      <b-button
        variant="outline-warning"
        class="mx-1 my-1 my-sm-0"
        :to="'/dashboard/owners/' + owner.id + '/update'"
        >Промяна</b-button
      >
      <b-button
        variant="outline-danger"
        :to="'/dashboard/owners/' + owner.id + '/delete'"
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
    auth: { permission: 'owner-view' },
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('owners/fetchOwnerById', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за собственик ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    owner: (state) => state.owners.owner,
  }),
}
</script>
