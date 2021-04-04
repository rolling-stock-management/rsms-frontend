<template>
  <div class="my-2">
    <h4>Добавяне на тип пътнически вагони</h4>
    <hr />
    <b-form v-if="show" @submit="onSubmit" @reset="onReset">
      <b-form-group id="inputName" label="Означение" label-for="inputName">
        <b-form-input
          id="inputName"
          v-model="form.name"
          placeholder="Въведете име на тип пътнически вагони..."
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="inputDescription"
        label="Описание"
        label-for="inputDescription"
      >
        <b-form-input
          id="inputDescription"
          v-model="form.description"
          placeholder="Въведете описание на тип пътнически вагони... (незадължително)"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="inputRepairValidFor"
        label="Валидност на ремонта (години)"
        label-for="inputRepairValidFor"
      >
        <b-form-input
          id="inputRepairValidFor"
          v-model="form.repair_valid_for"
          type="number"
          placeholder="Въведете валидност на ремонта в години..."
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Тип интериор" label-for="selectInterior">
        <b-form-select
          id="selectInterior"
          v-model="form.interior_type_id"
          required
        >
          <b-form-select-option :value="null" disabled
            >&lt; няма &gt;</b-form-select-option
          >
          <b-form-select-option
            v-for="(interiorType, id) in passengerInteriorTypes"
            :key="id"
            :value="interiorType.data.id"
            >{{ interiorType.data.name }}</b-form-select-option
          >
        </b-form-select>
      </b-form-group>
      <div class="d-flex justify-content-end">
        <b-button
          type="button"
          to="/dashboard/passenger-wagon-types"
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
    auth: { permission: 'passenger-wagon-type-create' },
  },
  data() {
    return {
      form: {
        name: '',
        description: '',
        repair_valid_for: null,
        interior_type_id: null,
      },
      show: true,
    }
  },
  async fetch({ store, error }) {
    try {
      await store.dispatch(
        'passengerInteriorTypes/fetchPassengerInteriorTypesNoPagination'
      )
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за типове интериори. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    passengerWagonType: (state) => state.passengerWagonTypes.passengerWagonType,
    passengerInteriorTypes: (state) =>
      state.passengerInteriorTypes.passengerInteriorTypes,
  }),
  watch: {
    passengerWagonType(val) {
      this.$router.push({
        name: 'dashboard-passenger-wagon-types-id',
        params: { id: val.id },
      })
    },
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault()
      try {
        await this.$store.dispatch(
          'passengerWagonTypes/createPassengerWagonType',
          this.form
        )
      } catch (error) {
        error({
          statusCode: 503,
          message:
            'Неуспешно добавяне на тип пътнически вагони. Моля, опитайте по-късно.',
        })
      }
    },
    onReset(event) {
      event.preventDefault()
      // Reset form values
      this.form.name = ''
      this.form.description = ''
      this.form.repair_valid_for = null
      this.form.interior_type_id = null

      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>
