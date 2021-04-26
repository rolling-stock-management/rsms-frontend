<template>
  <div class="my-2">
    <h4>Изтриване на статус</h4>
    <hr />
    <b-card>
      <p>
        Наистина ли искате да изтриете статус
        {{ status.name }}? Това действие е необратимо.
      </p>
      <div class="d-flex justify-content-end">
        <b-button
          type="button"
          :to="'/dashboard/statuses/' + status.id"
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
    auth: { permission: 'status-delete' },
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('statuses/fetchStatusById', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за статус ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    status: (state) => state.statuses.status,
  }),
  methods: {
    async handleDelete() {
      try {
        await this.$store.dispatch('statuses/deleteStatus', this.status.id)
        this.$router.push('/dashboard/statuses')
      } catch (error) {
        error({
          statusCode: 503,
          message:
            'Неуспешно изтриване на статус ' +
            this.$route.params.id +
            '. Моля, опитайте по-късно.',
        })
      }
    },
  },
}
</script>
