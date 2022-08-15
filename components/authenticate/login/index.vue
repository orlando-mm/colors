<template>
  <v-form ref="form" class="mt-5">
    <v-row class="mt-0" justify="center">
      <v-col cols="12" lg="4" xl="3">
        <v-text-field
          v-model="email"
          outlined
          dense
          color="primary"
          placeholder="satoshinakamoto@gmail.com"
          :label="$t('login.email')"
          :error-messages="errorMessages.email"
          :rules="[rules.required, rules.email]"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-0" justify="center">
      <v-col cols="12" lg="4" xl="3">
        <v-text-field
          v-model="password"
          outlined
          dense
          color="primary"
          placeholder="At0m1k+-"
          :label="$t('login.password')"
          :error-messages="errorMessages.password"
          :rules="[rules.required, rules.password]"
          :append-icon="showPassw ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassw ? 'text' : 'password'"
          @click:append="showPassw = !showPassw"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-0" justify="center">
      <v-col class="pt-0" cols="12" lg="4" xl="3" align="right">
        <span class="app-body--2 secondary--text">
          <nuxt-link :to="localePath('/')" class="text-decoration-none">
            {{ $t('login.forgotYourPassword') }}
          </nuxt-link>
        </span>
      </v-col>
    </v-row>
    <v-row class="mt-0" justify="center">
      <v-col cols="12" lg="4" xl="3">
        <v-btn dark depressed block color="primary" :loading="loading" @click="userLogin">
          <span class="app-body--1-bold">{{ $t('login.signIn') }}</span>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="mt-0" justify="center">
      <v-col cols="12" lg="4" xl="3">
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row class="mt-0" justify="center">
      <v-col cols="12" lg="4" xl="3" align="center">
        <span class="app-body--2 secondary--text">
          {{ $t('login.dontHaveAccount') }}
        </span>
        <v-btn small text color="primary" @click="$emit('changeform')">
          <span class="app-body--2 primary--text text-lowercase">
            {{ $t('login.registerNow') }}
          </span>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import FormMixin from '~/mixins/form';
import AuthMixin from '~/mixins/auth';
export default {
  name: 'LoginIndex',
  mixins: [FormMixin, AuthMixin],
  data: () => ({
    showPassw: false
  })
};
</script>

<style scoped></style>
