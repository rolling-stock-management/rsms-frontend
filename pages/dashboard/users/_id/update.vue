<template>
  <div class="my-2">
    <h4>Редактиране на потребител</h4>
    <hr />
    <b-form v-if="show" @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="inputName"
        label="Име на потребител"
        label-for="inputName"
      >
        <b-form-input
          id="inputName"
          v-model="form.name"
          placeholder="Въведете име на потребител..."
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Избиране на депо" label-for="selectDepot">
        <b-form-select v-model="form.depot_id" id="selectDepot">
          <b-form-select-option :value="null"
            >&lt; няма &gt;</b-form-select-option
          >
          <b-form-select-option
            v-for="(depot, id) in depots"
            :key="id"
            :value="depot.data.id"
            >{{ depot.data.name }}</b-form-select-option
          >
        </b-form-select>
      </b-form-group>
      <b-form-group
        v-slot="{ ariaDescribedby }"
        label="Избиране на роли"
        label-for="checkRoles"
      >
        <b-card>
          <b-form-checkbox-group
            id="checkRole"
            v-model="form.role_ids"
            :aria-describedby="ariaDescribedby"
          >
            <b-form-checkbox
              v-for="(role, id) in roles"
              :key="id"
              :value="role.data.id"
              >{{ role.data.name }}</b-form-checkbox
            >
          </b-form-checkbox-group>
        </b-card>
      </b-form-group>

      <!-- </b-collapse> -->
      <div class="d-flex justify-content-end">
        <b-button type="button" to="/dashboard/users" variant="outline-danger"
          >Отказ</b-button
        >
        <b-button type="submit" variant="outline-success" class="mx-1"
          >Промяна</b-button
        >
        <b-button type="reset" variant="outline-warning">Изчистване</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  middleware: 'hasPermission',
  meta: {
    auth: { permission: 'role-update' },
  },
  data() {
    return {
      form: {
        name: this.$store.state.users.user.name,
        depot_id: this.$store.state.users.user.depot
          ? this.$store.state.users.user.depot.data.id
          : null,
        role_ids: this.$store.state.users.user.roles.map((x) => x.data.id),
      },
      show: true,
    }
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('roles/fetchRoles')
      await store.dispatch('depots/fetchDepotsNoPagination')
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
    roles: (state) => state.roles.roles,
    depots: (state) => state.depots.depots,
    user: (state) => state.users.user,
  }),
  watch: {
    user(val) {
      this.$router.push({
        name: 'dashboard-users-id',
        params: { id: val.id },
      })
    },
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault()
      try {
        await this.$store.dispatch('users/updateUser', {
          id: this.$route.params.id,
          form: this.form,
        })
      } catch (error) {
        error({
          statusCode: 503,
          message:
            'Неуспешно обновяване на информацията за потребител ' +
            this.$route.params.id +
            '. Моля, опитайте по-късно.',
        })
      }
    },
    onReset(event) {
      event.preventDefault()
      // Reset form values
      this.form.name = this.$store.state.users.user.name
      this.form.depot_id = this.$store.state.users.user.depot.data.id
      this.form.role_ids = this.$store.state.users.user.roles.map(
        (x) => x.data.id
      )

      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>
