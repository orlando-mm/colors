<template>
  <h1 style="cursor: pointer" @click="goHome">
    <b class="cred--text">Co<b class="cgreen--text">lo</b><b class="primary--text">rs</b></b>
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
