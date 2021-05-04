export const state = () => ({
  passengerWagonTypes: [],
  passengerWagonType: {},
  passengerWagonTypesCount: null,
  pagination: {
    currentPage: null,
    totalPages: null,
  },
})
export const mutations = {
  SET_PASSENGER_WAGON_TYPES(state, passengerWagonTypes) {
    state.passengerWagonTypes = passengerWagonTypes.data
    state.pagination.currentPage = passengerWagonTypes.meta
      ? passengerWagonTypes.meta.current_page
      : null
    state.pagination.totalPages = passengerWagonTypes.meta
      ? passengerWagonTypes.meta.last_page
      : null
    state.passengerWagonTypesCount = passengerWagonTypes.meta
      ? passengerWagonTypes.meta.total
      : state.passengerWagonTypes.length
  },
  SET_PASSENGER_WAGON_TYPE(state, passengerWagonType) {
    state.passengerWagonType = passengerWagonType
  },
  ADD_PASSENGER_WAGON_TYPE(state, passengerWagonType) {
    state.passengerWagonTypes.push(passengerWagonType)
  },
  UPDATE_PASSENGER_WAGON_TYPE(state, passengerWagonType) {
    const passengerWagonTypeIndex = state.passengerWagonTypes.findIndex(
      (element) => {
        return element.data.id === passengerWagonType.id
      }
    )
    this._vm.$set(
      state.passengerWagonTypes,
      passengerWagonTypeIndex,
      passengerWagonType
    )
  },
}
export const actions = {
  fetchPassengerWagonTypes({ commit }, page) {
    return this.$PassengerWagonTypeService
      .getPassengerWagonTypes(page)
      .then((response) => {
        commit('SET_PASSENGER_WAGON_TYPES', response.data)
      })
  },
  fetchPassengerWagonTypesNoPagination({ commit, state }) {
    if (state.passengerWagonTypes.length === state.passengerWagonTypesCount) {
      return state.passengerWagonTypes
    }
    return this.$PassengerWagonTypeService
      .getPassengerWagonTypesNoPagination()
      .then((response) => {
        commit('SET_PASSENGER_WAGON_TYPES', response.data)
      })
  },
  fetchPassengerWagonTypeById({ commit, getters, state }, id) {
    if (id === state.passengerWagonType.id) {
      return state.passengerWagonType
    }

    const passengerWagonType = getters.getPassengerWagonTypeById(id)

    if (passengerWagonType) {
      commit('SET_PASSENGER_WAGON_TYPE', passengerWagonType)
      return passengerWagonType
    } else {
      return this.$PassengerWagonTypeService
        .getPassengerWagonType(id)
        .then((response) => {
          commit('SET_PASSENGER_WAGON_TYPE', response.data.data)
          return response.data.data
        })
    }
  },
  createPassengerWagonType({ commit }, passengerWagonType) {
    return this.$PassengerWagonTypeService
      .createPassengerWagonType(passengerWagonType)
      .then((response) => {
        const data = response.data.data
        commit('SET_PASSENGER_WAGON_TYPE', data)
        commit('ADD_PASSENGER_WAGON_TYPE', data)
      })
  },
  updatePassengerWagonType({ commit }, formData) {
    return this.$PassengerWagonTypeService
      .updatePassengerWagonType(formData.id, formData.form)
      .then((response) => {
        const data = response.data.data
        commit('SET_PASSENGER_WAGON_TYPE', data)
        commit('UPDATE_PASSENGER_WAGON_TYPE', data)
      })
  },
  deletePassengerWagonType({ commit, dispatch, state }, id) {
    return this.$PassengerWagonTypeService
      .deletePassengerWagonType(id)
      .then((response) => {
        dispatch('fetchPassengerWagonTypes', state.pagination.currentPage)
      })
  },
}
export const getters = {
  getPassengerWagonTypeById: (state) => (id) => {
    return state.passengerWagonTypes.find(
      (passengerWagonType) => passengerWagonType.id === id
    )
  },
}
