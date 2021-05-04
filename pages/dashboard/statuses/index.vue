<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h4>Списък на всички статуси</h4>
      <div class="mb-2 mb-md-0">
        <b-button
          type="button"
          to="/dashboard/statuses/create"
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
            <th>Последна Промяна</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(status, id) in statuses" :key="id">
            <td>{{ status.data.id }}</td>
            <td>
              <nuxt-link
                :to="'/dashboard/statuses/' + status.data.id"
                class="text-body"
                >{{ status.data.name }}</nuxt-link
              >
            </td>
            <td>{{ status.data.updated_at }}</td>
            <td>
              <div class="d-flex justify-content-end">
                <b-button
                  variant="outline-primary"
                  class="mx-1"
                  :to="'/dashboard/statuses/' + status.data.id + '/update'"
                  >Промяна</b-button
                >
                <b-button
                  variant="outline-danger"
                  :to="'/dashboard/statuses/' + status.data.id + '/delete'"
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
          v-if="statusesCount > 10"
          :link-gen="linkGen"
          :number-of-pages="pagination.totalPages"
          use-router
        ></b-pagination-nav>
      </div>
      <p>Общо записи: {{ statusesCount }}</p>
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
      await store.dispatch('statuses/fetchStatuses', page)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за статуси. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    statuses: (state) => state.statuses.statuses,
    statusesCount: (state) => state.statuses.statusesCount,
    pagination: (state) => state.statuses.pagination,
  }),
  watchQuery: ['page'],
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
  },
}
</script>
