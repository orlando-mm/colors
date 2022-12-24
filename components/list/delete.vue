<template>
  <v-card>
    <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="$emit('closeDelete')">Cancel</v-btn>
      <v-btn color="blue darken-1" text :loading="loading" @click="deleteColorConfirm">OK</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'DeleteColor',
  props: {
    color: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    loading: false
  }),
  methods: {
    ...mapActions({
      deleteColorAction: 'colors/deleteColor'
    }),
    async deleteColorConfirm() {
      if (this.color?.id) {
        this.loading = true;
        const { data } = await this.deleteColorAction(this.color?.id);
        this.loading = false;
        if (data?.success) {
          console.log(data?.message || 'Color eliminado correctamente');
          this.$emit('deleteColorConfirm');
        }
        if (!data.success) {
          console.log(data?.message || data?.data);
          this.$emit('closeDelete');
        }
      }
      if (!this.color?.id) {
        console.log('Vuelva a intentar la edicion');
        this.$emit('closeDelete');
      }
    }
  }
};
</script>

<style scoped></style>
