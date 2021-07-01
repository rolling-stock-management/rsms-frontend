export const state = () => ({
  images: [],
  image: {},
  imagesCount: null,
  pagination: {
    currentPage: null,
    totalPages: null,
  },
})
export const mutations = {
  SET_IMAGES(state, images) {
    state.images = images.data
    state.pagination.currentPage = images.meta ? images.meta.current_page : null
    state.pagination.totalPages = images.meta ? images.meta.last_page : null
    state.imagesCount = images.meta ? images.meta.total : state.images.length
  },
  SET_IMAGE(state, image) {
    state.image = image
  },
  ADD_IMAGE(state, image) {
    state.images.push(image)
  },
  UPDATE_IMAGE(state, image) {
    const imageIndex = state.images.findIndex((element) => {
      return element.data.id === image.id
    })
    this._vm.$set(state.images, imageIndex, image)
  },
}
export const actions = {
  fetchImages({ commit }, page) {
    return this.$ImageService.getImages(page).then((response) => {
      commit('SET_IMAGES', response.data)
    })
  },
  fetchImageById({ commit, getters, state }, id) {
    if (id === state.image.id) {
      return state.image
    }

    const image = getters.getImageById(id)

    if (image) {
      commit('SET_IMAGE', image)
      return image
    } else {
      return this.$ImageService.getImage(id).then((response) => {
        commit('SET_IMAGE', response.data.data)
        return response.data
      })
    }
  },
  createImage({ commit }, image) {
    return this.$ImageService.createImage(image).then((response) => {
      const data = response.data.data
      commit('SET_IMAGE', data)
      commit('ADD_IMAGE', data)
    })
  },
  updateImage({ commit }, formData) {
    return this.$ImageService
      .updateImage(formData.id, formData.form)
      .then((response) => {
        const data = response.data.data
        commit('SET_IMAGE', data)
        commit('UPDATE_IMAGE', data)
      })
  },
  deleteImage({ commit, dispatch, state }, id) {
    return this.$ImageService.deleteImage(id).then((response) => {
      dispatch('fetchImages', state.pagination.currentPage)
    })
  },
}
export const getters = {
  getImageById: (state) => (id) => {
    return state.images.find((image) => image.id === id)
  },
}
