export const state = () => ({
  depots: [],
})
export const mutations = {
  SET_DEPOTS(state, depots) {
    state.depots = depots
  },
}
export const actions = {
  fetchDepots({ commit }) {
    return this.$DepotService.getDepots().then((reseponse) => {
      commit('SET_DEPOTS', reseponse.data)
    })
  },
}
