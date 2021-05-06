<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h4>Списък на {{ titleType }} на влакове</h4>
      <div class="mb-2 mb-md-0">
        <b-button
          type="button"
          :to="
            '/dashboard/rolling-stock-trains/create?type=' +
            this.$route.query.type
          "
          variant="outline-success"
          >Добавяне</b-button
        >
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ПС</th>
            <th>Дата</th>
            <th>Влак</th>
            <th>Позиция</th>
            <th>Последна промяна</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(rollingStockTrain, id) in rollingStockTrains" :key="id">
            <td>
              <nuxt-link
                :to="
                  '/dashboard/rolling-stock-trains/' + rollingStockTrain.data.id
                "
                class="text-body"
                >{{ rollingStockTrain.data.trainable.number }}</nuxt-link
              >
            </td>
            <td>
              <nuxt-link
                :to="
                  '/dashboard/rolling-stock-trains/' + rollingStockTrain.data.id
                "
                class="text-body"
                >{{ rollingStockTrain.data.date }}</nuxt-link
              >
            </td>
            <td>{{ rollingStockTrain.data.train.number }}</td>
            <td>{{ rollingStockTrain.data.position }}</td>
            <td>{{ rollingStockTrain.data.updated_at }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="overflow-auto d-flex justify-content-between">
      <div>
        <b-pagination-nav
          v-if="rollingStockTrainsCount > 10"
          :link-gen="linkGen"
          :number-of-pages="pagination.totalPages"
          use-router
        ></b-pagination-nav>
      </div>
      <p>Общо записи: {{ rollingStockTrainsCount }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  middleware: 'hasPermission',
  meta: {
    auth: { permission: 'rolling-stock-train-viewAny' },
  },
  async fetch({ store, error, query }) {
    // eslint-disable-next-line eqeqeq
    if (typeof query.type != 'undefined') {
      try {
        const page = query.page ? query.page : 1
        await store.dispatch('rollingStockTrains/fetchRollingStockTrains', {
          page,
          type: query.type,
        })
      } catch (e) {
        error({
          statusCode: 503,
          message:
            'Неуспешно взимане на информацията за ПС на влакове. Моля, опитайте по-късно.',
        })
      }
    } else {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за ПС на влакове. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    rollingStockTrains: (state) => state.rollingStockTrains.rollingStockTrains,
    rollingStockTrainsCount: (state) =>
      state.rollingStockTrains.rollingStockTrainsCount,
    pagination: (state) => state.rollingStockTrains.pagination,
    titleType() {
      const type = this.$route.query.type
      switch (type) {
        case '1':
          return 'пътнически вагони'
        case '2':
          return 'товарни вагони'
        case '3':
          return 'локомотиви'
        default:
          return ''
      }
    },
  }),
  watchQuery: ['page', 'type'],
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
    // async applyFilters(filter) {
    //   const page = this.$route.query.page ?? 1
    //   await this.$store.dispatch(
    //     'rollingStockTrains/fetchRollingStockTrainsWithFilters',
    //     {
    //       page,
    //       filter,
    //       type: this.$route.query.type,
    //     }
    //   )
    // },
  },
}
</script>
