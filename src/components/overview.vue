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
        <div v-if="showchart" id="main" style="width: 600px;height:400px;"></div>   
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
        todayConsume: 0,
        averageConsume: 0,
        monthRemain: 0,
        averageRemain: 0,
        leftDay: 0,
        homeShow: false,
        buget: 0,
        showchart: false
    }
  },
  mounted() {
      this.drawPie();
  },
  methods: {
    drawPie() {
        if(this.showchart) {    
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById('main'));

            // 指定图表的配置项和数据
            var option = {
                series: {
                name: "本月支出",
                type: 'pie',
                data: [
                    {name: '已使用', value: (this.buget-this.monthRemain), itemStyle:{color: '#c23531'}},
                    {name: '剩余', value: this.monthRemain, itemStyle:{color: '#412512'}}
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
        }
    },
    getBuget() {
        this.$http({
            method: "GET",
            url: "http://localhost:8089/config/getbuget",
        }).then((response) => {
            let data = response.data;
            if(data == null) {
                //第一次使用，不显示表格
                //数据保持默认零值
            }
        })
    },
    getOtherData() {
        //获取已经消费的金额
        this.$http({
            method: "GET",
            url: "http://localhost:8089/category/getResume",
        }).then((response) => {
            let data = response.data;
            let monthResume = data.monthResume;
            this.monthRemain = this.buget - monthResume;
            
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
