<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h4>Списък на всички роли</h4>
      <div class="mb-2 mb-md-0">
        <b-button
          type="button"
          to="/dashboard/roles/create"
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
            <th>Брой разрешения</th>
            <th>Последна Промяна</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(role, id) in roles" :key="id">
            <td>{{ role.data.id }}</td>
            <td>
              <nuxt-link
                :to="'/dashboard/roles/' + role.data.id"
                class="text-body"
                >{{ role.data.name }}</nuxt-link
              >
            </td>
            <td>
              <nuxt-link
                :to="'/dashboard/roles/' + role.data.id"
                class="text-body"
                >{{ role.data.permissions.length }}</nuxt-link
              >
            </td>
            <td>{{ role.data.last_updated }}</td>
            <td>
              <div class="d-flex justify-content-end">
                <b-button
                  variant="outline-primary"
                  class="mx-1"
                  :to="'/dashboard/roles/' + role.data.id + '/update'"
                  >Промяна</b-button
                >
                <b-button
                  variant="outline-danger"
                  :to="'/dashboard/roles/' + role.data.id + '/delete'"
                  >Изтриване</b-button
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  middleware: 'hasPermission',
  meta: {
    auth: { permission: 'role-viewAny' },
  },
  async fetch({ store, error }) {
    try {
      await store.dispatch('roles/fetchRoles')
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за роли. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    roles: (state) => state.roles.roles,
  }),
}
</script>
