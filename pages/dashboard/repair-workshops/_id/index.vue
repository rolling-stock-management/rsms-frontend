<template>
  <div class="my-2">
    <h4>Данни за ремонтна работилница</h4>
    <hr />
    <p><b>Име: </b>{{ repairWorkshop.name }}</p>
    <p><b>Абревиатура: </b>{{ repairWorkshop.abbreviation }}</p>
    <p><b>Бележка: </b>{{ repairWorkshop.note }}</p>
    <p><b>Последна промяна: </b>{{ repairWorkshop.updated_at }}</p>
    <div class="d-block d-sm-flex justify-content-end">
      <b-button
        variant="outline-primary"
        to="/dashboard/repair-workshops"
        class="mx-1 my-1 my-sm-0"
        >Списък работилници</b-button
      >
      <b-button
        variant="outline-success"
        to="/dashboard/repair-workshops/create"
        class="mx-1 my-1 my-sm-0"
        >Добавяне на нов запис</b-button
      >
      <b-button
        variant="outline-warning"
        class="mx-1 my-1 my-sm-0"
        :to="'/dashboard/repair-workshops/' + repairWorkshop.id + '/update'"
        >Промяна</b-button
      >
      <b-button
        variant="outline-danger"
        :to="'/dashboard/repair-workshops/' + repairWorkshop.id + '/delete'"
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
    auth: { permission: 'repair-workshop-view' },
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('repairWorkshops/fetchRepairWorkshopById', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за ремонтна работилница ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    repairWorkshop: (state) => state.repairWorkshops.repairWorkshop,
  }),
}
</script>
