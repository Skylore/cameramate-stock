<template>
  <v-card>
    <v-card-title>
      <gridFilter @chipRender="filterChipRender($event)" ref="gridfilter"></gridFilter>
      <v-spacer></v-spacer>
      <v-btn color="primary" dark>Export</v-btn>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="products"
    >
      <template v-slot:items="props">
        <td class="text-xs">{{ props.item.calories }}</td>
        <td class="text-xs">{{ props.item.fat }}</td>
        <td class="text-xs">{{ props.item.carbs }}</td>
        <td class="text-xs">{{ props.item.protein }}</td>
        <td class="text-xs">{{ props.item.iron }}</td>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
        Found no results.
        </v-alert>
      </template>
      <template v-slot:footer>
        <td :colspan="headers.length">
          <comboboxfilter ref="filterbox" @filterReset="filterPackSave($event)"></comboboxfilter>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
  import ResiteGridFilter from './ResiteGridFilter.vue';
  import ComboBoxFilter from "../../ComboBoxFilter.vue";

  export default {
    components: {
      'gridFilter' : ResiteGridFilter,
      'comboboxfilter' : ComboBoxFilter
    },
    data () {
      return {
        headers: [
          { text: 'Product ID', value: 'calories' },
          { text: 'Product', value: 'fat' },
          { text: 'Date', value: 'carbs' },
          { text: 'Quantity', value: 'protein' },
          { text: 'Place', value: 'iron' }
        ],
        products: [
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
        stockFilter: "",
        inOrderFilter: ""
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

        if (val.stock !== "" && val.stock !== undefined) {
          this.$refs.filterbox.model.push({
            tag: "stock",
            text: val.stock,
            color: 'orange'
          });
        }

        if (val.inOrder) {
          this.$refs.filterbox.model.push({
            tag: "inOrder",
            text: val.inOrder,
            color: 'orange'
          });
        }

        console.log(val);

      },
      filterPackSave(pack) {
        console.log(pack);
        this.idFilter = pack.id;
        this.stockFilter = pack.stock;
        this.inOrderFilter = pack.inOrder;

        this.$refs.gridfilter.id = pack.id;
        this.$refs.gridfilter.inOrder = pack.inOrder;

        if (pack.stock === undefined) {
           this.$refs.gridfilter.$refs.stockfilter.resetForm();
        }

      }
    }
  }
</script>

<style media="screen" scoped>
  table.v-table tfoot tr td {
    padding: 0;
  }
</style>
