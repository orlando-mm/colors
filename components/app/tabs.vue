<template>
  <v-tabs centered center-active color="primary">
    <v-tabs-slider color="secondary"></v-tabs-slider>
    <v-tab :to="localePath('index')"><span>Home</span></v-tab>
    <v-tab :to="localePath('index')"><span>Ganadores</span></v-tab>
    <v-tab :to="localePath('index')"><span>¿Cómo jugar?</span></v-tab>
    <v-tab :to="localePath('aboutus')"><span>¿Quiénes somos?</span></v-tab>
    <v-tab :to="localePath('index')"><span>Contacto</span></v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: 'AppTabs',
}
</script>

<style lang="scss">
.theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active),
.theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-icon,
.theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-btn,
.theme--light.v-tabs > .v-tabs-bar .v-tab--disabled {
  color: var(--v-secondary-base) !important;
  font-weight: normal !important;
}
#app
  > div
  > header
  > div.v-toolbar__extension
  > div
  > div
  > div.v-slide-group__wrapper
  > div
  > div.v-tab.v-tab--active {
  font-weight: bold !important;
}
</style>
