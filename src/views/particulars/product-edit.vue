<template>
  <div id="product-add">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修改商品</span>
      </div>
      <div class="text item">
        <!-- 表单 -->
        <el-form ref="form" :model="form" label-width="80px">
          <!-- 商品名称 -->
          <el-form-item label="商品名称">
            <el-input v-model="form.productname" style="width:500px"></el-input>
          </el-form-item>
          <!-- 商品分类 -->
          <el-form-item label="商品分类">
            <el-select v-model="form.productclassify" placeholder="请选择商品分类">
              <el-option label="美食" value="美食"></el-option>
              <el-option label="水果" value="水果"></el-option>
              <el-option label="物品" value="物品"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <!--商品特色 -->
          <el-form-item label="商品特色">
            <el-checkbox-group v-model="form.feature">
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
            <el-radio-group v-model="form.promotion">
              <el-radio label="促销"></el-radio>
              <el-radio label="不促销"></el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 食品规格 -->
          <el-form-item label="食品规格">
            <el-radio-group v-model="form.specification">
              <el-radio label="单规格"></el-radio>
              <el-radio label="多规格"></el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 包装费 -->
          <el-form-item label="包装费">
            <el-input-number v-model="num1" @change="packaging" :min="1"  label="描述文字"></el-input-number>
          </el-form-item>
          <!-- 价格 -->
          <el-form-item label="价格">
            <el-input-number v-model="num2" @change="price" :min="1"  label="描述文字"></el-input-number>
          </el-form-item>
          <!-- 商品描述 -->
          <el-form-item label="商品描述">
            <el-input type="textarea" v-model="form.describe"></el-input>
          </el-form-item>
          <!-- 操作按钮 -->
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即修改</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
    async created(){
        var id=this.$route.params.id;
        var d=await this.axios.get('/goods.php?a=readOne&id='+id);
        var r=d.data.data;
        // console.log(r)
        this.form.productname=r.goodsname;
        this.form.productclassify=r.goodscategory;
        this.form.feature=r.goodsfeature.split(',');
        this.form.promotion=r.isPromotion;
        this.form.specification=r.standard;
        this.form.describe=r.goodsdesc;
        this.num1=r.packprice;
        this.num2=r.price;
        this.imageUrl=r.imgUrl;
    },
  data() {
    return {
      // 包装费
      num1: 1,
      num2: 1,
      form: {
        // 商品名称
        productname: "",
        // 商品分类
        productclassify: "",
        // 商品特色
        feature: [],
        // 是否促销
        promotion: "",
        // 食品规格
        specification: "",
        // 商品描述
        describe: ""
      },
      // 图片
      imageUrl: ""
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
    // 操作按钮
    async onSubmit() {
      var obj={
        goodsname:this.form.productname,
        goodscategory:this.form.productclassify,
        goodsfeature:this.form.feature.join(','),
        isPromotion:this.form.promotion,
        standard:this.form.specification,
        goodsdesc:this.form.describe,
        packprice:this.num1,
        price:this.num2,
        imgUrl:this.imageUrl,
        id:this.$route.params.id
      }
      var d=await this.axios.post('/goods.php?a=edit',this.qs.stringify(obj));
      if(d.data.code==0){
        this.$message({
          message:d.data.msg,
          type:'success'
        });
        this.$router.push('/particulars/product-list');
      }else{
        this.$message.error(d.data.msg)
      }
    },
    //图片
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
</style>
