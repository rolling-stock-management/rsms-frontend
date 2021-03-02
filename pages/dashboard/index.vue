<template>
  <b-card class="my-2 text-center">
    <template #header>
      <h4 class="mb-0">Табло за управление</h4>
    </template>
    <b-card-text>
      Добре дошли! Навигирайте из сайта чрез страничната лента за избор.
    </b-card-text>
    <b-button variant="outline-primary" to="/dashboard/" class="my-1"
      >Извърши проверка на вагон</b-button
    >
    <b-button variant="outline-primary" to="/dashboard/" class="my-1"
      >Маркирай вагони на влак</b-button
    >
    <b-button variant="outline-primary" to="/dashboard/" class="my-1"
      >Пътнически вагони</b-button
    >
    <b-button variant="outline-primary" to="/dashboard/" class="my-1"
      >Товарни вагони</b-button
    >
    <b-button variant="outline-primary" to="/dashboard/" class="my-1"
      >Локомотиви</b-button
    >
  </b-card>
</template>

<script>
export default {
  layout: 'dashboard',
}
</script>
