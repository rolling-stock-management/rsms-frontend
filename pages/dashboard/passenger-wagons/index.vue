<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h4>Списък на всички пътнически вагони</h4>
      <div class="mb-2 mb-md-0">
        <b-button
          type="button"
          to="/dashboard/passenger-wagons/create"
          variant="outline-success"
          >Добавяне</b-button
        >
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Номер</th>
            <th>Означение</th>
            <th>Собственик</th>
            <th>Депо</th>
            <th>Статус</th>
            <th>Последна промяна</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(passengerWagon, id) in passengerWagons" :key="id">
            <td>{{ passengerWagon.data.id }}</td>
            <td>
              <nuxt-link
                :to="'/dashboard/passenger-wagons/' + passengerWagon.data.id"
                class="text-body"
                >{{ passengerWagon.data.stylized_number }}</nuxt-link
              >
            </td>
            <td>
              {{
                passengerWagon.data.letter_marking
                  ? passengerWagon.data.letter_marking
                  : '-'
              }}
            </td>
            <td>
              {{ passengerWagon.data.owner.data.name }}
            </td>
            <td>
              {{
                passengerWagon.data.depot
                  ? passengerWagon.data.depot.data.name
                  : '-'
              }}
            </td>
            <td>
              {{ passengerWagon.data.status.data.name }}
            </td>
            <td>{{ passengerWagon.data.updated_at }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="overflow-auto d-flex justify-content-between">
      <b-pagination-nav
        :link-gen="linkGen"
        :number-of-pages="pagination.totalPages"
        use-router
      ></b-pagination-nav>
      <p>Общо записи: {{ passengerWagonsCount }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  middleware: 'hasPermission',
  meta: {
    auth: { permission: 'passenger-wagon-viewAny' },
  },
  async fetch({ store, error, query }) {
    try {
      const page = query.page ? query.page : 1
      await store.dispatch('passengerWagons/fetchPassengerWagons', page)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за пътнически вагони. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    passengerWagons: (state) => state.passengerWagons.passengerWagons,
    passengerWagonsCount: (state) => state.passengerWagons.passengerWagonsCount,
    pagination: (state) => state.passengerWagons.pagination,
  }),
  watchQuery: ['page'],
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
  },
}
</script>
