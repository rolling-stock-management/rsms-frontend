<template>
  <div class="my-2">
    <h4>Редактиране на роля</h4>
    <hr />
    <b-form v-if="show" @submit="onSubmit" @reset="onReset">
      <b-form-group id="inputName" label="Име" label-for="inputName">
        <b-form-input
          id="inputName"
          v-model="form.name"
          placeholder="Въведете име на роля..."
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group v-slot="{ ariaDescribedby }" label="Разрешения: ">
        <b-card class="custom-checkbox overflow-auto">
          <b-form-checkbox-group
            id="checkbox-group-2"
            v-model="form.permission_ids"
            :aria-describedby="ariaDescribedby"
            stacked
          >
            <b-form-checkbox
              v-for="(permission, id) in permissions"
              :key="id"
              :value="permission.data.id"
              >{{ permission.data.name }}</b-form-checkbox
            >
          </b-form-checkbox-group>
        </b-card>
      </b-form-group>
      <div class="d-flex justify-content-end">
        <b-button type="button" to="/dashboard/roles" variant="outline-danger"
          >Отказ</b-button
        >
        <b-button type="reset" variant="outline-warning" class="mx-1"
          >Изчистване</b-button
        >
        <b-button type="submit" variant="outline-success">Промяна</b-button>
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
        name: this.$store.state.roles.role.name,
        permission_ids: this.$store.state.roles.role.permissions.map(
          (x) => x.data.id
        ),
      },
      show: true,
    }
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('permissions/fetchPermissions')
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
    permissions: (state) => state.permissions.permissions,
    role: (state) => state.roles.role,
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
        await this.$store.dispatch('roles/updateRole', {
          id: this.$route.params.id,
          form: this.form,
        })
      } catch (error) {
        error({
          statusCode: 503,
          message:
            'Неуспешно обновяване на информацията за роля ' +
            this.$route.params.id +
            '. Моля, опитайте по-късно.',
        })
      }
    },
    onReset(event) {
      event.preventDefault()
      // Reset form values
      this.form.name = this.$store.state.roles.role.name
      this.form.permission_ids = this.$store.state.roles.role.permissions.map(
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

<style scoped>
.custom-checkbox {
  max-height: 50vh;
}
</style>
