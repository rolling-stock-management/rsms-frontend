<template>
  <div class="my-2">
    <h4>Данни за товарен вагон</h4>
    <hr />
    <p><b>Номер: </b>{{ freightWagon.stylized_number }}</p>
    <p>
      <b>Означение: </b
      >{{ freightWagon.letter_marking ? freightWagon.letter_marking : '-' }}
    </p>
    <p><b>Тип: </b>{{ freightWagon.type.data.name }}</p>
    <p><b>Собственик: </b>{{ freightWagon.owner.data.name }}</p>
    <p><b>Статус: </b>{{ freightWagon.status.data.name }}</p>
    <p><b>Тара: </b>{{ freightWagon.tare ? freightWagon.tare : '-' }}</p>
    <p>
      <b>Товароносимост: </b
      >{{ freightWagon.weight_capacity ? freightWagon.weight_capacity : '-' }}
    </p>
    <p>
      <b>Полезна дължина: </b
      >{{ freightWagon.length_capacity ? freightWagon.length_capacity : '-' }}
    </p>
    <p>
      <b>Полезен обем: </b
      >{{ freightWagon.volume_capacity ? freightWagon.volume_capacity : '-' }}
    </p>
    <p>
      <b>Полезна площ: </b
      >{{ freightWagon.area_capacity ? freightWagon.area_capacity : '-' }}
    </p>
    <p>
      <b>Макисмална скорост: </b
      >{{ freightWagon.max_speed ? freightWagon.max_speed : '-' }}
    </p>
    <p><b>Дължина: </b>{{ freightWagon.length ? freightWagon.length : '-' }}</p>
    <p>
      <b>Спирачка: </b
      >{{ freightWagon.brake_marking ? freightWagon.brake_marking : '-' }}
    </p>
    <p>
      <b>Депо: </b>{{ freightWagon.depot ? freightWagon.depot.data.name : '-' }}
    </p>
    <p>
      <b>Дата на последен ремонт: </b
      >{{ freightWagon.repair_date ? freightWagon.repair_date : '-' }}
    </p>
    <p>
      <b>Дата на изтичане на ремонт: </b
      >{{
        freightWagon.repair_valid_until ? freightWagon.repair_valid_until : '-'
      }}
    </p>
    <p>
      <b>Работилница на последен ремонт: </b
      >{{
        freightWagon.repair_workshop
          ? freightWagon.repair_workshop.data.name
          : '-'
      }}
    </p>
    <p>
      <b>Бележка: </b
      >{{ freightWagon.other_info ? freightWagon.other_info : '-' }}
    </p>
    <p><b>Последна промяна: </b>{{ freightWagon.updated_at }}</p>
    <div class="d-block d-sm-flex justify-content-end">
      <b-button
        variant="outline-primary"
        to="/dashboard/freight-wagons"
        class="mx-1 my-1 my-sm-0"
        >Списък товарен вагони</b-button
      >
      <b-button
        variant="outline-success"
        to="/dashboard/freight-wagons/create"
        class="mx-1 my-1 my-sm-0"
        >Добавяне на нов запис</b-button
      >
      <b-button
        variant="outline-warning"
        class="mx-1 my-1 my-sm-0"
        :to="'/dashboard/freight-wagons/' + freightWagon.id + '/update'"
        >Промяна</b-button
      >
      <b-button
        variant="outline-danger"
        :to="'/dashboard/freight-wagons/' + freightWagon.id + '/delete'"
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
    auth: { permission: 'freight-wagon-view' },
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('freightWagons/fetchFreightWagonById', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за товарен вагон ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    freightWagon: (state) => state.freightWagons.freightWagon,
  }),
}
</script>
