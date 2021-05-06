<template>
  <b-collapse
    id="nav-collapse"
    class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
  >
    <div class="sidebar-sticky pt-3">
      <ul class="nav flex-column">
        <li class="nav-item">
          <b-link
            to="/dashboard"
            class="nav-link"
            exact
            exact-active-class="active"
            @click="handleClick"
            >Начало</b-link
          >
        </li>
        <li v-if="userHasPermission('train-viewAny')" class="nav-item">
          <b-link
            to="/dashboard/trains"
            class="nav-link"
            exact
            exact-active-class="active"
            @click="handleClick"
            >Влакове</b-link
          >
        </li>
      </ul>

      <!-- Passenger reporter -->
      <div v-if="userHasRole('passenger-reporter')">
        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          <span>Пътническо обслужване</span>
        </h6>
        <ul class="nav flex-column mb-2">
          <li
            v-if="userHasPermission('rolling-stock-train-viewAny')"
            class="nav-item"
          >
            <b-link
              to="/dashboard/rolling-stock-trains?type=1"
              class="nav-link"
              exact
              exact-active-class="active"
              @click="handleClick"
              >Вагони на влакове</b-link
            >
          </li>
        </ul>
      </div>

      <!-- Passenger manager -->
      <div v-if="userHasRole('passenger-manager')">
        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          <span>Пътнически вагони</span>
        </h6>
        <ul class="nav flex-column mb-2">
          <li
            v-if="userHasPermission('passenger-wagon-viewAny')"
            class="nav-item"
          >
            <b-link
              to="/dashboard/passenger-wagons"
              class="nav-link"
              exact
              exact-active-class="active"
              @click="handleClick"
              >Пътнически вагони</b-link
            >
          </li>
          <li v-if="userHasPermission('repair-viewAny')" class="nav-item">
            <b-link
              to="/dashboard/repairs?type=1"
              class="nav-link"
              exact
              exact-active-class="active"
              @click="handleClick"
              >Ремонти</b-link
            >
          </li>
          <li
            v-if="userHasPermission('passenger-wagon-viewAny')"
            class="nav-item"
          >
            <b-link
              to="/dashboard/passenger-wagons?repair_this_month=1"
              class="nav-link"
              exact
              exact-active-class="active"
              @click="handleClick"
              >Изтичащи този месец ревизии</b-link
            >
          </li>
          <li
            v-if="userHasPermission('rolling-stock-train-viewAny')"
            class="nav-item"
          >
            <b-link
              to="/dashboard/rolling-stock-trains?type=1"
              class="nav-link"
              exact
              exact-active-class="active"
              @click="handleClick"
              >Вагони на влакове</b-link
            >
          </li>
        </ul>
      </div>

      <!-- Freight manager -->
      <div v-if="userHasRole('freight-manager')">
        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          <span>Товарни вагони</span>
        </h6>
        <ul class="nav flex-column mb-2">
          <li
            v-if="userHasPermission('freight-wagon-viewAny')"
            class="nav-item"
          >
            <b-link
              to="/dashboard/freight-wagons"
              class="nav-link"
              exact
              exact-active-class="active"
              @click="handleClick"
              >Товарни вагони</b-link
            >
          </li>
          <li v-if="userHasPermission('repair-viewAny')" class="nav-item">
            <b-link
              to="/dashboard/repairs?type=2"
              class="nav-link"
              exact
              exact-active-class="active"
              @click="handleClick"
              >Ремонти</b-link
            >
          </li>
          <li
            v-if="userHasPermission('freight-wagon-viewAny')"
            class="nav-item"
          >
            <b-link
              to="/dashboard/freight-wagons?repair_this_month=1"
              class="nav-link"
              exact
              exact-active-class="active"
              @click="handleClick"
              >Изтичащи този месец ревизии</b-link
            >
          </li>
          <li
            v-if="userHasPermission('rolling-stock-train-viewAny')"
            class="nav-item"
          >
            <b-link
              to="/dashboard/rolling-stock-trains?type=2"
              class="nav-link"
              exact
              exact-active-class="active"
              @click="handleClick"
              >Вагони на влакове</b-link
            >
          </li>
        </ul>
      </div>

      <!-- Locomotive manager -->
      <div v-if="userHasRole('locomotive-manager')">
        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          <span>Локомотиви</span>
        </h6>
        <ul class="nav flex-column mb-2">
          <li
            v-if="userHasPermission('tractive-unit-viewAny')"
            class="nav-item"
          >
            <b-link
              to="/dashboard/tractive-units"
              class="nav-link"
              exact
              exact-active-class="active"
              @click="handleClick"
              >Локомотиви</b-link
            >
          </li>
          <li v-if="userHasPermission('repair-viewAny')" class="nav-item">
            <b-link
              to="/dashboard/repairs?type=3"
              class="nav-link"
              exact
              exact-active-class="active"
              @click="handleClick"
              >Ремонти</b-link
            >
          </li>
          <li
            v-if="userHasPermission('tractive-unit-viewAny')"
            class="nav-item"
          >
            <b-link
              to="/dashboard/tractive-units?repair_this_month=1"
              class="nav-link"
              exact
              exact-active-class="active"
              @click="handleClick"
              >Изтичащи този месец ревизии</b-link
            >
          </li>
          <li
            v-if="userHasPermission('rolling-stock-train-viewAny')"
            class="nav-item"
          >
            <b-link
              to="/dashboard/rolling-stock-trains?type=3"
              class="nav-link"
              exact
              exact-active-class="active"
              @click="handleClick"
              >Локомотиви на влакове</b-link
            >
          </li>
        </ul>
      </div>

      <!-- Administrator -->
      <div v-if="userHasRole('administrator')">
        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          <span>Базови модели</span>
        </h6>
        <ul class="nav flex-column mb-2">
          <li v-if="userHasPermission('depot-viewAny')" class="nav-item">
            <b-link
              to="/dashboard/depots"
              class="nav-link"
              exact
              exact-active-class="active"
              @click="handleClick"
              >Депа</b-link
            >
          </li>
          <li
            v-if="userHasPermission('passenger-wagon-type-viewAny')"
            class="nav-item"
          >
            <b-link
              to="/dashboard/passenger-wagon-types"
              class="nav-link"
              exact
              exact-active-class="active"
              @click="handleClick"
              >Серии пътнически вагони</b-link
            >
          </li>
          <li
            v-if="userHasPermission('freight-wagon-type-viewAny')"
            class="nav-item"
          >
            <b-link
              to="/dashboard/freight-wagon-types"
              class="nav-link"
              exact
              exact-active-class="active"
              @click="handleClick"
              >Серии товарни вагони</b-link
            >
          </li>
          <li v-if="userHasPermission('owner-viewAny')" class="nav-item">
            <b-link
              to="/dashboard/owners"
              class="nav-link"
              exact
              exact-active-class="active"
              @click="handleClick"
              >Собственици</b-link
            >
          </li>
          <li
            v-if="userHasPermission('repair-workshop-viewAny')"
            class="nav-item"
          >
            <b-link
              to="/dashboard/repair-workshops"
              class="nav-link"
              exact
              exact-active-class="active"
              @click="handleClick"
              >Ремонтни работилници</b-link
            >
          </li>
          <li
            v-if="userHasPermission('passenger-interior-type-viewAny')"
            class="nav-item"
          >
            <b-link
              to="/dashboard/passenger-interior-types"
              class="nav-link"
              exact
              exact-active-class="active"
              @click="handleClick"
              >Типове интериори пътнически вагони</b-link
            >
          </li>
          <li v-if="userHasPermission('status-viewAny')" class="nav-item">
            <b-link
              to="/dashboard/statuses"
              class="nav-link"
              exact
              exact-active-class="active"
              @click="handleClick"
              >Статуси</b-link
            >
          </li>
          <li v-if="userHasPermission('repair-type-viewAny')" class="nav-item">
            <b-link
              to="/dashboard/repair-types"
              class="nav-link"
              exact
              exact-active-class="active"
              @click="handleClick"
              >Типове ремонти</b-link
            >
          </li>
          <li v-if="userHasPermission('timetable-viewAny')" class="nav-item">
            <b-link
              to="/dashboard/timetables"
              class="nav-link"
              exact
              exact-active-class="active"
              @click="handleClick"
              >ГДВ</b-link
            >
          </li>
        </ul>
      </div>
      <div v-if="userHasRole('administrator')">
        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          <span>Потребители</span>
        </h6>
        <ul class="nav flex-column mb-2">
          <li v-if="userHasPermission('user-viewAny')" class="nav-item">
            <b-link
              to="/dashboard/users"
              class="nav-link"
              exact
              exact-active-class="active"
              @click="handleClick"
              >Потребители</b-link
            >
          </li>
          <li v-if="userHasPermission('role-viewAny')" class="nav-item">
            <b-link
              to="/dashboard/roles"
              class="nav-link"
              exact
              exact-active-class="active"
              @click="handleClick"
              >Роли</b-link
            >
          </li>
        </ul>
      </div>
    </div>
  </b-collapse>
</template>

<script>
export default {
  methods: {
    userHasPermission(permission) {
      return this.$UserRolePermissionPlugin.userHasPermission(permission)
    },
    userHasRole(role) {
      return this.$UserRolePermissionPlugin.userHasRole(role)
    },
    handleClick() {
      let collapse = 'nav-collapse'
      if (process.client) {
        const width = window.innerWidth
        if (width >= 768) {
          collapse = ''
        }
      }
      this.$root.$emit('bv::toggle::collapse', collapse)
    },
  },
}
</script>

<style scoped>
/*
 * Sidebar
 */

.sidebar {
  position: s;
  top: 0;
  bottom: 0;
  left: 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #999;
}

.sidebar .nav-link.active {
  color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: 0.75rem;
  text-transform: uppercase;
}
</style>
