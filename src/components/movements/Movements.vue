<template>
  <div>
      <v-card v-if="!isLoading">
        <v-card-title>
          <v-btn color="primary" dark>Check Movements</v-btn>
          <v-spacer></v-spacer>
          <filtermove @chipRender="filterChipRender($event)" :types="types" :froms="froms" :toos="toos" ref="filtermove"></filtermove>
          <v-btn color="primary" dark @click="loadData()">Refresh Data</v-btn>
        </v-card-title>
        <v-data-table
        :headers="headers"
        :items="movementsFilterBuffer"
        :search="search"
        >
        <template v-slot:items="props">
          <td class="text-xs">{{ props.item.stocks_move_id }}</td>
          <td class="text-xs">{{ props.item.product.descriptions[0].products_name }}</td>
          <td class="text-xs">{{ props.item.stocks_move_type }}</td>
          <td class="text-xs">{{ props.item.stocks_move_from }}</td>
          <td class="text-xs">{{ props.item.stocks_move_to }}</td>
          <td class="text-xs">{{ props.item.stocks_move_quantity }}</td>
          <td class="text-xs">{{ props.item.stocks_move_date }}</td>
        </template>
        <template v-slot:no-results>
          <v-alert :value="true" color="error" icon="warning">
            Found no results.
          </v-alert>
        </template>
        <template v-slot:footer>
          <td :colspan="headers.length">
            <filterbox ref="filterbox" @filterReset="filterPackSave($event)"></filterbox>
          </td>
        </template>
      </v-data-table>
    </v-card>
    <v-card v-else>

      <div class="text-xs-center" style="padding-top: 40vh; height: 90vh;">
        <v-progress-circular
          :size="70"
          indeterminate
          color="black"
        ></v-progress-circular>
    </div>

    </v-card>
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import Data from '../../data.js'
   
  Vue.use(VueAxios, axios)

  import Filter from "./FilterMovements.vue"
  import FilterBox from "../ComboBoxFilter.vue"

  export default {
    components: {
      'filtermove' : Filter,
      'filterbox' : FilterBox
    },
    data () {
      return {
        search: '',
        headers: [
          { text: 'ID', value: 'stocks_move_id' },
          { text: 'Product Name', value: 'product.descriptions[0].products_name' },
          { text: 'Type', value: 'stocks_move_type' },
          { text: 'From', value: 'stocks_move_from' },
          { text: 'To', value: 'stocks_move_to' },
          { text: 'Quantity', value: 'stocks_move_quantity' },
          { text: 'Date', value: 'stocks_move_date' }
        ],
        movements: [],
        movementsFilterBuffer: [],
        isLoading: true,
        idFilter: "",
        nameFilter: "",
        typeFilter: "",
        fromFilter: "",
        toFilter: "",
        types: [],
        froms: [],
        toos: []
      }
    },
    methods: {
      loadData() {
        this.isLoading = true;
        axios.defaults.headers.common['Authorization'] = Data.token;
        axios
          .get(Data.path.stocks_move)
          .then(response => {
            this.movements = response.data.data,
            this.movementsFilterBuffer = response.data.data,
            this.isLoading = false,
            this.filterDef(response.data.data)
          });
      },
      filterDef(data) {
        let types = [];
        let from = [];
        let to = [];

        data.forEach(function (item) {
          if (types.indexOf(item.stocks_move_type) == -1) {
            types.push(item.stocks_move_type);
          }
          if (from.indexOf(item.stocks_move_from) == -1) {
            from.push(item.stocks_move_from);
          }
          if (to.indexOf(item.stocks_move_to) == -1) {
            to.push(item.stocks_move_to)
          }
        });

        this.types = types;
        this.froms = from;
        this.toos = to;
      },
      filterChipRender(val) {

        this.filterPackSave(val);
        this.$refs.filterbox.model = [];

        if (val.id !== "" && val.id !== undefined) {
          this.$refs.filterbox.model.push({
            tag: "id",
            text: val.id,
            color: 'orange'
          });
        }

        if (val.name !== "" && val.name !== undefined) {
          this.$refs.filterbox.model.push({
            tag: "name",
            text: val.name,
            color: 'orange'
          });
        }

        if (val.type !== "" && val.type !== undefined) {
          this.$refs.filterbox.model.push({
            tag: "type",
            text: val.type,
            color: 'orange'
          });
        }

        if (val.from !== "" && val.from !== undefined) {
          this.$refs.filterbox.model.push({
            tag: "from",
            text: val.from,
            color: 'orange'
          });
        }

        if (val.to !== "" && val.to !== undefined) {
          this.$refs.filterbox.model.push({
            tag: "to",
            text: val.to,
            color: 'orange'
          });
        }

        console.log(val);

      },

      filterPackSave(pack) {
        this.idFilter = pack.id;
        this.nameFilter = pack.name;
        this.typeFilter = pack.type;
        this.fromFilter = pack.from;
        this.toFilter = pack.to;

        this.$refs.filtermove.id = pack.id;
        this.$refs.filtermove.name = pack.name;
        this.$refs.filtermove.type = pack.type;
        this.$refs.filtermove.from = pack.from;
        this.$refs.filtermove.to = pack.to;

        let filtersActive = [];

        if (this.idFilter !== undefined && this.idFilter !== "") {
          filtersActive.push({
            path: 'stocks_move_id',
            item: this.idFilter
          })
        }
        if (this.nameFilter !== undefined && this.nameFilter !== "") {
          filtersActive.push({
            path: 'product.descriptions[0].products_name',
            item: this.nameFilter
          })
        }
        if (this.typeFilter !== undefined && this.typeFilter !== "") {
          filtersActive.push({
            path: 'stocks_move_type',
            item: this.typeFilter
          })
        }
        if (this.fromFilter !== undefined && this.fromFilter !== "") {
          filtersActive.push({
            path: 'stocks_move_from',
            item: this.fromFilter
          })
        }
        if (this.toFilter !== undefined && this.toFilter !== "") {
          filtersActive.push({
            path: 'stocks_move_to',
            item: this.toFilter
          })
        }

        this.movementsFilterBuffer = this.movements

        let filtered = Data.filterUtil(this.movements, filtersActive);

        if (filtered.length != 0 && filtersActive.length != 0) {
          this.movementsFilterBuffer = filtered;
        } else if (filtered.length == 0 && filtersActive.length != 0) {
          this.movementsFilterBuffer = [];
        }

        let activeFilterProps = Data.defineActiveProps(filtered);

        this.types = activeFilterProps.types;
        this.froms = activeFilterProps.froms;
        this.toos = activeFilterProps.toos;

        console.log(filtered);
      }
    },
    mounted() {
      this.loadData();
    }
  }
</script>

<style lang="css" scoped>
  .v-card__title {
    padding: 5px 40px;
  }

  .theme--light.v-sheet {
    width: 100%;
  }

  table.v-table tfoot tr td {
    padding: 0;
  }
</style>
