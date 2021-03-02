export default function ({ $axios }, inject) {
  const RoleService = {
    getRoles() {
      return $axios.get('/roles')
    },
    getRole(id) {
      return $axios.get('/roles/' + id)
    },
    createRole(form) {
      return $axios.post('/roles', form)
    },
    updateRole(id, form) {
      return $axios.patch('/roles/' + id, form)
    },
    deleteRole(id) {
      return $axios.delete('roles/' + id)
    },
  }

  inject('RoleService', RoleService)
}
