<template>
  <!-- <div class="page_component"> -->
    <!-- -->
    <div>
      <el-form :model="recordForm" :rules="rules" ref="recordForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="花费(¥)" prop="spend">
        <el-input v-model="recordForm.spend" style="width: 200px;    margin-left: -150px;"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="cid">
        <el-select v-model="recordForm.cid" clearable placeholder="请选择" style="width: 200px; margin-left: -150px;">
            <el-option 
                v-for="item in cidOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="comment">
        <el-input v-model="recordForm.comment" style="width: 200px;    margin-left: -150px;"></el-input>
      </el-form-item>
      <el-form-item label="日期" prop="date">
        <!-- <el-input v-model="recordForm.date"></el-input> -->
        <el-date-picker style="width: 200px; margin-left: -150px;"
            v-model="recordForm.date"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="dateOptions">
        </el-date-picker>
      </el-form-item>
      
      <el-form-item style="margin-left: -22%;">
        <el-button type="primary" @click="submitForm('recordForm')">增加</el-button>
        <el-button @click="resetForm('recordForm')">重置</el-button>
      </el-form-item>
    </el-form>

    
    </div>
  <!-- </div> -->
  
</template>

<script>
//格式化日期
Date.prototype.format = function(fmt) {
    var o = {         
    "M+" : this.getMonth()+1, //月份         
    "d+" : this.getDate(), //日         
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
    "H+" : this.getHours(), //小时         
    "m+" : this.getMinutes(), //分         
    "s+" : this.getSeconds(), //秒         
    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
    "S" : this.getMilliseconds() //毫秒         
    };         
    var week = {         
    "0" : "/u65e5",         
    "1" : "/u4e00",         
    "2" : "/u4e8c",         
    "3" : "/u4e09",         
    "4" : "/u56db",         
    "5" : "/u4e94",         
    "6" : "/u516d"        
    };         
    if(/(y+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
    }         
    if(/(E+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);         
    }         
    for(var k in o){         
        if(new RegExp("("+ k +")").test(fmt)){         
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
        }         
    }         
    return fmt;
}

export default {
  name: 'Record',
  components: {
    
  },
  data () {
    return {
        recordForm: {
        spend: "",
        cid: 0,
        comment: "",
        date: "2018-05-01"
        },
        dateOptions: {
            disabledDate(time) {
            return time.getTime() > Date.now();
            },
            shortcuts: [{
            text: '今天',
            onClick(picker) {
                picker.$emit('pick', new Date());
            }
            }, {
            text: '昨天',
            onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', date);
            }
            }, {
            text: '一周前',
            onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', date);
            }
            }]
        },
        cidOptions: [],/*{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }*/
        rules: {
          spend: [
            { required: true, message: '请输入花费', trigger: 'blur' },
            { min: 1, message: '至少1个字符', trigger: 'blur' }
          ],
          cid: [
            {required: true, message: '请选择分类'}
          ],
          comment: [
            { required: true, message: '请输入支出类型', trigger: 'blur' },
            { min: 1, message: '至少1个字符', trigger: 'blur' }
          ]
        },

    }
  },
  mounted() {
    this.getCategory();
    // setTimeout(this.checkCidOption, 1000);
    // this.checkCidOption();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证成功提交数据
          console.log({
              spend: this.$refs[formName].model.spend,
              cid: this.$refs[formName].model.cid,
              comment: this.$refs[formName].model.comment,
              date: this.$refs[formName].model.date.format("yyyy-MM-dd"),
              uid: this.$cookie.get("uid")
            });
          this.$http({
            url: "http://localhost:8089/record/addRecord",
            method: "post",
            data: {
              spend: this.$refs[formName].model.spend,
              cid: this.$refs[formName].model.cid,
              comment: this.$refs[formName].model.comment,
              date: this.$refs[formName].model.date.format("yyyy-MM-dd"),
              uid: this.$cookie.get("uid")
            },
            transformRequest: [function (data) {
                // Do whatever you want to transform the data
                let ret = '';
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
                }
                return ret;
            }],
            headers: {'Content-Type':'application/x-www-form-urlencoded'}
          }).then((response) => {
            console.log(response);
            let data = response.data;
            if(Object.is(data.error, undefined)) {
              this.recordForm.spend = 0;
              this.recordForm.comment = "";
              alert('新增记录成功！');
              
            } else {
              alert("提交失败，请重试!");
            }
          });
          // this.$router.push("/home/overview")
        } else {
          console.log('输入有误!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    checkCidOption() {
      //检测用户是否设置分类标签
      if(this.cidOptions.length == 0) {
        alert("请先到‘消费分类’中添加分类");
        this.$router.push("category");
      }
    },
    getCategory() {
      this.$http({
        method: "GET",
        url: "http://localhost:8089/category/getAllCategory",
        params: {
          uid: this.$cookie.get("uid")
        }
      }).then((response) => {
        console.log(response);
        var data = response.data;
        /*data:[
              {
                  "id": "2",
                  "name": "饮料",
                  "uid": "0"
              },
              {
                  "id": "1",
                  "name": "食品",
                  "uid": "0"
              }
          ]*/
        data.forEach((category) => {
          let option = {};
          option.value = category.id;
          option.label = category.name;
          this.cidOptions.push(option);
        });
        this.checkCidOption();
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.demo-ruleForm {
  display: inline-block;
  width: 460px;
  vertical-align: middle;
}
</style>
