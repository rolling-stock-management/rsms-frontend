<template>
  <div class="my-2">
    <h4>Данни за ремонт</h4>
    <hr />
    <p><b>Кратко описание: </b>{{ repair.short_description }}</p>
    <p><b>Ремонтиран ПС: </b>{{ repair.repairable.number }}</p>
    <p><b>Тип: </b>{{ repair.type.name }}</p>
    <p><b>Работилница: </b>{{ repair.workshop.abbreviation }}</p>
    <p><b>Дата от: </b>{{ repair.start_date }}</p>
    <p><b>Дата до: </b>{{ repair.end_date }}</p>
    <p><b>Описание: </b>{{ repair.description }}</p>
    <p><b>Последна промяна: </b>{{ repair.updated_at }}</p>
    <div class="d-block d-sm-flex justify-content-end">
      <b-button
        variant="outline-primary"
        to="/dashboard/repairs"
        class="mx-1 my-1 my-sm-0"
        >Списък депа</b-button
      >
      <b-button
        variant="outline-success"
        to="/dashboard/repairs/create"
        class="mx-1 my-1 my-sm-0"
        >Добавяне на нов запис</b-button
      >
      <b-button
        variant="outline-warning"
        class="mx-1 my-1 my-sm-0"
        :to="'/dashboard/repairs/' + repair.id + '/update'"
        >Промяна</b-button
      >
      <b-button
        variant="outline-danger"
        :to="'/dashboard/repairs/' + repair.id + '/delete'"
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
    auth: { permission: 'repair-view' },
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('repairs/fetchRepairById', params.id)
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
    repair: (state) => state.repairs.repair,
  }),
}
</script>
