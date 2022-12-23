<template>
  <v-app dark>
    <v-container>
      <v-row justify="center" class="mt-10">
        <v-col cols="auto">
          <span v-if="error.statusCode === 404" class="app-heading--3-bold error--text">
            {{ pageNotFound }}
          </span>
          <h1 v-else class="app-heading--2-bold cred--text">
            {{ otherError }}
          </h1>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="auto">
          <v-btn>
            <app-logo />
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    };
  },
  head() {
    const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title
    };
  }
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
