<template>
  <div class="my-2">
    <h4>Изтриване на ремонтна работилница</h4>
    <hr />
    <b-card>
      <p>
        Наистина ли искате да изтриете ремонтна работилница
        {{ repairWorkshop.name }}? Това действие е необратимо.
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
    auth: { permission: 'repair-workshop-delete' },
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('repairWorkshops/fetchRepairWorkshopById', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за ремонтна работилница ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    repairWorkshop: (state) => state.repairWorkshops.repairWorkshop,
  }),
  methods: {
    async handleDelete() {
      try {
        await this.$store.dispatch(
          'repairWorkshops/deleteRepairWorkshop',
          this.repairWorkshop.id
        )
        this.$router.push('/dashboard/repair-workshops')
      } catch (error) {
        error({
          statusCode: 503,
          message:
            'Неуспешно изтриване на ремонтна работилница ' +
            this.$route.params.id +
            '. Моля, опитайте по-късно.',
        })
      }
    },
  },
}
</script>
