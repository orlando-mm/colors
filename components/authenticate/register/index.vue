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
          :label="$t('register.email')"
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
          persistent-hint
          counter
          color="primary"
          placeholder="At0m1k+-"
          :label="$t('register.password')"
          hint="Mínimo 8 caracteres"
          :error-messages="errorMessages.password"
          :rules="[rules.required, rules.password]"
          :append-icon="showPassw ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassw ? 'text' : 'password'"
          @click:append="showPassw = !showPassw"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-0" justify="center">
      <v-col cols="12" lg="4" xl="3">
        <v-btn dark depressed block color="primary" :loading="loading" @click="registerUser">
          <span class="app-body--1-bold">{{ $t('register.register') }}</span>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="mt-0" justify="center">
      <v-col cols="12" lg="4" xl="3">
        <span class="app-body--2 secondary--text">
          {{ $t('register.byClickingRegister') }}
          <nuxt-link :to="localePath('/')" class="text-decoration-none">
            {{ $t('register.termsAndPrivacyPolicy') }}
          </nuxt-link>
          {{ $t('register.theAtomik') }}
        </span>
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
          {{ $t('register.alreadyHaveLogin') }}
        </span>
        <v-btn small text color="primary" @click="$emit('changeform')">
          <span class="app-body--2 primary--text text-lowercase">
            {{ $t('register.signIn') }}
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
  name: 'RegisterIndex',
  mixins: [FormMixin, AuthMixin],
  data: () => ({
    showPassw: false
  })
};
</script>

<style scoped></style>
