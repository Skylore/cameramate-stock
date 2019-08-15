<template>
  <div>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Filters</v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Filter Menu</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="save()">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-list three-line subheader>
          <v-subheader>Product Props</v-subheader>
          <v-layout row wrap>
              <v-flex xs4>
                <v-text-field
                  label="Products ID"
                  v-model="id"
                ></v-text-field>
              </v-flex>
          </v-layout>

        </v-list>

        <v-divider></v-divider>

        <stockfilter ref="stockfilter" @stockRender="stock = $event"></stockfilter>

        <v-list three-line subheader>
          <v-layout row wrap>
            <v-flex xs3>
              <v-checkbox
                v-model="inOrder"
                label="In Order"
                type="checkbox"
              ></v-checkbox>
            </v-flex>
          </v-layout>

        </v-list>



      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import StockFilter from "../../StockFilter.vue"

  export default {
    components: {
      'stockfilter' : StockFilter
    },
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        id: "",
        stock: "",
        inOrder: ""
      }
    },
    methods: {
      save() {
        let filterPack = {
          'id' : (this.id === undefined ? "" : this.id),
          'stock' : this.stock,
          'inOrder' : (this.inOrder === undefined ? "" : this.inOrder)
        };

        this.$emit('chipRender', filterPack);
        this.dialog = false;
      }
    }
  }
</script>

<style lang="css" scoped>
.flex {
  padding-right: 25px;
}

.flex:first-child {
  padding-left: 25px;
}
</style>
