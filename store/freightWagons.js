export const state = () => ({
  freightWagons: [],
  freightWagon: {},
  freightWagonsCount: null,
  pagination: {
    currentPage: null,
    totalPages: null,
  },
})
export const mutations = {
  SET_FREIGHT_WAGONS(state, freightWagons) {
    state.freightWagons = freightWagons.data
    state.pagination.currentPage = freightWagons.meta
      ? freightWagons.meta.current_page
      : null
    state.pagination.totalPages = freightWagons.meta
      ? freightWagons.meta.last_page
      : null
    state.freightWagonsCount = freightWagons.meta
      ? freightWagons.meta.total
      : null
  },
  SET_FREIGHT_WAGON(state, freightWagon) {
    state.freightWagon = freightWagon
  },
  ADD_FREIGHT_WAGON(state, freightWagon) {
    state.freightWagons.push(freightWagon)
  },
  UPDATE_FREIGHT_WAGON(state, freightWagon) {
    const freightWagonIndex = state.freightWagons.findIndex((element) => {
      return element.data.id === freightWagon.id
    })
    this._vm.$set(state.freightWagons, freightWagonIndex, freightWagon)
  },
}
export const actions = {
  fetchFreightWagons({ commit }, page) {
    return this.$FreightWagonService.getFreightWagons(page).then((response) => {
      commit('SET_FREIGHT_WAGONS', response.data)
    })
  },
  fetchFreightWagonsWithFilters({ commit }, query) {
    const page = query.page
    const filters = query.filter
    return this.$FreightWagonService
      .getFreightWagonsWithFilters(page, filters)
      .then((response) => {
        commit('SET_FREIGHT_WAGONS', response.data)
      })
  },
  fetchFreightWagonById({ commit, getters, state }, id) {
    if (id === state.freightWagon.id) {
      return state.freightWagon
    }

    const freightWagon = getters.getFreightWagonById(id)

    if (freightWagon) {
      commit('SET_FREIGHT_WAGON', freightWagon)
      return freightWagon
    } else {
      return this.$FreightWagonService.getFreightWagon(id).then((response) => {
        commit('SET_FREIGHT_WAGON', response.data.data)
        return response.data.data
      })
    }
  },
  createFreightWagon({ commit }, freightWagon) {
    return this.$FreightWagonService
      .createFreightWagon(freightWagon)
      .then((response) => {
        const data = response.data.data
        commit('SET_FREIGHT_WAGON', data)
        commit('ADD_FREIGHT_WAGON', data)
      })
  },
  updateFreightWagon({ commit }, formData) {
    return this.$FreightWagonService
      .updateFreightWagon(formData.id, formData.form)
      .then((response) => {
        const data = response.data.data
        commit('SET_FREIGHT_WAGON', data)
        commit('UPDATE_FREIGHT_WAGON', data)
      })
  },
  deleteFreightWagon({ commit, dispatch, state }, id) {
    return this.$FreightWagonService.deleteFreightWagon(id).then((response) => {
      dispatch('fetchFreightWagonеs', state.pagination.currentPage)
    })
  },
}
export const getters = {
  getFreightWagonById: (state) => (id) => {
    return state.freightWagons.find((freightWagon) => freightWagon.id === id)
  },
}
