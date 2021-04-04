<template>
  <div class="my-2">
    <h4>Изтриване на потребител</h4>
    <hr />
    <b-card>
      <p>
        Наистина ли искате да изтриете потребител {{ user.name }} (
        {{ user.email }} )? Това действие е необратимо.
      </p>
      <div class="d-flex justify-content-end">
        <b-button
          type="button"
          :to="'/dashboard/users/' + user.id"
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
    auth: { permission: 'user-delete' },
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('users/fetchUserById', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за потребител ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    user: (state) => state.users.user,
  }),
  methods: {
    async handleDelete() {
      try {
        await this.$store.dispatch('users/deleteUser', this.user.id)
        this.$router.push('/dashboard/users')
      } catch (error) {
        error({
          statusCode: 503,
          message:
            'Неуспешно изтриване на потребител ' +
            this.$route.params.id +
            '. Моля, опитайте по-късно.',
        })
      }
    },
  },
}
</script>
