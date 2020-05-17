<template>
  <div id="product-list">
    <el-card class="box-card">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">|
              <el-form-item label="商品图片">
                <img :src="props.row.imgUrl" style="width:150px;height:120px">
              </el-form-item>
|
              <el-form-item label="商品特性">:
                <span>{{ props.row.goodsfeature }}</span>
              </el-form-item>
|
              <el-form-item label="商品描述">:
                <span>{{ props.row.goodsdesc }}</span>
              </el-form-item>

            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品 ID" prop="id"></el-table-column>
        <el-table-column label="商品名称" prop="goodsname"></el-table-column>
        <el-table-column label="商品分类" prop="goodscategory"></el-table-column>
        <el-table-column label="是否促销" prop="isPromotion"></el-table-column>
        <el-table-column label="食品规格" prop="standard"></el-table-column>
        <el-table-column label="包装费">
          <template slot-scope="scope">{{scope.row.packprice}}￥</template>
        </el-table-column>
        <el-table-column label="价格">
          <template slot-scope="scope">{{scope.row.price}}￥</template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="page"
          :page-size="10"
          layout="total,prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  created(){
    this.getdata();
  },
  data() {
    return {
      // 分页
      page: 1,
      total:0,
      // 表格
      tableData: [],
    };
  },
  methods: {
    getdata(){
      axios.get('http://localhost/sell/goods.php?a=list&currentPage='+this.page)
      .then( (res)=>{
        if(res.data.code==0){
          this.tableData=res.data.data;
          this.total=parseInt(res.data.total);
        }
      })
    },
    // 修改  删除 按钮
    handleEdit(row) {
      this.$router.push("/particulars/product-edit/"+row.id);
    },
    handleDelete(row) {
      this.deldata(row.id);
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
      this.getdata();
    },
    // 删除数据的函数
    deldata(id){
      axios.get('http://localhost/sell/goods.php?a=delete&id='+id)
        .then( (d)=>{
          if(d.data.code==0){
            // 删除成功提示用户
            this.$message({
              message:'删除成功!!',
              type:'success',
            });
            // 重新刷新页面
            this.getdata();
          }else{
            this.$message.error('删除失败!!!');
          }
        });
    }
  }
};
</script>

<style>
#product-list {
  height: 100%;
}
#product-list .el-pagination {
  margin-top: 30px;
}
</style> 
