
<template>
  <!-- <div class="page_component"> -->
    <!-- -->
    <div>
      <el-form :model="configForm" ref="configForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="预算" prop="configForm">
        <el-input v-model="configForm.value"></el-input>
      </el-form-item>

      <el-form-item style="margin-left: 42%;">
        <el-button type="primary" @click="submitForm('configForm')">增加</el-button>
        <el-button @click="resetForm('configForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="configTable"
      border
      style="width: 400">
      <el-table-column
        prop="key"
        label="名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="value"
        label="对应值"
        width="200">
      </el-table-column>
    </el-table>
    </div>
  <!-- </div> -->
  
</template>

<script>

export default {
  name: 'Category',
  components: {
    
  },
  data () {
    return {
        configForm: {
            key: "预算",
            value: 0
        },
        rules: {
        category: [
            { required: true, message: '请输入支出类型', trigger: 'blur' },
            { min: 1, message: '至少1个字符', trigger: 'blur' }
        ]},
        configTable: [{
            id: '1',
            key: '预算',
            value: 2000
        }]
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证成功提交数据
          alert('submit!');
          // this.$router.push("/home/overview")
          //提交config
          this.$http({
              method: "post",
              url: "http://lcoalhost:8089/config/save",
              data: {
                  key: this.$refs[formName].model.key,
                  value: this.$refs[formName].model.value,
                  uid: this.$cookie.get("uid")
              },
              transformRequest: [function (data) {
                // Do whatever you want to transform the data
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
            headers: {'Content-Type':'application/x-www-form-urlencoded'}
          }).then((response) => {
              //返回数据进行处理
            var data = response.data;
            if(data.id > 0) {
            //   flag = true;
            }
          })
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
