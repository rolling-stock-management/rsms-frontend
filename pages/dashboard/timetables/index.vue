<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h4>Списък на всички графици за движение на влаковете</h4>
      <div class="mb-2 mb-md-0">
        <b-button
          type="button"
          to="/dashboard/timetables/create"
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
            <th>Дата от</th>
            <th>Дата до</th>
            <th>Последна Промяна</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(timetable, id) in timetables" :key="id">
            <td>
              <nuxt-link
                :to="'/dashboard/timetables/' + timetable.data.id"
                class="text-body"
                >{{ timetable.data.id }}</nuxt-link
              >
            </td>
            <td>
              <nuxt-link
                :to="'/dashboard/timetables/' + timetable.data.id"
                class="text-body"
                >{{ timetable.data.start_date }}</nuxt-link
              >
            </td>
            <td>
              <nuxt-link
                :to="'/dashboard/timetables/' + timetable.data.id"
                class="text-body"
                >{{ timetable.data.end_date }}</nuxt-link
              >
            </td>
            <td>{{ timetable.data.updated_at }}</td>
            <td>
              <div class="d-flex justify-content-end">
                <b-button
                  variant="outline-primary"
                  class="mx-1"
                  :to="'/dashboard/timetables/' + timetable.data.id + '/update'"
                  >Промяна</b-button
                >
                <b-button
                  variant="outline-danger"
                  :to="'/dashboard/timetables/' + timetable.data.id + '/delete'"
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
          v-if="timetablesCount > 10"
          :link-gen="linkGen"
          :number-of-pages="pagination.totalPages"
          use-router
        ></b-pagination-nav>
      </div>
      <p>Общо записи: {{ timetablesCount }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  middleware: 'hasPermission',
  meta: {
    auth: { permission: 'timetable-viewAny' },
  },
  async fetch({ store, error, query }) {
    try {
      const page = query.page ? query.page : 1
      await store.dispatch('timetables/fetchTimetables', page)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за ГДВ. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    timetables: (state) => state.timetables.timetables,
    timetablesCount: (state) => state.timetables.timetablesCount,
    pagination: (state) => state.timetables.pagination,
  }),
  watchQuery: ['page'],
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
  },
}
</script>
