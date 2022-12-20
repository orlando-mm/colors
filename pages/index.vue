<template>
  <v-container>
    <v-row justify="center" class="mt-10">
      <v-col cols="auto" class="d-inline-flex">
        <h1 v-if="!isLoggedIn">{{ $t('home.welcomeTo') }}</h1>
        <h1 v-else>{{ $t('home.using') }}</h1>
        <app-logo class="ml-2" />
      </v-col>
    </v-row>
    <v-row v-if="!isLoggedIn" justify="center" class="mt-10">
      <v-col cols="auto" class="align-center">
        <span class="app-heading--6-bold primary--text">{{ $t('home.toViewYour') }}</span>
        <v-btn dark depressed block color="cgreen" class="mt-5" :to="localePath('login')">
          <span class="app-body--1-bold">{{ $t('login.signIn') }}</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CommonMixin from '~/mixins/common';
export default {
  name: 'IndexPage',
  auth: false,
  mixins: [CommonMixin]
};
</script>
