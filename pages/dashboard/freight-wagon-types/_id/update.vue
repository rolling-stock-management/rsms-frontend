<template>
  <div class="my-2">
    <h4>Редактиране на тип интериор</h4>
    <hr />
    <b-form v-if="show" @submit="onSubmit" @reset="onReset">
      <b-form-group id="inputName" label="Означение" label-for="inputName">
        <b-form-input
          id="inputName"
          v-model="form.name"
          placeholder="Въведете име на тип товарни вагони..."
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
          placeholder="Въведете описание на тип товарни вагони... (незадължително)"
        ></b-form-input>
      </b-form-group>
      <div class="d-flex justify-content-end">
        <b-button
          type="button"
          to="/dashboard/freight-wagon-types"
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
    auth: { permission: 'freight-wagon-type-update' },
  },
  data() {
    return {
      form: {
        name: this.$store.state.freightWagonTypes.freightWagonType.name,
        description: this.$store.state.freightWagonTypes.freightWagonType
          .description,
      },
      show: true,
    }
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch(
        'freightWagonTypes/fetchFreightWagonTypeById',
        params.id
      )
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за тип вагони ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    freightWagonType: (state) => state.freightWagonTypes.freightWagonType,
  }),
  watch: {
    freightWagonType(val) {
      this.$router.push({
        name: 'dashboard-freight-wagon-types-id',
        params: { id: val.id },
      })
    },
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault()
      try {
        await this.$store.dispatch('freightWagonTypes/updateFreightWagonType', {
          id: this.$route.params.id,
          form: this.form,
        })
      } catch (error) {
        error({
          statusCode: 503,
          message:
            'Неуспешно обновяване на информацията за тип вагони ' +
            this.$route.params.id +
            '. Моля, опитайте по-късно.',
        })
      }
    },
    onReset(event) {
      event.preventDefault()
      // Reset form values
      this.form.name = this.$store.state.freightWagonTypes.freightWagonType.name
      this.form.description = this.$store.state.freightWagonTypes.freightWagonType.description

      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>
