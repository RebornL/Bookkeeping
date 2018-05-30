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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let flag = false;
          //make a crypt
          let salt = this.$bcrypt.genSaltSync(12);    //定义密码加密的计算强度,默认10   
          let password = this.$bcrypt.hashSync(this.$refs[formName].model.password, salt);
          // this.$ref[formName].model.password = password;
          //验证成功提交数据
          // console.log(password, this.$refs[formName].model.username);
          //发起post请求
          this.$http({
            url: "http://localhost:8089/user/save",
            method: "post",
            data: {
              username: this.$refs[formName].model.username,
              password: password
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
            console.log(data);
            if(data.id > 0) {
              flag = true;
            }
          })
          // flag = true;
          if(flag){
            //登陆成功或注册成功
            alert('submit!');            
            this.$router.push("/home");
          } else {
            alert("服务器繁忙，请稍后再试");
            this.$router.go(0);
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      console.log(this.$refs[formName].model);
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
