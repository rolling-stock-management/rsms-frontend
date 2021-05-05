<template>
  <div class="my-2">
    <h4>Редактиране на ГДВ</h4>
    <hr />
    <b-form v-if="show" @submit="onSubmit" @reset="onReset">
      <b-form-group>
        <label for="datepickerStartDate">Дата от</label>
        <b-form-datepicker
          id="datepickerStartDate"
          v-model="form.start_date"
          class="mb-2"
          :date-format-options="{
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
          }"
        ></b-form-datepicker>
      </b-form-group>
      <b-form-group>
        <label for="datepickerEndDate">Дата до</label>
        <b-form-datepicker
          id="datepickerEndDate"
          v-model="form.end_date"
          class="mb-2"
          :date-format-options="{
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
          }"
        ></b-form-datepicker>
      </b-form-group>
      <div class="d-flex justify-content-end">
        <b-button
          type="button"
          to="/dashboard/timetables"
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
    auth: { permission: 'timetable-update' },
  },
  data() {
    return {
      form: {
        start_date: this.$store.state.timetables.timetable.start_date,
        end_date: this.$store.state.timetables.timetable.end_date,
      },
      show: true,
    }
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('timetables/fetchTimetableById', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за ГДВ ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    timetable: (state) => state.timetables.timetable,
  }),
  watch: {
    timetable(val) {
      this.$router.push({
        name: 'dashboard-timetables-id',
        params: { id: val.id },
      })
    },
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault()
      try {
        await this.$store.dispatch('timetables/updateTimetable', {
          id: this.$route.params.id,
          form: this.form,
        })
      } catch (error) {
        error({
          statusCode: 503,
          message:
            'Неуспешно обновяване на информацията за ГДВ ' +
            this.$route.params.id +
            '. Моля, опитайте по-късно.',
        })
      }
    },
    onReset(event) {
      event.preventDefault()
      // Reset form values
      this.form.start_date = this.$store.state.timetables.timetable.start_date
      this.form.end_date = this.$store.state.timetables.timetable.end_date

      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>
