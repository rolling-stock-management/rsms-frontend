<template>
  <div class="my-2">
    <h4>Данни за потребител</h4>
    <hr />
    <p><b>Име: </b>{{ user.name }}</p>
    <p><b>E-mail: </b>{{ user.email }}</p>
    <p><b>Потвърден е-mail: </b>{{ user.verified_email ? 'да' : 'не' }}</p>
    <p><b>Депо: </b>{{ user.depot ? user.depot.data.name : '-' }}</p>
    <p><b>Роли: </b></p>
    <b-list-group class="mb-2">
      <b-list-group-item v-for="(role, id) in user.roles" :key="id">{{
        role.data.name
      }}</b-list-group-item>
    </b-list-group>
    <p><b>Регистриран на: </b>{{ user.created_at }}</p>
    <p><b>Последна промяна: </b>{{ user.updated_at }}</p>
    <div class="d-block d-sm-flex justify-content-end">
      <b-button variant="outline-success" to="/dashboard/users/create"
        >Добавяне на нов запис</b-button
      >
      <b-button
        variant="outline-warning"
        class="mx-1 my-2 my-sm-0"
        :to="'/dashboard/users/' + user.id + '/update'"
        >Промяна</b-button
      >
      <b-button
        variant="outline-danger"
        :to="'/dashboard/users/' + user.id + '/delete'"
        >Изтриване</b-button
      >
      <b-button variant="outline-primary" class="mx-1" to="/dashboard/users"
        >Списък потребители</b-button
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
    auth: { permission: 'user-view' },
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
}
</script>
