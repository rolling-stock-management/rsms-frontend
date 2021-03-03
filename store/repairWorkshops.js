export const state = () => ({
  repairWorkshops: [],
  repairWorkshop: {},
  repairWorkshopsCount: null,
  pagination: {
    currentPage: null,
    totalPages: null,
  },
})
export const mutations = {
  SET_REPAIR_WORKSHOPS(state, repairWorkshops) {
    state.repairWorkshops = repairWorkshops.data
    state.pagination.currentPage = repairWorkshops.meta
      ? repairWorkshops.meta.current_page
      : null
    state.pagination.totalPages = repairWorkshops.meta
      ? repairWorkshops.meta.last_page
      : null
    state.repairWorkshopsCount = repairWorkshops.meta
      ? repairWorkshops.meta.total
      : null
  },
  SET_REPAIR_WORKSHOP(state, repairWorkshop) {
    state.repairWorkshop = repairWorkshop
  },
  ADD_REPAIR_WORKSHOP(state, repairWorkshop) {
    state.repairWorkshops.push(repairWorkshop)
  },
  UPDATE_REPAIR_WORKSHOP(state, repairWorkshop) {
    const repairWorkshopIndex = state.repairWorkshops.findIndex((element) => {
      return element.data.id === repairWorkshop.id
    })
    this._vm.$set(state.repairWorkshops, repairWorkshopIndex, repairWorkshop)
  },
}
export const actions = {
  fetchRepairWorkshops({ commit }, page) {
    return this.$RepairWorkshopService
      .getRepairWorkshops(page)
      .then((response) => {
        commit('SET_REPAIR_WORKSHOPS', response.data)
      })
  },
  fetchRepairWorkshopsNoPagination({ commit }) {
    return this.$RepairWorkshopService
      .getRepairWorkshopsNoPagination()
      .then((response) => {
        commit('SET_REPAIR_WORKSHOPS', response.data)
      })
  },
  fetchRepairWorkshopById({ commit, getters, state }, id) {
    if (id === state.repairWorkshop.id) {
      return state.repairWorkshop
    }

    const repairWorkshop = getters.getRepairWorkshopById(id)

    if (repairWorkshop) {
      commit('SET_REPAIR_WORKSHOP', repairWorkshop)
      return repairWorkshop
    } else {
      return this.$RepairWorkshopService
        .getRepairWorkshop(id)
        .then((response) => {
          commit('SET_REPAIR_WORKSHOP', response.data.data)
          return response.data.data
        })
    }
  },
  createRepairWorkshop({ commit }, repairWorkshop) {
    return this.$RepairWorkshopService
      .createRepairWorkshop(repairWorkshop)
      .then((response) => {
        const data = response.data.data
        commit('SET_REPAIR_WORKSHOP', data)
        commit('ADD_REPAIR_WORKSHOP', data)
      })
  },
  updateRepairWorkshop({ commit }, formData) {
    return this.$RepairWorkshopService
      .updateRepairWorkshop(formData.id, formData.form)
      .then((response) => {
        const data = response.data.data
        commit('SET_REPAIR_WORKSHOP', data)
        commit('UPDATE_REPAIR_WORKSHOP', data)
      })
  },
  deleteRepairWorkshop({ commit, dispatch, state }, id) {
    return this.$RepairWorkshopService
      .deleteRepairWorkshop(id)
      .then((response) => {
        dispatch('fetchRepairWorkshops', state.pagination.currentPage)
      })
  },
}
export const getters = {
  getRepairWorkshopById: (state) => (id) => {
    return state.repairWorkshops.find(
      (repairWorkshop) => repairWorkshop.id === id
    )
  },
}
