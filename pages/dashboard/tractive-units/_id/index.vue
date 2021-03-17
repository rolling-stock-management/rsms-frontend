<template>
  <div class="my-2">
    <h4>Данни за локомотив</h4>
    <hr />
    <p><b>Номер: </b>{{ tractiveUnit.stylized_number }}</p>
    <p><b>Собственик: </b>{{ tractiveUnit.owner.data.name }}</p>
    <p><b>Статус: </b>{{ tractiveUnit.status.data.name }}</p>
    <p>
      <b>Макисмална скорост: </b
      >{{ tractiveUnit.max_speed ? tractiveUnit.max_speed : '-' }}
    </p>
    <p>
      <b>Номинална мощност: </b
      >{{ tractiveUnit.power_output ? tractiveUnit.power_output : '-' }}
    </p>
    <p>
      <b>Теглителна сила: </b
      >{{ tractiveUnit.tractive_effort ? tractiveUnit.tractive_effort : '-' }}
    </p>
    <p>
      <b>Служебна маса: </b
      >{{ tractiveUnit.weight ? tractiveUnit.weight : '-' }}
    </p>
    <p>
      <b>Колоосна формула: </b
      >{{ tractiveUnit.axle_arrangement ? tractiveUnit.axle_arrangement : '-' }}
    </p>
    <p><b>Дължина: </b>{{ tractiveUnit.length ? tractiveUnit.length : '-' }}</p>
    <p>
      <b>Спирачка: </b
      >{{ tractiveUnit.brake_marking ? tractiveUnit.brake_marking : '-' }}
    </p>
    <p>
      <b>Депо: </b>{{ tractiveUnit.depot ? tractiveUnit.depot.data.name : '-' }}
    </p>
    <p>
      <b>Дата на последен ремонт: </b
      >{{ tractiveUnit.repair_date ? tractiveUnit.repair_date : '-' }}
    </p>
    <p>
      <b>Дата на изтичане на ремонт: </b
      >{{
        tractiveUnit.repair_valid_until ? tractiveUnit.repair_valid_until : '-'
      }}
    </p>
    <p>
      <b>Работилница на последен ремонт: </b
      >{{
        tractiveUnit.repair_workshop
          ? tractiveUnit.repair_workshop.data.name
          : '-'
      }}
    </p>
    <p>
      <b>Допълнителна информация: </b
      >{{ tractiveUnit.other_info ? tractiveUnit.other_info : '-' }}
    </p>
    <p><b>Последна промяна: </b>{{ tractiveUnit.updated_at }}</p>
    <div class="d-block d-sm-flex justify-content-end">
      <b-button
        variant="outline-primary"
        to="/dashboard/tractive-units"
        class="mx-1 my-1 my-sm-0"
        >Списък локомотиви</b-button
      >
      <b-button
        variant="outline-success"
        to="/dashboard/tractive-units/create"
        class="mx-1 my-1 my-sm-0"
        >Добавяне на нов запис</b-button
      >
      <b-button
        variant="outline-warning"
        class="mx-1 my-1 my-sm-0"
        :to="'/dashboard/tractive-units/' + tractiveUnit.id + '/update'"
        >Промяна</b-button
      >
      <b-button
        variant="outline-danger"
        :to="'/dashboard/tractive-units/' + tractiveUnit.id + '/delete'"
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
    auth: { permission: 'tractive-unit-view' },
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('tractiveUnits/fetchTractiveUnitById', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за локомотив ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    tractiveUnit: (state) => state.tractiveUnits.tractiveUnit,
  }),
}
</script>
