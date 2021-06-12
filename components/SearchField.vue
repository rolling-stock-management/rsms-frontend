<template>
  <div>
    <div>
      <input
        id="searchTerm"
        v-model="searchTerm"
        type="text"
        class="form-control"
        :placeholder="placeholder"
        @input="search"
        @focus="focus = true"
      />
    </div>

    <div
      v-if="focus && searchTerm != 0"
      :class="'bg-light rounded-lg p-4 position-' + position"
    >
      <div v-if="results == 0 && searchTerm != 0">
        Не са намерени резултати за '{{ searchTerm }}'
      </div>
      <div v-for="(result, id) in results" :key="id" @click="focus = false">
        <router-link
          v-if="mode === 'link'"
          class="text-body"
          :to="link + result.data.id"
          >{{ result.data.stylized_number }}</router-link
        >
        <router-link
          v-if="mode === 'train_link'"
          class="text-body"
          :to="link + result.data.id"
          >{{ result.data.number }}</router-link
        >
        <p
          v-if="mode === 'train_id'"
          class="text-body"
          @click="
            $emit('updateid', {
              id: result.data.id,
              number: result.data.number,
            })
          "
        >
          {{ result.data.number }}
        </p>
        <p
          v-if="mode === 'return_id'"
          class="text-body"
          @click="
            $emit('updateid', {
              id: result.data.id,
              stylized_number: result.data.stylized_number,
            })
          "
        >
          {{ result.data.stylized_number }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    mode: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Търсене...',
    },
    route: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: false,
      default: '',
    },
    link: {
      type: String,
      required: false,
      default: '/dashboard',
    },
    position: {
      type: String,
      required: false,
      default: 'absolute',
    },
  },
  data() {
    return {
      searchTerm: this.value,
      focus: false,
      results: [],
    }
  },
  watch: {
    data(val) {
      this.searchTerm = val
    },
  },
  methods: {
    search: _.debounce(async function () {
      if (this.searchTerm.length < 3) {
        return
      }
      try {
        const response = await this.$axios.post(this.route, {
          search_term: this.searchTerm,
        })
        this.results = response.data.data
      } catch (error) {
        error({
          statusCode: 503,
          message:
            'Неуспешно взимане на информацията за пътнически вагони. Моля, опитайте по-късно.',
        })
      }
    }, 300),
  },
}
</script>
