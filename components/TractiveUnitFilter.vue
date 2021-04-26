<template>
  <div>
    <h6 class="font-weight-bold text-primary" @click="toggle = !toggle">
      Филтри
    </h6>
    <div v-if="toggle" class="input-group mb-3 bg-light mt-3 p-3 rounded">
      <div class="col-sm-12 col-md-4">
        <b-form-group
          label="Статус"
          label-for="selectStatus"
          label-class="ml-2 pt-2 font-weight-bold text-primary"
        >
          <b-form-select id="selectStatus" v-model="filters.status">
            <b-form-select-option :value="null"
              >&lt; без филтър &gt;</b-form-select-option
            >
            <b-form-select-option
              v-for="(status, id) in statuses"
              :key="id"
              :value="status.data.id"
              >{{ status.data.name }}</b-form-select-option
            >
          </b-form-select>
        </b-form-group>
        <b-form-group
          label="Депо"
          label-for="selectDepot"
          label-class="ml-2 pt-2 font-weight-bold text-primary"
        >
          <b-form-select id="selectDepot" v-model="filters.depot">
            <b-form-select-option :value="null"
              >&lt; без филтър &gt;</b-form-select-option
            >
            <b-form-select-option
              v-for="(depot, id) in depots"
              :key="id"
              :value="depot.data.id"
              >{{ depot.data.name }}</b-form-select-option
            >
          </b-form-select>
        </b-form-group>
      </div>
      <div class="col-sm-12 col-md-4">
        <b-form-group
          label="Собственик"
          label-for="selectOwner"
          label-class="ml-2 pt-2 font-weight-bold text-primary"
        >
          <b-form-select id="selectOwner" v-model="filters.owner">
            <b-form-select-option :value="null"
              >&lt; без филтър &gt;</b-form-select-option
            >
            <b-form-select-option
              v-for="(owner, id) in owners"
              :key="id"
              :value="owner.data.id"
              >{{ owner.data.name }}</b-form-select-option
            >
          </b-form-select>
        </b-form-group>
        <b-form-group
          label="Ремонтна работилница"
          label-for="selectRepairWorkshop"
          label-class="ml-2 pt-2 font-weight-bold text-primary"
        >
          <b-form-select
            id="selectRepairWorkshop"
            v-model="filters.repairWorkshop"
          >
            <b-form-select-option :value="null"
              >&lt; без филтър &gt;</b-form-select-option
            >
            <b-form-select-option
              v-for="(repairWorkshop, id) in repairWorkshops"
              :key="id"
              :value="repairWorkshop.data.id"
              >{{ repairWorkshop.data.name }}</b-form-select-option
            >
          </b-form-select>
        </b-form-group>
      </div>
      <div class="col-sm-12 col-md-4">
        <b-form-group
          label="Сортиране"
          label-for="selectSort"
          label-class="ml-2 pt-2 font-weight-bold text-primary"
        >
          <b-form-select id="selectSort" v-model="filters.sort">
            <b-form-select-option :value="null"
              >&lt; без филтър &gt;</b-form-select-option
            >
            <b-form-select-option value="asc">Възходящо</b-form-select-option>
            <b-form-select-option value="desc">Низходящо</b-form-select-option>
          </b-form-select>
        </b-form-group>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    depots: {
      type: Array,
      required: true,
    },
    statuses: { type: Array, required: true },
    owners: { type: Array, required: true },
    repairWorkshops: { type: Array, required: true },
  },
  data() {
    return {
      filters: {
        status: null,
        depot: null,
        owner: null,
        repairWorkshop: null,
        sort: null,
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
      if (this.filters.status !== null) {
        this.queryString += '&status_id=' + this.filters.status
      }
      if (this.filters.depot !== null) {
        this.queryString += '&depot_id=' + this.filters.depot
      }
      if (this.filters.repairWorkshop !== null) {
        this.queryString += '&repair_workshop_id=' + this.filters.repairWorkshop
      }
      if (this.filters.owner !== null) {
        this.queryString += '&owner_id=' + this.filters.owner
      }
      if (this.filters.sort !== null && this.filters.sort !== 'null') {
        this.queryString += '&sort=' + this.filters.sort
      }
      this.$emit('applyFilters', this.queryString)
    }, 500),
  },
}
</script>
