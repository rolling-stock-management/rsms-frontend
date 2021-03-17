export const state = () => ({
  tractiveUnits: [],
  tractiveUnit: {},
  tractiveUnitsCount: null,
  pagination: {
    currentPage: null,
    totalPages: null,
  },
})
export const mutations = {
  SET_TRACTIVE_UNITS(state, tractiveUnits) {
    state.tractiveUnits = tractiveUnits.data
    state.pagination.currentPage = tractiveUnits.meta
      ? tractiveUnits.meta.current_page
      : null
    state.pagination.totalPages = tractiveUnits.meta
      ? tractiveUnits.meta.last_page
      : null
    state.tractiveUnitsCount = tractiveUnits.meta
      ? tractiveUnits.meta.total
      : null
  },
  SET_TRACTIVE_UNIT(state, tractiveUnit) {
    state.tractiveUnit = tractiveUnit
  },
  ADD_TRACTIVE_UNIT(state, tractiveUnit) {
    state.tractiveUnits.push(tractiveUnit)
  },
  UPDATE_TRACTIVE_UNIT(state, tractiveUnit) {
    const tractiveUnitIndex = state.tractiveUnits.findIndex((element) => {
      return element.data.id === tractiveUnit.id
    })
    this._vm.$set(state.tractiveUnits, tractiveUnitIndex, tractiveUnit)
  },
}
export const actions = {
  fetchTractiveUnits({ commit }, page) {
    return this.$TractiveUnitService.getTractiveUnits(page).then((response) => {
      commit('SET_TRACTIVE_UNITS', response.data)
    })
  },
  fetchTractiveUnitsWithFilters({ commit }, query) {
    const page = query.page
    const filters = query.filter
    return this.$TractiveUnitService
      .getTractiveUnitsWithFilters(page, filters)
      .then((response) => {
        commit('SET_TRACTIVE_UNITS', response.data)
      })
  },
  fetchTractiveUnitById({ commit, getters, state }, id) {
    if (id === state.tractiveUnit.id) {
      return state.tractiveUnit
    }

    const tractiveUnit = getters.getTractiveUnitById(id)

    if (tractiveUnit) {
      commit('SET_TRACTIVE_UNIT', tractiveUnit)
      return tractiveUnit
    } else {
      return this.$TractiveUnitService.getTractiveUnit(id).then((response) => {
        commit('SET_TRACTIVE_UNIT', response.data.data)
        return response.data.data
      })
    }
  },
  createTractiveUnit({ commit }, tractiveUnit) {
    return this.$TractiveUnitService
      .createTractiveUnit(tractiveUnit)
      .then((response) => {
        const data = response.data.data
        commit('SET_TRACTIVE_UNIT', data)
        commit('ADD_TRACTIVE_UNIT', data)
      })
  },
  updateTractiveUnit({ commit }, formData) {
    return this.$TractiveUnitService
      .updateTractiveUnit(formData.id, formData.form)
      .then((response) => {
        const data = response.data.data
        commit('SET_TRACTIVE_UNIT', data)
        commit('UPDATE_TRACTIVE_UNIT', data)
      })
  },
  deleteTractiveUnit({ commit, dispatch, state }, id) {
    return this.$TractiveUnitService.deleteTractiveUnit(id).then((response) => {
      dispatch('fetchTractiveUnitеs', state.pagination.currentPage)
    })
  },
}
export const getters = {
  getTractiveUnitById: (state) => (id) => {
    return state.tractiveUnits.find((tractiveUnit) => tractiveUnit.id === id)
  },
}
