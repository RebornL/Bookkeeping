<template>
  <!-- <div class="page_component"> -->
    <!-- -->
    <div>
      <el-form :model="categoryForm" :rules="rules" ref="categoryForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="类别" prop="category">
        <el-input v-model="categoryForm.category"></el-input>
      </el-form-item>

      <el-form-item style="margin-left: 42%;">
        <el-button type="primary" @click="submitForm('categoryForm')">增加</el-button>
        <el-button @click="resetForm('categoryForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="类别"
        width="180">
      </el-table-column>
      <el-table-column
        prop="count"
        label="消费次数">
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
      categoryForm: {
        category: "",
      },

      rules: {
        category: [
          { required: true, message: '请输入支出类型', trigger: 'blur' },
          { min: 1, message: '至少1个字符', trigger: 'blur' }
        ]
      },

      tableData: [{
        id: '1',
        name: '食品',
        count: 20
      }, {
        id: '2',
        name: '饮料',
        count: 15
      }, {
        id: '1',
        name: '出行',
        count: 2
      }, {
        id: '1',
        name: '租房',
        count: 1
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
