<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h4>Списък на всички типове ремонти</h4>
      <div class="mb-2 mb-md-0">
        <b-button
          type="button"
          to="/dashboard/repair-types/create"
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
          <tr v-for="(repairType, id) in repairTypes" :key="id">
            <td>{{ repairType.data.id }}</td>
            <td>
              <nuxt-link
                :to="'/dashboard/repair-types/' + repairType.data.id"
                class="text-body"
                >{{ repairType.data.name }}</nuxt-link
              >
            </td>
            <td :id="'tooltip-target-' + repairType.data.id">
              {{
                repairType.data.description
                  ? repairType.data.description.length > 20
                    ? repairType.data.description.substr(0, 20).concat('...')
                    : repairType.data.description
                  : '-'
              }}
              <b-tooltip
                v-if="
                  repairType.data.description != null &&
                  repairType.data.description.length > 20
                "
                :target="'tooltip-target-' + repairType.data.id"
                triggers="hover"
              >
                {{ repairType.data.description }}
              </b-tooltip>
            </td>
            <td>{{ repairType.data.updated_at }}</td>
            <td>
              <div class="d-flex justify-content-end">
                <b-button
                  variant="outline-primary"
                  class="mx-1"
                  :to="
                    '/dashboard/repair-types/' + repairType.data.id + '/update'
                  "
                  >Промяна</b-button
                >
                <b-button
                  variant="outline-danger"
                  :to="
                    '/dashboard/repair-types/' + repairType.data.id + '/delete'
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
          v-if="repairTypesCount > 10"
          :link-gen="linkGen"
          :number-of-pages="pagination.totalPages"
          use-router
        ></b-pagination-nav>
      </div>
      <p>Общо записи: {{ repairTypesCount }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  middleware: 'hasPermission',
  meta: {
    auth: { permission: 'repair-type-viewAny' },
  },
  async fetch({ store, error, query }) {
    try {
      const page = query.page ? query.page : 1
      await store.dispatch('repairTypes/fetchRepairTypes', page)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за типове ремонти. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    repairTypes: (state) => state.repairTypes.repairTypes,
    repairTypesCount: (state) => state.repairTypes.repairTypesCount,
    pagination: (state) => state.repairTypes.pagination,
  }),
  watchQuery: ['page'],
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
  },
}
</script>
