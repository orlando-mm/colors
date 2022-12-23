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
                :label="'Nombre'"
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
                :label="'Background'"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-switch v-model="editedColor.active" :label="editedColor.active ? `Activo` : 'Inactivo'"></v-switch>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="$emit('close')"> Cancel </v-btn>
        <v-btn color="primary" :loading="loading" depressed dark @click="toggleAction"> Save </v-btn>
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
    editingColor: {
      type: Boolean,
      default: false
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
    formTitle() {
      return this.editingColor ? 'Editar color' : 'Crear color';
    }
  },
  methods: {
    ...mapActions({
      createColorAction: 'colors/createColor'
    }),
    toggleAction() {
      if (this.editingColor) this.editColor();
      if (!this.editingColor) this.createColor();
    },
    async createColor() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const color = { calendar_patterns2: { ...this.editedColor } };
        const { data } = await this.createColorAction(color);
        this.loading = false;
        if (data?.success) {
          this.$emit('save');
        }
        if (!data.success) {
          // eslint-disable-next-line no-console
          console.log(data?.data);
        }
      }
    },
    editColor() {
      if (this.$refs.form.validate()) {
        this.$emit('save');
      }
    }
  }
};
</script>

<style scoped></style>
