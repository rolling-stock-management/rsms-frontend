export default function ({ $axios }, inject) {
  const UserService = {
    getUsers(page) {
      return $axios.get('/users?page=' + page)
    },
    getUser(id) {
      return $axios.get('/users/' + id)
    },
    createUser(form) {
      return $axios.post('/users', form)
    },
    updateUser(id, form) {
      return $axios.patch('/users/' + id, form)
    },
    deleteUser(id) {
      return $axios.delete('users/' + id)
    },
  }

  inject('UserService', UserService)
}
