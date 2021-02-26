<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h4>Списък на всички депа</h4>
      <div class="mb-2 mb-md-0">
        <b-button
          type="button"
          to="/dashboard/depots/create"
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
            <th>Бележка</th>
            <th>Последна Промяна</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(depot, id) in depots" :key="id">
            <td>{{ depot.data.id }}</td>
            <td>{{ depot.data.name }}</td>
            <td :id="'tooltip-target-' + depot.data.id">
              {{
                depot.data.note
                  ? depot.data.note.length > 20
                    ? depot.data.note.substr(0, 20).concat('...')
                    : depot.data.note
                  : '-'
              }}
              <b-tooltip
                v-if="depot.data.note.length > 20"
                :target="'tooltip-target-' + depot.data.id"
                triggers="hover"
              >
                {{ depot.data.note }}
              </b-tooltip>
            </td>
            <td>{{ depot.data.last_updated }}</td>
            <td>
              <div class="d-flex justify-content-end">
                <b-button variant="outline-primary" class="mx-1"
                  >Промяна</b-button
                >
                <b-button variant="outline-danger">Изтриване</b-button>
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
      <p>Общо записи: {{ depotsCount }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  async fetch({ store, error, query }) {
    try {
      const page = query.page ? query.page : 1
      await store.dispatch('depots/fetchDepots', page)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за депа. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    depots: (state) => state.depots.depots,
    depotsCount: (state) => state.depots.depotsCount,
    pagination: (state) => state.depots.pagination,
  }),
  watchQuery: ['page'],
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
  },
}
</script>
