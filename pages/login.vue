<template>
  <b-row class="justify-content-md-center">
    <b-col col lg="6">
      <b-card header="Влизане">
        <b-form @submit="userLogin">
          <b-form-group id="email" label="Email адрес:" label-for="email">
            <b-form-input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="Въведете email"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="password" label="Парола:" label-for="password">
            <b-form-input
              id="password"
              v-model="form.password"
              type="password"
              placeholder="Въведете парола"
              required
            ></b-form-input>
          </b-form-group>
          <div class="d-flex justify-content-end">
            <b-button type="submit" variant="outline-success">Влизане</b-button>
          </div>
        </b-form>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async userLogin(evt) {
      evt.preventDefault()
      try {
        this.$auth.loginWith('laravelSanctum', {
          data: {
            email: this.form.email,
            password: this.form.password,
          },
        })
        this.$router.push('/')

        // Get something from protected route.
        const response = await this.$axios.$get('user')
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
