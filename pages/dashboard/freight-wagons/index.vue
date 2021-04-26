<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h4>Списък на всички товарни вагони</h4>
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
    <PassengerWagonFilter
      :depots="depots"
      :statuses="statuses"
      :owners="owners"
      :repair-workshops="repairWorkshops"
      :wagon-types="wagonTypes"
      @applyFilters="applyFilters($event)"
    ></PassengerWagonFilter>
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
      <b-pagination-nav
        :link-gen="linkGen"
        :number-of-pages="pagination.totalPages"
        use-router
      ></b-pagination-nav>
      <p>Общо записи: {{ freightWagonsCount }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SearchField from '~/components/SearchField'
import PassengerWagonFilter from '~/components/PassengerWagonFilter'

export default {
  components: {
    SearchField,
    PassengerWagonFilter,
  },
  layout: 'dashboard',
  middleware: 'hasPermission',
  meta: {
    auth: { permission: 'freight-wagon-viewAny' },
  },
  async fetch({ store, error, query }) {
    try {
      const page = query.page ? query.page : 1
      store.dispatch('depots/fetchDepotsNoPagination')
      store.dispatch('statuses/fetchStatusesNoPagination')
      store.dispatch('owners/fetchOwnersNoPagination')
      store.dispatch('repairWorkshops/fetchRepairWorkshopsNoPagination')
      store.dispatch('freightWagonTypes/fetchFreightWagonTypesNoPagination')
      await store.dispatch('freightWagons/fetchFreightWagons', page)
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
  watchQuery: ['page'],
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
    async applyFilters(filter) {
      const page = this.$route.query.page ?? 1
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
