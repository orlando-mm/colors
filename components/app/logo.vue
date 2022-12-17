<template>
  <h1 style="cursor: pointer" @click="goHome">
    <b class="red--text">Co<b class="green--text">lo</b><b class="primary--text">rs</b></b>
  </h1>
</template>

<script>
export default {
  name: 'AppLogo',
  methods: {
    goHome() {
      this.$router.push(this.localePath('/'));
    }
  }
};
</script>

<style scoped></style>
