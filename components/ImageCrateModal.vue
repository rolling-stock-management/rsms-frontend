<template>
  <b-modal id="modal-1" title="Качване на снимка" scrollable centered size="lg">
    <b-form v-if="show" @submit="onSubmit">
      <b-form-group id="inputTitle" label="Заглавие" label-for="inputTitle">
        <b-form-input
          id="inputTitle"
          v-model="form.title"
          placeholder="Въведете заглавие на синмката..."
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group>
        <label for="datepickerDate">Дата</label>
        <b-form-datepicker
          id="datepickerDate"
          v-model="form.date"
          today-button
          class="mb-2"
          placeholder="Изберете дата"
          required
          :date-format-options="{
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
          }"
        ></b-form-datepicker>
      </b-form-group>
      <b-form-group
        id="inputDescription"
        label="Описание на снимката"
        label-for="inputDescription"
      >
        <b-form-textarea
          id="inputDescription"
          v-model="form.description"
          placeholder="Въведете описание на снимката..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-form-group>
      <b-form-group
        id="inputImage"
        label="Прикачване на изображение"
        label-for="inputImage"
      >
        <b-form-file
          id="inputImage"
          v-model="file"
          accept="image/*"
          plain
        ></b-form-file>
      </b-form-group>
      <SearchByTypeWithList
        :options="options"
        @changedSelected="updateOptions"
      ></SearchByTypeWithList>
      <!-- TODO: Dynamically add new instances of the component -->
    </b-form>
    <template #modal-footer="{ hide }">
      <b-button type="button" variant="outline-danger" @click="hide('forget')"
        >Отказ</b-button
      >
      <b-button type="submit" variant="outline-success" @click="onSubmit()"
        >Добавяне</b-button
      >
    </template>
  </b-modal>
</template>

<script>
import SearchByTypeWithList from '~/components/SearchByTypeWithList.vue'

export default {
  components: {
    SearchByTypeWithList,
  },
  data() {
    return {
      form: {
        title: '',
        description: '',
        date: '',
        imageables: {
          passenger: [],
          freight: [],
          tractive: [],
        },
      },
      show: true,
      file: null,
      options: [
        { value: null, text: 'Избиране...', disabled: true },
        {
          value: { name: 'passenger', search: '/passenger-wagons-search' },
          text: 'Пътнически вагони',
          disabled: false,
        },
        {
          value: { name: 'tractive', search: '/tractive-units-search' },
          text: 'Локомотиви',
          disabled: false,
        },
        {
          value: { name: 'freight', search: '/freight-wagons-search' },
          text: 'Товарни вагони',
          disabled: false,
        },
      ],
    }
  },
  methods: {
    async onSubmit(event) {
      const fd = new FormData()
      fd.append('file', this.file)
      fd.append('title', this.form.title)
      fd.append('date', this.form.date)
      fd.append('description', this.form.description)
      fd.append('imageables', this.form.imageables)
      // TODO: Set up store for images.
      await this.$store.dispatch('images/createImage', fd)
    },
    updateOptions(event) {
      if (event.oldType != null) {
        this.options.forEach((element) => {
          if (element.value?.name === event.oldType.name) {
            element.disabled = false
          }
        })
      }
      this.options.forEach((element) => {
        if (element.value?.name === event.newType.name) {
          element.disabled = true
        }
      })
    },
  },
}
</script>
