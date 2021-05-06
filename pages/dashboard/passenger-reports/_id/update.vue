<template>
  <div class="my-2">
    <h4>Промяна на сигнал за нередност</h4>
    <hr />
    <b-form v-if="show" @submit="onSubmit" @reset="onReset">
      <b-form-group>
        <label for="searchField">Добавяне на вагон към сигнала</label>
        <SearchField
          id="searchField"
          mode="return_id"
          placeholder="Търсене на вагон..."
          route="/passenger-wagons-search"
          :value="selectedWagon"
          @updateid="wagonChoiceHandler"
        ></SearchField>
        <div v-if="selectedWagon">
          <label><b>Избран вагон:</b></label> {{ selectedWagon }}
        </div>
      </b-form-group>
      <b-form-group>
        <label for="searchTrain">Номер на влак</label>
        <SearchField
          id="searchTrain"
          mode="train_id"
          placeholder="Търсене на влак..."
          route="/trains-search"
          @updateid="trainChoiceHandler"
        ></SearchField>
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
          placeholder="Въведете номер на вагона във влака (по посока на движението)"
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

      <div class="d-flex justify-content-end">
        <b-button
          type="button"
          :to="'/dashboard/passenger-reports?type=' + this.$route.query.type"
          variant="outline-danger"
          >Отказ</b-button
        >
        <b-button type="reset" variant="outline-warning" class="mx-1"
          >Изчистване</b-button
        >
        <b-button type="submit" variant="outline-success">Промяна</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  middleware: 'hasPermission',
  meta: {
    auth: { permission: 'repair-update' },
  },
  data() {
    return {
      form: {
        date: this.$store.state.passengerReports.passengerReport.date,
        problem_description: this.$store.state.passengerReports.passengerReport
          .problem_description,
        wagon_number: this.$store.state.passengerReports.passengerReport
          .wagon_number,
        train_id: this.$store.state.passengerReports.passengerReport.train.data
          .id,
        wagon_id: this.$store.state.passengerReports.passengerReport.wagon
          ? this.$store.state.passengerReports.passengerReport.wagon.data.id
          : null,
      },
      show: true,
      selectedTrain: this.$store.state.passengerReports.passengerReport.train
        .data.number,
      selectedWagon: this.$store.state.passengerReports.passengerReport.wagon
        ? this.$store.state.passengerReports.passengerReport.wagon.data
            .stylized_number
        : null,
    }
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch(
        'passengerReports/fetchPassengerReportById',
        params.id
      )
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Неуспешно взимане на информацията. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    passengerReport: (state) => state.passengerReports.passengerReport,
  }),
  watch: {
    passengerReport(val) {
      this.$router.push({
        name: 'dashboard-passenger-reports-id',
        params: { id: val.id },
      })
    },
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault()
      try {
        this.form.repairable_type = this.$route.query.type
        await this.$store.dispatch('passengerReports/updatePassengerReport', {
          id: this.$route.params.id,
          form: this.form,
        })
      } catch (error) {
        error({
          statusCode: 503,
          message: 'Неуспешно обновяване на ремонт. Моля, опитайте по-късно.',
        })
      }
    },
    onReset(event) {
      event.preventDefault()
      // Reset form values
      this.form.date = this.$store.state.passengerReports.passengerReport.date
      this.form.problem_description = this.$store.state.passengerReports.passengerReport.problem_description
      this.form.wagon_number = this.$store.state.passengerReports.passengerReport.wagon_number
      this.form.train_id = this.$store.state.passengerReports.passengerReport.train.data.id
      this.form.wagon_id = this.$store.state.passengerReports.passengerReport
        .wagon
        ? this.$store.state.passengerReports.passengerReport.wagon.data.id
        : null

      this.selectedTrain = this.$store.state.passengerReports.passengerReport.train.data.number
      this.selectedWagon = this.$store.state.passengerReports.passengerReport
        .wagon
        ? this.$store.state.passengerReports.passengerReport.wagon.data.number
        : null

      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    trainChoiceHandler(event) {
      this.form.train_id = event.id
      this.selectedTrain = event.number
    },
    wagonChoiceHandler(event) {
      this.form.wagon_id = event.id
      this.selectedWagon = event.stylized_number
    },
  },
}
</script>
