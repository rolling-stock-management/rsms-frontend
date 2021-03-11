<template>
  <div class="my-2">
    <h4>Данни за пътнически вагон</h4>
    <hr />
    <p><b>Номер: </b>{{ passengerWagon.stylized_number }}</p>
    <p>
      <b>Означение: </b
      >{{ passengerWagon.letter_marking ? passengerWagon.letter_marking : '-' }}
    </p>
    <p><b>Собственик: </b>{{ passengerWagon.owner.data.name }}</p>
    <p><b>Статус: </b>{{ passengerWagon.status.data.name }}</p>
    <p><b>Тара: </b>{{ passengerWagon.tare ? passengerWagon.tare : '-' }}</p>
    <p>
      <b>Брутна маса: </b
      >{{ passengerWagon.total_weight ? passengerWagon.total_weight : '-' }}
    </p>
    <p>
      <b>Брой седящи места: </b
      >{{ passengerWagon.seats_count ? passengerWagon.seats_count : '-' }}
    </p>
    <p>
      <b>Макисмална скорост: </b
      >{{ passengerWagon.max_speed ? passengerWagon.max_speed : '-' }}
    </p>
    <p>
      <b>Дължина: </b>{{ passengerWagon.length ? passengerWagon.length : '-' }}
    </p>
    <p>
      <b>Спирачка: </b
      >{{ passengerWagon.brake_marking ? passengerWagon.brake_marking : '-' }}
    </p>
    <p>
      <b>Депо: </b
      >{{ passengerWagon.depot ? passengerWagon.depot.data.name : '-' }}
    </p>
    <p>
      <b>Дата на последен ремонт: </b
      >{{ passengerWagon.repair_date ? passengerWagon.repair_date : '-' }}
    </p>
    <p>
      <b>Дата на изтичане на ремонт: </b
      >{{
        passengerWagon.repair_valid_until
          ? passengerWagon.repair_valid_until
          : '-'
      }}
    </p>
    <p>
      <b>Работилница на последен ремонт: </b
      >{{
        passengerWagon.repair_workshop
          ? passengerWagon.repair_workshop.data.name
          : '-'
      }}
    </p>
    <p><b>Бележка: </b>{{ passengerWagon.note ? passengerWagon.note : '-' }}</p>
    <p><b>Последна промяна: </b>{{ passengerWagon.updated_at }}</p>
    <div class="d-block d-sm-flex justify-content-end">
      <b-button
        variant="outline-primary"
        to="/dashboard/passenger-wagons"
        class="mx-1 my-1 my-sm-0"
        >Списък пътнически вагони</b-button
      >
      <b-button
        variant="outline-success"
        to="/dashboard/passenger-wagons/create"
        class="mx-1 my-1 my-sm-0"
        >Добавяне на нов запис</b-button
      >
      <b-button
        variant="outline-warning"
        class="mx-1 my-1 my-sm-0"
        :to="'/dashboard/passenger-wagons/' + passengerWagon.id + '/update'"
        >Промяна</b-button
      >
      <b-button
        variant="outline-danger"
        :to="'/dashboard/passenger-wagons/' + passengerWagon.id + '/delete'"
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
    auth: { permission: 'passenger-wagon-view' },
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('passengerWagons/fetchPassengerWagonById', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за пътнически вагон ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    passengerWagon: (state) => state.passengerWagons.passengerWagon,
  }),
}
</script>
