<template>
  <v-combobox
    v-model="model"
    hide-selected
    label="Active Filters"
    append-icon="null"
    multiple
    small-chips
    solo
    readonly
    @change="filterReset()"
  >

    <template v-slot:selection="{ item, parent, selected }">
      <v-chip
        v-if="item === Object(item)"
        :color="`${item.color} lighten-3`"
        label
        small
      >
        <span class="pr-2">
          {{ item.tag }} : {{item.text}}
        </span>
        <v-icon
          small
          @click="parent.selectItem(item)"
        >close</v-icon>
      </v-chip>
    </template>

  </v-combobox>
</template>

<script>
  export default {
    data: () => ({
      colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
      index: -1,
      model: [],
      nonce: 1
    }),

    watch: {
      model (val, prev) {
        if (val.length === prev.length) return

        this.model = val.map(v => {
          if (typeof v === 'string') {
            v = {
              text: v,
              color: this.colors[this.nonce - 1]
            }

            this.items.push(v)

            this.nonce++
          }

          return v
        })
      }
    },

    methods: {
      filterReset() {

        let filterPack = {};

        console.log("model");
        console.log(this.model);

        this.model.forEach(function (item) {
          switch (item.tag) {
            case "id":
              if (filterPack.id !== undefined || filterPack.id !== "") {
                filterPack.id = item.text
              }
              break;
            case "name":
              if (filterPack.name !== undefined || filterPack.name !== "") {
                  filterPack.name = item.text
              }
              break;
            case "stock":
              if (filterPack.stock !== undefined || filterPack.stock !== "") {
                  filterPack.stock = item.text
              }
              break;
            case "quantityDiff":
              if (filterPack.quantityDiff !== undefined || filterPack.quantityDiff !== "") {
                  filterPack.quantityDiff = item.text
              }
              break;
            case "inOrder":
              if (filterPack.inOrder !== undefined || filterPack.inOrder !== "") {
                  filterPack.inOrder = item.text
              }
              break;
            case "type":
              if (filterPack.type !== undefined || filterPack.type !== "") {
                  filterPack.type = item.text
              }
              break;
            case "date":
              if (filterPack.date !== undefined || filterPack.date !== "") {
                  filterPack.date = item.text
              }
              break;
            case "time":
              if (filterPack.time !== undefined || filterPack.time !== "") {
                  filterPack.time = item.text
              }
              break;
            case "destination":
              if (filterPack.destination !== undefined || filterPack.destination !== "") {
                  filterPack.destination = item.text
              }
              break;
            case "from":
              if (filterPack.from !== undefined || filterPack.from !== "") {
                  filterPack.from = item.text
              }
              break;
            case "to":
              if (filterPack.to !== undefined || filterPack.to !== "") {
                  filterPack.to = item.text
              }
              break;
          }
        });

        this.$emit('filterReset', filterPack);
      }
    }
  }
</script>

<style media="screen">
  .v-input__slot {
    margin-bottom: 0;
  }

  .v-text-field__details {
    display: none;
  }
</style>
