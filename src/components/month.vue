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
        resumeData: []//本月每天消费
    }
  },
  mounted() {
      this.drawPie();
  },
  methods: {
    drawPie() {
        // this.$cookie.set("name", "month");
        // console.log(this.$cookie.get("name"));
        //获取本月天数
        let date = Array.from(new Array(new Date().getDate()),(val,index)=>index+1);
        let resumeData = Array.from(new Array(new Date().getDate()),(val,index)=>(index+1)*2);
        // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '本月消费'
            },
            tooltip: {},
            legend: {
                data:['花费']
            },
            xAxis: {
                data: date
            },
            yAxis: {},
            series: [{
                name: '花费',
                type: 'bar',
                data: resumeData
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    },
    getEveryDayCategory() {
      //获取这个月每天的消费记录，并将其展示出来
      this.$http({
          method: "GET",
          url: "http://localhost:8089/config/getMonthRecord"
      }).then((response)=>{
          let monthRecord = response.data;
          monthRecord.forEach(record => {
              this.resumeData.push(record.spend);
          });
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
