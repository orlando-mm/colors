<template>
  <v-container>
    <v-row>
      <v-col align="center">
        <h3 class="primary--text mt-5 app-heading--5-bold">{{ user.user || '' }}</h3>
        <h1>{{ $t('home.welcomeTo') }}</h1>
        <app-logo />

      </v-col>
    </v-row>
    <div class="mt-10">
      <h1 class="primary--text">{{ user }}</h1>
    </div>
    <div class="mt-10">
      <h1 class="primary--text">{{ test }}</h1>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
  auth: false,
  computed: {
    user() {
      return this.$auth.$state;
    },
    test() {
      return this.$auth.token
    }
  }
};
</script>
