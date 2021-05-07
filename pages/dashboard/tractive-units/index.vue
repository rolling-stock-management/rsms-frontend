<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h4>
        Списък на всички локомотиви
        {{
          $route.query.repair_this_month ? 'с изтичаща тоци месец ревизия' : ''
        }}
      </h4>
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
    <TractiveUnitFilter
      :depots="depots"
      :statuses="statuses"
      :owners="owners"
      :repair-workshops="repairWorkshops"
      @applyFilters="applyFilters($event)"
    ></TractiveUnitFilter>
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
      <div>
        <b-pagination-nav
          v-if="tractiveUnitsCount > 10"
          :link-gen="linkGen"
          :number-of-pages="pagination.totalPages"
          use-router
        ></b-pagination-nav>
      </div>
      <p>Общо записи: {{ tractiveUnitsCount }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SearchField from '~/components/SearchField'
import TractiveUnitFilter from '~/components/TractiveUnitFilter'

export default {
  components: {
    SearchField,
    TractiveUnitFilter,
  },
  layout: 'dashboard',
  middleware: 'hasPermission',
  meta: {
    auth: { permission: 'tractive-unit-viewAny' },
  },
  async fetch({ store, error, query }) {
    try {
      const page = query.page ? query.page : 1
      let filter = '?repair_valid_until_this_month='
      filter += query.repair_this_month === '1' ? 1 : 0
      store.dispatch('depots/fetchDepotsNoPagination')
      store.dispatch('statuses/fetchStatusesNoPagination')
      store.dispatch('owners/fetchOwnersNoPagination')
      store.dispatch('repairWorkshops/fetchRepairWorkshopsNoPagination')
      await store.dispatch('tractiveUnits/fetchTractiveUnitsWithFilters', {
        page,
        filter,
      })
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
  watchQuery: ['page', 'repair_this_month'],
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
    async applyFilters(filter) {
      const page = this.$route.query.page ?? 1
      filter += '&repair_valid_until_this_month='
      filter += this.$route.query.repair_this_month === '1' ? 1 : 0
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
