<template>
  <div id="head_portrait">
    <el-card class="box-card">
      <h3>管理员信息</h3>
      <p>
        <span>管理员ID &nbsp;:</span>
        {{id}}
      </p>
      <p>
        <span>账号 &nbsp;:</span>
        {{account}}
      </p>
      <p>
        <span>用户组 &nbsp;:</span>
        {{userGroup}}
      </p>
      <p>
        <span>创建时间 &nbsp;:</span>
        {{ctime}}
      </p>
      <p class="user_img">
        <span>管理员头像 &nbsp;:</span>
        <el-upload
          class="avatar-uploader"
          action="http://localhost/sell/goods.php?a=uploadImg"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :before-upload="beforeUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </p>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      account: "",
      userGroup: "",
      ctime: "",
      imageUrl: ""
    };
  },
  async created() {
    var id = sessionStorage.getItem("id");
    var d = await this.axios.get("/users.php?a=readOne&id=" + id);
    if (d.data.code == 0) {
      this.id = d.data.data.id;
      this.account = d.data.data.account;
      this.userGroup = d.data.data.userGroup;
      this.ctime = d.data.data.ctime;
      this.imageUrl = d.data.data.imgUrl;
    }
  },
  methods: {
    async uploadSuccess(res) {
      this.imageUrl="http://localhost/sell/"+res.data;
      // 将上传图像地址发送到服务器实现修改头像
      var obj={
        id:this.id,
        imgUrl:this.imageUrl
      }
      var d=await this.axios.post('/users.php?a=chgImg',this.qs.stringify(obj));
      // console.log(d.data.code)
      if(d.data.code==0){
        this.$message({
          message:d.data.msg,
          type:'success'
        })
      }else{
          this.$message.error(d.data.msg);
      }
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt1M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt1M;
    }
  }
};
</script>

<style>
#head_portrait .el-card__body > p {
  margin: 20px 0px;
}
#head_portrait .el-card__body > p > span {
  margin-right: 20px;
}

#head_portrait .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin: 10px 20px;
}
#head_portrait .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
#head_portrait .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
#head_portrait .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>