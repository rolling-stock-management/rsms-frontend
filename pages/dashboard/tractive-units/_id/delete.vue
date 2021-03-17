<template>
  <div class="my-2">
    <h4>Изтриване на локомотив</h4>
    <hr />
    <b-card>
      <p>
        Наистина ли искате да изтриете локомотив
        {{ tractiveUnit.stylized_number }}? Това действие е необратимо.
      </p>
      <div class="d-flex justify-content-end">
        <b-button
          type="button"
          :to="'/dashboard/tractive-units/' + tractiveUnit.id"
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
    auth: { permission: 'tractive-unit-delete' },
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('tractiveUnits/fetchTractiveUnitById', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за локомотив ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    tractiveUnit: (state) => state.tractiveUnits.tractiveUnit,
  }),
  methods: {
    async handleDelete() {
      try {
        await this.$store.dispatch(
          'tractiveUnits/deleteTractiveUnit',
          this.tractiveUnit.id
        )
        this.$router.push('/dashboard/tractive-units')
      } catch (error) {
        error({
          statusCode: 503,
          message:
            'Неуспешно изтриване на локомотив ' +
            this.$route.params.id +
            '. Моля, опитайте по-късно.',
        })
      }
    },
  },
}
</script>
