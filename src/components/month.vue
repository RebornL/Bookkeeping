<template>
  <!-- <div class="page_component"> -->
    
    
    <div style="vertical-align: middle;display: inline-block;">
        <div id="main" style="width: 600px;height:400px;"></div>   
    </div>
  <!-- </div> -->
  
</template>

<script>
// var echarts = require('echarts');
export default {
  name: 'Month',
  components: {
    
  },
  data () {
    return {
        todayConsume: 10,
        averageConsume: 20,
        monthRemain: 100,
        averageRemain: 15,
        leftDay:5,
    }
  },
  mounted() {
      this.drawPie();
  },
  methods: {
    drawPie() {
        
        // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
