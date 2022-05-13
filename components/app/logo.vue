<template>
  <v-row>
    <v-col align="center">
      <v-img
        @click="goHome"
        width="50"
        :src="$assets.atomikLogo"
        style="cursor: pointer"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'AppLogo',
  methods: {
    goHome() {
      this.$router.push(this.localePath('/'))
    },
  },
}
</script>

<style scoped></style>
