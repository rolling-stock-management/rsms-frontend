<template>
  <div class="my-2">
    <h4>Изтриване на ремонт</h4>
    <hr />
    <b-card header="Влизане">
      <p>
        Наистина ли искате да изтриете {{ repair.type.name }} за
        {{ repair.repairable.number }} в/във {{ repair.workshop.name }} от
        {{ repair.start_date }} до {{ repair.end_date }}? Това действие е
        необратимо.
      </p>
      <div class="d-flex justify-content-end">
        <b-button
          type="button"
          :to="'/dashboard/repairs/' + repair.id"
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
    auth: { permission: 'repair-delete' },
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('repairs/fetchRepairById', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за ремонт ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    repair: (state) => state.repairs.repair,
  }),
  methods: {
    async handleDelete() {
      try {
        await this.$store.dispatch('repairs/deleteRepair', this.repair.id)
        this.$router.push(
          '/dashboard/repairs?page=' +
            this.$store.state.repairs.pagination.currentPage +
            '&type=' +
            this.$route.query.type
        )
      } catch (error) {
        error({
          statusCode: 503,
          message:
            'Неуспешно изтриване на ремонт ' +
            this.$route.params.id +
            '. Моля, опитайте по-късно.',
        })
      }
    },
  },
}
</script>
