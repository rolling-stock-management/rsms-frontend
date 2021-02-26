export const state = () => ({
  depots: [],
  depot: {},
  depotsCount: null,
  pagination: {
    currentPage: null,
    totalPages: null,
  },
})
export const mutations = {
  SET_DEPOTS(state, depots) {
    state.depots = depots.data
    state.pagination.currentPage = depots.meta.current_page
    state.pagination.totalPages = depots.meta.last_page
    state.depotsCount = depots.meta.total
  },
  SET_DEPOT(state, depot) {
    state.depot = depot
  },
  ADD_DEPOT(state, depot) {
    state.depots.push(depot)
  },
  UPDATE_DEPOT(depot) {
    const depotIndex = state.depots.findIndex(({ id }) => id === depot.id)
    this.$set(state.depots, depotIndex, depot)
  },
}
export const actions = {
  fetchDepots({ commit }, page) {
    return this.$DepotService.getDepots(page).then((response) => {
      commit('SET_DEPOTS', response.data)
    })
  },
  fetchDepotById({ commit, getters, state }, id) {
    if (id === state.depot.id) {
      return state.depot
    }

    const depot = getters.getDepotById(id)

    if (depot) {
      commit('SET_DEPOT', depot)
      return depot
    } else {
      return this.$DepotService.getDepot(id).then((response) => {
        commit('SET_DEPOT', response.data)
        return response.data
      })
    }
  },
  createDepot({ commit }, depot) {
    return this.$DepotService.createDepot(depot).then((response) => {
      const data = response.data.data
      commit('SET_DEPOT', data)
      commit('ADD_DEPOT', data)
    })
  },
}
export const getters = {
  getDepotById: (state) => (id) => {
    return state.depots.find((depot) => depot.id === id)
  },
}
