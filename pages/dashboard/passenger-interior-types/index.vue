<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h4>Списък на всички типове интериори на пътнически вагони</h4>
      <div class="mb-2 mb-md-0">
        <b-button
          type="button"
          to="/dashboard/passenger-interior-types/create"
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
            <th>Име</th>
            <th>Описание</th>
            <th>Последна Промяна</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(passengerInteriorType, id) in passengerInteriorTypes"
            :key="id"
          >
            <td>{{ passengerInteriorType.data.id }}</td>
            <td>
              <nuxt-link
                :to="
                  '/dashboard/passenger-interior-types/' +
                  passengerInteriorType.data.id
                "
                class="text-body"
                >{{ passengerInteriorType.data.name }}</nuxt-link
              >
            </td>
            <td :id="'tooltip-target-' + passengerInteriorType.data.id">
              {{
                passengerInteriorType.data.description
                  ? passengerInteriorType.data.description.length > 20
                    ? passengerInteriorType.data.description
                        .substr(0, 20)
                        .concat('...')
                    : passengerInteriorType.data.description
                  : '-'
              }}
              <b-tooltip
                v-if="
                  passengerInteriorType.data.description != null &&
                  passengerInteriorType.data.description.length > 20
                "
                :target="'tooltip-target-' + passengerInteriorType.data.id"
                triggers="hover"
              >
                {{ passengerInteriorType.data.description }}
              </b-tooltip>
            </td>
            <td>{{ passengerInteriorType.data.updated_at }}</td>
            <td>
              <div class="d-flex justify-content-end">
                <b-button
                  variant="outline-primary"
                  class="mx-1"
                  :to="
                    '/dashboard/passenger-interior-types/' +
                    passengerInteriorType.data.id +
                    '/update'
                  "
                  >Промяна</b-button
                >
                <b-button
                  variant="outline-danger"
                  :to="
                    '/dashboard/passenger-interior-types/' +
                    passengerInteriorType.data.id +
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
      <div>
        <b-pagination-nav
          v-if="passengerInteriorTypesCount > 10"
          :link-gen="linkGen"
          :number-of-pages="pagination.totalPages"
          use-router
        ></b-pagination-nav>
      </div>
      <p>Общо записи: {{ passengerInteriorTypesCount }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  middleware: 'hasPermission',
  meta: {
    auth: { permission: 'passenger-interior-type-viewAny' },
  },
  async fetch({ store, error, query }) {
    try {
      const page = query.page ? query.page : 1
      await store.dispatch(
        'passengerInteriorTypes/fetchPassengerInteriorTypes',
        page
      )
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за типове интериори на пътнически вагони. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    passengerInteriorTypes: (state) =>
      state.passengerInteriorTypes.passengerInteriorTypes,
    passengerInteriorTypesCount: (state) =>
      state.passengerInteriorTypes.passengerInteriorTypesCount,
    pagination: (state) => state.passengerInteriorTypes.pagination,
  }),
  watchQuery: ['page'],
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
  },
}
</script>
