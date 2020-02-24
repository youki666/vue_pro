<template>
  <div>
    <div>analysis</div>
    <Chart :option="option"></Chart>
  </div>
</template>
<script>
  import Chart from '../../components/Chart'
  import random from 'lodash/random'
  import axios from 'axios'
  import request from '../../utils/request'
    export default {
      data(){
        return {
          option: {

          },
        }
      },
      computed: {},
      components: {
        Chart
      },
      created(){},
      mounted() {
        this.getChartData();
        this.interval = setInterval(()=>{
          this.getChartData()
        }, 1000)
      },
      beforeDestroy() {
        clearInterval(this.interval)
      },
      methods: {
        getChartData(){
          request({
            url: '/api/dashboard/chart',
            method: 'GET',
            params: {ID:12345}
          }).then((res)=>{
            console.log(res)
            this.option = {
              title: {
                text: 'ECharts 入门示例'
              },
              tooltip: {},
              xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
              },
              yAxis: {},
              series: [{
                name: '销量',
                type: 'bar',
                data: res.data
              }]
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>