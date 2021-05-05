<template>
  <div class="my-2">
    <h4>Редактиране на влак</h4>
    <hr />
    <b-form v-if="show" @submit="onSubmit" @reset="onReset">
      <b-form-group id="inputNumber" label="Номер" label-for="inputNumber">
        <b-form-input
          id="inputNumber"
          v-model="form.number"
          placeholder="Въведете номер на влак..."
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="inputRoute" label="Маршрут" label-for="inputRoute">
        <b-form-input
          id="inputRoute"
          v-model="form.route"
          placeholder="Въведете маршрут на влак..."
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="inputNote" label="Описание" label-for="inputNote">
        <b-form-input
          id="inputNote"
          v-model="form.note"
          placeholder="Въведете бележка на влак... (незадължително)"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="ГДВ" label-for="selectTimetable">
        <b-form-select
          id="selectTimetable"
          v-model="form.timetable_id"
          required
        >
          <b-form-select-option :value="null" disabled
            >&lt; няма &gt;</b-form-select-option
          >
          <b-form-select-option
            v-for="(timetable, id) in timetables"
            :key="id"
            :value="timetable.data.id"
            >{{ timetable.data.start_date }} -
            {{ timetable.data.end_date }}</b-form-select-option
          >
        </b-form-select>
      </b-form-group>
      <div class="d-flex justify-content-end">
        <b-button type="button" to="/dashboard/trains" variant="outline-danger"
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
    auth: { permission: 'train-update' },
  },
  data() {
    return {
      form: {
        number: this.$store.state.trains.train.number,
        route: this.$store.state.trains.train.route,
        note: this.$store.state.trains.train.note,
        timetable_id: this.$store.state.trains.train.timetable.id,
      },
      show: true,
    }
  },
  async fetch({ store, error, params }) {
    try {
      store.dispatch('timetables/fetchTimetablesNoPagination')
      await store.dispatch('trains/fetchTrainById', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за влак ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    train: (state) => state.trains.train,
    timetables: (state) => state.timetables.timetables,
  }),
  watch: {
    train(val) {
      this.$router.push({
        name: 'dashboard-trains-id',
        params: { id: val.id },
      })
    },
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault()
      try {
        await this.$store.dispatch('trains/updateTrain', {
          id: this.$route.params.id,
          form: this.form,
        })
      } catch (error) {
        error({
          statusCode: 503,
          message:
            'Неуспешно обновяване на информацията за влак ' +
            this.$route.params.id +
            '. Моля, опитайте по-късно.',
        })
      }
    },
    onReset(event) {
      event.preventDefault()
      // Reset form values
      this.form.number = this.$store.state.trains.train.number
      this.form.route = this.$store.state.trains.train.route
      this.form.note = this.$store.state.trains.train.note
      this.form.timetable_id = this.$store.state.trains.train.timetable.id

      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>
