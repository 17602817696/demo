<template>
  <div id="account-edit">
    <el-container>
      <el-header>修改账户</el-header>
      <el-main>
        <template>
          <!-- 表格 -->
          <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="account" label="用户名" width="280"></el-table-column>

            <el-table-column prop="userGroup" label="用户组" width="280"></el-table-column>

            <el-table-column label="头像" width="280">
              <template slot-scope="scope">
                <img :src="scope.row.imgUrl" style="width:150px;height:120px" />
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template>
                <el-button size="mini" @click="handleEdit">确认修改</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
            style="margin-top:20px;"
          >
            <el-form-item label="账号" prop="username">
              <el-input v-model="ruleForm.username" style="width:280px;"></el-input>
            </el-form-item>
            <el-form-item label="用户组" prop="group">
              <el-select v-model="ruleForm.group" placeholder="请选择用户组" style="width:280px;">
                <el-option label="超级管理员" value="超级管理员"></el-option>
                <el-option label="部门管理员" value="部门管理员"></el-option>
                <el-option label="普通管理员" value="普通管理员"></el-option>
              </el-select>
            </el-form-item>

          </el-form>

          <!-- 操作按钮 -->
          <div style="margin-top: 20px">
            <el-button type="danger" @click="back">返回</el-button>
          </div>
        </template>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  async created() {
    var id = this.$route.params.id;
    var d = await this.axios.get("/users.php?a=readOne&id=" + id);
    if (d.data.code == 0) {
      var mydata = [];
      for (let i in d.data) {
        mydata.push(d.data[i]);
      }
      this.tableData = mydata.slice(-1);
    }
  },
  data() {
    return {
      currentPage4: 1,
      tableData: [],
      multipleSelection: [],
      ruleForm: {
        username: "",
        group: "普通管理员"
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    back() {
      this.$router.replace("/particulars/account-list");
    },
    async handleEdit() {
      var editmy = {
        account: this.ruleForm.username,
        userGroup: this.ruleForm.group,
        id:this.$route.params.id
      };
      var d = await this.axios.post("/users.php?a=edit",this.qs.stringify(editmy));
      if(d.data.code==0){
        this.$message({
          message:d.data.msg,
          type:'success'
        })
        this.$router.replace("/particulars/account-list");
      }else{
        this.$message.error(d.data.msg);
      }
    },

  }
};
</script>

<style>
#account-edit .el-header {
  background: #fff;
  border-bottom: 1px solid #eff1f7;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
#account-edit .el-container {
  border-radius: 5px;
  box-shadow: 0px 0px 10px #000;
}
#account-edit .el-pagination {
  margin-top: 23px;
}
#account-edit .el-main {
  border-radius: 5px;
}
</style>
