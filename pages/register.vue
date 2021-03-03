<template>
  <b-container class="my-3">
    <b-row class="justify-content-md-center">
      <b-col col lg="6">
        <div v-if="error">
          <b-alert show variant="danger">
            <p>{{ error.message }}</p>
            <p
              v-for="(email_err, email_id) in error.errors.email"
              :key="email_id"
            >
              {{ email_err }}
            </p>
            <p
              v-for="(password_err, password_id) in error.errors.password"
              :key="password_id"
            >
              {{ password_err }}
            </p>
          </b-alert>
        </div>
        <b-card header="Регистрация">
          <b-form @submit="userRegister">
            <b-form-group
              id="name"
              label="Потребителско име:"
              label-for="email"
            >
              <b-form-input
                id="name"
                v-model="form.name"
                type="text"
                placeholder="Въведете име"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="email"
              label="Email адрес:"
              label-for="email"
              description="Нужно е да потвърдите този адрес след регистрация."
            >
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
            <b-form-group
              id="password_confirmation"
              label="Потвърждаване на паролата:"
              label-for="password_confirmation"
            >
              <b-form-input
                id="password_confirmation"
                v-model="form.password_confirmation"
                type="password"
                placeholder="Въведете паролата отново"
                required
              ></b-form-input>
            </b-form-group>
            <div class="d-flex justify-content-end">
              <b-button type="submit" variant="outline-success"
                >Регистрация</b-button
              >
            </div>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      error: null,
    }
  },
  methods: {
    async userRegister(evt) {
      evt.preventDefault()
      try {
        await this.$axios.$get('sanctum/csrf-cookie')
        await this.$axios.$post('/register', this.form)
        await this.$auth.loginWith('laravelSanctum', {
          data: {
            email: this.form.email,
            password: this.form.password,
          },
        })
        this.$router.push('/dashboard')
      } catch (err) {
        this.error = err.response.data
      }
    },
  },
}
</script>
