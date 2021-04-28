<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h4>Списък на всички ремонти на {{ titleType }}</h4>
      <div class="mb-2 mb-md-0">
        <b-button
          type="button"
          :to="'/dashboard/repairs/create?type=' + this.$route.query.type"
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
            <th>Кратко описание</th>
            <th>Тип</th>
            <th>Работилница</th>
            <th>Дата от</th>
            <th>Дата до</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(repair, id) in repairs" :key="id">
            <td>
              <nuxt-link
                :to="'/dashboard/repairs/' + repair.data.id"
                class="text-body"
                >{{ repair.data.id }}</nuxt-link
              >
            </td>
            <td>
              <nuxt-link
                :to="'/dashboard/repairs/' + repair.data.id"
                class="text-body"
                >{{ repair.data.short_description }}</nuxt-link
              >
            </td>
            <td>{{ repair.data.type.name }}</td>
            <td>{{ repair.data.workshop.name }}</td>
            <td>{{ repair.data.start_date }}</td>
            <td>{{ repair.data.end_date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="overflow-auto d-flex justify-content-between">
      <div>
        <b-pagination-nav
          v-if="repairsCount > 10"
          :link-gen="linkGen"
          :number-of-pages="pagination.totalPages"
          use-router
        ></b-pagination-nav>
      </div>
      <p>Общо записи: {{ repairsCount }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  middleware: 'hasPermission',
  meta: {
    auth: { permission: 'repair-viewAny' },
  },
  async fetch({ store, error, query }) {
    // eslint-disable-next-line eqeqeq
    if (typeof query.type != 'undefined') {
      try {
        const page = query.page ? query.page : 1
        await store.dispatch('repairs/fetchRepairs', { page, type: query.type })
      } catch (e) {
        error({
          statusCode: 503,
          message:
            'Неуспешно взимане на информацията за ремонти. Моля, опитайте по-късно.',
        })
      }
    } else {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за ремонти. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    repairs: (state) => state.repairs.repairs,
    repairsCount: (state) => state.repairs.repairsCount,
    pagination: (state) => state.repairs.pagination,
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
  watchQuery: ['page'],
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
  },
}
</script>
