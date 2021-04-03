<template>
  <div class="my-2">
    <h4>Данни за роля</h4>
    <hr />
    <p><b>Име: </b>{{ role.name }}</p>
    <p><b>Разрешения: </b></p>
    <b-list-group class="mb-2">
      <b-list-group-item
        v-for="(permission, id) in role.permissions"
        :key="id"
        >{{ permission.data.name }}</b-list-group-item
      >
    </b-list-group>
    <p><b>Последна промяна: </b>{{ role.last_updated }}</p>
    <div class="d-block d-sm-flex justify-content-end">
      <b-button
        variant="outline-primary"
        to="/dashboard/roles"
        class="mx-1 my-1 my-sm-0"
        >Списък роли</b-button
      >
      <b-button
        variant="outline-success"
        to="/dashboard/roles/create"
        class="mx-1 my-1 my-sm-0"
        >Добавяне на нов запис</b-button
      >
      <b-button
        variant="outline-warning"
        class="mx-1 my-1 my-sm-0"
        :to="'/dashboard/roles/' + role.id + '/update'"
        >Промяна</b-button
      >
      <b-button
        variant="outline-danger"
        :to="'/dashboard/roles/' + role.id + '/delete'"
        class="mx-1 my-1 my-sm-0"
        >Изтриване</b-button
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  middleware: 'hasPermission',
  meta: {
    auth: { permission: 'role-view' },
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
}
</script>
