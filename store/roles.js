export const state = () => ({
  roles: [],
  role: {},
})
export const mutations = {
  SET_ROLES(state, roles) {
    state.roles = roles.data
  },
  SET_ROLE(state, role) {
    state.role = role
  },
  ADD_ROLE(state, role) {
    state.roles.push(role)
  },
  UPDATE_ROLE(state, role) {
    const roleIndex = state.roles.findIndex((element) => {
      return element.data.id === role.id
    })
    this._vm.$set(state.roles, roleIndex, role)
  },
}
export const actions = {
  fetchRoles({ commit }) {
    return this.$RoleService.getRoles().then((response) => {
      commit('SET_ROLES', response.data)
    })
  },
  fetchRoleById({ commit, getters, state }, id) {
    if (id === state.role.id) {
      return state.role
    }

    const role = getters.getRoleById(id)

    if (role) {
      commit('SET_ROLE', role)
      return role
    } else {
      return this.$RoleService.getRole(id).then((response) => {
        commit('SET_ROLE', response.data.data)
        return response.data.data
      })
    }
  },
  createRole({ commit }, role) {
    return this.$RoleService.createRole(role).then((response) => {
      const data = response.data.data
      commit('SET_ROLE', data)
      commit('ADD_ROLE', data)
    })
  },
  updateRole({ commit }, formData) {
    return this.$RoleService
      .updateRole(formData.id, formData.form)
      .then((response) => {
        const data = response.data.data
        commit('SET_ROLE', data)
        commit('UPDATE_ROLE', data)
      })
  },
  deleteRole({ commit, dispatch, state }, id) {
    return this.$RoleService.deleteRole(id).then((response) => {
      dispatch('fetchRoles')
    })
  },
}
export const getters = {
  getRoleById: (state) => (id) => {
    return state.roles.find((role) => role.id === id)
  },
}
