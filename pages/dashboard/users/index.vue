<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h4>Списък на всички потребители</h4>
      <div class="mb-2 mb-md-0">
        <b-button
          type="button"
          to="/dashboard/users/create"
          variant="outline-success"
          >Добавяне</b-button
        >
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Име</th>
            <th>E-mail</th>
            <th>Потвърден e-mail</th>
            <th>Депо</th>
            <th>Регистриран на</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, id) in users" :key="id">
            <td>{{ user.data.id }}</td>
            <td>
              <nuxt-link
                :to="'/dashboard/users/' + user.data.id"
                class="text-body"
                >{{ user.data.name }}</nuxt-link
              >
            </td>
            <td>
              <nuxt-link
                :to="'/dashboard/users/' + user.data.id"
                class="text-body"
                >{{ user.data.email }}</nuxt-link
              >
            </td>
            <td>{{ user.data.verified_email ? 'да' : 'не' }}</td>
            <td>{{ user.data.depot ? user.data.depot.name : '-' }}</td>
            <td>{{ user.data.created_at }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="overflow-auto d-flex justify-content-between">
      <div>
        <b-pagination-nav
          v-if="usersCount > 10"
          :link-gen="linkGen"
          :number-of-pages="pagination.totalPages"
          use-router
        ></b-pagination-nav>
      </div>
      <p>Общо записи: {{ usersCount }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  middleware: 'hasPermission',
  meta: {
    auth: { permission: 'user-viewAny' },
  },
  async fetch({ store, error, query }) {
    try {
      const page = query.page ? query.page : 1
      await store.dispatch('users/fetchUsers', page)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за потребители. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    users: (state) => state.users.users,
    usersCount: (state) => state.users.usersCount,
    pagination: (state) => state.users.pagination,
  }),
  watchQuery: ['page'],
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
  },
}
</script>
