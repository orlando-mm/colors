<template>
  <v-form ref="form">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row class="justify-center">
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="editedColor.text_color"
                outlined
                dense
                color="primary"
                placeholder="Rojo"
                :label="`${$t('list.name')}`"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="editedColor.bg_color"
                outlined
                dense
                color="primary"
                placeholder="red"
                :label="`${$t('list.background')}`"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-switch
                v-model="editedColor.active"
                :label="editedColor.active ? $t('list.active') : $t('list.inactive')"
              ></v-switch>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="cancelEdit">{{ $t('list.cancel') }}</v-btn>
        <v-btn color="primary" :loading="loading" depressed dark @click="toggleAction"> {{ $t('list.save') }} </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex';
import FormMixin from '~/mixins/form';
export default {
  name: 'FormColor',
  mixins: [FormMixin],
  props: {
    color: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    editedColor: {
      text_color: '',
      bg_color: '',
      active: 0
    },
    loading: false
  }),
  computed: {
    isEditingColor() {
      return !!this.color?.id;
    },
    formTitle() {
      return this.isEditingColor ? this.$t('list.editColor') : this.$t('list.createColor');
    }
  },
  mounted() {
    this.initialize();
  },
  methods: {
    ...mapActions({
      createColorAction: 'colors/createColor',
      updateColorAction: 'colors/updateColor'
    }),
    initialize() {
      this.resetColor();
      if (this.color?.id) {
        this.editedColor = { ...this.color };
      }
    },
    resetColor() {
      this.editedColor = {
        text_color: '',
        bg_color: '',
        active: 0
      };
    },
    cancelEdit() {
      this.resetColor();
      this.$emit('close');
    },
    toggleAction() {
      if (this.isEditingColor) this.editColor();
      if (!this.isEditingColor) this.createColor();
    },
    async createColor() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const color = { calendar_patterns: { ...this.editedColor } };
        color.calendar_patterns.active = color.calendar_patterns?.active ? 1 : 0;
        const { data } = await this.createColorAction(color);
        this.loading = false;
        if (data?.success) {
          console.log(data?.message || this.$t('list.createdSuccessfully'));
          this.resetColor();
          this.$emit('save');
        }
        if (!data.success) {
          console.log(data?.message || data?.data);
          this.cancelEdit();
        }
      }
    },
    async editColor() {
      if (this.$refs.form.validate()) {
        const color = { calendar_patterns: { ...this.editedColor } };
        color.calendar_patterns.active = color.calendar_patterns?.active ? 1 : 0;
        if (color?.calendar_patterns?.id) {
          this.loading = true;
          const { data } = await this.updateColorAction(color);
          this.loading = false;
          if (data?.success) {
            console.log(data?.message || this.$t('list.correctlyEditedColor'));
            this.resetColor();
            this.$emit('save');
          }
          if (!data.success) {
            console.log(data?.message || data?.data);
            this.cancelEdit();
          }
        }
        if (!color?.calendar_patterns?.id) {
          console.log(this.$t('list.operationFailed'));
          this.cancelEdit();
        }
      }
    }
  }
};
</script>

<style scoped></style>
