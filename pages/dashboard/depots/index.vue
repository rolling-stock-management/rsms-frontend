<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h4>Списък на всички депа</h4>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <button type="button" class="btn btn-sm btn-outline-secondary">
            Share
          </button>
          <button type="button" class="btn btn-sm btn-outline-secondary">
            Export
          </button>
        </div>
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary dropdown-toggle"
        >
          <span data-feather="calendar"></span>
          This week
        </button>
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
          <tr v-for="(depot, id) in depots" :key="id">
            <td>{{ depot.data.id }}</td>
            <td>{{ depot.data.name }}</td>
            <td class="text-break">{{ depot.data.note }}</td>
            <td>{{ depot.data.last_updated }}</td>
            <td>
              <div class="d-flex justify-content-between">
                <b-button variant="outline-primary" class="mx-1"
                  >Промяна</b-button
                >
                <b-button variant="outline-danger">Изтриване</b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  async fetch({ store, error }) {
    try {
      await store.dispatch('depots/fetchDepots')
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за депа. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    depots: (state) => state.depots.depots.data,
  }),
}
</script>
