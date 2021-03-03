export const state = () => ({
  freightWagonTypes: [],
  freightWagonType: {},
  freightWagonTypesCount: null,
  pagination: {
    currentPage: null,
    totalPages: null,
  },
})
export const mutations = {
  SET_FREIGHT_WAGON_TYPES(state, freightWagonTypes) {
    state.freightWagonTypes = freightWagonTypes.data
    state.pagination.currentPage = freightWagonTypes.meta
      ? freightWagonTypes.meta.current_page
      : null
    state.pagination.totalPages = freightWagonTypes.meta
      ? freightWagonTypes.meta.last_page
      : null
    state.freightWagonTypesCount = freightWagonTypes.meta
      ? freightWagonTypes.meta.total
      : null
  },
  SET_FREIGHT_WAGON_TYPE(state, freightWagonType) {
    state.freightWagonType = freightWagonType
  },
  ADD_FREIGHT_WAGON_TYPE(state, freightWagonType) {
    state.freightWagonTypes.push(freightWagonType)
  },
  UPDATE_FREIGHT_WAGON_TYPE(state, freightWagonType) {
    const freightWagonTypeIndex = state.freightWagonTypes.findIndex(
      (element) => {
        return element.data.id === freightWagonType.id
      }
    )
    this._vm.$set(
      state.freightWagonTypes,
      freightWagonTypeIndex,
      freightWagonType
    )
  },
}
export const actions = {
  fetchFreightWagonTypes({ commit }, page) {
    return this.$FreightWagonTypeService
      .getFreightWagonTypes(page)
      .then((response) => {
        commit('SET_FREIGHT_WAGON_TYPES', response.data)
      })
  },
  fetchFreightWagonTypesNoPagination({ commit }) {
    return this.$FreightWagonTypeService
      .getFreightWagonTypesNoPagination()
      .then((response) => {
        commit('SET_FREIGHT_WAGON_TYPES', response.data)
      })
  },
  fetchFreightWagonTypeById({ commit, getters, state }, id) {
    if (id === state.freightWagonType.id) {
      return state.freightWagonType
    }

    const freightWagonType = getters.getFreightWagonTypeById(id)

    if (freightWagonType) {
      commit('SET_FREIGHT_WAGON_TYPE', freightWagonType)
      return freightWagonType
    } else {
      return this.$FreightWagonTypeService
        .getFreightWagonType(id)
        .then((response) => {
          commit('SET_FREIGHT_WAGON_TYPE', response.data.data)
          return response.data.data
        })
    }
  },
  createFreightWagonType({ commit }, freightWagonType) {
    return this.$FreightWagonTypeService
      .createFreightWagonType(freightWagonType)
      .then((response) => {
        const data = response.data.data
        commit('SET_FREIGHT_WAGON_TYPE', data)
        commit('ADD_FREIGHT_WAGON_TYPE', data)
      })
  },
  updateFreightWagonType({ commit }, formData) {
    return this.$FreightWagonTypeService
      .updateFreightWagonType(formData.id, formData.form)
      .then((response) => {
        const data = response.data.data
        commit('SET_FREIGHT_WAGON_TYPE', data)
        commit('UPDATE_FREIGHT_WAGON_TYPE', data)
      })
  },
  deleteFreightWagonType({ commit, dispatch, state }, id) {
    return this.$FreightWagonTypeService
      .deleteFreightWagonType(id)
      .then((response) => {
        dispatch('fetchFreightWagonTypes', state.pagination.currentPage)
      })
  },
}
export const getters = {
  getFreightWagonTypeById: (state) => (id) => {
    return state.freightWagonTypes.find(
      (freightWagonType) => freightWagonType.id === id
    )
  },
}
