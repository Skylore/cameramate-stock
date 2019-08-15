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
          <v-subheader>Props</v-subheader>
          <v-layout row wrap>
            <v-flex xs4>
              <v-select
                :items="types"
                label="Type"
                v-model="type"
              ></v-select>
            </v-flex>

            <v-flex xs2>
              <v-menu
                ref="date"
                v-model="dateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="date"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date"
                    label="Date"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="dateMenu = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.date.save(date)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>




            <v-flex xs2>
              <v-menu
                ref="menu"
                v-model="timeMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="time"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="time"
                    label="Time"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="timeMenu"
                  v-model="time"
                  full-width
                  @click:minute="$refs.menu.save(time)"
                ></v-time-picker>
              </v-menu>
            </v-flex>

            <v-flex xs4>
              <v-text-field
                label="Destination"
                v-model="destination"
              ></v-text-field>
            </v-flex>
          </v-layout>

        </v-list>

        <v-divider></v-divider>

        <stockfilter ref="stockfilter" @stockRender="stock = $event"></stockfilter>

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
        timeMenu: false,
        types: ['1', '2'],
        type: "",
        date: null,
        dateMenu: false,
        time: null,
        destination: ''
      }
    },
    methods: {
      save() {
        let filterPack = {
          'type' : (this.type === undefined ? "" : this.type),
          'date' : ((this.date === undefined || this.date == null) ? "" : this.date),
          'time' : ((this.time === undefined || this.date == null) ? "" : this.time),
          'destination' : (this.destination === undefined ? "" : this.destination),
          'stock' : (this.stock === undefined ? "" : this.stock)
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
