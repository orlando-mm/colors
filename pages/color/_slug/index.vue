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
          <v-btn text>{{ $t('list.addToFavorites') }}</v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div v-else>
      <span class="app-heading--5 error--text">{{ $t('list.operationFailed') }}</span>
    </div>
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
      return this.color?.active ? this.$t('list.active') : this.$t('list.inactive');
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
