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
        count: 0
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
        id: '3',
        name: '出行',
        count: 2
      }, {
        id: '4',
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
          //提交category
          this.$http({
            url: "http://localhost:8089/category/save",
            method: "post",
            data: {
              name: this.$refs[categoryForm].model.category,
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
              flag = true;
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
    },
    getCategory() {
      //获取该用户定义的category
      this.$http({
        method: "GET",
        url: "http://localhost:8089/category/getCategory",
        params: {
          uid: this.$cookie.get("uid")
        }
      }).then((response) => {
        let data = response.data;
        data.forEach((category) => {
          category.count = 0;
          this.tableData.push(category);
        })
      });
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
