<template>
  <div class="my-2">
    <h4>Изтриване на тип интериор</h4>
    <hr />
    <b-card>
      <p>
        Наистина ли искате да изтриете тип интериор
        {{ passengerInteriorType.name }}? Това действие е необратимо.
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
    auth: { permission: 'passenger-interior-type-delete' },
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch(
        'passengerInteriorTypes/fetchPassengerInteriorTypeById',
        params.id
      )
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за тип интериор ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    passengerInteriorType: (state) =>
      state.passengerInteriorTypes.passengerInteriorType,
  }),
  methods: {
    async handleDelete() {
      try {
        await this.$store.dispatch(
          'passengerInteriorTypes/deletePassengerInteriorType',
          this.passengerInteriorType.id
        )
        this.$router.push('/dashboard/passenger-interior-types')
      } catch (error) {
        error({
          statusCode: 503,
          message:
            'Неуспешно изтриване на тип интериор ' +
            this.$route.params.id +
            '. Моля, опитайте по-късно.',
        })
      }
    },
  },
}
</script>
