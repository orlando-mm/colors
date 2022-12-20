<template>
  <v-app-bar app dense>
    <div>
      <app-logo />
    </div>
    <v-spacer></v-spacer>
    <app-lang />
    <v-btn v-if="isLoggedIn" icon color="secondary">
      <v-icon color="secondary">{{ $icons.account }}</v-icon>
    </v-btn>
    <v-btn v-if="!isLoggedIn" icon color="primary" :to="localePath('login')">
      <v-icon color="primary">{{ $icons.login }}</v-icon>
    </v-btn>
    <v-btn v-else icon color="error" :loading="loading" @click="logoutUser">
      <v-icon color="error">{{ $icons.logout }}</v-icon>
    </v-btn>
    <template #extension>
      <app-tabs />
    </template>
  </v-app-bar>
</template>

<script>
import CommonMixin from '~/mixins/common';
import AuthMixin from '~/mixins/auth';
export default {
  name: 'AppBar',
  mixins: [CommonMixin, AuthMixin]
};
</script>

<style scoped></style>
