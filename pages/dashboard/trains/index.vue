<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h4>Списък на всички влакове</h4>
      <div class="mb-2 mb-md-0">
        <b-button
          type="button"
          to="/dashboard/trains/create"
          variant="outline-success"
          >Добавяне</b-button
        >
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Номер</th>
            <th>Маршрут</th>
            <th>ГДВ</th>
            <th>Бележка</th>
            <th>Последна Промяна</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(train, id) in trains" :key="id">
            <td>
              <nuxt-link
                :to="'/dashboard/trains/' + train.data.id"
                class="text-body"
                >{{ train.data.number }}</nuxt-link
              >
            </td>
            <td>
              <nuxt-link
                :to="'/dashboard/trains/' + train.data.id"
                class="text-body"
                >{{ train.data.route }}</nuxt-link
              >
            </td>
            <td>
              {{
                train.data.timetable.start_date.substr(
                  0,
                  train.data.timetable.start_date.indexOf('T')
                )
              }}
              -
              {{
                train.data.timetable.end_date.substr(
                  0,
                  train.data.timetable.end_date.indexOf('T')
                )
              }}
            </td>
            <td :id="'tooltip-target-' + train.data.id">
              {{
                train.data.note
                  ? train.data.note.length > 20
                    ? train.data.note.substr(0, 20).concat('...')
                    : train.data.note
                  : '-'
              }}
              <b-tooltip
                v-if="train.data.note != null && train.data.note.length > 20"
                :target="'tooltip-target-' + train.data.id"
                triggers="hover"
              >
                {{ train.data.note }}
              </b-tooltip>
            </td>
            <td>{{ train.data.updated_at }}</td>
            <td>
              <div class="d-flex justify-content-end">
                <b-button
                  variant="outline-primary"
                  class="mx-1"
                  :to="'/dashboard/trains/' + train.data.id + '/update'"
                  >Промяна</b-button
                >
                <b-button
                  variant="outline-danger"
                  :to="'/dashboard/trains/' + train.data.id + '/delete'"
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
          v-if="trainsCount > 10"
          :link-gen="linkGen"
          :number-of-pages="pagination.totalPages"
          use-router
        ></b-pagination-nav>
      </div>
      <p>Общо записи: {{ trainsCount }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  middleware: 'hasPermission',
  meta: {
    auth: { permission: 'train-viewAny' },
  },
  async fetch({ store, error, query }) {
    try {
      const page = query.page ? query.page : 1
      await store.dispatch('trains/fetchTrains', page)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за влакове. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    trains: (state) => state.trains.trains,
    trainsCount: (state) => state.trains.trainsCount,
    pagination: (state) => state.trains.pagination,
  }),
  watchQuery: ['page'],
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
  },
}
</script>
