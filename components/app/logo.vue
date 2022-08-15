<template>
  <v-row>
    <v-col align="center">
      <v-img width="50" :src="$assets.atomikLogo" style="cursor: pointer" @click="goHome" />
    </v-col>
  </v-row>
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
