<template>
  <v-card>
    <v-card-title class="app-heading--5">{{ $t('list.youWantToRemove') }}</v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="$emit('closeDelete')">{{ $t('list.cancel') }}</v-btn>
      <v-btn color="cred" text :loading="loading" @click="deleteColorConfirm">{{ $t('list.confirm') }}</v-btn>
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
          console.log(data?.message || this.$t('list.colorSuccessfullyRemoved'));
          this.$emit('deleteColorConfirm');
        }
        if (!data.success) {
          console.log(data?.message || data?.data);
          this.$emit('closeDelete');
        }
      }
      if (!this.color?.id) {
        console.log(this.$t('list.operationFailed'));
        this.$emit('closeDelete');
      }
    }
  }
};
</script>

<style scoped></style>
