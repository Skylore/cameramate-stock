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

            <v-flex xs4>
              <v-text-field
                label="Products Name"
                v-model="name"
              ></v-text-field>
            </v-flex>

            <v-flex xs4>
              <v-select
                :items="types"
                label="Type"
                v-model="type"
              ></v-select>
            </v-flex>
          </v-layout>

        </v-list>

        <v-divider></v-divider>

        <v-list three-line subheader>
          <v-subheader>Stock</v-subheader>
          <v-layout row wrap>
            <v-flex xs6>
              <v-select
                :items="froms"
                label="From"
                v-model="from"
              ></v-select>
            </v-flex>

            <v-flex xs6>
              <v-select
                :items="toos"
                label="To"
                v-model="to"
              ></v-select>
            </v-flex>
          </v-layout>

        </v-list>






      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    props: ['types', 'froms', 'toos'],
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        id: "",
        name: "",
        type: "",
        from: "",
        to: ""
      }
    },
    methods: {
      save() {
        let filterPack = {
          'id' : (this.id === undefined ? "" : this.id),
          'name' : (this.name === undefined ? "" : this.name),
          'type' : (this.type === undefined ? "" : this.type),
          'from' : (this.from === undefined ? "" : this.from),
          'to' : (this.to === undefined ? "" : this.to),
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

  .theme--light.v-sheet {
    width: 100%;
  }

</style>
