<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h4>Списък на всички сигнали за нередност</h4>
    </div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>E-mail</th>
            <th>Дата</th>
            <th>Влак</th>
            <th>Описание</th>
            <th>Вагон</th>
            <th>Снимка</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(passengerReport, id) in passengerReports" :key="id">
            <td>
              <nuxt-link
                :to="'/dashboard/passenger-reports/' + passengerReport.data.id"
                class="text-body"
                >{{ passengerReport.data.id }}</nuxt-link
              >
            </td>
            <td>
              <nuxt-link
                :to="'/dashboard/passenger-reports/' + passengerReport.data.id"
                class="text-body"
                >{{ passengerReport.data.email }}</nuxt-link
              >
            </td>
            <td>
              <nuxt-link
                :to="'/dashboard/passenger-reports/' + passengerReport.data.id"
                class="text-body"
                >{{ passengerReport.data.date }}</nuxt-link
              >
            </td>
            <td>
              <nuxt-link
                :to="'/dashboard/passenger-reports/' + passengerReport.data.id"
                class="text-body"
                >{{ passengerReport.data.train.data.number }}</nuxt-link
              >
            </td>
            <td :id="'tooltip-target-' + passengerReport.data.id">
              <nuxt-link
                :to="'/dashboard/passenger-reports/' + passengerReport.data.id"
                class="text-body"
              >
                {{
                  passengerReport.data.problem_description.length > 20
                    ? passengerReport.data.problem_description
                        .substr(0, 20)
                        .concat('...')
                    : passengerReport.data.problem_description
                }}
              </nuxt-link>
            </td>
            <td>
              {{
                passengerReport.data.wagon
                  ? passengerReport.data.wagon.data.stylized_number
                  : '-'
              }}
            </td>
            <td>
              {{ passengerReport.data.image_file_name ? 'Да' : 'Не' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="overflow-auto d-flex justify-content-between">
      <div>
        <b-pagination-nav
          v-if="passengerReportsCount > 10"
          :link-gen="linkGen"
          :number-of-pages="pagination.totalPages"
          use-router
        ></b-pagination-nav>
      </div>
      <p>Общо записи: {{ passengerReportsCount }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  middleware: 'hasPermission',
  meta: {
    auth: { permission: 'passenger-report-viewAny' },
  },
  async fetch({ store, error, query }) {
    try {
      const page = query.page ? query.page : 1
      await store.dispatch('passengerReports/fetchPassengerReports', page)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за сигнали за нередност. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    passengerReports: (state) => state.passengerReports.passengerReports,
    passengerReportsCount: (state) =>
      state.passengerReports.passengerReportsCount,
    pagination: (state) => state.passengerReports.pagination,
  }),
  watchQuery: ['page'],
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
  },
}
</script>
