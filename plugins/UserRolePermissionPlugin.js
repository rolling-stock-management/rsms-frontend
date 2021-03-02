export default function ({ $auth }, inject) {
  const UserRolePermissionPlugin = {
    userHasPermission(permission) {
      // Get the users roles; for each one get the permissions and add them to an array.
      const roles = $auth.user.roles
      let permissions = []
      roles.forEach((role) => {
        permissions = permissions.concat(role.permissions)
      })

      // Check if the permission exists in the array.
      const permissionIndex = permissions.findIndex((element) => {
        return element.name === permission
      })
      return permissionIndex !== -1
    },
    userHasRole(role) {
      const roles = $auth.user.roles
      const roleIndex = roles.findIndex((element) => {
        return element.name === role
      })
      return roleIndex !== -1
    },
  }

  inject('UserRolePermissionPlugin', UserRolePermissionPlugin)
}
