<template>
  <div class="my-2">
    <h4>Изтриване на ГДВ</h4>
    <hr />
    <b-card>
      <p>
        Наистина ли искате да изтриете ГДВ
        {{ timetable.start_date }} -> {{ timetable.end_date }}? Това действие е
        необратимо.
      </p>
      <div class="d-flex justify-content-end">
        <b-button
          type="button"
          :to="'/dashboard/timetables/' + timetable.id"
          variant="outline-success"
          class="mx-1"
          >Отказ</b-button
        >
        <b-button variant="outline-danger" @click="handleDelete"
          >Изтриване</b-button
        >
      </div>
    </b-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  middleware: 'hasPermission',
  meta: {
    auth: { permission: 'timetable-delete' },
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('timetables/fetchTimetableById', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Неуспешно взимане на информацията за ГДВ ' +
          params.id +
          '. Моля, опитайте по-късно.',
      })
    }
  },
  computed: mapState({
    timetable: (state) => state.timetables.timetable,
  }),
  methods: {
    async handleDelete() {
      try {
        await this.$store.dispatch(
          'timetables/deleteTimetable',
          this.timetable.id
        )
        this.$router.push('/dashboard/timetables')
      } catch (error) {
        error({
          statusCode: 503,
          message:
            'Неуспешно изтриване на ГДВ ' +
            this.$route.params.id +
            '. Моля, опитайте по-късно.',
        })
      }
    },
  },
}
</script>
