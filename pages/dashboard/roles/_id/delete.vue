<template>
  <div class="my-2">
    <h4>Изтриване на роля</h4>
    <hr />
    <b-card>
      <p>
        Наистина ли искате да изтриете роля {{ role.name }}? Това действие е
        необратимо.
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
    auth: { permission: 'role-delete' },
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('roles/fetchRoleById', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за роля ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    role: (state) => state.roles.role,
  }),
  methods: {
    async handleDelete() {
      try {
        await this.$store.dispatch('roles/deleteRole', this.role.id)
        this.$router.push('/dashboard/roles')
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
