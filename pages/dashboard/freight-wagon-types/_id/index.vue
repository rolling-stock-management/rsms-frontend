<template>
  <div class="my-2">
    <h4>Данни за тип товарни вагони</h4>
    <hr />
    <p><b>Означение: </b>{{ freightWagonType.name }}</p>
    <p><b>Описание: </b>{{ freightWagonType.description }}</p>
    <p><b>Последна промяна: </b>{{ freightWagonType.updated_at }}</p>
    <div class="d-block d-sm-flex justify-content-end">
      <b-button
        variant="outline-primary"
        to="/dashboard/freight-wagon-types"
        class="mx-1 my-1 my-sm-0"
        >Списък серии товарни вагони</b-button
      >
      <b-button
        variant="outline-success"
        to="/dashboard/freight-wagon-types/create"
        class="mx-1 my-1 my-sm-0"
        >Добавяне на нов запис</b-button
      >
      <b-button
        variant="outline-warning"
        class="mx-1 my-1 my-sm-0"
        :to="
          '/dashboard/freight-wagon-types/' + freightWagonType.id + '/update'
        "
        >Промяна</b-button
      >
      <b-button
        variant="outline-danger"
        :to="
          '/dashboard/freight-wagon-types/' + freightWagonType.id + '/delete'
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
    auth: { permission: 'freight-wagon-type-view' },
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch(
        'freightWagonTypes/fetchFreightWagonTypeById',
        params.id
      )
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за тип товарни вагони ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    freightWagonType: (state) => state.freightWagonTypes.freightWagonType,
  }),
}
</script>
