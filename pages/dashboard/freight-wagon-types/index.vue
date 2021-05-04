<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h4>Списък на всички серии товарни вагони</h4>
      <div class="mb-2 mb-md-0">
        <b-button
          type="button"
          to="/dashboard/freight-wagon-types/create"
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
            <th>Описание</th>
            <th>Последна Промяна</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(freightWagonType, id) in freightWagonTypes" :key="id">
            <td>{{ freightWagonType.data.id }}</td>
            <td>
              <nuxt-link
                :to="
                  '/dashboard/freight-wagon-types/' + freightWagonType.data.id
                "
                class="text-body"
                >{{ freightWagonType.data.name }}</nuxt-link
              >
            </td>
            <td :id="'tooltip-target-' + freightWagonType.data.id">
              {{
                freightWagonType.data.description
                  ? freightWagonType.data.description.length > 20
                    ? freightWagonType.data.description
                        .substr(0, 20)
                        .concat('...')
                    : freightWagonType.data.description
                  : '-'
              }}
              <b-tooltip
                v-if="
                  freightWagonType.data.description != null &&
                  freightWagonType.data.description.length > 20
                "
                :target="'tooltip-target-' + freightWagonType.data.id"
                triggers="hover"
              >
                {{ freightWagonType.data.description }}
              </b-tooltip>
            </td>
            <td>{{ freightWagonType.data.updated_at }}</td>
            <td>
              <div class="d-flex justify-content-end">
                <b-button
                  variant="outline-primary"
                  class="mx-1"
                  :to="
                    '/dashboard/freight-wagon-types/' +
                    freightWagonType.data.id +
                    '/update'
                  "
                  >Промяна</b-button
                >
                <b-button
                  variant="outline-danger"
                  :to="
                    '/dashboard/freight-wagon-types/' +
                    freightWagonType.data.id +
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
          v-if="freightWagonTypesCount > 10"
          :link-gen="linkGen"
          :number-of-pages="pagination.totalPages"
          use-router
        ></b-pagination-nav>
      </div>
      <p>Общо записи: {{ freightWagonTypesCount }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  middleware: 'hasPermission',
  meta: {
    auth: { permission: 'freight-wagon-type-viewAny' },
  },
  async fetch({ store, error, query }) {
    try {
      const page = query.page ? query.page : 1
      await store.dispatch('freightWagonTypes/fetchFreightWagonTypes', page)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за серии товарни вагони. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    freightWagonTypes: (state) => state.freightWagonTypes.freightWagonTypes,
    freightWagonTypesCount: (state) =>
      state.freightWagonTypes.freightWagonTypesCount,
    pagination: (state) => state.freightWagonTypes.pagination,
  }),
  watchQuery: ['page'],
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
  },
}
</script>
