<template>
  <!-- <div class="page_component"> -->
    
    <div class="row">
    <div class="col s7 push-s5">
    <div id="app">
        <p>今日消费：{{ todayConsume }}</p>
        <p>日均消费：{{ averageConsume }}</p>
        <p>本月剩余：{{ monthRemain }}</p>
        <p>日均可用：{{ averageRemain }}</p>
        <p>距离月末的时间：{{ leftDay }}</p>
    </div>
    </div>
    <div class="col s5 pull-s7" style="vertical-align: middle;display: inline-block;">
        <div id="main" style="width: 600px;height:400px;"></div>   
    </div>
    </div>
  <!-- </div> -->
  
</template>

<script>
var echarts = require('echarts');
export default {
  name: 'Overview',
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
            series: {
            name: "本月支出",
            type: 'pie',
            data: [
                {name: '已使用', value: 1212, itemStyle:{color: '#c23531'}},
                {name: '剩余', value: 2323, itemStyle:{color: '#412512'}}
            ]
            },
            itemStyle: {
            //设置扇形颜色
            // color: '#c23531',
            // 阴影的大小
            shadowBlur: 200,
            // 阴影水平方向上的偏移
            shadowOffsetX: 0,
            // 阴影垂直方向上的偏移
            shadowOffsetY: 0,
            // 阴影颜色
            shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            textStyle: {
            color: 'rgba(255, 0, 255 0.5)'
            }
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
