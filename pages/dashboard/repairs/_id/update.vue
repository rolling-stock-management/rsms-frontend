<template>
  <div class="my-2">
    <h4>Промяна на ремонт</h4>
    <hr />
    <b-form v-if="show" @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="inputShortDesc"
        label="Кратко описание"
        label-for="inputShortDesc"
      >
        <b-form-input
          id="inputShortDesc"
          v-model="form.short_description"
          placeholder="Въведете кратко описание на ремонт..."
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group>
        <label for="searchField">Единица подвижен състав</label>
        <SearchField
          id="searchField"
          mode="return_id"
          placeholder="Търсене на подвижен състав..."
          :route="searchType"
          :value="selectedRepairable"
          @updateid="repairableChoiceHandler"
        ></SearchField>
        <div v-if="selectedRepairable">
          <label><b>Избран подвижен състав:</b></label> {{ selectedRepairable }}
        </div>
      </b-form-group>
      <b-form-group label="Тип" label-for="selectType">
        <b-form-select id="selectType" v-model="form.type_id" required>
          <b-form-select-option :value="null" disabled
            >&lt; няма &gt;</b-form-select-option
          >
          <b-form-select-option
            v-for="(type, id) in types"
            :key="id"
            :value="type.data.id"
            >{{ type.data.name }} -
            {{ type.data.description }}</b-form-select-option
          >
        </b-form-select>
      </b-form-group>
      <b-form-group label="Работилница" label-for="selectWorkshop">
        <b-form-select id="selectWorkshop" v-model="form.workshop_id" required>
          <b-form-select-option :value="null" disabled
            >&lt; няма &gt;</b-form-select-option
          >
          <b-form-select-option
            v-for="(workshop, id) in workshops"
            :key="id"
            :value="workshop.data.id"
            >{{ workshop.data.abbreviation }} -
            {{ workshop.data.name }}</b-form-select-option
          >
        </b-form-select>
      </b-form-group>
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
      <b-form-group
        id="inputDescription"
        label="Описание"
        label-for="inputDescription"
      >
        <b-form-textarea
          id="inputDescription"
          v-model="form.description"
          placeholder="Въведете описание..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-form-group>

      <div class="d-flex justify-content-end">
        <b-button
          type="button"
          :to="'/dashboard/repairs?type=' + this.$route.query.type"
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
        short_description: this.$store.state.repairs.repair.short_description,
        type_id: this.$store.state.repairs.repair.type.id,
        workshop_id: this.$store.state.repairs.repair.workshop.id,
        repairable_type: this.$route.query.type,
        repairable_id: this.$store.state.repairs.repair.repairable.id,
        description: this.$store.state.repairs.repair.description,
        start_date: this.$store.state.repairs.repair.start_date,
        end_date: this.$store.state.repairs.repair.end_date,
      },
      show: true,
      selectedRepairable: this.$store.state.repairs.repair.repairable.number,
    }
  },
  async fetch({ store, error, params }) {
    try {
      store.dispatch('repairWorkshops/fetchRepairWorkshopsNoPagination')
      store.dispatch('repairTypes/fetchRepairTypesNoPagination')
      await store.dispatch('repairs/fetchRepairById', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Неуспешно взимане на информацията. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    repair: (state) => state.repairs.repair,
    workshops: (state) => state.repairWorkshops.repairWorkshops,
    types: (state) => state.repairTypes.repairTypes,
    searchType() {
      const type = this.$route.query.type
      switch (type) {
        case '1':
          return '/passenger-wagons-search'
        case '2':
          return '/freight-wagons-search'
        case '3':
          return '/tractive-units-search'
        default:
          return ''
      }
    },
  }),
  watch: {
    repair(val) {
      this.$router.push({
        name: 'dashboard-repairs-id',
        params: { id: val.id },
      })
    },
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault()
      // eslint-disable-next-line eqeqeq
      if (typeof this.$route.query.type != 'undefined') {
        try {
          this.form.repairable_type = this.$route.query.type
          await this.$store.dispatch('repairs/updateRepair', {
            id: this.$route.params.id,
            form: this.form,
          })
        } catch (error) {
          error({
            statusCode: 503,
            message: 'Неуспешно обновяване на ремонт. Моля, опитайте по-късно.',
          })
        }
      }
    },
    onReset(event) {
      event.preventDefault()
      // Reset form values
      this.form.short_description = this.$store.state.repairs.repair.short_description
      this.form.type_id = this.$store.state.repairs.repair.type.id
      this.form.workshop_id = this.$store.state.repairs.repair.workshop.id
      this.form.repairable_type = this.$route.query.type
      this.form.repairable_id = this.$store.state.repairs.repair.repairable.id
      this.form.description = this.$store.state.repairs.repair.description
      this.form.start_date = this.$store.state.repairs.repair.start_date
      this.form.end_date = this.$store.state.repairs.repair.end_date

      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    repairableChoiceHandler(event) {
      this.form.repairable_id = event.id
      this.selectedRepairable = event.stylized_number
    },
  },
}
</script>
