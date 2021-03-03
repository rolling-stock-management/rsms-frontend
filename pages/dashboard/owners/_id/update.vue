<template>
  <div class="my-2">
    <h4>Редактиране на собственик</h4>
    <hr />
    <b-form v-if="show" @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="inputName"
        label="Име на собственик"
        label-for="inputName"
      >
        <b-form-input
          id="inputName"
          v-model="form.name"
          placeholder="Въведете име на собственик..."
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="inputNote"
        label="Бележка на собственик"
        label-for="inputNote"
      >
        <b-form-input
          id="inputNote"
          v-model="form.note"
          placeholder="Въведете бележка на собственик... (незадължително)"
        ></b-form-input>
      </b-form-group>
      <div class="d-flex justify-content-end">
        <b-button type="button" to="/dashboard/owners" variant="outline-danger"
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
    auth: { permission: 'owner-update' },
  },
  data() {
    return {
      form: {
        name: this.$store.state.owners.owner.name,
        note: this.$store.state.owners.owner.note,
      },
      show: true,
    }
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('owners/fetchOwnerById', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за собственик ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    owner: (state) => state.owners.owner,
  }),
  watch: {
    owner(val) {
      this.$router.push({
        name: 'dashboard-owners-id',
        params: { id: val.id },
      })
    },
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault()
      try {
        await this.$store.dispatch('owners/updateOwner', {
          id: this.$route.params.id,
          form: this.form,
        })
      } catch (error) {
        error({
          statusCode: 503,
          message:
            'Неуспешно обновяване на информацията за собственик ' +
            this.$route.params.id +
            '. Моля, опитайте по-късно.',
        })
      }
    },
    onReset(event) {
      event.preventDefault()
      // Reset form values
      this.form.name = this.$store.state.owners.owner.name
      this.form.note = this.$store.state.owners.owner.note

      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>
