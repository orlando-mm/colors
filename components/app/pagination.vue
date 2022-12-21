<template>
  <div class="text-center">
    <v-pagination
      :length="numPages"
      :total-visible="totalVisible"
      circle
      v-bind="$attrs"
      v-on="$listeners"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  name: 'AppPagination',
  props: {
    numPages: {
      type: Number,
      default: 1
    },
    totalVisible: {
      type: Number,
      default: 4
    }
  },
  data: () => ({})
};
</script>

<style scoped></style>
