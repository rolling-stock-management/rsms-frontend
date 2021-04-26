<template>
  <div class="my-2">
    <h4>Изтриване на тип ремонт</h4>
    <hr />
    <b-card>
      <p>
        Наистина ли искате да изтриете тип ремонт
        {{ repairType.name }}? Това действие е необратимо.
      </p>
      <div class="d-flex justify-content-end">
        <b-button
          type="button"
          :to="'/dashboard/repair-types/' + repairType.id"
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
    auth: { permission: 'repair-type-delete' },
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('repairTypes/fetchRepairTypeById', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за тип ремонт ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    repairType: (state) => state.repairTypes.repairType,
  }),
  methods: {
    async handleDelete() {
      try {
        await this.$store.dispatch(
          'repairTypes/deleteRepairType',
          this.repairType.id
        )
        this.$router.push('/dashboard/repair-types')
      } catch (error) {
        error({
          statusCode: 503,
          message:
            'Неуспешно изтриване на тип ремонт ' +
            this.$route.params.id +
            '. Моля, опитайте по-късно.',
        })
      }
    },
  },
}
</script>
