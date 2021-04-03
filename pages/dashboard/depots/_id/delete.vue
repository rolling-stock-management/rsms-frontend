<template>
  <div class="my-2">
    <h4>Изтриване на депо</h4>
    <hr />
    <b-card header="Влизане">
      <p>
        Наистина ли искате да изтриете депо {{ depot.name }}? Това действие е
        необратимо.
      </p>
      <div class="d-flex justify-content-end">
        <b-button
          type="button"
          :to="'/dashboard/depots/' + depot.id"
          variant="outline-success"
          class="mx-1"
          >Отказ</b-button
        >
        <b-button variant="outline-danger" @click="handleDelete"
          >Изтриване</b-button
        >
      </div>
    </b-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  middleware: 'hasPermission',
  meta: {
    auth: { permission: 'depot-delete' },
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('depots/fetchDepotById', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за депо ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    depot: (state) => state.depots.depot,
  }),
  methods: {
    async handleDelete() {
      try {
        await this.$store.dispatch('depots/deleteDepot', this.depot.id)
        this.$router.push(
          '/dashboard/depots?page=' +
            this.$store.state.depots.pagination.currentPage
        )
      } catch (error) {
        error({
          statusCode: 503,
          message:
            'Неуспешно изтриване на депо ' +
            this.$route.params.id +
            '. Моля, опитайте по-късно.',
        })
      }
    },
  },
}
</script>
