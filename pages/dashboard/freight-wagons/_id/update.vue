<template>
  <div class="my-2">
    <h4>Редактиране на пътнически вагон</h4>
    <hr />
    <b-form v-if="show" @submit="onSubmit" @reset="onReset">
      <b-form-group id="inputName" label="Номер на вагон" label-for="inputName">
        <b-form-input
          id="inputName"
          v-model="form.number"
          placeholder="Въведете номер на вагон на вагон..."
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="inputLetterMarking"
        label="Означение на вагон"
        label-for="inputLetterMarking"
      >
        <b-form-input
          id="inputLetterMarking"
          v-model="form.letter_marking"
          placeholder="Въведете означение на вагон..."
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Избиране на тип" label-for="selectType">
        <b-form-select id="selectType" v-model="form.type_id" required>
          <b-form-select-option :value="null" disabled
            >&lt; няма &gt;</b-form-select-option
          >
          <b-form-select-option
            v-for="(type, id) in wagonTypes"
            :key="id"
            :value="type.data.id"
            >{{ type.data.name }}</b-form-select-option
          >
        </b-form-select>
      </b-form-group>
      <b-form-group label="Избиране на собственик" label-for="selectOwner">
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
      <b-form-group label="Избиране на статус" label-for="selectStatus">
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
      <b-form-group id="inputTare" label="Тара на вагон" label-for="inputTare">
        <b-form-input
          id="inputTare"
          v-model="form.tare"
          placeholder="Въведете тара на вагон..."
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="inputWeightCapacity"
        label="Товароносимост на вагон"
        label-for="inputLength"
      >
        <b-form-input
          id="inputWeightCapacity"
          v-model="form.weight_capacity"
          placeholder="Въведете товароносимост на вагон..."
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="inputLengthCapacity"
        label="Полезна дължина на вагон"
        label-for="inputLengthCapacity"
      >
        <b-form-input
          id="inputLengthCapacity"
          v-model="form.length_capacity"
          placeholder="Въведете полезна дължина на вагон..."
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="inputVolumeCapacity"
        label="Полезен обем на вагон"
        label-for="inputVolumeCapacity"
      >
        <b-form-input
          id="inputVolumeCapacity"
          v-model="form.volume_capacity"
          placeholder="Въведете полезен обем на вагон..."
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="inputAreaCapacity"
        label="Полезна площ на вагон"
        label-for="inputAreaCapacity"
      >
        <b-form-input
          id="inputAreaCapacity"
          v-model="form.area_capacity"
          placeholder="Въведете полезна площ на вагон..."
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="inputMaxSpeed"
        label="Макисмална скорост на вагон"
        label-for="inputMaxSpeed"
      >
        <b-form-input
          id="inputMaxSpeed"
          v-model="form.max_speed"
          placeholder="Въведете макисмална скорост на вагон..."
          type="number"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="inputLength"
        label="Дължина на вагон"
        label-for="inputLength"
      >
        <b-form-input
          id="inputLength"
          v-model="form.length"
          placeholder="Въведете дължина на вагон..."
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="inputBrake"
        label="Спирачка на вагон"
        label-for="inputBrake"
      >
        <b-form-input
          id="inputBrake"
          v-model="form.brake_marking"
          placeholder="Въведете спирачка на вагон..."
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Избиране на депо" label-for="selectDepot">
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
        <label for="datepickerRepairDate"
          >Избиране на дата на последен ремонт</label
        >
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
          >Избиране дата на изтичане на ремонт</label
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
        label="Избиране на ремонтна работилница"
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
      <b-form-group label="Бележка" label-for="inputOtherInfo">
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
          to="/dashboard/freight-wagons"
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
    auth: { permission: 'freight-wagon-update' },
  },
  data() {
    return {
      form: {
        number: this.$store.state.freightWagons.freightWagon.number,
        letter_marking: this.$store.state.freightWagons.freightWagon
          .letter_marking,
        type_id: this.$store.state.freightWagons.freightWagon.type.data.id,
        depot_id: this.$store.state.freightWagons.freightWagon.depot
          ? this.$store.state.freightWagons.freightWagon.depot.data.id
          : null,
        status_id: this.$store.state.freightWagons.freightWagon.status.data.id,
        tare: this.$store.state.freightWagons.freightWagon.tare,
        weight_capacity: this.$store.state.freightWagons.freightWagon
          .weight_capacity,
        length_capacity: this.$store.state.freightWagons.freightWagon
          .length_capacity,
        volume_capacity: this.$store.state.freightWagons.freightWagon
          .volume_capacity,
        area_capacity: this.$store.state.freightWagons.freightWagon
          .area_capacity,
        max_speed: this.$store.state.freightWagons.freightWagon.max_speed,
        length: this.$store.state.freightWagons.freightWagon.length,
        brake_marking: this.$store.state.freightWagons.freightWagon
          .brake_marking,
        owner_id: this.$store.state.freightWagons.freightWagon.owner.data.id,
        repair_date: this.$store.state.freightWagons.freightWagon.repair_date,
        repair_valid_until: this.$store.state.freightWagons.freightWagon
          .repair_valid_until,
        repair_workshop_id: this.$store.state.freightWagons.freightWagon
          .repair_workshop
          ? this.$store.state.freightWagons.freightWagon.repair_workshop.data.id
          : null,
        other_info: this.$store.state.freightWagons.freightWagon.other_info,
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
      await store.dispatch(
        'freightWagonTypes/fetchFreightWagonTypesNoPagination'
      )
      await store.dispatch('freightWagons/fetchFreightWagonById', params.id)
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
    freightWagon: (state) => state.freightWagons.freightWagon,
    depots: (state) => state.depots.depots,
    statuses: (state) => state.statuses.statuses,
    owners: (state) => state.owners.owners,
    repairWorkshops: (state) => state.repairWorkshops.repairWorkshops,
    wagonTypes: (state) => state.freightWagonTypes.freightWagonTypes,
  }),
  watch: {
    freightWagon(val) {
      this.$router.push({
        name: 'dashboard-freight-wagons-id',
        params: { id: val.id },
      })
    },
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault()
      try {
        await this.$store.dispatch('freightWagons/updateFreightWagon', {
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
      this.form.number = this.$store.state.freightWagons.freightWagon.number
      this.form.letter_marking = this.$store.state.freightWagons.freightWagon.letter_marking
      this.form.type_id = this.$store.state.freightWagons.freightWagon.type.data.id
      this.form.depot_id = this.$store.state.freightWagons.freightWagon.depot
        ? this.$store.state.freightWagons.freightWagon.depot.data.id
        : null
      this.form.status_id = this.$store.state.freightWagons.freightWagon.status.data.id
      this.form.tare = this.$store.state.freightWagons.freightWagon.tare
      this.form.weight_capacity = this.$store.state.freightWagons.freightWagon.weight_capacity
      this.form.length_capacity = this.$store.state.freightWagons.freightWagon.length_capacity
      this.form.volume_capacity = this.$store.state.freightWagons.freightWagon.volume_capacity
      this.form.area_capacity = this.$store.state.freightWagons.freightWagon.area_capacity
      this.form.max_speed = this.$store.state.freightWagons.freightWagon.max_speed
      this.form.length = this.$store.state.freightWagons.freightWagon.length
      this.form.brake_marking = this.$store.state.freightWagons.freightWagon.brake_marking
      this.form.owner_id = this.$store.state.freightWagons.freightWagon.owner.data.id
      this.form.repair_date = this.$store.state.freightWagons.freightWagon.repair_date
      this.form.repair_valid_until = this.$store.state.freightWagons.freightWagon.repair_valid_until
      this.form.repair_workshop_id = this.$store.state.freightWagons
        .freightWagon.repair_workshop
        ? this.$store.state.freightWagons.freightWagon.repair_workshop.data.id
        : null
      this.form.other_info = this.$store.state.freightWagons.freightWagon.other_info

      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>
