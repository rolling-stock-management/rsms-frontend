export default function ({ $axios }, inject) {
  const ImageService = {
    getImages(page) {
      return $axios.get('/images?page=' + page)
    },
    getImagesNoPagination() {
      return $axios.get('/images?no-pagination=1')
    },
    getImage(id) {
      return $axios.get('/images/' + id)
    },
    createImage(form) {
      return $axios.post('/images', form)
    },
    updateImage(id, form) {
      return $axios.patch('/images/' + id, form)
    },
    deleteImage(id) {
      return $axios.delete('images/' + id)
    },
  }

  inject('ImageService', ImageService)
}
