<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row justify="end">
          <v-col cols="auto">
            <app-lang />
          </v-col>
        </v-row>
        <v-row class="mt-5" justify="center">
          <v-col cols="auto">
            <app-logo />
          </v-col>
        </v-row>
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
