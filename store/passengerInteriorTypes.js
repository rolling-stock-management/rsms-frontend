export const state = () => ({
  passengerInteriorTypes: [],
  passengerInteriorType: {},
  passengerInteriorTypesCount: null,
  pagination: {
    currentPage: null,
    totalPages: null,
  },
})
export const mutations = {
  SET_PASSENGER_INTERIOR_TYPES(state, passengerInteriorTypes) {
    state.passengerInteriorTypes = passengerInteriorTypes.data
    state.pagination.currentPage = passengerInteriorTypes.meta
      ? passengerInteriorTypes.meta.current_page
      : null
    state.pagination.totalPages = passengerInteriorTypes.meta
      ? passengerInteriorTypes.meta.last_page
      : null
    state.passengerInteriorTypesCount = passengerInteriorTypes.meta
      ? passengerInteriorTypes.meta.total
      : state.passengerInteriorTypes.length
  },
  SET_PASSENGER_INTERIOR_TYPE(state, passengerInteriorType) {
    state.passengerInteriorType = passengerInteriorType
  },
  ADD_PASSENGER_INTERIOR_TYPE(state, passengerInteriorType) {
    state.passengerInteriorTypes.push(passengerInteriorType)
  },
  UPDATE_PASSENGER_INTERIOR_TYPE(state, passengerInteriorType) {
    const passengerInteriorTypeIndex = state.passengerInteriorTypes.findIndex(
      (element) => {
        return element.data.id === passengerInteriorType.id
      }
    )
    this._vm.$set(
      state.passengerInteriorTypes,
      passengerInteriorTypeIndex,
      passengerInteriorType
    )
  },
}
export const actions = {
  fetchPassengerInteriorTypes({ commit }, page) {
    return this.$PassengerInteriorTypeService
      .getPassengerInteriorTypes(page)
      .then((response) => {
        commit('SET_PASSENGER_INTERIOR_TYPES', response.data)
      })
  },
  fetchPassengerInteriorTypesNoPagination({ commit, state }) {
    if (
      state.passengerInteriorTypes.length === state.passengerInteriorTypesCount
    ) {
      return state.passengerInteriorTypes
    }
    return this.$PassengerInteriorTypeService
      .getPassengerInteriorTypesNoPagination()
      .then((response) => {
        commit('SET_PASSENGER_INTERIOR_TYPES', response.data)
      })
  },
  fetchPassengerInteriorTypeById({ commit, getters, state }, id) {
    if (id === state.passengerInteriorType.id) {
      return state.passengerInteriorType
    }

    const passengerInteriorType = getters.getPassengerInteriorTypeById(id)

    if (passengerInteriorType) {
      commit('SET_PASSENGER_INTERIOR_TYPE', passengerInteriorType)
      return passengerInteriorType
    } else {
      return this.$PassengerInteriorTypeService
        .getPassengerInteriorType(id)
        .then((response) => {
          commit('SET_PASSENGER_INTERIOR_TYPE', response.data.data)
          return response.data.data
        })
    }
  },
  createPassengerInteriorType({ commit }, passengerInteriorType) {
    return this.$PassengerInteriorTypeService
      .createPassengerInteriorType(passengerInteriorType)
      .then((response) => {
        const data = response.data.data
        commit('SET_PASSENGER_INTERIOR_TYPE', data)
        commit('ADD_PASSENGER_INTERIOR_TYPE', data)
      })
  },
  updatePassengerInteriorType({ commit }, formData) {
    return this.$PassengerInteriorTypeService
      .updatePassengerInteriorType(formData.id, formData.form)
      .then((response) => {
        const data = response.data.data
        commit('SET_PASSENGER_INTERIOR_TYPE', data)
        commit('UPDATE_PASSENGER_INTERIOR_TYPE', data)
      })
  },
  deletePassengerInteriorType({ commit, dispatch, state }, id) {
    return this.$PassengerInteriorTypeService
      .deletePassengerInteriorType(id)
      .then((response) => {
        dispatch('fetchPassengerInteriorTypes', state.pagination.currentPage)
      })
  },
}
export const getters = {
  getPassengerInteriorTypeById: (state) => (id) => {
    return state.passengerInteriorTypes.find(
      (passengerInteriorType) => passengerInteriorType.id === id
    )
  },
}
