<template>
  <div ref="main" style="height: 500px">
  </div>
</template>
<script>
    import echarts from 'echarts'
    import debounce from 'lodash/debounce'
    import {addListener, removeListener} from 'resize-detector'
    export default {
      props: {
        option: {
          type: Object,
          default: () => {}
        }
      },
      watch: {
        option(val) {
          this.chart.setOption(val);
        }
        // option:{
        //   handler(val){
        //     this.chart.setOption(val)
        //   },
        //   deep: true
        // }
      },
      created() {
        this.resize = debounce(this.resize, 100);
      },
      mounted() {
        this.renderChart()
        addListener(this.$refs.main, this.resize)
      },
      beforeDestroy() {
        removeListener(this.$refs.main, this.resize);
        this.chart.dispose();
        this.chart = null;
      },
      methods: {
        resize(){
          this.chart.resize()
        },
        renderChart(){
          // 基于准备好的dom，初始化echarts实例
          this.chart = echarts.init(this.$refs.main)
          this.chart.setOption(this.option)
        }
      }
    }
</script>

<style scoped>

</style>