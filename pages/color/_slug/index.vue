<template>
  <div class="d-flex justify-center">
    <app-loading v-if="loading" />
    <div v-else-if="hasColor">
      <v-card :color="bgColor" dark flat>
        <v-card-title class="text-h5">
          {{ nameColor }}
        </v-card-title>
        <v-card-subtitle>
          <h4>{{ activeColor }}</h4>
        </v-card-subtitle>
        <v-card-actions>
          <v-btn text> Agregar a favoritos </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div v-else class="error">Error mostrando color, vuelva a la lista</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'IndexColor',
  data: () => ({
    loading: false
  }),
  computed: {
    ...mapGetters({
      color: 'colors/showColor'
    }),
    hasColor() {
      return !!this.color.id;
    },
    bgColor() {
      return this.color?.bg_color || 'primary';
    },
    nameColor() {
      return this.color?.text_color || '';
    },
    activeColor() {
      return this.color?.active ? 'Activo' : 'Inactivo';
    }
  },
  created() {
    this.initialize();
  },

  methods: {
    ...mapActions({
      showColor: 'colors/showColor'
    }),
    async initialize() {
      this.loading = true;
      const SLUG = this.$route.params.slug;
      if (SLUG) {
        await this.showColor(SLUG);
      }
      this.loading = false;
    }
  }
};
</script>

<style scoped></style>
