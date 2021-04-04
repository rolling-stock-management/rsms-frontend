<template>
  <div class="my-2">
    <h4>Изтриване на тип товарни вагони</h4>
    <hr />
    <b-card>
      <p>
        Наистина ли искате да изтриете тип товарни вагони
        {{ freightWagonType.name }}? Това действие е необратимо.
      </p>
      <div class="d-flex justify-content-end">
        <b-button
          type="button"
          :to="'/dashboard/freight-wagon-types/' + freightWagonType.id"
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
    auth: { permission: 'freight-wagon-type-delete' },
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch(
        'freightWagonTypes/fetchFreightWagonTypeById',
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
    freightWagonType: (state) => state.freightWagonTypes.freightWagonType,
  }),
  methods: {
    async handleDelete() {
      try {
        await this.$store.dispatch(
          'freightWagonTypes/deleteFreightWagonType',
          this.freightWagonType.id
        )
        this.$router.push('/dashboard/freight-wagon-types')
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
