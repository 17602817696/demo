<template>
  <div id="product-add">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加商品</span>
      </div>
      <div class="text item">
        <!-- 表单 -->
        <el-form
          ref="ruleForm"
          :rules="rules"
          :model="ruleForm"
          label-width="80px"
          class="demo-ruleForm"
        >
          <!-- 商品名称 -->
          <el-form-item label="商品名称" prop="productname">
            <el-input v-model="ruleForm.productname" style="width:500px"></el-input>
          </el-form-item>
          <!-- 商品分类 -->
          <el-form-item label="商品分类">
            <el-select v-model="ruleForm.productclassify" placeholder="请选择商品分类">
              <el-option label="美食" value="美食"></el-option>
              <el-option label="水果" value="水果"></el-option>
              <el-option label="物品" value="物品"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <!--商品特色 -->
          <el-form-item label="商品特色">
            <el-checkbox-group v-model="ruleForm.feature">
              <el-checkbox label="新品上市" name="feature"></el-checkbox>
              <el-checkbox label="第二半价" name="feature"></el-checkbox>
              <el-checkbox label="主打产品" name="feature"></el-checkbox>
              <el-checkbox label="火爆产品" name="feature"></el-checkbox>
              <el-checkbox label="祖传手艺" name="feature"></el-checkbox>
              <el-checkbox label="源自四川" name="feature"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <!-- 商品图片 -->
          <el-form-item label="商品图片">
            <el-upload
              class="avatar-uploader"
              action="http://localhost/sell/goods.php?a=uploadImg"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!-- 是否促销 -->
          <el-form-item label="是否促销">
            <el-radio-group v-model="ruleForm.promotion">
              <el-radio label="促销"></el-radio>
              <el-radio label="不促销"></el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 食品规格 -->
          <el-form-item label="食品规格">
            <el-radio-group v-model="ruleForm.specification">
              <el-radio label="单规格"></el-radio>
              <el-radio label="多规格"></el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 包装费 -->
          <el-form-item label="包装费">
            <el-input-number
              v-model="ruleForm.num1"
              @change="packaging"
              :min="1"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <!-- 价格 -->
          <el-form-item label="价格">
            <el-input-number
              v-model="ruleForm.num2"
              @change="price"
              :min="1"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <!-- 商品描述 -->
          <el-form-item label="商品描述" prop="describe">
            <el-input type="textarea" v-model="ruleForm.describe"></el-input>
          </el-form-item>
          <!-- 操作按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        // 包装费
        num1: 1,
        // 价格
        num2: 1,
        // 商品名称
        productname: "",
        // 商品分类
        productclassify: "美食",
        // 商品特色
        feature: ["新品上市", "主打产品"],
        // 是否促销
        promotion: "促销",
        // 食品规格
        specification: "多规格",
        // 商品描述
        describe: ""
      },
      // 图片
      imageUrl: "",
      // 规则
      rules: {
        productname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        describe: [
          { required: true, message: "请填写商品描述", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 包装
    packaging(value) {
      console.log(value);
    },
    // 价格
    price(value) {
      console.log(value);
    },
    // 添加
    submitForm(formName) {
      var that=this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let goodsname = this.ruleForm.productname;
          let goodscategory = this.ruleForm.productclassify;
          let goodsfeature = this.ruleForm.feature;
          let imgUrl = this.imageUrl;
          let isPromotion = this.ruleForm.promotion;
          let standard = this.ruleForm.specification;
          let packprice = this.ruleForm.num1;
          let price = this.ruleForm.num2;
          let goodsdesc = this.ruleForm.describe;
          var ajax = new XMLHttpRequest();
          ajax.open("post", "http://localhost/sell/goods.php?a=add");
          ajax.setRequestHeader(
            "content-type",
            "application/x-www-form-urlencoded"
          );
          ajax.send(
            "goodsname=" +goodsname +
              "&goodscategory=" + goodscategory +
              "&goodsfeature=" + goodsfeature +
              "&imgUrl=" + imgUrl +
              "&isPromotion=" + isPromotion +
              "&standard=" + standard +
              "&packprice=" + packprice +
              "&price=" + price +
              "&goodsdesc=" + goodsdesc
          );
          ajax.onreadystatechange=function(){
            if(ajax.readyState===4 && ajax.status==200){
              let data = JSON.parse(ajax.responseText);
              if(data.code==0){
                that.$message({
                  message:data.msg,
                  type:"success"
                });
                that.$router.push('/particulars/product-list');
              }else{
                that.$message.error(data.msg);
              }
            }
          }

        } else {
          // console.log("error submit!!");
          this.$message.error('请正确填写!!!');
          return false;
        }
      });
    },
    // 取消
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //图片
    handleAvatarSuccess(res) {
      this.imageUrl = 'http://localhost/sell/'+res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt1M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      }
      return isJPG && isLt1M;
    }
  }
};
</script>

<style>
#product-add .demo-image__preview {
  color: #606266;
  font-size: 14px;
  margin: 20px 0px;
  display: flex;
  align-items: center;
}
#product-add .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
#product-add .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
#product-add .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
#product-add .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
#product-add
  .el-form-item.is-required:not(.is-no-asterisk)
  > .el-form-item__label:before {
  content: none;
}
#product-add .el-textarea {
  width: 370px;
}
</style>
