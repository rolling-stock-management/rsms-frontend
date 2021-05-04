<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h4>Списък на всички собственици/превозвачи</h4>
      <div class="mb-2 mb-md-0">
        <b-button
          type="button"
          to="/dashboard/owners/create"
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
            <th>Бележка</th>
            <th>Последна Промяна</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(owner, id) in owners" :key="id">
            <td>{{ owner.data.id }}</td>
            <td>
              <nuxt-link
                :to="'/dashboard/owners/' + owner.data.id"
                class="text-body"
                >{{ owner.data.name }}</nuxt-link
              >
            </td>
            <td :id="'tooltip-target-' + owner.data.id">
              {{
                owner.data.note
                  ? owner.data.note.length > 20
                    ? owner.data.note.substr(0, 20).concat('...')
                    : owner.data.note
                  : '-'
              }}
              <b-tooltip
                v-if="owner.data.note != null && owner.data.note.length > 20"
                :target="'tooltip-target-' + owner.data.id"
                triggers="hover"
              >
                {{ owner.data.note }}
              </b-tooltip>
            </td>
            <td>{{ owner.data.updated_at }}</td>
            <td>
              <div class="d-flex justify-content-end">
                <b-button
                  variant="outline-primary"
                  class="mx-1"
                  :to="'/dashboard/owners/' + owner.data.id + '/update'"
                  >Промяна</b-button
                >
                <b-button
                  variant="outline-danger"
                  :to="'/dashboard/owners/' + owner.data.id + '/delete'"
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
          v-if="ownersCount > 10"
          :link-gen="linkGen"
          :number-of-pages="pagination.totalPages"
          use-router
        ></b-pagination-nav>
      </div>
      <p>Общо записи: {{ ownersCount }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  middleware: 'hasPermission',
  meta: {
    auth: { permission: 'owner-viewAny' },
  },
  async fetch({ store, error, query }) {
    try {
      const page = query.page ? query.page : 1
      await store.dispatch('owners/fetchOwners', page)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за собственици/превозвачи. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    owners: (state) => state.owners.owners,
    ownersCount: (state) => state.owners.ownersCount,
    pagination: (state) => state.owners.pagination,
  }),
  watchQuery: ['page'],
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
  },
}
</script>
