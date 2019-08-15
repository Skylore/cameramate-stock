<template>
    <JqxSplitter ref="splitter" @resize="onResize()"
                 :height="height" :width="width"
                 :panels="panels">
        <div><resitegrid></resitegrid></div>
        <div><resitebox></resitebox></div>
    </JqxSplitter>
</template>



<script>
import ResiteGrid from "./resite_grid/ResiteGrid.vue"
import ResiteBox from "./resite_box/ResiteBox.vue"
import JqxSplitter from 'jqwidgets-scripts/jqwidgets-vue/vue_jqxsplitter.vue';

export default {
  components: {
    'resitegrid' : ResiteGrid,
    'resitebox' : ResiteBox,
    JqxSplitter
  },
  data() {
    return {
      width: '100%',
      height: 590,
      panels: [{ size: '60%', min: '45%', collapsible: false }, { size: '40%', min: '30%' }]
    }
  },
  mounted() {
    this.height = window.innerHeight
  },
  methods: {
    onResize() {
      this.$refs.splitter.refresh();
    }
  }
}
</script>

<style media="screen" scoped>
</style>
