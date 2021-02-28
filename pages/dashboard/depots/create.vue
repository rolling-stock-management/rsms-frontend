<template>
  <div class="my-2">
    <h4>Добавяне на депо</h4>
    <hr />
    <b-form v-if="show" @submit="onSubmit" @reset="onReset">
      <b-form-group id="inputName" label="Име на депо" label-for="inputName">
        <b-form-input
          id="inputName"
          v-model="form.name"
          placeholder="Въведете име на депо..."
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="inputNote" label="Бележка" label-for="inputNote">
        <b-form-input
          id="inputNote"
          v-model="form.note"
          placeholder="Въведете въведете допълнителна информация (незадължително)..."
        ></b-form-input>
      </b-form-group>
      <div class="d-flex justify-content-between">
        <b-button type="button" to="/dashboard/depots" variant="outline-danger"
          >Отказ</b-button
        >
        <b-button type="submit" variant="outline-success">Създаване</b-button>
        <b-button type="reset" variant="outline-warning">Изчистване</b-button>
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
    auth: { permission: 'depot-create' },
  },
  data() {
    return {
      form: {
        name: '',
        note: '',
      },
      show: true,
    }
  },
  computed: mapState({
    depot: (state) => state.depots.depot,
  }),
  watch: {
    depot(val) {
      this.$router.push({
        name: 'dashboard-depots-id',
        params: { id: val.id },
      })
    },
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault()
      try {
        await this.$store.dispatch('depots/createDepot', this.form)
      } catch (error) {
        console.log(error)
      }
    },
    onReset(event) {
      event.preventDefault()
      // Reset form values
      this.form.name = ''
      this.form.note = ''

      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>
