<template>
  <div class="home">
    <div class="login">
      <h3 class="login-title">系统登录</h3>
      <el-form :model="form" :rules="rules" ref="loginForm">
        <el-form-item prop="name">
          <el-input v-model="form.name" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input v-model="form.pwd" show-password prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('loginForm')" style="width:100%">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      form: {
        name: "",
        pwd: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入正确用户名", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        pwd: [
          { required: true, message: "请输入正确密码", trigger: "blur" },
          { min: 5,  message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.loginForm.validate( async (result) => {
        if (result) {
          let obj={
            account:this.form.name,
            password:this.form.pwd,
          }

          // console.log( this.qs.stringify(obj) );

          let d = await this.axios.post('/users.php?a=login',this.qs.stringify(obj))
          // console.log(d)
          if(d.data.code==0){
            sessionStorage.setItem('token',d.data.token)
            sessionStorage.setItem('id',d.data.data.id)
            sessionStorage.setItem('user',JSON.stringify(d.data.data))
            this.$message({
              message:d.data.msg,
              type:'success'
            })
          this.$router.push("/UserCenter");
          }else{
            this.$message.error(d.data.msg);
          }


        } else {
          return false;
        }
      });
    }
  }
};
</script>



<style>
body,button,dd,dl,dt,fieldset,form,h1,h2,h3,h4,h5,h6,hr,input,li,ol,p,td,textarea,th,ul{margin:0;padding:0}
a{text-decoration: none;}
a:hover{color: tomato}
.home {
  width: 100%;
  height: 100%;
  background: url("../assets/login-img.jpg") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.home .login {
  width: 400px;
  height: 260px;
}
.home .login > .login-title {
  width: 100%;
  color: #fff;
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
}
.home .login .el-input__inner {
  color: #fff;
  background: rgba(0, 0, 0, 0.4);
}
</style>
