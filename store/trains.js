export const state = () => ({
  trains: [],
  train: {},
  trainsCount: null,
  pagination: {
    currentPage: null,
    totalPages: null,
  },
})
export const mutations = {
  SET_TRAINS(state, trains) {
    state.trains = trains.data
    state.pagination.currentPage = trains.meta ? trains.meta.current_page : null
    state.pagination.totalPages = trains.meta ? trains.meta.last_page : null
    state.trainsCount = trains.meta ? trains.meta.total : state.trains.length
  },
  SET_TRAIN(state, train) {
    state.train = train
  },
  ADD_TRAIN(state, train) {
    state.trains.push(train)
  },
  UPDATE_TRAIN(state, train) {
    const trainIndex = state.trains.findIndex((element) => {
      return element.data.id === train.id
    })
    this._vm.$set(state.trains, trainIndex, train)
  },
}
export const actions = {
  fetchTrains({ commit }, page) {
    return this.$TrainService.getTrains(page).then((response) => {
      commit('SET_TRAINS', response.data)
    })
  },
  fetchTrainsNoPagination({ commit, state }) {
    if (state.trains.length === state.trainsCount) {
      return state.trains
    }
    return this.$TrainService.getTrainsNoPagination().then((response) => {
      commit('SET_TRAINS', response.data)
    })
  },
  fetchTrainById({ commit, getters, state }, id) {
    if (id === state.train.id) {
      return state.train
    }

    const train = getters.getTrainById(id)

    if (train) {
      commit('SET_TRAIN', train)
      return train
    } else {
      return this.$TrainService.getTrain(id).then((response) => {
        commit('SET_TRAIN', response.data.data)
        return response.data.data
      })
    }
  },
  createTrain({ commit }, train) {
    return this.$TrainService.createTrain(train).then((response) => {
      const data = response.data.data
      commit('SET_TRAIN', data)
      commit('ADD_TRAIN', data)
    })
  },
  updateTrain({ commit }, formData) {
    return this.$TrainService
      .updateTrain(formData.id, formData.form)
      .then((response) => {
        const data = response.data.data
        commit('SET_TRAIN', data)
        commit('UPDATE_TRAIN', data)
      })
  },
  deleteTrain({ commit, dispatch, state }, id) {
    return this.$TrainService.deleteTrain(id).then((response) => {
      dispatch('fetchTrains', state.pagination.currentPage)
    })
  },
}
export const getters = {
  getTrainById: (state) => (id) => {
    return state.trains.find((train) => train.id === id)
  },
}
