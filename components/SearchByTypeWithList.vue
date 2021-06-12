<template>
  <b-card class="mb-2">
    <p>Избиранe на подвижен състав:</p>
    <b-input-group class="d-block d-lg-flex mb-2">
      <template #prepend
        ><b-form-select
          v-model="selectedType"
          :options="options"
          class="mb-2 mb-lg-0 mr-lg-2"
          @input="handleSelect"
        ></b-form-select
      ></template>
      <SearchField
        id="searchField"
        mode="return_id"
        placeholder="Търсене на подвижен състав..."
        :route="selectedType.search"
        position="relative"
        class="flex-grow-1"
        @updateid="addImageable"
      ></SearchField>
    </b-input-group>
    <p>
      Избран подвижен състав: {{ imageablesList.length === 0 ? 'Няма.' : '' }}
    </p>
    <b-list-group>
      <b-list-group-item v-for="(imageable, id) in imageablesList" :key="id">
        <button
          type="button"
          class="btn btn-sm"
          @click="removeImageable(imageable)"
        >
          X</button
        >{{ imageable }}</b-list-group-item
      >
    </b-list-group>
  </b-card>
</template>

<script>
import SearchField from '~/components/SearchField.vue'

export default {
  components: {
    SearchField,
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedType: {
        name: null,
        search: '',
      },
      imageablesList: [],
      imageablesIds: [],
    }
  },
  methods: {
    addImageable(event) {
      const index = this.imageablesIds.indexOf(event.id)
      if (index === -1) {
        this.imageablesIds.push(event.id)
        this.imageablesList.push(event.stylized_number)
        this.emitArrayUpdateEvent()
      }
    },
    removeImageable(imageable) {
      const index = this.imageablesList.indexOf(imageable)
      if (index !== -1) {
        this.imageablesList.splice(index, 1)
        this.imageablesIds.splice(index, 1)
        this.emitArrayUpdateEvent()
      }
    },
    emitArrayUpdateEvent() {
      this.$emit('updateArray', {
        type: this.selectedType.name,
        items: this.imageablesIds,
      })
    },
    handleSelect() {
      let arrayIndex = -1
      this.options.forEach((element, index) => {
        if (element.value?.name === this.selectedType.name) {
          arrayIndex = index
        }
      })
      this.$emit('changedSelected', {
        arrayIndex,
      })
    },
  },
}
</script>
