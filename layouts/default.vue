<template>
  <v-app>
    <app-bar />
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <app-footer />
    <app-common />
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout'
};
</script>
