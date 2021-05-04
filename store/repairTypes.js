export const state = () => ({
  repairTypes: [],
  repairType: {},
  repairTypesCount: null,
  pagination: {
    currentPage: null,
    totalPages: null,
  },
})
export const mutations = {
  SET_REPAIR_TYPES(state, repairTypes) {
    state.repairTypes = repairTypes.data
    state.pagination.currentPage = repairTypes.meta
      ? repairTypes.meta.current_page
      : null
    state.pagination.totalPages = repairTypes.meta
      ? repairTypes.meta.last_page
      : null
    state.repairTypesCount = repairTypes.meta
      ? repairTypes.meta.total
      : state.repairTypes.lenght
  },
  SET_REPAIR_TYPE(state, repairType) {
    state.repairType = repairType
  },
  ADD_REPAIR_TYPE(state, repairType) {
    state.repairTypes.push(repairType)
  },
  UPDATE_REPAIR_TYPE(state, repairType) {
    const repairTypeIndex = state.repairTypes.findIndex((element) => {
      return element.data.id === repairType.id
    })
    this._vm.$set(state.repairTypes, repairTypeIndex, repairType)
  },
}
export const actions = {
  fetchRepairTypes({ commit }, page) {
    return this.$RepairTypeService.getRepairTypes(page).then((response) => {
      commit('SET_REPAIR_TYPES', response.data)
    })
  },
  fetchRepairTypesNoPagination({ commit, state }) {
    if (state.repairTypes.lenght === state.repairTypesCount) {
      return state.repairTypes
    }
    return this.$RepairTypeService
      .getRepairTypesNoPagination()
      .then((response) => {
        commit('SET_REPAIR_TYPES', response.data)
      })
  },
  fetchRepairTypeById({ commit, getters, state }, id) {
    if (id === state.repairType.id) {
      return state.repairType
    }

    const repairType = getters.getRepairTypeById(id)

    if (repairType) {
      commit('SET_REPAIR_TYPE', repairType)
      return repairType
    } else {
      return this.$RepairTypeService.getRepairType(id).then((response) => {
        commit('SET_REPAIR_TYPE', response.data.data)
        return response.data.data
      })
    }
  },
  createRepairType({ commit }, repairType) {
    return this.$RepairTypeService
      .createRepairType(repairType)
      .then((response) => {
        const data = response.data.data
        commit('SET_REPAIR_TYPE', data)
        commit('ADD_REPAIR_TYPE', data)
      })
  },
  updateRepairType({ commit }, formData) {
    return this.$RepairTypeService
      .updateRepairType(formData.id, formData.form)
      .then((response) => {
        const data = response.data.data
        commit('SET_REPAIR_TYPE', data)
        commit('UPDATE_REPAIR_TYPE', data)
      })
  },
  deleteRepairType({ commit, dispatch, state }, id) {
    return this.$RepairTypeService.deleteRepairType(id).then((response) => {
      dispatch('fetchRepairTypes', state.pagination.currentPage)
    })
  },
}
export const getters = {
  getRepairTypeById: (state) => (id) => {
    return state.repairTypes.find((repairType) => repairType.id === id)
  },
}
