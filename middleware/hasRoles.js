export default ({ error, store, redirect }) => {
  // Check if user is authenticated
  if (!store.state.auth.loggedIn) {
    return redirect('/login')
  }

  // Check if user doesn't have any roles
  if (store.state.auth.user.roles.length === 0) {
    return error({
      statusCode: 403,
      message:
        'Вашият акаунт няма зададени роли от администратор. Моля, опитайте по-късно.',
    })
  }
}
