<template>
  <div class="my-2">
    <h4>Редактиране на пътнически вагон</h4>
    <hr />
    <b-form v-if="show" @submit="onSubmit" @reset="onReset">
      <b-form-group id="inputName" label="Номер" label-for="inputName">
        <b-form-input
          id="inputName"
          v-model="form.number"
          placeholder="Въведете номер на локомотив на локомотив..."
          required
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
      <b-form-group
        id="inputPowerOutput"
        label="Номинална мощност"
        label-for="inputPowerOutput"
      >
        <b-form-input
          id="inputPowerOutput"
          v-model="form.power_output"
          placeholder="Въведете номинална мощност на локомотив..."
          type="number"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="inputTractiveEffort"
        label="Теглителна сила"
        label-for="inputTractiveEffort"
      >
        <b-form-input
          id="inputTractiveEffort"
          v-model="form.tractive_effort"
          placeholder="Въведете теглителна сила на локомотив..."
          type="number"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="inputWeight"
        label="Служебна маса"
        label-for="inputWeight"
      >
        <b-form-input
          id="inputWeight"
          v-model="form.weight"
          placeholder="Въведете служебна маса на локомотив..."
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
          placeholder="Въведете макисмална скорост на локомотив..."
          type="number"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="inputAxleArrangement"
        label="Колоосна формула"
        label-for="inputAxleArrangement"
      >
        <b-form-input
          id="inputAxleArrangement"
          v-model="form.axle_arrangement"
          placeholder="Въведете колоосна формула на локомотив..."
        ></b-form-input>
      </b-form-group>
      <b-form-group id="inputLength" label="Дължина" label-for="inputLength">
        <b-form-input
          id="inputLength"
          v-model="form.length"
          placeholder="Въведете дължина на локомотив..."
        ></b-form-input>
      </b-form-group>
      <b-form-group id="inputBrake" label="Спирачка" label-for="inputBrake">
        <b-form-input
          id="inputBrake"
          v-model="form.brake_marking"
          placeholder="Въведете означение спирачката на локомотив..."
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
      <b-form-group>
        <label for="datepickerRepairValidUntil"
          >Дата на изтичане на ремонт</label
        >
        <b-form-datepicker
          id="datepickerRepairValidUntil"
          v-model="form.repair_valid_until"
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
          placeholder="Допълнителна информация..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-form-group>
      <div class="d-flex justify-content-end">
        <b-button
          type="button"
          to="/dashboard/tractive-units"
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
    auth: { permission: 'tractive-unit-update' },
  },
  data() {
    return {
      form: {
        number: this.$store.state.tractiveUnits.tractiveUnit.number,
        depot_id: this.$store.state.tractiveUnits.tractiveUnit.depot
          ? this.$store.state.tractiveUnits.tractiveUnit.depot.data.id
          : null,
        status_id: this.$store.state.tractiveUnits.tractiveUnit.status.data.id,
        power_output: this.$store.state.tractiveUnits.tractiveUnit.power_output,
        tractive_effort: this.$store.state.tractiveUnits.tractiveUnit
          .tractive_effort,
        weight: this.$store.state.tractiveUnits.tractiveUnit.weight,
        axle_arrangement: this.$store.state.tractiveUnits.tractiveUnit
          .axle_arrangement,
        max_speed: this.$store.state.tractiveUnits.tractiveUnit.max_speed,
        length: this.$store.state.tractiveUnits.tractiveUnit.length,
        brake_marking: this.$store.state.tractiveUnits.tractiveUnit
          .brake_marking,
        owner_id: this.$store.state.tractiveUnits.tractiveUnit.owner.data.id,
        repair_date: this.$store.state.tractiveUnits.tractiveUnit.repair_date,
        repair_valid_until: this.$store.state.tractiveUnits.tractiveUnit
          .repair_valid_until,
        repair_workshop_id: this.$store.state.tractiveUnits.tractiveUnit
          .repair_workshop
          ? this.$store.state.tractiveUnits.tractiveUnit.repair_workshop.data.id
          : null,
        other_info: this.$store.state.tractiveUnits.tractiveUnit.other_info,
      },
      show: true,
    }
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('depots/fetchDepotsNoPagination')
      await store.dispatch('statuses/fetchStatusesNoPagination')
      await store.dispatch('owners/fetchOwnersNoPagination')
      await store.dispatch('repairWorkshops/fetchRepairWorkshopsNoPagination')
      await store.dispatch('tractiveUnits/fetchTractiveUnitById', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за вагон ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    tractiveUnit: (state) => state.tractiveUnits.tractiveUnit,
    depots: (state) => state.depots.depots,
    statuses: (state) => state.statuses.statuses,
    owners: (state) => state.owners.owners,
    repairWorkshops: (state) => state.repairWorkshops.repairWorkshops,
  }),
  watch: {
    tractiveUnit(val) {
      this.$router.push({
        name: 'dashboard-tractive-units-id',
        params: { id: val.id },
      })
    },
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault()
      try {
        await this.$store.dispatch('tractiveUnits/updateTractiveUnit', {
          id: this.$route.params.id,
          form: this.form,
        })
      } catch (error) {
        error({
          statusCode: 503,
          message:
            'Неуспешно обновяване на информацията за вагон ' +
            this.$route.params.id +
            '. Моля, опитайте по-късно.',
        })
      }
    },
    onReset(event) {
      event.preventDefault()
      // Reset form values
      this.form.number = this.$store.state.tractiveUnits.tractiveUnit.number
      this.form.depot_id = this.$store.state.tractiveUnits.tractiveUnit.depot
        ? this.$store.state.tractiveUnits.tractiveUnit.depot.data.id
        : null
      this.form.status_id = this.$store.state.tractiveUnits.tractiveUnit.status.data.id
      this.form.power_output = this.$store.state.tractiveUnits.tractiveUnit.power_output
      this.form.tractive_effort = this.$store.state.tractiveUnits.tractiveUnit.tractive_effort
      this.form.weight = this.$store.state.tractiveUnits.tractiveUnit.weight
      this.form.axle_arrangement = this.$store.state.tractiveUnits.tractiveUnit.axle_arrangement
      this.form.max_speed = this.$store.state.tractiveUnits.tractiveUnit.max_speed
      this.form.length = this.$store.state.tractiveUnits.tractiveUnit.length
      this.form.brake_marking = this.$store.state.tractiveUnits.tractiveUnit.brake_marking
      this.form.owner_id = this.$store.state.tractiveUnits.tractiveUnit.owner.data.id
      this.form.repair_date = this.$store.state.tractiveUnits.tractiveUnit.repair_date
      this.form.repair_valid_until = this.$store.state.tractiveUnits.tractiveUnit.repair_valid_until
      this.form.repair_workshop_id = this.$store.state.tractiveUnits
        .tractiveUnit.repair_workshop
        ? this.$store.state.tractiveUnits.tractiveUnit.repair_workshop.data.id
        : null
      this.form.other_info = this.$store.state.tractiveUnits.tractiveUnit.other_info

      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>
