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
          <v-dialog v-model="dialog" max-width="500px">
            <template #activator="{ on, attrs }">
              <v-btn color="primary" depressed dark small fab class="mb-2" v-bind="attrs" v-on="on">
                <v-icon>{{ $icons.plus }}</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <!-- eslint-disable-next-line -->
      <template #item.bg_color="{ item }">
        <v-chip :color="item.bg_color" dark style="min-width: 75px">
          {{ item.bg_color }}
        </v-chip>
      </template>
      <!-- eslint-disable-next-line -->
      <template #item.active="{ item }">
        <v-icon :color="item.active ? 'cgreen' : 'cred'">{{ $icons.check }}</v-icon>
      </template>
      <!-- eslint-disable-next-line -->
      <template #item.actions="{ item }">
        <v-icon small class="mr-2" color="primary" @click="editItem(item)"> {{ $icons.pencil }} </v-icon>
        <v-icon small color="cred" @click="deleteItem(item)"> {{ $icons.delete }} </v-icon>
      </template>
      <template #no-data>
        <v-btn color="primary" depressed @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
    <app-pagination class="mt-10" />
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ListColors',
  auth: false,
  data: () => ({
    loadingList: false,
    dialog: false,
    dialogDelete: false,
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  }),
  computed: {
    ...mapGetters({
      listColors: 'colors/listColors'
    }),
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
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

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },
  created() {
    this.initialize();
  },

  methods: {
    ...mapActions({
      listColorsAction: 'colors/listColors'
    }),
    initialize() {
      this.loadingList = true;
      this.listColorsAction();
      this.loadingList = false;
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style scoped></style>
