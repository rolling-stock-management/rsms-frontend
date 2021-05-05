<template>
  <div class="my-2">
    <h4>Изтриване на влак</h4>
    <hr />
    <b-card>
      <p>
        Наистина ли искате да изтриете влак
        {{ train.number }}? Това действие е необратимо.
      </p>
      <div class="d-flex justify-content-end">
        <b-button
          type="button"
          :to="'/dashboard/trains/' + train.id"
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
    auth: { permission: 'train-delete' },
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('trains/fetchTrainById', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за влак ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    train: (state) => state.trains.train,
  }),
  methods: {
    async handleDelete() {
      try {
        await this.$store.dispatch('trains/deleteTrain', this.train.id)
        this.$router.push('/dashboard/trains')
      } catch (error) {
        error({
          statusCode: 503,
          message:
            'Неуспешно изтриване на влак ' +
            this.$route.params.id +
            '. Моля, опитайте по-късно.',
        })
      }
    },
  },
}
</script>
