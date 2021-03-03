<template>
  <div class="my-2">
    <h4>Данни за тип ремонт</h4>
    <hr />
    <p><b>Име: </b>{{ repairType.name }}</p>
    <p><b>Описание: </b>{{ repairType.description }}</p>
    <p><b>Последна промяна: </b>{{ repairType.updated_at }}</p>
    <div class="d-block d-sm-flex justify-content-end">
      <b-button
        variant="outline-primary"
        to="/dashboard/repair-types"
        class="mx-1 my-1 my-sm-0"
        >Списък типове ремонти</b-button
      >
      <b-button
        variant="outline-success"
        to="/dashboard/repair-types/create"
        class="mx-1 my-1 my-sm-0"
        >Добавяне на нов запис</b-button
      >
      <b-button
        variant="outline-warning"
        class="mx-1 my-1 my-sm-0"
        :to="'/dashboard/repair-types/' + repairType.id + '/update'"
        >Промяна</b-button
      >
      <b-button
        variant="outline-danger"
        :to="'/dashboard/repair-types/' + repairType.id + '/delete'"
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
    auth: { permission: 'repair-type-view' },
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('repairTypes/fetchRepairTypeById', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за тип ремонт ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    repairType: (state) => state.repairTypes.repairType,
  }),
}
</script>
