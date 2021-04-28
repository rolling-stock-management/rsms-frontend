export const state = () => ({
  repairs: [],
  repair: {},
  repairsCount: null,
  pagination: {
    currentPage: null,
    totalPages: null,
  },
})
export const mutations = {
  SET_REPAIRS(state, repairs) {
    state.repairs = repairs.data
    state.pagination.currentPage = repairs.meta
      ? repairs.meta.current_page
      : null
    state.pagination.totalPages = repairs.meta ? repairs.meta.last_page : null
    state.repairsCount = repairs.meta ? repairs.meta.total : null
  },
  SET_REPAIR(state, repair) {
    state.repair = repair
  },
  ADD_REPAIR(state, repair) {
    state.repairs.push(repair)
  },
  UPDATE_REPAIR(state, repair) {
    const repairIndex = state.repairs.findIndex((element) => {
      return element.data.id === repair.id
    })
    this._vm.$set(state.repairs, repairIndex, repair)
  },
}
export const actions = {
  fetchRepairs({ commit }, { page, type }) {
    return this.$RepairService.getRepairs(page, type).then((response) => {
      commit('SET_REPAIRS', response.data)
    })
  },
  fetchRepairById({ commit, getters, state }, id) {
    if (id === state.repair.id) {
      return state.repair
    }

    const repair = getters.getRepairById(id)

    if (repair) {
      commit('SET_REPAIR', repair)
      return repair
    } else {
      return this.$RepairService.getRepair(id).then((response) => {
        commit('SET_REPAIR', response.data.data)
        return response.data.data
      })
    }
  },
  createRepair({ commit }, repair) {
    return this.$RepairService.createRepair(repair).then((response) => {
      const data = response.data.data
      commit('SET_REPAIR', data)
      commit('ADD_REPAIR', data)
    })
  },
  updateRepair({ commit }, formData) {
    return this.$RepairService
      .updateRepair(formData.id, formData.form)
      .then((response) => {
        const data = response.data.data
        commit('SET_REPAIR', data)
        commit('UPDATE_REPAIR', data)
      })
  },
  deleteRepair({ commit, dispatch, state }, id) {
    return this.$RepairService.deleteRepair(id).then((response) => {
      dispatch('fetchRepairs', state.pagination.currentPage)
    })
  },
}
export const getters = {
  getRepairById: (state) => (id) => {
    return state.repairs.find((repair) => repair.id === id)
  },
}
