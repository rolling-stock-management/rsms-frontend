<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h4>Списък на всички серии пътнически вагони</h4>
      <div class="mb-2 mb-md-0">
        <b-button
          type="button"
          to="/dashboard/passenger-wagon-types/create"
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
            <th>Означение</th>
            <th>Тип интериор</th>
            <th>Описание</th>
            <th>Последна Промяна</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(passengerWagonType, id) in passengerWagonTypes" :key="id">
            <td>{{ passengerWagonType.data.id }}</td>
            <td>
              <nuxt-link
                :to="
                  '/dashboard/passenger-wagon-types/' +
                  passengerWagonType.data.id
                "
                class="text-body"
                >{{ passengerWagonType.data.name }}</nuxt-link
              >
            </td>
            <td>{{ passengerWagonType.data.interior_type.data.name }}</td>
            <td :id="'tooltip-target-' + passengerWagonType.data.id">
              {{
                passengerWagonType.data.description
                  ? passengerWagonType.data.description.length > 20
                    ? passengerWagonType.data.description
                        .substr(0, 20)
                        .concat('...')
                    : passengerWagonType.data.description
                  : '-'
              }}
              <b-tooltip
                v-if="
                  passengerWagonType.data.description != null &&
                  passengerWagonType.data.description.length > 20
                "
                :target="'tooltip-target-' + passengerWagonType.data.id"
                triggers="hover"
              >
                {{ passengerWagonType.data.description }}
              </b-tooltip>
            </td>
            <td>{{ passengerWagonType.data.updated_at }}</td>
            <td>
              <div class="d-flex justify-content-end">
                <b-button
                  variant="outline-primary"
                  class="mx-1"
                  :to="
                    '/dashboard/passenger-wagon-types/' +
                    passengerWagonType.data.id +
                    '/update'
                  "
                  >Промяна</b-button
                >
                <b-button
                  variant="outline-danger"
                  :to="
                    '/dashboard/passenger-wagon-types/' +
                    passengerWagonType.data.id +
                    '/delete'
                  "
                  >Изтриване</b-button
                >
              </div>
            </td>
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
      <p>Общо записи: {{ passengerWagonTypesCount }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  middleware: 'hasPermission',
  meta: {
    auth: { permission: 'passenger-wagon-type-viewAny' },
  },
  async fetch({ store, error, query }) {
    try {
      const page = query.page ? query.page : 1
      await store.dispatch('passengerWagonTypes/fetchPassengerWagonTypes', page)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за серии пътнически вагони. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    passengerWagonTypes: (state) =>
      state.passengerWagonTypes.passengerWagonTypes,
    passengerWagonTypesCount: (state) =>
      state.passengerWagonTypes.passengerWagonTypesCount,
    pagination: (state) => state.passengerWagonTypes.pagination,
  }),
  watchQuery: ['page'],
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
  },
}
</script>
