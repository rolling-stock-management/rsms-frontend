<template>
  <div class="my-2">
    <h4>Данни за тип пътнически вагони</h4>
    <hr />
    <p><b>Име: </b>{{ passengerWagonType.name }}</p>
    <p><b>Описание: </b>{{ passengerWagonType.description }}</p>
    <p>
      <b>Валидност на ремонта: </b>{{ passengerWagonType.repair_valid_for }}
      години
    </p>
    <p><b>Тип интериор: </b>{{ passengerWagonType.interior_type.data.name }}</p>
    <p><b>Последна промяна: </b>{{ passengerWagonType.updated_at }}</p>
    <div class="d-block d-sm-flex justify-content-end">
      <b-button
        variant="outline-primary"
        to="/dashboard/passenger-wagon-types"
        class="mx-1 my-1 my-sm-0"
        >Списък серии пътнически вагони</b-button
      >
      <b-button
        variant="outline-success"
        to="/dashboard/passenger-wagon-types/create"
        class="mx-1 my-1 my-sm-0"
        >Добавяне на нов запис</b-button
      >
      <b-button
        variant="outline-warning"
        class="mx-1 my-1 my-sm-0"
        :to="
          '/dashboard/passenger-wagon-types/' +
          passengerWagonType.id +
          '/update'
        "
        >Промяна</b-button
      >
      <b-button
        variant="outline-danger"
        :to="
          '/dashboard/passenger-wagon-types/' +
          passengerWagonType.id +
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
    auth: { permission: 'passenger-wagon-type-view' },
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch(
        'passengerWagonTypes/fetchPassengerWagonTypeById',
        params.id
      )
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за тип пътнически вагони ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    passengerWagonType: (state) => state.passengerWagonTypes.passengerWagonType,
  }),
}
</script>
