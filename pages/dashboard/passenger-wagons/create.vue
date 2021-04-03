<template>
  <div class="my-2">
    <h4>Добавяне на пътнически вагон</h4>
    <hr />
    <b-form v-if="show" @submit="onSubmit" @reset="onReset">
      <b-form-group id="inputName" label="Номер" label-for="inputName">
        <b-form-input
          id="inputName"
          v-model="form.number"
          placeholder="Въведете номер на вагон..."
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="inputLetterMarking"
        label="Означение"
        label-for="inputName"
      >
        <b-form-input
          id="inputLetterMarking"
          v-model="form.letter_marking"
          placeholder="Въведете означение на вагон..."
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Собственик" label-for="selectOwner">
        <b-form-select id="selectOwner" v-model="form.owner_id" required>
          <b-form-select-option :value="null" disabled
            >&lt; няма &gt;</b-form-select-option
          >
          <b-form-select-option
            v-for="(owner, id) in owners"
            :key="id"
            :value="owner.data.id"
            >{{ owner.data.name }}</b-form-select-option
          >
        </b-form-select>
      </b-form-group>
      <b-form-group label="Статус" label-for="selectStatus">
        <b-form-select id="selectStatus" v-model="form.status_id" required>
          <b-form-select-option :value="null" disabled
            >&lt; няма &gt;</b-form-select-option
          >
          <b-form-select-option
            v-for="(status, id) in statuses"
            :key="id"
            :value="status.data.id"
            >{{ status.data.name }}</b-form-select-option
          >
        </b-form-select>
      </b-form-group>
      <b-form-group id="inputTare" label="Тара" label-for="inputTare">
        <b-form-input
          id="inputTare"
          v-model="form.tare"
          placeholder="Въведете тара на вагон..."
          type="number"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="inputTotalWeight"
        label="Брутна маса"
        label-for="inputTotalWeight"
      >
        <b-form-input
          id="inputTotalWeight"
          v-model="form.total_weight"
          placeholder="Въведете брутна маса на вагон..."
          type="number"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="inputSeats"
        label="Брой седящи места"
        label-for="inputSeats"
      >
        <b-form-input
          id="inputSeats"
          v-model="form.seats_count"
          placeholder="Въведете брой седящи места на вагон..."
          type="number"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="inputMaxSpeed"
        label="Макисмална скорост"
        label-for="inputMaxSpeed"
      >
        <b-form-input
          id="inputMaxSpeed"
          v-model="form.max_speed"
          placeholder="Въведете макисмална скорост на вагон..."
          type="number"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="inputLength" label="Дължина" label-for="inputLength">
        <b-form-input
          id="inputLength"
          v-model="form.length"
          placeholder="Въведете дължина на вагон..."
        ></b-form-input>
      </b-form-group>
      <b-form-group id="inputBrake" label="Спирачка" label-for="inputBrake">
        <b-form-input
          id="inputBrake"
          v-model="form.brake_marking"
          placeholder="Въведете спирачка на вагон..."
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Депо" label-for="selectDepot">
        <b-form-select id="selectDepot" v-model="form.depot_id">
          <b-form-select-option :value="null"
            >&lt; няма &gt;</b-form-select-option
          >
          <b-form-select-option
            v-for="(depot, id) in depots"
            :key="id"
            :value="depot.data.id"
            >{{ depot.data.name }}</b-form-select-option
          >
        </b-form-select>
      </b-form-group>
      <b-form-group>
        <label for="datepickerRepairDate">Дата на последен ремонт</label>
        <b-form-datepicker
          id="datepickerRepairDate"
          v-model="form.repair_date"
          class="mb-2"
          :date-format-options="{
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
          }"
        ></b-form-datepicker>
      </b-form-group>
      <b-form-group
        label="Ремонтна работилница"
        label-for="selectRepairWorkshop"
      >
        <b-form-select
          id="selectRepairWorkshop"
          v-model="form.repair_workshop_id"
        >
          <b-form-select-option :value="null"
            >&lt; няма &gt;</b-form-select-option
          >
          <b-form-select-option
            v-for="(repairWorkshop, id) in repairWorkshops"
            :key="id"
            :value="repairWorkshop.data.id"
            >{{ repairWorkshop.data.name }}</b-form-select-option
          >
        </b-form-select>
      </b-form-group>
      <b-form-group label="Допълнителна информация" label-for="inputOtherInfo">
        <b-form-textarea
          id="inputOtherInfo"
          v-model="form.other_info"
          placeholder="Въведете опълнителна информация за вагон..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-form-group>
      <div class="d-flex justify-content-end">
        <b-button
          type="button"
          to="/dashboard/passenger-wagons"
          variant="outline-danger"
          >Отказ</b-button
        >
        <b-button type="reset" variant="outline-warning" class="mx-1"
          >Изчистване</b-button
        >
        <b-button type="submit" variant="outline-success">Добавяне</b-button>
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
    auth: { permission: 'passenger-wagon-create' },
  },
  data() {
    return {
      form: {
        number: '',
        letter_marking: '',
        depot_id: null,
        status_id: null,
        tare: null,
        total_weight: null,
        seats_count: null,
        max_speed: null,
        length: null,
        brake_marking: '',
        owner_id: null,
        repair_date: '',
        repair_workshop_id: null,
        other_info: '',
      },
      show: true,
    }
  },
  async fetch({ store, error }) {
    try {
      await store.dispatch('depots/fetchDepotsNoPagination')
      await store.dispatch('statuses/fetchStatusesNoPagination')
      await store.dispatch('owners/fetchOwnersNoPagination')
      await store.dispatch('repairWorkshops/fetchRepairWorkshopsNoPagination')
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Неуспешно взимане на информацията. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    passengerWagon: (state) => state.passengerWagons.passengerWagon,
    depots: (state) => state.depots.depots,
    statuses: (state) => state.statuses.statuses,
    owners: (state) => state.owners.owners,
    repairWorkshops: (state) => state.repairWorkshops.repairWorkshops,
  }),
  watch: {
    passengerWagon(val) {
      this.$router.push({
        name: 'dashboard-passenger-wagons-id',
        params: { id: val.id },
      })
    },
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault()
      try {
        await this.$store.dispatch(
          'passengerWagons/createPassengerWagon',
          this.form
        )
      } catch (error) {
        error({
          statusCode: 503,
          message: 'Неуспешно добавяне на вагон. Моля, опитайте по-късно.',
        })
      }
    },
    onReset(event) {
      event.preventDefault()
      // Reset form values
      this.form.number = ''
      this.form.letter_marking = ''
      this.form.depot_id = null
      this.form.status_id = null
      this.form.tare = null
      this.form.total_weight = null
      this.form.seats_count = null
      this.form.max_speed = null
      this.form.length = null
      this.form.brake_marking = ''
      this.form.owner_id = null
      this.form.repair_date = ''
      this.form.repair_workshop_id = null
      this.form.other_info = ''

      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>
