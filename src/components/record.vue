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
        cidOptions: [{
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
        }],
        rules: {
        category: [
            { required: true, message: '请输入支出类型', trigger: 'blur' },
            { min: 1, message: '至少1个字符', trigger: 'blur' }
        ]
        },

    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证成功提交数据
          alert('submit!');
          // this.$router.push("/home/overview")
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
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
