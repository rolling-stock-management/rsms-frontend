<template>
  <b-card v-if="enabled" class="mb-2">
    <div class="d-flex justify-content-between">
      <p>Избиранe на подвижен състав:</p>
      <p>
        <b-button v-if="canBeClosed" variant="outline" @click="handleClose"
          >X</b-button
        >
      </p>
    </div>
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
    enabled: {
      type: Boolean,
      required: true,
      default: false,
    },
    canBeClosed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      selectedType: {
        name: null,
        search: '',
      },
      oldSelectedType: null,
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
      this.$emit('changedSelected', {
        newType: this.selectedType,
        oldType: this.oldSelectedType,
      })
      this.oldSelectedType = this.selectedType
    },
    handleClose() {
      this.$emit('close', {
        type: this.selectedType.name,
        items: [],
      })
    },
  },
}
</script>
