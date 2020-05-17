<template>
  <div id="account-chagpwd">
    <el-container>
      <el-header>添加账号</el-header>
      <el-main>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="原密码" prop="oldpwd">
            <el-input v-model="ruleForm.oldpwd" style="width:280px"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpwd">
            <el-input v-model="ruleForm.newpwd" show-password style="width:280px"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="yespwd">
            <el-input v-model="ruleForm.yespwd" show-password style="width:280px"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
        if (value.length<6) {
          callback(new Error('请输入六位数以上的密码'));
        } else {
          if (this.ruleForm.yespwd !== '') {
            this.$refs.ruleForm.validateField('yespwd');
          }
          callback();
        }
      };
    var validatePass2 = (rule, value, callback) => {
        if (value.length<6) {
          callback(new Error('请输入六位数以上的密码'));
        } else if (value !== this.ruleForm.newpwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      ruleForm: {
        oldpwd: "",
        newpwd: "",
        yespwd: ""
      },
      rules: {
        oldpwd: [
          { required: true, message: "请输入原密码", trigger: "blur" },
          { min: 2, max: 17, message: "长度在 2 到 17 个字符", trigger: "blur" }
        ],
        newpwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        yespwd: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate( async (valid) => {
        if (valid) {
          var obj={
            oldPassword:this.ruleForm.oldpwd,
            newPassword:this.ruleForm.newpwd,
            id:sessionStorage.getItem('id'),
            token:sessionStorage.getItem('token'),
          }
          var d=await this.axios.post('/users.php?a=chgpwd',this.qs.stringify(obj))
          if(d.data.code==0){
            this.$message({
              message: "修改成功，请重新登录",
              type: "success"
            });
            this.$router.replace('/logout');
          }else{
            this.$message.error(d.data.msg);
          }



        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
#account-chagpwd .el-header {
  background: #fff;
  border-bottom: 1px solid #eff1f7;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
#account-chagpwd .el-container {
  border-radius: 5px;
  box-shadow: 0px 0px 10px #000;
}
#account-chagpwd
  .el-form-item.is-required:not(.is-no-asterisk)
  > .el-form-item__label:before {
  content: none;
}
#account-chagpwd .el-main {
  border-radius: 5px;
}
</style>
