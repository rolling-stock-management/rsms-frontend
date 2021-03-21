<template>
  <b-card class="my-2 text-center">
    <template #header>
      <h4 class="mb-0">Табло за управление</h4>
    </template>
    <b-card-text>
      Добре дошли! Навигирайте из сайта чрез страничната лента за избор.
    </b-card-text>
    <b-button
      variant="outline-primary"
      to="/dashboard/"
      class="my-1"
      v-if="userHasRole('passenger-reporter')"
      disabled
      >Извърши проверка на вагон</b-button
    >
    <b-button
      variant="outline-primary"
      to="/dashboard/"
      class="my-1"
      v-if="userHasPermission('passenger-wagon-train-create')"
      >Маркирай вагони на влак</b-button
    >
    <b-button
      variant="outline-primary"
      to="/dashboard/passenger-wagons"
      class="my-1"
      v-if="userHasRole('passenger-manager')"
      >Пътнически вагони</b-button
    >
    <b-button
      variant="outline-primary"
      to="/dashboard/freight-wagons"
      class="my-1"
      v-if="userHasRole('freight-manager')"
      >Товарни вагони</b-button
    >
    <b-button
      variant="outline-primary"
      to="/dashboard/tractive-units"
      class="my-1"
      v-if="userHasRole('locomotive-manager')"
      >Локомотиви</b-button
    >
  </b-card>
</template>

<script>
export default {
  layout: 'dashboard',
  methods: {
    userHasPermission(permission) {
      return this.$UserRolePermissionPlugin.userHasPermission(permission)
    },
    userHasRole(role) {
      return this.$UserRolePermissionPlugin.userHasRole(role)
    },
  },
}
</script>
