<template>
  <v-container>
    <v-row>
      <v-col align="center">
        <h1>{{$t('home.welcomeTo')}}</h1>
        <app-logo />
      </v-col>
    </v-row>
    <!--<h3 class="app-heading">Usuario:{{ user }}</h3>-->
    <!--<h3 class="app-heading--1">Prueba de texto</h3>
    <h3 class="app-caption">Prueba de texto</h3> -->
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
  auth: false,
  computed: {
    user() {
      return this.$auth.$state;
    }
  }
};
</script>
