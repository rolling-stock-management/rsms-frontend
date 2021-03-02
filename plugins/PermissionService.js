export default function ({ $axios }, inject) {
  const PermissionService = {
    getPermissions() {
      return $axios.get('/permissions')
    },
  }

  inject('PermissionService', PermissionService)
}
