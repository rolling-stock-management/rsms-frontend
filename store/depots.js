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
    state.pagination.currentPage = depots.meta ? depots.meta.current_page : null
    state.pagination.totalPages = depots.meta ? depots.meta.last_page : null
    state.depotsCount = depots.meta ? depots.meta.total : state.depots.length
  },
  SET_DEPOT(state, depot) {
    state.depot = depot
  },
  ADD_DEPOT(state, depot) {
    state.depots.push(depot)
  },
  UPDATE_DEPOT(state, depot) {
    const depotIndex = state.depots.findIndex((element) => {
      return element.data.id === depot.id
    })
    this._vm.$set(state.depots, depotIndex, depot)
  },
}
export const actions = {
  fetchDepots({ commit }, page) {
    return this.$DepotService.getDepots(page).then((response) => {
      commit('SET_DEPOTS', response.data)
    })
  },
  fetchDepotsNoPagination({ commit, state }) {
    if (state.depots.length === state.depotsCount) {
      return state.depots
    }
    return this.$DepotService.getDepotsNoPagination().then((response) => {
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
        commit('SET_DEPOT', response.data.data)
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
  updateDepot({ commit }, formData) {
    return this.$DepotService
      .updateDepot(formData.id, formData.form)
      .then((response) => {
        const data = response.data.data
        commit('SET_DEPOT', data)
        commit('UPDATE_DEPOT', data)
      })
  },
  deleteDepot({ commit, dispatch, state }, id) {
    return this.$DepotService.deleteDepot(id).then((response) => {
      dispatch('fetchDepots', state.pagination.currentPage)
    })
  },
}
export const getters = {
  getDepotById: (state) => (id) => {
    return state.depots.find((depot) => depot.id === id)
  },
}
