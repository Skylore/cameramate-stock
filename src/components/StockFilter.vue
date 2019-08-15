<template lang="html">
  <v-list three-line subheader>
    <v-subheader>Stock</v-subheader>
    <v-layout row wrap>
      <v-flex xs4>
        <v-select
          :items="stockNames"
          label="Store"
          v-model="stock.store"
          @change="siteDef()"
        ></v-select>
      </v-flex>

      <v-flex xs4>
        <v-select
          :items="siteNames"
          label="Site"
          v-model="stock.site"
          :disabled="siteDis"
          @change="rackDef()"
        ></v-select>
      </v-flex>

      <v-flex xs4>
        <v-select
          :items="rackNames"
          label="Rack"
          v-model="stock.rack"
          :disabled="racksDis"
          @change="renderStock()"
        ></v-select>
      </v-flex>
    </v-layout>
  </v-list>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Data from '../data.js'
 
Vue.use(VueAxios, axios)

export default {
  data() {
    return {
      siteDis: true,
      racksDis: true,
      stockNames: [],
      siteNames: [],
      rackNames: [],
      stocks: [],
      sites: [],
      racks: [],
      stock: {
        store: "",
        site: "",
        rack: ""
      }
    }
  },
  mounted() {
    axios.defaults.headers.common['Authorization'] = Data.token;
    axios
      // .get(Data.path.store)
      .get('../../static/tmpData/allstocks.json')
      .then(response => (
        this.stockDef(response.data.data)
    ));


  },
  methods: {
    stockDef(stocks) {
      let stocksBuffer = {};
      let stockNamesBuffer = [];

      stocks.forEach(function (item) {
        let name = JSON.stringify(item.stock_name);
        let id = item.stocks_id;

        stocksBuffer[name] = id;

        stockNamesBuffer.push(item.stock_name);
      })

      this.stockNames = stockNamesBuffer;
      this.stocks = stocksBuffer;

      stockNamesBuffer = null;
      stocksBuffer = null;

      this.renderStock();
    },

    siteDef() {

      if (this.stock.site !== "") {
        this.stock.site = "";
        this.siteDis = true;
        this.stock.rack = "";
        this.racksDis = true;
      }

      let id = this.stocks[JSON.stringify(this.stock.store)];

      let sitesBuffer = [];
      let siteNamesBuffer = [];

      function siteDefNested(response) {
        response.data.data[0].children.forEach(item => {
          sitesBuffer[JSON.stringify(item.stock_name)] = item.stocks_id,
          siteNamesBuffer.push(item.stock_name)
        })
      }

      axios.defaults.headers.common['Authorization'] = Data.token;
      axios
        // .get(Data.path.site[0] + id + Data.path.site[1])
        .get('../../static/tmpData/roomshkaf101.json')
        .then(response => (
          response.data.data[0].children.length == 0 ?
          this.renderStock()
          :
          siteDefNested(response) & (this.siteDis = false) & (this.siteNames = siteNamesBuffer) & (this.sites = sitesBuffer) & this.renderStock()

      ));
    },

    rackDef() {

      if (this.stock.rack !== "") {
        this.stock.rack = "";
        this.racksDis = true;
      }

      let id = this.sites[JSON.stringify(this.stock.site)];

      let racksBuffer = [];
      let rackNamesBuffer = [];

      axios.defaults.headers.common['Authorization'] = Data.token;
      axios
        // .get(Data.path.rack[0] + id + Data.path.rack[1])
        .get('../../static/tmpData/rack102.json')
        .then(response => (
          response.data.data[0].children.forEach(item => {
            racksBuffer[JSON.stringify(item.stock_name)] = item.stocks_id,
            rackNamesBuffer.push(item.stock_name)
          }),
          this.racksDis = false,
          this.rackNames = rackNamesBuffer,
          this.racks = racksBuffer
      ));

      this.renderStock()
    },

    renderStock() {

      if (this.stock.site === "") {
        this.$emit("stockRender", this.stock.store);
      } else if (this.stock.site !== "" && this.stock.rack === "") {
        this.$emit("stockRender", this.stock.store + '-' + this.stock.site);
      } else {
        this.$emit("stockRender", this.stock.store + '-' + this.stock.site + '-' + this.stock.rack);
      }
    },

    resetForm() {
      this.stock.store = "";
      this.stock.site = "";
      this.stock.rack = "";
      this.siteDis = true;
      this.racksDis = true;

      this.renderStock();
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
