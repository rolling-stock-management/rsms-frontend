export const state = () => ({
  statuses: [],
  status: {},
  statusesCount: null,
  pagination: {
    currentPage: null,
    totalPages: null,
  },
})
export const mutations = {
  SET_STATUSES(state, statuses) {
    state.statuses = statuses.data
    state.pagination.currentPage = statuses.meta
      ? statuses.meta.current_page
      : null
    state.pagination.totalPages = statuses.meta ? statuses.meta.last_page : null
    state.statusesCount = statuses.meta
      ? statuses.meta.total
      : state.statuses.length
  },
  SET_STATUS(state, status) {
    state.status = status
  },
  ADD_STATUS(state, status) {
    state.statuses.push(status)
  },
  UPDATE_STATUS(state, status) {
    const statusIndex = state.statuses.findIndex((element) => {
      return element.data.id === status.id
    })
    this._vm.$set(state.statuses, statusIndex, status)
  },
}
export const actions = {
  fetchStatuses({ commit }, page) {
    return this.$StatusService.getStatuses(page).then((response) => {
      commit('SET_STATUSES', response.data)
    })
  },
  fetchStatusesNoPagination({ commit, state }) {
    if (state.statuses.length === state.statusesCount) {
      return state.statuses
    }
    return this.$StatusService.getStatusesNoPagination().then((response) => {
      commit('SET_STATUSES', response.data)
    })
  },
  fetchStatusById({ commit, getters, state }, id) {
    if (id === state.status.id) {
      return state.status
    }

    const status = getters.getStatusById(id)

    if (status) {
      commit('SET_STATUS', status)
      return status
    } else {
      return this.$StatusService.getStatus(id).then((response) => {
        commit('SET_STATUS', response.data.data)
        return response.data.data
      })
    }
  },
  createStatus({ commit }, status) {
    return this.$StatusService.createStatus(status).then((response) => {
      const data = response.data.data
      commit('SET_STATUS', data)
      commit('ADD_STATUS', data)
    })
  },
  updateStatus({ commit }, formData) {
    return this.$StatusService
      .updateStatus(formData.id, formData.form)
      .then((response) => {
        const data = response.data.data
        commit('SET_STATUS', data)
        commit('UPDATE_STATUS', data)
      })
  },
  deleteStatus({ commit, dispatch, state }, id) {
    return this.$StatusService.deleteStatus(id).then((response) => {
      dispatch('fetchStatusеs', state.pagination.currentPage)
    })
  },
}
export const getters = {
  getStatusById: (state) => (id) => {
    return state.statuses.find((status) => status.id === id)
  },
}
