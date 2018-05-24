<template>
  <div class="hello" style="text-align: center;">
    <img src="../assets/logo.png">
    <h1>{{ msg }}</h1>
    <!-- <div style="display: inline;"> -->
    <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="username" prop="username">
        <el-input v-model="userForm.username"></el-input>
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input type="password" v-model="userForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('userForm')">登陆</el-button>
        <el-button @click="resetForm('userForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- </div> -->
  </div>
</template>

<script>

export default {
  name: 'Index',
  components: {
    
  },
  data () {
    return {
      msg: 'Bill',
      userForm: {
        username: "",
        password: "",
      },

      rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: "请输入密码", trigger: "blur"},
            { min: 6, message: "长度至少为6个字符", trigger: "blur"}
          ]
        }
    }
  },
  methods: {
    handleLogin() {
      this.$refs.form.validate((valid) => {
        console.log(valid)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证成功提交数据
          alert('submit!');
          this.$router.push("/home")
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
h1, h2 {
  font-weight: normal;
}

img {
  width: 100px;
  height: 100px;
  /* margin-top: 10px; */
}

.demo-ruleForm {
  display: inline-block;
  width: 460px;
  vertical-align: middle;
}
</style>
