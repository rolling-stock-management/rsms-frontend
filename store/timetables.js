export const state = () => ({
  timetables: [],
  timetable: {},
  timetablesCount: null,
  pagination: {
    currentPage: null,
    totalPages: null,
  },
})
export const mutations = {
  SET_TIMETABLES(state, timetables) {
    state.timetables = timetables.data
    state.pagination.currentPage = timetables.meta
      ? timetables.meta.current_page
      : null
    state.pagination.totalPages = timetables.meta
      ? timetables.meta.last_page
      : null
    state.timetablesCount = timetables.meta
      ? timetables.meta.total
      : state.timetables.length
  },
  SET_TIMETABLE(state, timetable) {
    state.timetable = timetable
  },
  ADD_TIMETABLE(state, timetable) {
    state.timetables.push(timetable)
  },
  UPDATE_TIMETABLE(state, timetable) {
    const timetableIndex = state.timetables.findIndex((element) => {
      return element.data.id === timetable.id
    })
    this._vm.$set(state.timetables, timetableIndex, timetable)
  },
}
export const actions = {
  fetchTimetables({ commit }, page) {
    return this.$TimetableService.getTimetables(page).then((response) => {
      commit('SET_TIMETABLES', response.data)
    })
  },
  fetchTimetablesNoPagination({ commit, state }) {
    if (state.timetables.length === state.timetablesCount) {
      return state.timetables
    }
    return this.$TimetableService
      .getTimetablesNoPagination()
      .then((response) => {
        commit('SET_TIMETABLES', response.data)
      })
  },
  fetchTimetableById({ commit, getters, state }, id) {
    if (id === state.timetable.id) {
      return state.timetable
    }

    const timetable = getters.getTimetableById(id)

    if (timetable) {
      commit('SET_TIMETABLE', timetable)
      return timetable
    } else {
      return this.$TimetableService.getTimetable(id).then((response) => {
        commit('SET_TIMETABLE', response.data.data)
        return response.data.data
      })
    }
  },
  createTimetable({ commit }, timetable) {
    return this.$TimetableService
      .createTimetable(timetable)
      .then((response) => {
        const data = response.data.data
        commit('SET_TIMETABLE', data)
        commit('ADD_TIMETABLE', data)
      })
  },
  updateTimetable({ commit }, formData) {
    return this.$TimetableService
      .updateTimetable(formData.id, formData.form)
      .then((response) => {
        const data = response.data.data
        commit('SET_TIMETABLE', data)
        commit('UPDATE_TIMETABLE', data)
      })
  },
  deleteTimetable({ commit, dispatch, state }, id) {
    return this.$TimetableService.deleteTimetable(id).then((response) => {
      dispatch('fetchTimetables', state.pagination.currentPage)
    })
  },
}
export const getters = {
  getTimetableById: (state) => (id) => {
    return state.timetables.find((timetable) => timetable.id === id)
  },
}
