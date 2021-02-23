<template>
  <b-navbar
    toggleable="lg"
    type="light"
    variant="white"
    class="shadow-sm sticky-top"
  >
    <b-navbar-brand href="#">СУПЖПС</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/" exact exact-active-class="active">Начало</b-nav-item>
        <b-nav-item v-if="guest" to="login" exact exact-active-class="active"
          >Вход</b-nav-item
        >
        <b-nav-item v-if="guest" to="register" exact exact-active-class="active"
          >Регистрация</b-nav-item
        >
        <b-nav-item v-if="loggedIn" to="login" exact exact-active-class="active"
          >Табло за управление</b-nav-item
        >
        <b-nav-item v-if="loggedIn" @click="logOut"
          ><b-icon-box-arrow-right></b-icon-box-arrow-right
        ></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    async logOut() {
      // TODO: Alert for testing purposes
      alert('logging out')
      await this.$auth.logout()
    },
  },
  computed: {
    guest() {
      return !this.$auth.loggedIn
    },
    loggedIn() {
      return this.$auth.loggedIn
    },
  },
}
</script>
