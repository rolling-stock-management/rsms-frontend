<template>
  <div>
    <div class="container-fluid">
      <h3 class="py-3 text-center">
        Снимкова галерия – последно качени снимки
      </h3>
      <hr />
      <div class="d-flex justify-content-center py-2">
        <b-button
          v-if="this.$auth.loggedIn"
          v-b-modal.modal-1
          variant="outline-success"
          >Качи снимка!</b-button
        >
        <CreateModal></CreateModal>
      </div>
      <div
        class="row row-cols-1 row-cols-md-2 row-cols-lg-4 w-75 mx-auto bg-light rounded"
      >
        <div v-for="(set, id) in images" :key="id" class="col px-1">
          <b-card v-for="image in set" :key="image.data.id" class="my-1">
            <a :href="$img('/images/' + image.data.file_name)">
              <nuxt-img
                :src="'/images/thumbnails/' + image.data.file_name"
                class="img-thumbnail py-1"
              />
              <b-card-text class="text-center">{{
                image.data.title
              }}</b-card-text>
            </a>
          </b-card>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CreateModal from '~/components/ImageCrateModal'

export default {
  components: {
    CreateModal,
  },
  data() {
    return {
      modalOpen: false,
    }
  },
  async fetch({ store, error, query }) {
    try {
      const page = query.page ? query.page : 1
      await store.dispatch('images/fetchImages', { page, chunkSize: 3 })
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за снимки. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    images: (state) => state.images.images,
    imagesCount: (state) => state.images.imagesCount,
    pagination: (state) => state.images.pagination,
  }),
}
</script>
