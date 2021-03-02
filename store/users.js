export const state = () => ({
  users: [],
  user: {},
  usersCount: null,
  pagination: {
    currentPage: null,
    totalPages: null,
  },
})
export const mutations = {
  SET_USERS(state, users) {
    state.users = users.data
    state.pagination.currentPage = users.meta.current_page
    state.pagination.totalPages = users.meta.last_page
    state.usersCount = users.meta.total
  },
  SET_USER(state, user) {
    state.user = user
  },
  ADD_USER(state, user) {
    state.users.push(user)
  },
  UPDATE_USER(state, user) {
    const userIndex = state.users.findIndex((element) => {
      return element.data.id === user.id
    })
    this._vm.$set(state.users, userIndex, user)
  },
}
export const actions = {
  fetchUsers({ commit }, page) {
    return this.$UserService.getUsers(page).then((response) => {
      commit('SET_USERS', response.data)
    })
  },
  fetchUserById({ commit, getters, state }, id) {
    if (id === state.user.id) {
      return state.user
    }

    const user = getters.getUserById(id)

    if (user) {
      commit('SET_USER', user)
      return user
    } else {
      return this.$UserService.getUser(id).then((response) => {
        commit('SET_USER', response.data.data)
        return response.data.data
      })
    }
  },
  createUser({ commit }, user) {
    return this.$UserService.createUser(user).then((response) => {
      const data = response.data.data
      commit('SET_USER', data)
      commit('ADD_USER', data)
    })
  },
  updateUser({ commit }, formData) {
    return this.$UserService
      .updateUser(formData.id, formData.form)
      .then((response) => {
        const data = response.data.data
        commit('SET_USER', data)
        commit('UPDATE_USER', data)
      })
  },
  deleteUser({ commit, dispatch, state }, id) {
    return this.$UserService.deleteUser(id).then((response) => {
      dispatch('fetchUsers', state.pagination.currentPage)
    })
  },
}
export const getters = {
  getUserById: (state) => (id) => {
    return state.users.find((user) => user.id === id)
  },
}
