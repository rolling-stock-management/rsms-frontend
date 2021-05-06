export const state = () => ({
  rollingStockTrains: [],
  rollingStockTrain: {},
  rollingStockTrainsCount: null,
  pagination: {
    currentPage: null,
    totalPages: null,
  },
})
export const mutations = {
  SET_ROLLING_STOCK_TRAINS(state, rollingStockTrains) {
    state.rollingStockTrains = rollingStockTrains.data
    state.pagination.currentPage = rollingStockTrains.meta
      ? rollingStockTrains.meta.current_page
      : null
    state.pagination.totalPages = rollingStockTrains.meta
      ? rollingStockTrains.meta.last_page
      : null
    state.rollingStockTrainsCount = rollingStockTrains.meta
      ? rollingStockTrains.meta.total
      : null
  },
  SET_ROLLING_STOCK_TRAIN(state, rollingStockTrain) {
    state.rollingStockTrain = rollingStockTrain
  },
  ADD_ROLLING_STOCK_TRAIN(state, rollingStockTrain) {
    state.rollingStockTrains.push(rollingStockTrain)
  },
  UPDATE_ROLLING_STOCK_TRAIN(state, rollingStockTrain) {
    const rollingStockTrainIndex = state.rollingStockTrains.findIndex(
      (element) => {
        return element.data.id === rollingStockTrain.id
      }
    )
    this._vm.$set(
      state.rollingStockTrains,
      rollingStockTrainIndex,
      rollingStockTrain
    )
  },
}
export const actions = {
  fetchRollingStockTrains({ commit }, { page, type }) {
    return this.$RollingStockTrainService
      .getRollingStockTrains(page, type)
      .then((response) => {
        commit('SET_ROLLING_STOCK_TRAINS', response.data)
      })
  },
  fetchRollingStockTrainsWithFilters({ commit }, query) {
    const page = query.page
    const filters = query.filter
    const type = query.type
    return this.$RollingStockTrainService
      .getRollingStockTrainsWithFilters(page, type, filters)
      .then((response) => {
        commit('SET_ROLLING_STOCK_TRAINS', response.data)
      })
  },
  fetchRollingStockTrainById({ commit, getters, state }, id) {
    if (id === state.rollingStockTrain.id) {
      return state.rollingStockTrain
    }

    const rollingStockTrain = getters.getRollingStockTrainById(id)

    if (rollingStockTrain) {
      commit('SET_ROLLING_STOCK_TRAIN', rollingStockTrain)
      return rollingStockTrain
    } else {
      return this.$RollingStockTrainService
        .getRollingStockTrain(id)
        .then((response) => {
          commit('SET_ROLLING_STOCK_TRAIN', response.data.data)
          return response.data.data
        })
    }
  },
  createRollingStockTrain({ commit }, rollingStockTrain) {
    return this.$RollingStockTrainService
      .createRollingStockTrain(rollingStockTrain)
      .then((response) => {
        const data = response.data.data
        commit('SET_ROLLING_STOCK_TRAIN', data)
        commit('ADD_ROLLING_STOCK_TRAIN', data)
      })
  },
  updateRollingStockTrain({ commit }, formData) {
    return this.$RollingStockTrainService
      .updateRollingStockTrain(formData.id, formData.form)
      .then((response) => {
        const data = response.data.data
        commit('SET_ROLLING_STOCK_TRAIN', data)
        commit('UPDATE_ROLLING_STOCK_TRAIN', data)
      })
  },
  deleteRollingStockTrain({ commit, dispatch, state }, id) {
    return this.$RollingStockTrainService
      .deleteRollingStockTrain(id)
      .then((response) => {
        dispatch('fetchRollingStockTrains', state.pagination.currentPage)
      })
  },
}
export const getters = {
  getRollingStockTrainById: (state) => (id) => {
    return state.rollingStockTrains.find(
      (rollingStockTrain) => rollingStockTrain.id === id
    )
  },
}
