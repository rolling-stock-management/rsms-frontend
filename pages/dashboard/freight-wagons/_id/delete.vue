<template>
  <div class="my-2">
    <h4>Изтриване на товарен вагон</h4>
    <hr />
    <b-card>
      <p>
        Наистина ли искате да изтриете товарен вагон
        {{ freightWagon.stylized_number }}? Това действие е необратимо.
      </p>
      <div class="d-flex justify-content-end">
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
    auth: { permission: 'freight-wagon-delete' },
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('freightWagons/fetchFreightWagonById', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за товарен вагон ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    freightWagon: (state) => state.freightWagons.freightWagon,
  }),
  methods: {
    async handleDelete() {
      try {
        await this.$store.dispatch(
          'freightWagons/deleteFreightWagon',
          this.freightWagon.id
        )
        this.$router.push('/dashboard/freight-wagons')
      } catch (error) {
        error({
          statusCode: 503,
          message:
            'Неуспешно изтриване на роля ' +
            this.$route.params.id +
            '. Моля, опитайте по-късно.',
        })
      }
    },
  },
}
</script>
