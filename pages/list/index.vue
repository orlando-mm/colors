<template>
  <div>
    <h1>Lista</h1>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'ListColors',
  auth: true,
  data: () => ({}),
  mounted() {
    this.listColors()
  },
  methods: {
    ...mapActions({
      listColors: 'colors/listColors',

    })
  }
};
</script>

<style scoped></style>
