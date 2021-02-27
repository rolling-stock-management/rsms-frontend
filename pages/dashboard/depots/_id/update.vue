<template>
  <div class="my-2">
    <h4>Редактиране на депо</h4>
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
          required
        ></b-form-input>
      </b-form-group>
      <div class="d-flex justify-content-between">
        <b-button type="button" to="/dashboard/depots" variant="outline-danger"
          >Отказ</b-button
        >
        <b-button type="submit" variant="outline-success">Промяна</b-button>
        <b-button type="reset" variant="outline-warning">Нулиране</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  data() {
    return {
      form: {
        name: this.$store.state.depots.depot.data.name,
        note: this.$store.state.depots.depot.data.note,
      },
      show: true,
    }
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('depots/fetchDepotById', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за депо ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
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
        await this.$store.dispatch('depots/updateDepot', {
          id: this.$route.params.id,
          form: this.form,
        })
      } catch (error) {
        error({
          statusCode: 503,
          message:
            'Неуспешно обновяване на информацията за депо ' +
            this.$route.params.id +
            '. Моля, опитайте по-късно.',
        })
      }
    },
    onReset(event) {
      event.preventDefault()
      // Reset form values
      this.form.name = this.$store.state.depots.depot.data.name
      this.form.note = this.$store.state.depots.depot.data.note

      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>
