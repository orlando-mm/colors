<template>
  <v-container>
    <v-data-table
      :loading="loadingList"
      :loading-text="$t('list.loadingPleaseWait')"
      :headers="headers"
      :items="listColors"
      :sort-by="['bg_color', 'active']"
      :sort-desc="[false, true]"
      multi-sort
      hide-default-footer
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>{{ $t('list.manageColors') }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary" depressed dark small fab class="mb-2" @click="dialog = true">
            <v-icon>{{ $icons.plus }}</v-icon>
          </v-btn>
          <v-dialog v-if="dialog" v-model="dialog" persistent max-width="600px">
            <list-form :color="color" @close="close" @save="save" />
          </v-dialog>
          <v-dialog v-if="dialogDelete" v-model="dialogDelete" persistent max-width="600px">
            <list-delete :color="color" @closeDelete="closeDelete" @deleteColorConfirm="deleteColorConfirm" />
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
        <v-icon small class="mr-2" color="cred" @click="deleteColor(item)"> {{ $icons.delete }} </v-icon>
        <v-icon small class="mr-2" color="cgreen" @click="showColor(item)"> {{ $icons.eye }} </v-icon>
        <v-icon small color="primary" @click="editColor(item)"> {{ $icons.pencil }} </v-icon>
      </template>
      <template #no-data>
        <v-btn color="primary" depressed @click="initialize">{{$t('list.reset')}}</v-btn>
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
        { text: this.$t('list.name'), value: 'text_color' },
        { text: this.$t('list.background'), value: 'bg_color' },
        { text: this.$t('list.active'), value: 'active' },
        // { text: 'Order', value: 'order' },
        { text: this.$t('list.actions'), value: 'actions', sortable: false }
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
      this.color = { ...item };
      this.dialogDelete = true;
    },

    deleteColorConfirm() {
      this.closeDelete();
      this.initialize();
    },

    close() {
      this.color = null;
      this.dialog = false;
    },

    closeDelete() {
      this.color = null;
      this.dialogDelete = false;
    },

    save() {
      this.close();
      this.initialize();
    },
    showColor(color) {
      this.$router.push(
        this.localePath({
          name: 'color-slug',
          params: {
            slug: color.id
          }
        })
      );
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
