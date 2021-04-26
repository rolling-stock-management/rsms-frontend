<template>
  <div class="my-2">
    <h4>Добавяне на ремонтна работилница</h4>
    <hr />
    <b-form v-if="show" @submit="onSubmit" @reset="onReset">
      <b-form-group id="inputName" label="Име" label-for="inputName">
        <b-form-input
          id="inputName"
          v-model="form.name"
          placeholder="Въведете име на ремонтна работилница..."
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="inputAbbreviation"
        label="Абревиатура"
        label-for="inputAbbreviation"
      >
        <b-form-input
          id="inputAbbreviation"
          v-model="form.abbreviation"
          placeholder="Въведете абревиатура на ремонтна работилница..."
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="inputNote" label="Бележка" label-for="inputNote">
        <b-form-input
          id="inputNote"
          v-model="form.note"
          placeholder="Въведете бележка на ремонтна работилница... (незадължително)"
        ></b-form-input>
      </b-form-group>
      <div class="d-flex justify-content-end">
        <b-button
          type="button"
          to="/dashboard/repair-workshops"
          variant="outline-danger"
          >Отказ</b-button
        >
        <b-button type="reset" variant="outline-warning" class="mx-1"
          >Изчистване</b-button
        >
        <b-button type="submit" variant="outline-success">Създаване</b-button>
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
    auth: { permission: 'repair-workshop-create' },
  },
  data() {
    return {
      form: {
        name: '',
        abbreviation: '',
        note: '',
      },
      show: true,
    }
  },
  computed: mapState({
    repairWorkshop: (state) => state.repairWorkshops.repairWorkshop,
  }),
  watch: {
    repairWorkshop(val) {
      this.$router.push({
        name: 'dashboard-repair-workshops-id',
        params: { id: val.id },
      })
    },
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault()
      try {
        await this.$store.dispatch(
          'repairWorkshops/createRepairWorkshop',
          this.form
        )
      } catch (error) {
        error({
          statusCode: 503,
          message:
            'Неуспешно добавяне на ремонтна работилница. Моля, опитайте по-късно.',
        })
      }
    },
    onReset(event) {
      event.preventDefault()
      // Reset form values
      this.form.name = ''
      this.form.abbreviation = ''
      this.form.note = ''

      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>
