export const state = () => ({
  owners: [],
  owner: {},
  ownersCount: null,
  pagination: {
    currentPage: null,
    totalPages: null,
  },
})
export const mutations = {
  SET_OWNERS(state, owners) {
    state.owners = owners.data
    state.pagination.currentPage = owners.meta ? owners.meta.current_page : null
    state.pagination.totalPages = owners.meta ? owners.meta.last_page : null
    state.ownersCount = owners.meta ? owners.meta.total : state.owners.length
  },
  SET_OWNER(state, owner) {
    state.owner = owner
  },
  ADD_OWNER(state, owner) {
    state.owners.push(owner)
  },
  UPDATE_OWNER(state, owner) {
    const ownerIndex = state.owners.findIndex((element) => {
      return element.data.id === owner.id
    })
    this._vm.$set(state.owners, ownerIndex, owner)
  },
}
export const actions = {
  fetchOwners({ commit }, page) {
    return this.$OwnerService.getOwners(page).then((response) => {
      commit('SET_OWNERS', response.data)
    })
  },
  fetchOwnersNoPagination({ commit, state }) {
    if (state.owners.length === state.ownersCount) {
      return state.owners
    }
    return this.$OwnerService.getOwnersNoPagination().then((response) => {
      commit('SET_OWNERS', response.data)
    })
  },
  fetchOwnerById({ commit, getters, state }, id) {
    if (id === state.owner.id) {
      return state.owner
    }

    const owner = getters.getOwnerById(id)

    if (owner) {
      commit('SET_OWNER', owner)
      return owner
    } else {
      return this.$OwnerService.getOwner(id).then((response) => {
        commit('SET_OWNER', response.data.data)
        return response.data.data
      })
    }
  },
  createOwner({ commit }, owner) {
    return this.$OwnerService.createOwner(owner).then((response) => {
      const data = response.data.data
      commit('SET_OWNER', data)
      commit('ADD_OWNER', data)
    })
  },
  updateOwner({ commit }, formData) {
    return this.$OwnerService
      .updateOwner(formData.id, formData.form)
      .then((response) => {
        const data = response.data.data
        commit('SET_OWNER', data)
        commit('UPDATE_OWNER', data)
      })
  },
  deleteOwner({ commit, dispatch, state }, id) {
    return this.$OwnerService.deleteOwner(id).then((response) => {
      dispatch('fetchOwners', state.pagination.currentPage)
    })
  },
}
export const getters = {
  getOwnerById: (state) => (id) => {
    return state.owners.find((owner) => owner.id === id)
  },
}
