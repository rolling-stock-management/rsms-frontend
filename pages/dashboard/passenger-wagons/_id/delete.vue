<template>
  <div class="my-2">
    <h4>Изтриване на пътнически вагон</h4>
    <hr />
    <b-card>
      <p>
        Наистина ли искате да изтриете пътнически вагон
        {{ passengerWagon.stylized_number }}? Това действие е необратимо.
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
    auth: { permission: 'passengerWagon-delete' },
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('passengerWagons/fetchPassengerWagonById', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за пътнически вагон ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    passengerWagon: (state) => state.passengerWagons.passengerWagon,
  }),
  methods: {
    async handleDelete() {
      try {
        await this.$store.dispatch(
          'passengerWagons/deletePassengerWagon',
          this.passengerWagon.id
        )
        this.$router.push('/dashboard/passengerWagons')
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
