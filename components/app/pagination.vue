<template>
  <div class="text-center">
    <v-pagination v-model="page" :length="4" circle :total-visible="5"></v-pagination>
  </div>
</template>

<script>
export default {
  name: 'AppPagination',
  data: () => ({
    page: 1
  })
};
</script>

<style scoped></style>
