<template>
  <b-row class="justify-content-md-center">
    <b-col col lg="6">
      <b-card header="Регистрация">
        <b-form @submit="userRegister">
          <b-form-group id="name" label="Потребителско име:" label-for="email">
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
    }
  },
  methods: {
    async userRegister(evt) {
      evt.preventDefault()
      try {
        await this.$axios.$get('sanctum/csrf-cookie').then((response) => {})
        await this.$axios.$post('/register', this.form).then((response) => {
          console.log(response)
        })
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
