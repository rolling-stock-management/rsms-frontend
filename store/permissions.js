export const state = () => ({
  permissions: [],
})
export const mutations = {
  SET_PERMISSIONS(state, permissions) {
    state.permissions = permissions.data
  },
}
export const actions = {
  fetchPermissions({ commit }) {
    return this.$PermissionService.getPermissions().then((response) => {
      commit('SET_PERMISSIONS', response.data)
    })
  },
}
