<template>
  <div class="my-2">
    <h4>Изтриване на тип пътнически вагони</h4>
    <hr />
    <b-card>
      <p>
        Наистина ли искате да изтриете тип пътнически вагони
        {{ passengerWagonType.name }}? Това действие е необратимо.
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
    auth: { permission: 'passenger-wagon-type-delete' },
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch(
        'passengerWagonTypes/fetchPassengerWagonTypeById',
        params.id
      )
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за тип вагони ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    passengerWagonType: (state) => state.passengerWagonTypes.passengerWagonType,
  }),
  methods: {
    async handleDelete() {
      try {
        await this.$store.dispatch(
          'passengerWagonTypes/deletePassengerWagonType',
          this.passengerWagonType.id
        )
        this.$router.push('/dashboard/passenger-wagon-types')
      } catch (error) {
        error({
          statusCode: 503,
          message:
            'Неуспешно изтриване на тип вагони ' +
            this.$route.params.id +
            '. Моля, опитайте по-късно.',
        })
      }
    },
  },
}
</script>
