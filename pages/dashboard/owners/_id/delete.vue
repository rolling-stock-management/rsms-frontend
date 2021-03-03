<template>
  <div class="my-2">
    <h4>Изтриване на собственик</h4>
    <hr />
    <b-card>
      <p>
        Наистина ли искате да изтриете собственик
        {{ owner.name }}? Това действие е необратимо.
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
    auth: { permission: 'owner-delete' },
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('owners/fetchOwnerById', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за собственик ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    owner: (state) => state.owners.owner,
  }),
  methods: {
    async handleDelete() {
      try {
        await this.$store.dispatch('owners/deleteOwner', this.owner.id)
        this.$router.push('/dashboard/owners')
      } catch (error) {
        error({
          statusCode: 503,
          message:
            'Неуспешно изтриване на собственик ' +
            this.$route.params.id +
            '. Моля, опитайте по-късно.',
        })
      }
    },
  },
}
</script>
