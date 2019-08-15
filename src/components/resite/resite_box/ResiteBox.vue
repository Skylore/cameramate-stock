<template>

  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>

      <boxfilter @chipRender="filterChipRender($event)" ref="resiteboxfilter"></boxfilter>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
    >
      <template v-slot:items="props">
        <td class="text-xs">{{ props.item.calories }}</td>
        <td class="text-xs">{{ props.item.fat }}</td>
        <td class="text-xs">
          <v-edit-dialog
            :return-value.sync="props.item.carbs"
            large
            lazy
            persistent
          >
            <div>{{ props.item.carbs }}</div>
            <template v-slot:input>
              <div class="mt-3 title">Update Carbs</div>
            </template>
            <template v-slot:input>
              <v-text-field
                v-model="props.item.carbs"
                :rules="[max25chars]"
                label="Edit"
                single-line
                counter
                autofocus
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </td>
      </template>
      <template v-slot:footer>
        <td :colspan="headers.length">
          <comboboxfilter ref="filterbox"  @filterReset="filterPackSave($event)"></comboboxfilter>
        </td>
      </template>
    </v-data-table>
  </v-card>




</template>

<script>
  import ResiteBoxFilter from "./ResiteBoxFilter.vue"
  import ComboBoxFilter from "../../ComboBoxFilter.vue"

  export default {
    components: {
      'boxfilter' : ResiteBoxFilter,
      'comboboxfilter' : ComboBoxFilter
    },
    data () {
      return {
        snack: false,
        snackColor: '',
        snackText: '',
        max25chars: v => v.length <= 25 || 'Input too long!',
        pagination: {},
        headers: [
          { text: '#', value: 'calories' },
          { text: 'Product', value: 'fat' },
          { text: 'Quantity', value: 'carbs' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
          }
        ],
        typeFilter: "",
        dateFilter: "",
        timeFilter: "",
        destinationFilter: "",
        stockFilter: ""

      }
    },
    methods: {
      filterChipRender(val) {

        this.filterPackSave(val);
        this.$refs.filterbox.model = [];

        if (val.type !== "" && val.type !== undefined) {
          this.$refs.filterbox.model.push({
            tag: "type",
            text: val.type,
            color: 'orange'
          });
        }

        if (val.date !== "" && val.date !== undefined && val.date != null) {
          this.$refs.filterbox.model.push({
            tag: "date",
            text: val.date,
            color: 'orange'
          });
        }

        if (val.time !== "" && val.time !== undefined && val.time != null) {
          this.$refs.filterbox.model.push({
            tag: "time",
            text: val.time,
            color: 'orange'
          });
        }

        if (val.destination !== "" && val.destination !== undefined) {
          this.$refs.filterbox.model.push({
            tag: "destination",
            text: val.destination,
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

        console.log(val);

      },

      filterPackSave(pack) {
        this.typeFilter = pack.type;
        this.dateFilter = pack.date;
        this.timeFilter = pack.time;
        this.destinationFilter = this.destination;
        this.stockFilter = pack.stock;

        this.$refs.resiteboxfilter.type = pack.type;
        this.$refs.resiteboxfilter.date = pack.date;
        this.$refs.resiteboxfilter.time = pack.time;
        this.$refs.resiteboxfilter.destination = pack.destination;

        // this.$refs.filterprod.stock = pack.stock;
        this.$refs.resiteboxfilter.quantityDiff = pack.quantityDiff;

        if (pack.stock === undefined) {

           this.$refs.resiteboxfilter.$refs.stockfilter.resetForm();
        }

      }
    }
  }
</script>

<style >
    table.v-table tfoot tr td {
      padding: 0;
    }
</style>
