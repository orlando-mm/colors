<template>
  <v-snackbar v-model="show" fixed bottom left elevation="24" :color="flash.color" multi-line timeout="6000">
    {{ flash.message }}
    <template #action="{ attrs }">
      <v-btn color="white" icon v-bind="attrs" @click="close()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  name:'AppFlash',
  data: () => ({}),
  computed: {
    ...mapGetters({
      flash: 'app/flashConfig'
    }),
    show: {
      get() {
        return this.flash.show;
      },
      set(show) {
        const conf = { ...this.flash, show };
        this.setFlash(conf);
      }
    }
  },
  methods: {
    ...mapMutations({
      setFlash: 'app/SET_FLASH_CONFIG'
    }),
    close() {
      this.setFlash({
        message: '',
        show: false
      });
    }
  }
};
</script>
<style lang="scss"></style>
