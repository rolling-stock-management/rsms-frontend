<template>
  <div class="my-2">
    <h4>Редактиране на тип интериор</h4>
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
    auth: { permission: 'passenger-wagon-type-update' },
  },
  data() {
    return {
      form: {
        name: this.$store.state.passengerWagonTypes.passengerWagonType.name,
        description: this.$store.state.passengerWagonTypes.passengerWagonType
          .description,
        repair_valid_for: this.$store.state.passengerWagonTypes
          .passengerWagonType.repair_valid_for,
        interior_type_id: this.$store.state.passengerWagonTypes
          .passengerWagonType.interior_type.data.id,
      },
      show: true,
    }
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch(
        'passengerInteriorTypes/fetchPassengerInteriorTypesNoPagination'
      )
      await store.dispatch(
        'passengerWagonTypes/fetchPassengerWagonTypeById',
        params.id
      )
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за тип интериор ' +
          params.id +
          '. Моля, опитайте по-късно.',
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
          'passengerWagonTypes/updatePassengerWagonType',
          {
            id: this.$route.params.id,
            form: this.form,
          }
        )
      } catch (error) {
        error({
          statusCode: 503,
          message:
            'Неуспешно обновяване на информацията за тип пътнически вагони ' +
            this.$route.params.id +
            '. Моля, опитайте по-късно.',
        })
      }
    },
    onReset(event) {
      event.preventDefault()
      // Reset form values
      this.form.name = this.$store.state.passengerWagonTypes.passengerWagonType.name
      this.form.description = this.$store.state.passengerWagonTypes.passengerWagonType.description
      this.form.repair_valid_for = this.$store.state.passengerWagonTypes.passengerWagonType.repair_valid_for
      this.form.interior_type_id = this.$store.state.passengerWagonTypes.passengerWagonType.interior_type.data.id

      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>
