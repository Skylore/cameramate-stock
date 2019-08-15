<template>
  <v-card>
    <v-card-title>
      <v-btn color="primary" dark>Calculate Total</v-btn>
      <v-btn color="primary" dark>Download Report</v-btn>
      <v-spacer></v-spacer>
      <filterprod @chipRender="filterChipRender($event)" ref="filterprod"></filterprod>
      <v-btn color="primary" dark>Refresh Data</v-btn>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs">{{ props.item.calories }}</td>
        <td class="text-xs">{{ props.item.fat }}</td>
        <td class="text-xs">{{ props.item.carbs }}</td>
        <td class="text-xs">{{ props.item.protein }}</td>
        <td class="text-xs">{{ props.item.iron }}</td>
        <td class="text-xs">{{ props.item.iron }}</td>
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
</template>

<script>
  import FilterProd from "./FilterProducts.vue";
  import ComboBox from "../ComboBoxFilter.vue";

  export default {
    components: {
      'filterprod' : FilterProd,
      'filterbox' : ComboBox
    },
    props: [],
    data () {
      return {
        search: '',
        headers: [
          { text: 'ID', value: 'calories' },
          { text: 'Product Name', value: 'fat' },
          { text: 'Stock', value: 'carbs' },
          { text: 'Quantity', value: 'protein' },
          { text: 'Cost', value: 'iron' },
          { text: 'Diff', value: 'iron' },
          { text: 'Old', value: 'iron' }
        ],
        items: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%'
          }
        ],
        idFilter: "",
        nameFilter: "",
        stockFilter: "",
        quantityDiffFilter: ""
      }
    },
    methods: {
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

        if (val.stock !== "" && val.stock !== undefined) {
          this.$refs.filterbox.model.push({
            tag: "stock",
            text: val.stock,
            color: 'orange'
          });
        }

        if (val.quantityDiff) {
          this.$refs.filterbox.model.push({
            tag: "quantityDiff",
            text: val.quantityDiff,
            color: 'orange'
          });
        }

        console.log(val);

      },

      filterPackSave(pack) {
        this.idFilter = pack.id;
        this.nameFilter = pack.name;
        this.stockFilter = pack.stock;
        this.quantityDiffFilter = pack.quantityDiff;

        this.$refs.filterprod.id = pack.id;
        this.$refs.filterprod.name = pack.name;
        // this.$refs.filterprod.stock = pack.stock;
        this.$refs.filterprod.quantityDiff = pack.quantityDiff;

        if (pack.stock === undefined) {

           this.$refs.filterprod.$refs.stockfilter.resetForm();
        }

      }
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
