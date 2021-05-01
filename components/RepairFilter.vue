<template>
  <div>
    <h6 class="font-weight-bold text-primary" @click="toggle = !toggle">
      Филтри
    </h6>
    <div v-if="toggle" class="input-group mb-3 bg-light mt-3 p-3 rounded">
      <div class="col-sm-12 col-md-4">
        <b-form-group
          label="Тип"
          label-for="selectType"
          label-class="ml-2 pt-2 font-weight-bold text-primary"
        >
          <b-form-select id="selectType" v-model="filters.type">
            <b-form-select-option :value="null"
              >&lt; без филтър &gt;</b-form-select-option
            >
            <b-form-select-option
              v-for="(type, id) in types"
              :key="id"
              :value="type.data.id"
              >{{ type.data.name }}</b-form-select-option
            >
          </b-form-select>
        </b-form-group>
        <b-form-group
          label="Работилница"
          label-for="selectWorkshop"
          label-class="ml-2 pt-2 font-weight-bold text-primary"
        >
          <b-form-select id="selectWorkshop" v-model="filters.workshop">
            <b-form-select-option :value="null"
              >&lt; без филтър &gt;</b-form-select-option
            >
            <b-form-select-option
              v-for="(workshop, id) in workshops"
              :key="id"
              :value="workshop.data.id"
              >{{ workshop.data.name }}</b-form-select-option
            >
          </b-form-select>
        </b-form-group>
      </div>
      <div class="col-sm-12 col-md-4">
        <b-form-group
          label="Старт преди дата"
          label-for="datepickerStartBefore"
          label-class="ml-2 pt-2 font-weight-bold text-primary"
        >
          <b-form-datepicker
            id="datepickerStartBefore"
            v-model="filters.start_before"
            class="mb-2"
            :date-format-options="{
              year: '2-digit',
              month: '2-digit',
              day: '2-digit',
            }"
            reset-button
          ></b-form-datepicker>
        </b-form-group>
        <b-form-group
          label="Старт след дата"
          label-for="datepickerStartAfter"
          label-class="ml-2 pt-2 font-weight-bold text-primary"
        >
          <b-form-datepicker
            id="datepickerStartAfter"
            v-model="filters.start_after"
            class="mb-2"
            :date-format-options="{
              year: '2-digit',
              month: '2-digit',
              day: '2-digit',
            }"
            reset-button
          ></b-form-datepicker>
        </b-form-group>
      </div>
      <div class="col-sm-12 col-md-4">
        <b-form-group
          label="Край преди дата"
          label-for="datepickerEndBefore"
          label-class="ml-2 pt-2 font-weight-bold text-primary"
        >
          <b-form-datepicker
            id="datepickerEndBefore"
            v-model="filters.end_before"
            class="mb-2"
            :date-format-options="{
              year: '2-digit',
              month: '2-digit',
              day: '2-digit',
            }"
            reset-button
          ></b-form-datepicker>
        </b-form-group>
        <b-form-group
          label="Край след дата"
          label-for="datepickerEndAfter"
          label-class="ml-2 pt-2 font-weight-bold text-primary"
        >
          <b-form-datepicker
            id="datepickerEndAfter"
            v-model="filters.end_after"
            class="mb-2"
            :date-format-options="{
              year: '2-digit',
              month: '2-digit',
              day: '2-digit',
            }"
            reset-button
          ></b-form-datepicker>
        </b-form-group>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    workshops: { type: Array, required: true },
    types: { type: Array, required: true },
  },
  data() {
    return {
      filters: {
        type: null,
        workshop: null,
        start_before: null,
        start_after: null,
        end_before: null,
        end_after: null,
      },
      queryString: null,
      toggle: false,
    }
  },
  watch: {
    filters: {
      deep: true,
      handler() {
        this.filter()
      },
    },
  },
  methods: {
    filter: _.debounce(function (e) {
      this.queryString = '?'
      if (this.filters.type !== null) {
        this.queryString += '&type_id=' + this.filters.type
      }
      if (this.filters.workshop !== null) {
        this.queryString += '&workshop_id=' + this.filters.workshop
      }
      if (
        this.filters.start_before !== null &&
        this.filters.start_before !== ''
      ) {
        this.queryString += '&start_date_before=' + this.filters.start_before
      }
      if (
        this.filters.start_after !== null &&
        this.filters.start_after !== ''
      ) {
        this.queryString += '&start_date_after=' + this.filters.start_after
      }
      if (this.filters.end_before !== null && this.filters.end_before !== '') {
        this.queryString += '&end_date_before=' + this.filters.end_before
      }
      if (this.filters.end_after !== null && this.filters.end_after !== '') {
        this.queryString += '&end_date_after=' + this.filters.end_after
      }

      this.$emit('applyFilters', this.queryString)
    }, 500),
  },
}
</script>
