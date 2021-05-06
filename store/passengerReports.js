export const state = () => ({
  passengerReports: [],
  passengerReport: {},
  passengerReportsCount: null,
  pagination: {
    currentPage: null,
    totalPages: null,
  },
})
export const mutations = {
  SET_PASSENGER_REPORTS(state, passengerReports) {
    state.passengerReports = passengerReports.data
    state.pagination.currentPage = passengerReports.meta
      ? passengerReports.meta.current_page
      : null
    state.pagination.totalPages = passengerReports.meta
      ? passengerReports.meta.last_page
      : null
    state.passengerReportsCount = passengerReports.meta
      ? passengerReports.meta.total
      : null
  },
  SET_PASSENGER_REPORT(state, passengerReport) {
    state.passengerReport = passengerReport
  },
  ADD_PASSENGER_REPORT(state, passengerReport) {
    state.passengerReports.push(passengerReport)
  },
  UPDATE_PASSENGER_REPORT(state, passengerReport) {
    const passengerReportIndex = state.passengerReports.findIndex((element) => {
      return element.data.id === passengerReport.id
    })
    this._vm.$set(state.passengerReports, passengerReportIndex, passengerReport)
  },
}
export const actions = {
  fetchPassengerReports({ commit }, { page, type }) {
    return this.$PassengerReportService
      .getPassengerReports(page, type)
      .then((response) => {
        commit('SET_PASSENGER_REPORTS', response.data)
      })
  },
  fetchPassengerReportsWithFilters({ commit }, query) {
    const page = query.page
    const filters = query.filter
    const type = query.type
    return this.$PassengerReportService
      .getPassengerReportsWithFilters(page, type, filters)
      .then((response) => {
        commit('SET_PASSENGER_REPORTS', response.data)
      })
  },
  fetchPassengerReportById({ commit, getters, state }, id) {
    if (id === state.passengerReport.id) {
      return state.passengerReport
    }

    const passengerReport = getters.getPassengerReportById(id)

    if (passengerReport) {
      commit('SET_PASSENGER_REPORT', passengerReport)
      return passengerReport
    } else {
      return this.$PassengerReportService
        .getPassengerReport(id)
        .then((response) => {
          commit('SET_PASSENGER_REPORT', response.data.data)
          return response.data.data
        })
    }
  },
  createPassengerReport({ commit }, passengerReport) {
    return this.$PassengerReportService
      .createPassengerReport(passengerReport)
      .then((response) => {
        const data = response.data.data
        commit('SET_PASSENGER_REPORT', data)
        commit('ADD_PASSENGER_REPORT', data)
      })
  },
  updatePassengerReport({ commit }, formData) {
    return this.$PassengerReportService
      .updatePassengerReport(formData.id, formData.form)
      .then((response) => {
        const data = response.data.data
        commit('SET_PASSENGER_REPORT', data)
        commit('UPDATE_PASSENGER_REPORT', data)
      })
  },
  deletePassengerReport({ commit, dispatch, state }, id) {
    return this.$PassengerReportService
      .deletePassengerReport(id)
      .then((response) => {
        dispatch('fetchPassengerReports', state.pagination.currentPage)
      })
  },
}
export const getters = {
  getPassengerReportById: (state) => (id) => {
    return state.passengerReports.find(
      (passengerReport) => passengerReport.id === id
    )
  },
}
