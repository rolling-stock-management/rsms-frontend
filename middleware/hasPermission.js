export default ({ store, route, redirect }) => {
  // Check if user is authenticated
  if (!store.state.auth.loggedIn) {
    return redirect('/login')
  }

  // Get the users roles; for each one get the permissions and add them to an array.
  const roles = store.state.auth.user[0].roles
  let permissions = []
  roles.forEach((role) => {
    permissions = permissions.concat(role.permissions)
  })

  // Get the permission name from route meta and check if it exists.
  const permission = route.meta[0].auth.permission
  const permissionIndex = permissions.findIndex((element) => {
    return element.name === permission
  })

  // If the permission doesn't exist redirect to /dashboard.
  if (permissionIndex === -1) {
    return redirect('/dashboard')
  }
}
