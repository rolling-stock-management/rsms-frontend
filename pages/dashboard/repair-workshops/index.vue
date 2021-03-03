<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h4>Списък на всички ремонтни работилници</h4>
      <div class="mb-2 mb-md-0">
        <b-button
          type="button"
          to="/dashboard/repair-workshops/create"
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
            <th>Абревиатура</th>
            <th>Бележка</th>
            <th>Последна Промяна</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(repairWorkshop, id) in repairWorkshops" :key="id">
            <td>{{ repairWorkshop.data.id }}</td>
            <td>
              <nuxt-link
                :to="'/dashboard/repair-workshops/' + repairWorkshop.data.id"
                class="text-body"
                >{{ repairWorkshop.data.name }}</nuxt-link
              >
            </td>
            <td>
              <nuxt-link
                :to="'/dashboard/repair-workshops/' + repairWorkshop.data.id"
                class="text-body"
                >{{ repairWorkshop.data.abbreviation }}</nuxt-link
              >
            </td>
            <td :id="'tooltip-target-' + repairWorkshop.data.id">
              {{
                repairWorkshop.data.note
                  ? repairWorkshop.data.note.length > 20
                    ? repairWorkshop.data.note.substr(0, 20).concat('...')
                    : repairWorkshop.data.note
                  : '-'
              }}
              <b-tooltip
                v-if="
                  repairWorkshop.data.note != null &&
                  repairWorkshop.data.note.length > 20
                "
                :target="'tooltip-target-' + repairWorkshop.data.id"
                triggers="hover"
              >
                {{ repairWorkshop.data.note }}
              </b-tooltip>
            </td>
            <td>{{ repairWorkshop.data.updated_at }}</td>
            <td>
              <div class="d-flex justify-content-end">
                <b-button
                  variant="outline-primary"
                  class="mx-1"
                  :to="
                    '/dashboard/repair-workshops/' +
                    repairWorkshop.data.id +
                    '/update'
                  "
                  >Промяна</b-button
                >
                <b-button
                  variant="outline-danger"
                  :to="
                    '/dashboard/repair-workshops/' +
                    repairWorkshop.data.id +
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
      <b-pagination-nav
        :link-gen="linkGen"
        :number-of-pages="pagination.totalPages"
        use-router
      ></b-pagination-nav>
      <p>Общо записи: {{ repairWorkshopsCount }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  middleware: 'hasPermission',
  meta: {
    auth: { permission: 'repair-workshop-viewAny' },
  },
  async fetch({ store, error, query }) {
    try {
      const page = query.page ? query.page : 1
      await store.dispatch('repairWorkshops/fetchRepairWorkshops', page)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за ремонтни работилници. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    repairWorkshops: (state) => state.repairWorkshops.repairWorkshops,
    repairWorkshopsCount: (state) => state.repairWorkshops.repairWorkshopsCount,
    pagination: (state) => state.repairWorkshops.pagination,
  }),
  watchQuery: ['page'],
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
  },
}
</script>
