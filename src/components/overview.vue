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
        monthConsume: 0,
        averageRemain: 0,
        leftDay: 0,
        homeShow: false,
        buget: 0,
        showchart: false
    }
  },
  mounted() {
        
        this.fillData();
        this.drawPie();
        
        this.averageConsume = 0;
        this.monthRemain = 0;
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
                    {name: '已使用', value: this.monthConsume, itemStyle:{color: '#c23531'}},
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
        console.log(this.averageConsume);
        console.log(this.monthRemain);
    },
    getBuget() {
        this.$http({
            method: "GET",
            url: "http://localhost:8089/config/getConfig",
            params: {
                uid: this.$cookie.get("uid")
            }
        }).then((response) => {
            let data = response.data;
            if(Object.is(data.error, undefined)) {
                this.buget = data.value;
                this.showchart = true;
            } else {
                //第一次使用，不显示表格或者没有设置预算
                //数据保持默认零值
                this.showchart = false;
                
            }
        })
    },
    getConsumeDate() {
        //获取已经消费的金额
        this.$http({
            method: "GET",
            url: "http://localhost:8089/category/getConsume",
            param: {
                uid: this.$cookie.get("uid")
            }
        }).then((response) => {
            let data = response.data;
            if(Object.is(data.error, undefined)){
                this.monthConsume = data.monthConsume;
                let dayNum = new Date().getDate();
                this.averageConsume = this.monthConsume / dayNum;
                this.monthRemain = this.buget - this.monthConsume;
            }                 
            
        })
    },
    fillData() {
        this.getBuget();

        let maxDay = new Date(new Date().getYear(), new Date().getMonth()+1, 0).getDate();
        this.leftDay = maxDay - new Date().getDate() + 1;
        console.log(maxDay, this.leftDay);
        this.getConsumeDate();


    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
