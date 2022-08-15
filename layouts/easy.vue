<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <app-logo class="mt-5" />
        <Nuxt />
      </v-container>
    </v-main>
    <common />
  </v-app>
</template>

<script>
export default {
  name: 'EasyLayout'
};
</script>

<style scoped></style>
