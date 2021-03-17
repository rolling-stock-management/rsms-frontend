<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h4>Списък на всички локомотиви</h4>
      <SearchField
        mode="link"
        placeholder="Търсене на локомотив..."
        link="/dashboard/tractive-units/"
        route="/tractive-units-search"
      ></SearchField>
      <div class="mb-2 mb-md-0">
        <b-button
          type="button"
          to="/dashboard/tractive-units/create"
          variant="outline-success"
          >Добавяне</b-button
        >
      </div>
    </div>
    <!-- TODO: Add filtering -->
    <!-- <TractiveUnitFilter
      :depots="depots"
      :statuses="statuses"
      :owners="owners"
      :repair-workshops="repairWorkshops"
      @applyFilters="applyFilters($event)"
    ></TractiveUnitFilter> -->
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Номер</th>
            <th>Собственик</th>
            <th>Макисмална скорост</th>
            <th>Депо</th>
            <th>Статус</th>
            <th>Изтичане валидност на ремонт</th>
            <th>Последна промяна</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(tractiveUnit, id) in tractiveUnits" :key="id">
            <td>
              <nuxt-link
                :to="'/dashboard/tractive-units/' + tractiveUnit.data.id"
                class="text-body"
                >{{ tractiveUnit.data.stylized_number }}</nuxt-link
              >
            </td>
            <td>
              {{ tractiveUnit.data.owner.data.name }}
            </td>
            <td>
              {{
                tractiveUnit.data.max_speed ? tractiveUnit.data.max_speed : '-'
              }}
            </td>
            <td>
              {{
                tractiveUnit.data.depot
                  ? tractiveUnit.data.depot.data.name
                  : '-'
              }}
            </td>
            <td>
              {{ tractiveUnit.data.status.data.name }}
            </td>
            <td>
              {{
                tractiveUnit.data.repair_valid_until
                  ? tractiveUnit.data.repair_valid_until
                  : '-'
              }}
            </td>
            <td>{{ tractiveUnit.data.updated_at }}</td>
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
      <p>Общо записи: {{ tractiveUnitsCount }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SearchField from '~/components/SearchField'

export default {
  components: {
    SearchField,
  },
  layout: 'dashboard',
  middleware: 'hasPermission',
  meta: {
    auth: { permission: 'tractive-unit-viewAny' },
  },
  async fetch({ store, error, query }) {
    try {
      const page = query.page ? query.page : 1
      await store.dispatch('tractiveUnits/fetchTractiveUnits', page)
      await store.dispatch('depots/fetchDepotsNoPagination')
      await store.dispatch('statuses/fetchStatusesNoPagination')
      await store.dispatch('owners/fetchOwnersNoPagination')
      await store.dispatch('repairWorkshops/fetchRepairWorkshopsNoPagination')
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за локомотиви. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    tractiveUnits: (state) => state.tractiveUnits.tractiveUnits,
    tractiveUnitsCount: (state) => state.tractiveUnits.tractiveUnitsCount,
    pagination: (state) => state.tractiveUnits.pagination,
    depots: (state) => state.depots.depots,
    statuses: (state) => state.statuses.statuses,
    owners: (state) => state.owners.owners,
    repairWorkshops: (state) => state.repairWorkshops.repairWorkshops,
  }),
  watchQuery: ['page'],
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
    async applyFilters(filter) {
      const page = this.$route.query.page ?? 1
      await this.$store.dispatch(
        'tractiveUnits/fetchTractiveUnitsWithFilters',
        {
          page,
          filter,
        }
      )
    },
  },
}
</script>
