<template>
  <div class="my-2">
    <h4>Добавяне на роля</h4>
    <hr />
    <b-form v-if="show" @submit="onSubmit" @reset="onReset">
      <b-form-group id="inputName" label="Име на роля" label-for="inputName">
        <b-form-input
          id="inputName"
          v-model="form.name"
          placeholder="Въведете име на роля..."
          required
        ></b-form-input>
      </b-form-group>
      <b-button v-b-toggle.collapse-1 variant="outline-primary" class="mb-2"
        >Задаване на разрешения</b-button
      >
      <b-collapse id="collapse-1" class="my-2">
        <b-card>
          <b-form-group v-slot="{ ariaDescribedby }" label="Разрешения: ">
            <b-form-checkbox-group
              id="checkbox-group-2"
              v-model="form.permission_ids"
              :aria-describedby="ariaDescribedby"
            >
              <b-form-checkbox
                v-for="(permission, id) in permissions"
                :key="id"
                :value="permission.data.id"
                >{{ permission.data.name }}</b-form-checkbox
              >
            </b-form-checkbox-group>
          </b-form-group>
        </b-card>
      </b-collapse>
      <div class="d-flex justify-content-between">
        <b-button type="button" to="/dashboard/roles" variant="outline-danger"
          >Отказ</b-button
        >
        <b-button type="submit" variant="outline-success">Създаване</b-button>
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
    auth: { permission: 'role-create' },
  },
  data() {
    return {
      form: {
        name: '',
        permission_ids: [],
      },
      show: true,
    }
  },
  async fetch({ store, error }) {
    try {
      await store.dispatch('permissions/fetchPermissions')
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за разрешенията. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    role: (state) => state.roles.role,
    permissions: (state) => state.permissions.permissions,
  }),
  watch: {
    role(val) {
      this.$router.push({
        name: 'dashboard-roles-id',
        params: { id: val.id },
      })
    },
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault()
      try {
        await this.$store.dispatch('roles/createRole', this.form)
      } catch (error) {
        error({
          statusCode: 503,
          message: 'Неуспешно добавяне на роля. Моля, опитайте по-късно.',
        })
      }
    },
    onReset(event) {
      event.preventDefault()
      // Reset form values
      this.form.name = ''
      this.form.permission_ids = []

      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>
