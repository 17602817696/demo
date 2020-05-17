<template>
  <div id="addAccount">
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
          <el-form-item label="账号" prop="username">
            <el-input v-model="ruleForm.username" style="width:280px;"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input v-model="ruleForm.pwd" show-password style="width:280px;"></el-input>
          </el-form-item>
          <el-form-item label="用户组" prop="group">
            <el-select v-model="ruleForm.group" placeholder="请选择用户组" style="width:280px;">
              <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="部门管理员" value="部门管理员"></el-option>
              <el-option label="普通管理员" value="普通管理员"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
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
    return {
      ruleForm: {
        username: "",
        pwd: "",
        group: "普通管理员"
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      var that=this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let account=this.ruleForm.username;
          let password=this.ruleForm.pwd;
          let userGroup=this.ruleForm.group;
          var ajax=new XMLHttpRequest();
          ajax.open('post','http://localhost/sell/users.php?a=add');
          ajax.setRequestHeader('content-type','application/x-www-form-urlencoded')
          ajax.send('account='+account+'&password='+password+'&userGroup='+userGroup)
          ajax.onreadystatechange=function(){
            if(ajax.readyState==4 && ajax.status==200){
              let data=JSON.parse(ajax.responseText);
              if(data.code==0){
                that.$message({
                  message:data.msg,
                  type:'success',
                });
                // 跳转到账户列表页面
                that.$router.push('/particulars/account-list');
              }else{
                // code不是0则表示错误
                that.$message.error(data.msg);
              }
            }
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
#addAccount .el-header {
  background: #fff;
  border-bottom: 1px solid #eff1f7;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
#addAccount .el-container {
  border-radius: 5px;
  box-shadow: 0px 0px 10px #000;
}

#addAccount
  .el-form-item.is-required:not(.is-no-asterisk)
  > .el-form-item__label:before {
  content: none;
}
#addAccount .el-main {
  border-radius: 5px;
}
</style>
