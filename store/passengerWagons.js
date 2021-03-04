export const state = () => ({
  passengerWagons: [],
  passengerWagon: {},
  passengerWagonsCount: null,
  pagination: {
    currentPage: null,
    totalPages: null,
  },
})
export const mutations = {
  SET_PASSENGER_WAGONES(state, passengerWagons) {
    state.passengerWagons = passengerWagons.data
    state.pagination.currentPage = passengerWagons.meta
      ? passengerWagons.meta.current_page
      : null
    state.pagination.totalPages = passengerWagons.meta
      ? passengerWagons.meta.last_page
      : null
    state.passengerWagonsCount = passengerWagons.meta
      ? passengerWagons.meta.total
      : null
  },
  SET_PASSENGER_WAGON(state, passengerWagon) {
    state.passengerWagon = passengerWagon
  },
  ADD_PASSENGER_WAGON(state, passengerWagon) {
    state.passengerWagons.push(passengerWagon)
  },
  UPDATE_PASSENGER_WAGON(state, passengerWagon) {
    const passengerWagonIndex = state.passengerWagons.findIndex((element) => {
      return element.data.id === passengerWagon.id
    })
    this._vm.$set(state.passengerWagons, passengerWagonIndex, passengerWagon)
  },
}
export const actions = {
  fetchPassengerWagons({ commit }, page) {
    return this.$PassengerWagonService
      .getPassengerWagons(page)
      .then((response) => {
        commit('SET_PASSENGER_WAGONES', response.data)
      })
  },
  fetchPassengerWagonById({ commit, getters, state }, id) {
    if (id === state.passengerWagon.id) {
      return state.passengerWagon
    }

    const passengerWagon = getters.getPassengerWagonById(id)

    if (passengerWagon) {
      commit('SET_PASSENGER_WAGON', passengerWagon)
      return passengerWagon
    } else {
      return this.$PassengerWagonService
        .getPassengerWagon(id)
        .then((response) => {
          commit('SET_PASSENGER_WAGON', response.data.data)
          return response.data.data
        })
    }
  },
  createPassengerWagon({ commit }, passengerWagon) {
    return this.$PassengerWagonService
      .createPassengerWagon(passengerWagon)
      .then((response) => {
        const data = response.data.data
        commit('SET_PASSENGER_WAGON', data)
        commit('ADD_PASSENGER_WAGON', data)
      })
  },
  updatePassengerWagon({ commit }, formData) {
    return this.$PassengerWagonService
      .updatePassengerWagon(formData.id, formData.form)
      .then((response) => {
        const data = response.data.data
        commit('SET_PASSENGER_WAGON', data)
        commit('UPDATE_PASSENGER_WAGON', data)
      })
  },
  deletePassengerWagon({ commit, dispatch, state }, id) {
    return this.$PassengerWagonService
      .deletePassengerWagon(id)
      .then((response) => {
        dispatch('fetchPassengerWagonеs', state.pagination.currentPage)
      })
  },
}
export const getters = {
  getPassengerWagonById: (state) => (id) => {
    return state.passengerWagons.find(
      (passengerWagon) => passengerWagon.id === id
    )
  },
}
