<template>
  <div class="my-2">
    <h4>Добавяне на потребител</h4>
    <hr />
    <b-form v-if="show" @submit="onSubmit" @reset="onReset">
      <b-form-group id="inputName" label="Име" label-for="inputName">
        <b-form-input
          id="inputName"
          v-model="form.name"
          placeholder="Въведете име на потребител..."
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="inputEmail" label="E-mail" label-for="inputEmail">
        <b-form-input
          id="inputEmail"
          v-model="form.email"
          type="email"
          placeholder="Въведете e-mail на потребител..."
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="inputPassword" label="Парола" label-for="inputPassword">
        <b-form-input
          id="inputPassword"
          v-model="form.password"
          type="password"
          placeholder="Въведете парола на потребител..."
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="inputPasswordConfirm"
        label="Потвърждение парола"
        label-for="inputPasswordConfirm"
      >
        <b-form-input
          id="inputPasswordConfirm"
          v-model="form.password_confirmation"
          type="password"
          placeholder="Потвърдете парола на потребител..."
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Депо" label-for="selectDepot">
        <b-form-select id="selectDepot" v-model="form.depot_id">
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
      <b-form-group v-slot="{ ariaDescribedby }" label="Роли: ">
        <b-card class="custom-checkbox overflow-auto">
          <b-form-checkbox-group
            id="checkboxRoles"
            v-model="form.role_ids"
            :aria-describedby="ariaDescribedby"
            stacked
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
      <div class="d-flex justify-content-end">
        <b-button type="button" to="/dashboard/users" variant="outline-danger"
          >Отказ</b-button
        >
        <b-button type="reset" variant="outline-warning" class="mx-1"
          >Изчистване</b-button
        >
        <b-button type="submit" variant="outline-success">Добавяне</b-button>
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
    auth: { permission: 'user-create' },
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        depot_id: null,
        role_ids: [],
      },
      show: true,
    }
  },
  async fetch({ store, error }) {
    try {
      await store.dispatch('roles/fetchRoles')
      await store.dispatch('depots/fetchDepotsNoPagination')
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за разрешенията. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    user: (state) => state.users.user,
    roles: (state) => state.roles.roles,
    depots: (state) => state.depots.depots,
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
        await this.$store.dispatch('users/createUser', this.form)
      } catch (error) {
        error({
          statusCode: 503,
          message: 'Неуспешно добавяне на потребител. Моля, опитайте по-късно.',
        })
      }
    },
    onReset(event) {
      event.preventDefault()
      // Reset form values
      this.form.name = ''
      this.form.email = ''
      this.form.password = ''
      this.form.password_confirmation = ''
      this.form.depot_id = null
      this.form.role_ids = []

      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>

<style scoped>
.custom-checkbox {
  max-height: 50vh;
}
</style>
