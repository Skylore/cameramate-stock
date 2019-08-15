<template>
  <v-app>
    <v-navigation-drawer
      :clipped="primaryDrawer.clipped"
      :mini-variant="primaryDrawer.mini"
      absolute
      overflow
      app
    >


      <v-list dense>
          <template v-for="item in items">
            <v-layout
              v-if="item.heading"
              :key="item.heading"
              row
              align-center
            >
              <v-flex xs6>
                <v-subheader v-if="item.heading">
                  {{ item.heading }}
                </v-subheader>
              </v-flex>
              <v-flex xs6 class="text-xs-center">
                <a href="#!" class="body-2 black--text">EDIT</a>
              </v-flex>
            </v-layout>
            <v-list-tile v-else :key="item.text" @click="primaryDrawer.content = item.num, pageName()">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>



    </v-navigation-drawer>
    <v-toolbar :clipped-left="primaryDrawer.clipped" app absolute>
      <v-toolbar-side-icon
        @click.stop="primaryDrawer.mini = !primaryDrawer.mini"
      ></v-toolbar-side-icon>
      <v-toolbar-title>Products on Stock</v-toolbar-title>

      <v-divider vertical></v-divider>
      <v-toolbar-title>{{activeTab}}</v-toolbar-title>
    </v-toolbar>

    <v-content>

      <keep-alive>
        <component :is="activeTabComponent"></component>
      </keep-alive>

    </v-content>

  </v-app>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)

import Products from "./components/stock/Products.vue";
import Movements from "./components/movements/Movements.vue";
import Resite from "./components/resite/Resite.vue";

export default {
  name: 'app',
  components: {
    Products,
    Movements,
    Resite
  },
  data () {
    return {
      isLoading: false,
      primaryDrawer: {
        type: 'default (no property)',
        clipped: true,
        mini: false,
        content: 0
      },
      dialog: false,
      drawer: null,
      items: [
        { icon: 'store', text: 'Stock', num: 0 },
        { icon: 'compare_arrows', text: 'Movements', num: 1 },
        { icon: 'input', text: 'Resite', num: 2 },
        { icon: 'settings', text: 'Settings', num: 3 }
      ],
      activeTab: "Stock",
      activeTabId: 0
    }
  },
  computed: {
    activeTabComponent() {
      switch (this.primaryDrawer.content) {
        case 0:
          return 'Products'
          break;
        case 1:
          return 'Movements'
          break;
        case 2:
          return 'Resite'
          break;
      }
    }
  },
  methods: {
    pageName() {
      switch (this.primaryDrawer.content) {
        case 0:
          this.activeTab = "Stock"
          break;
        case 1:
          this.activeTab = "Movements"
          break;
        case 2:
          this.activeTab = "Resite"
          break;
        case 3:
          this.activeTab = "Settings"
          break;

      }
    }
  }
}
</script>

<style scoped>
  .theme--light.v-divider {
    margin-inline-start: 48px;
  }

  table.v-table tbody td:first-child, table.v-table tbody td:not(:first-child), table.v-table tbody th:first-child, table.v-table tbody th:not(:first-child), table.v-table thead td:first-child, table.v-table thead td:not(:first-child), table.v-table thead th:first-child, table.v-table thead th:not(:first-child) {
    padding: 0px 10px;
}
</style>
