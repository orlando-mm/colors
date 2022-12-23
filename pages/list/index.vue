<template>
  <v-container>
    <v-data-table
      :loading="loadingList"
      loading-text="Loading... Please wait"
      :headers="headers"
      :items="listColors"
      :sort-by="['bg_color', 'active']"
      :sort-desc="[false, true]"
      multi-sort
      hide-default-footer
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>Gestionar colores</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary" depressed dark small fab class="mb-2" @click="dialog = true">
            <v-icon>{{ $icons.plus }}</v-icon>
          </v-btn>
          <v-dialog v-if="dialog" v-model="dialog" persistent max-width="500px">
            <list-form :color="color" @close="close" @save="save" />
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <list-delete @closeDelete="closeDelete" @deleteItemConfirm="deleteItemConfirm" />
          </v-dialog>
        </v-toolbar>
      </template>
      <template #[`item.bg_color`]="{ item }">
        <v-chip :color="item.bg_color" dark style="min-width: 75px">
          {{ item.bg_color }}
        </v-chip>
      </template>
      <template #[`item.active`]="{ item }">
        <v-icon :color="item.active ? 'cgreen' : 'cred'">{{ $icons.check }}</v-icon>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon small class="mr-2" color="primary" @click="editColor(item)"> {{ $icons.pencil }} </v-icon>
        <v-icon small color="cred" @click="deleteColor(item)"> {{ $icons.delete }} </v-icon>
      </template>
      <template #no-data>
        <v-btn color="primary" depressed @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
    <app-pagination
      v-if="page && numPages > 1"
      v-model="page"
      :num-pages="numPages"
      class="mt-12"
      @input="pagination"
    />
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ListColors',
  auth: true,
  data: () => ({
    loadingList: false,
    numPages: null,
    page: null,
    dialog: false,
    dialogDelete: false,
    color: null
  }),
  computed: {
    ...mapGetters({
      listColors: 'colors/listColors',
      listColorsPagination: 'colors/listColorsPagination'
    }),
    headers() {
      return [
        { text: 'Text', value: 'text_color' },
        { text: 'Background', value: 'bg_color' },
        { text: 'Activo', value: 'active' },
        // { text: 'Order', value: 'order' },
        { text: 'Actions', value: 'actions', sortable: false }
      ];
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    ...mapActions({
      listColorsAction: 'colors/listColors'
    }),
    async initialize() {
      this.loadingList = true;
      await this.listColorsAction({ page: 1, per_page: 5 });
      this.changeNumPages();
      this.changePage();
      this.loadingList = false;
    },

    editColor(item) {
      this.color = { ...item };
      this.dialog = true;
    },

    deleteColor(item) {
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.closeDelete();
    },

    close() {
      this.color = null;
      this.dialog = false;
    },

    closeDelete() {
      this.dialogDelete = false;
    },

    save() {
      this.close();
      this.initialize();
    },
    async pagination(page) {
      this.loading = true;
      await this.listColorsAction({ page, per_page: 5 });
      this.changeNumPages();
      this.changePage();
      this.loading = false;
    },
    changeNumPages() {
      this.numPages = this.listColorsPagination?.total_pages || '';
    },
    changePage() {
      this.page = this.listColorsPagination?.current_page || '';
    }
  }
};
</script>

<style scoped></style>
