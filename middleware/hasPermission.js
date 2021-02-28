export default ({ $UserRolePermissionPlugin, store, route, redirect }) => {
  // Check if user is authenticated
  if (!store.state.auth.loggedIn) {
    return redirect('/login')
  }

  // Get the permission name from route meta and check if it exists.
  const permission = route.meta[0].auth.permission

  // If the permission doesn't exist redirect to /dashboard.
  if (!$UserRolePermissionPlugin.userHasPermission(permission)) {
    return redirect('/dashboard')
  }
}
