<template>
  <v-container>
    <v-row>
      <v-col align="center">
        <div>
          <v-img width="80" :src="$assets.atomikLogo" style="cursor: pointer" />
        </div>
        <h3 class="secondary--text mt-5">
         Colors
        </h3>
      </v-col>
    </v-row>
    <h3 class="app-heading">Estado del usuario:{{ user }}</h3>
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
