<template>
  <div class="my-2">
    <h4>Данни за тип интериор</h4>
    <hr />
    <p><b>Име: </b>{{ passengerInteriorType.name }}</p>
    <p><b>Описание: </b>{{ passengerInteriorType.description }}</p>
    <p><b>Последна промяна: </b>{{ passengerInteriorType.updated_at }}</p>
    <div class="d-block d-sm-flex justify-content-end">
      <b-button
        variant="outline-primary"
        to="/dashboard/passenger-interior-types"
        class="mx-1 my-1 my-sm-0"
        >Списък типове интериори</b-button
      >
      <b-button
        variant="outline-success"
        to="/dashboard/passenger-interior-types/create"
        class="mx-1 my-1 my-sm-0"
        >Добавяне на нов запис</b-button
      >
      <b-button
        variant="outline-warning"
        class="mx-1 my-1 my-sm-0"
        :to="
          '/dashboard/passenger-interior-types/' +
          passengerInteriorType.id +
          '/update'
        "
        >Промяна</b-button
      >
      <b-button
        variant="outline-danger"
        :to="
          '/dashboard/passenger-interior-types/' +
          passengerInteriorType.id +
          '/delete'
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
    auth: { permission: 'passenger-interior-type-view' },
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch(
        'passengerInteriorTypes/fetchPassengerInteriorTypeById',
        params.id
      )
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за тип интериор ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    passengerInteriorType: (state) =>
      state.passengerInteriorTypes.passengerInteriorType,
  }),
}
</script>
