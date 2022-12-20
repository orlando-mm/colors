<template>
  <v-menu transition="slide-x-transition" bottom right>
    <template #activator="{ on, attrs }">
      <v-btn icon color="secondary" v-bind="attrs" v-on="on">
        <v-icon color="secondary">{{ $icons.lang }}</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="(item, i) in itemsLang" :key="i">
        <v-btn depressed dark block :color="item.color" @click="changeLang(item)">
          {{ item.title }}
        </v-btn>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import Languages from '~/constants/lang';
export default {
  name: 'AppLang',
  data: () => ({
    itemsLang: Languages
  }),
  methods: {
    changeLang(item) {
      if (item?.code !== this.$i18n.locale) {
        this.$i18n.setLocale(item.code);
      }
    }
  }
};
</script>

<style></style>
