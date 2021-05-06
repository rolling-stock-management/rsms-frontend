<template>
  <div class="my-2">
    <h4>Промяна на ПС на влак</h4>
    <hr />
    <b-form v-if="show" @submit="onSubmit" @reset="onReset">
      <b-form-group>
        <label for="searchField">Единица подвижен състав</label>
        <SearchField
          id="searchField"
          mode="return_id"
          placeholder="Търсене на подвижен състав..."
          :route="searchType"
          @updateid="trainableChoiceHandler"
        ></SearchField>
        <div v-if="selectedTrainable">
          <label><b>Избран подвижен състав:</b></label> {{ selectedTrainable }}
        </div>
      </b-form-group>
      <b-form-group>
        <label for="searchTrain">Влак</label>
        <SearchField
          id="searchTrain"
          mode="train_id"
          placeholder="Търсене на влак..."
          route="/trains-search"
          @updateid="trainChoiceHandler"
        ></SearchField>
        <div v-if="selectedTrain">
          <label><b>Избран влак:</b></label> {{ selectedTrain }}
        </div>
      </b-form-group>
      <b-form-group
        id="inputPosition"
        label="Позиция"
        label-for="inputPosition"
      >
        <b-form-input
          id="inputPosition"
          v-model="form.position"
          type="number"
          placeholder="Въведете позиция на ПС във влака..."
          min="1"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group>
        <label for="datepickerDate">Дата</label>
        <b-form-datepicker
          id="datepickerDate"
          v-model="form.date"
          today-button
          class="mb-2"
          :date-format-options="{
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
          }"
        ></b-form-datepicker>
      </b-form-group>
      <b-form-group id="inputComment" label="Коментар" label-for="inputComment">
        <b-form-textarea
          id="inputComment"
          v-model="form.comment"
          placeholder="Въведете коментар..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-form-group>

      <div class="d-flex justify-content-end">
        <b-button
          type="button"
          :to="'/dashboard/rolling-stock-trains?type=' + this.$route.query.type"
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
    auth: { permission: 'rolling-stock-train-update' },
  },
  data() {
    return {
      form: {
        train_id: this.$store.state.rollingStockTrains.rollingStockTrain.train
          .id,
        position: this.$store.state.rollingStockTrains.rollingStockTrain
          .position,
        trainable_type: this.$route.query.type,
        trainable_id: this.$store.state.rollingStockTrains.rollingStockTrain
          .trainable.id,
        comment: this.$store.state.rollingStockTrains.rollingStockTrain.comment,
        date: this.$store.state.rollingStockTrains.rollingStockTrain.date,
      },
      show: true,
      selectedTrain: this.$store.state.rollingStockTrains.rollingStockTrain
        .train.number,
      selectedTrainable: this.$store.state.rollingStockTrains.rollingStockTrain
        .trainable.number,
    }
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch(
        'rollingStockTrains/fetchRollingStockTrainById',
        params.id
      )
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Неуспешно взимане на информацията. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    rollingStockTrain: (state) => state.rollingStockTrains.rollingStockTrain,
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
    rollingStockTrain(val) {
      this.$router.push({
        name: 'dashboard-rolling-stock-trains-id',
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
          await this.$store.dispatch(
            'rollingStockTrains/updateRollingStockTrain',
            {
              id: this.$route.params.id,
              form: this.form,
            }
          )
        } catch (error) {
          error({
            statusCode: 503,
            message:
              'Неуспешно обновяване на ПС на влак. Моля, опитайте по-късно.',
          })
        }
      }
    },
    onReset(event) {
      event.preventDefault()
      // Reset form values
      this.form.train_id = this.$store.state.rollingStockTrains.rollingStockTrain.train.id
      this.form.position = this.$store.state.rollingStockTrains.rollingStockTrain.position
      this.form.trainable_id = this.$store.state.rollingStockTrains.rollingStockTrain.trainable.id
      this.form.comment = this.$store.state.rollingStockTrains.rollingStockTrain.comment
      this.form.date = this.$store.state.rollingStockTrains.rollingStockTrain.date
      this.selectedTrain = this.$store.state.rollingStockTrains.rollingStockTrain.train.number
      this.selectedTrainable = this.$store.state.rollingStockTrains.rollingStockTrain.trainable.number

      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    trainableChoiceHandler(event) {
      this.form.trainable_id = event.id
      this.selectedTrainable = event.stylized_number
    },
    trainChoiceHandler(event) {
      this.form.train_id = event.id
      this.selectedTrain = event.number
    },
  },
}
</script>
