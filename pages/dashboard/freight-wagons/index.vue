<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h4>
        Списък на всички товарни вагони
        {{
          $route.query.repair_this_month ? 'с изтичаща този месец ревизия' : ''
        }}
      </h4>
      <SearchField
        mode="link"
        placeholder="Търсене на вагон..."
        link="/dashboard/freight-wagons/"
        route="/freight-wagons-search"
      ></SearchField>
      <div class="mb-2 mb-md-0">
        <b-button
          type="button"
          to="/dashboard/freight-wagons/create"
          variant="outline-success"
          >Добавяне</b-button
        >
      </div>
    </div>
    <WagonFilter
      :depots="depots"
      :statuses="statuses"
      :owners="owners"
      :repair-workshops="repairWorkshops"
      :wagon-types="wagonTypes"
      @applyFilters="applyFilters($event)"
    ></WagonFilter>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Номер</th>
            <th>Означение</th>
            <th>Собственик</th>
            <th>Депо</th>
            <th>Статус</th>
            <th>Изтичане валидност на ремонт</th>
            <th>Последна промяна</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(freightWagon, id) in freightWagons" :key="id">
            <td>
              <nuxt-link
                :to="'/dashboard/freight-wagons/' + freightWagon.data.id"
                class="text-body"
                >{{ freightWagon.data.stylized_number }}</nuxt-link
              >
            </td>
            <td>
              {{
                freightWagon.data.letter_marking
                  ? freightWagon.data.letter_marking
                  : '-'
              }}
            </td>
            <td>
              {{ freightWagon.data.owner.data.name }}
            </td>
            <td>
              {{
                freightWagon.data.depot
                  ? freightWagon.data.depot.data.name
                  : '-'
              }}
            </td>
            <td>
              {{ freightWagon.data.status.data.name }}
            </td>
            <td>
              {{
                freightWagon.data.repair_valid_until
                  ? freightWagon.data.repair_valid_until
                  : '-'
              }}
            </td>
            <td>{{ freightWagon.data.updated_at }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="overflow-auto d-flex justify-content-between">
      <div>
        <b-pagination-nav
          v-if="freightWagonsCount > 10"
          :link-gen="linkGen"
          :number-of-pages="pagination.totalPages"
          use-router
        ></b-pagination-nav>
      </div>
      <p>Общо записи: {{ freightWagonsCount }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SearchField from '~/components/SearchField'
import WagonFilter from '~/components/WagonFilter'

export default {
  components: {
    SearchField,
    WagonFilter,
  },
  layout: 'dashboard',
  middleware: 'hasPermission',
  meta: {
    auth: { permission: 'freight-wagon-viewAny' },
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
      store.dispatch('freightWagonTypes/fetchFreightWagonTypesNoPagination')
      await store.dispatch('freightWagons/fetchFreightWagonsWithFilters', {
        page,
        filter,
      })
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за товарни вагони. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    freightWagons: (state) => state.freightWagons.freightWagons,
    freightWagonsCount: (state) => state.freightWagons.freightWagonsCount,
    pagination: (state) => state.freightWagons.pagination,
    depots: (state) => state.depots.depots,
    statuses: (state) => state.statuses.statuses,
    owners: (state) => state.owners.owners,
    repairWorkshops: (state) => state.repairWorkshops.repairWorkshops,
    wagonTypes: (state) => state.freightWagonTypes.freightWagonTypes,
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
        'freightWagons/fetchFreightWagonsWithFilters',
        {
          page,
          filter,
        }
      )
    },
  },
}
</script>
