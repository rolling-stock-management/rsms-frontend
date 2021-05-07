<template>
  <b-container>
    <b-card
      header="Подаване на сигнал за нередност"
      header-class="h2 text-center"
      class="mt-4"
    >
      <b-alert show variant="danger"
        >Забележка: Сайтът не е в официална връзка с „БДЖ – Пътнически
        превози“.</b-alert
      >
      <b-form v-if="show" @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="input-group-1"
          label="Email адрес:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            placeholder="Въведете e-mail за връзка..."
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <label for="searchTrain">Номер на влак</label>
          <SearchField
            id="searchTrain"
            mode="train_id"
            placeholder="Въведете номера на влака, с който сте пътували и го изберете от резултатите."
            route="/trains-search"
            @updateid="trainChoiceHandler"
          ></SearchField>
          <b-form-text
            >Номерът на влака можете да откриете записан на билета
            Ви.</b-form-text
          >
          <div v-if="selectedTrain">
            <label><b>Избран влак:</b></label> {{ selectedTrain }}
          </div>
        </b-form-group>
        <b-form-group
          id="inputPosition"
          label="Номер на вагона във влака (по посока на движението)"
          label-for="inputPosition"
        >
          <b-form-input
            id="inputPosition"
            v-model="form.wagon_number"
            type="number"
            placeholder="Въведете номер на вагона във влака (по посока на движението): 1, 2, 3 и т.н."
            min="1"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <label for="datepickerDate">Дата на пътуването</label>
          <b-form-datepicker
            id="datepickerDate"
            v-model="form.date"
            today-button
            class="mb-2"
            placeholder="Изберете дата на пътуването"
            required
            :date-format-options="{
              year: '2-digit',
              month: '2-digit',
              day: '2-digit',
            }"
          ></b-form-datepicker>
        </b-form-group>
        <b-form-group
          id="inputProblem"
          label="Описание на проблема"
          label-for="inputProblem"
        >
          <b-form-textarea
            id="inputProblem"
            v-model="form.problem_description"
            placeholder="Въведете описание на проблема..."
            rows="3"
            max-rows="6"
            required
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

        <div class="d-flex justify-content-end">
          <b-button type="reset" variant="outline-warning" class="mx-1"
            >Изчистване</b-button
          >
          <b-button type="submit" variant="outline-success">Добавяне</b-button>
        </div>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
import SearchField from '~/components/SearchField'

export default {
  components: {
    SearchField,
  },
  data() {
    return {
      form: {
        email: '',
        date: null,
        wagon_number: null,
        problem_description: '',
        train_id: null,
      },
      show: true,
      selectedTrain: null,
      file: null,
    }
  },
  async fetch() {
    await this.$axios.$get('sanctum/csrf-cookie')
  },
  computed: mapState({
    passengerReport: (state) => state.passengerReports.passengerReport,
  }),
  watch: {
    passengerReport(val) {
      this.$router.push({
        name: 'submit-thanks',
      })
    },
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault()
      const fd = new FormData()
      fd.append('image', this.file)
      fd.append('email', this.form.email)
      fd.append('date', this.form.date)
      fd.append('wagon_number', this.form.wagon_number)
      fd.append('problem_description', this.form.problem_description)
      fd.append('train_id', this.form.train_id)
      await this.$store.dispatch('passengerReports/createPassengerReport', fd)
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ''

      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    trainChoiceHandler(event) {
      this.form.train_id = event.id
      this.selectedTrain = event.number
    },
  },
}
</script>
