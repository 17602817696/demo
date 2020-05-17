<template>
  <div id="account-list">
    <el-container>
      <el-header>账号列表</el-header>
      <el-main>
        <template>
          <!-- 表格 -->
          <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>

            <el-table-column prop="id" label="ID" width="120"></el-table-column>

            <el-table-column prop="imgUrl" label="头像" width="180">
              <template slot-scope="scope"><img :src="scope.row.imgUrl" style="width:150px;height:120px"></template>
            </el-table-column>

            <el-table-column prop="account" label="账户名称" width="200"></el-table-column>

            <el-table-column prop="userGroup" label="用户组" width="180"></el-table-column>

            <el-table-column label="创建时间" width="200">
              <template slot-scope="scope">{{ scope.row.ctime }}</template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)">修改</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
          <!-- 操作按钮 -->
          <div style="margin-top: 20px">
            <el-button type="danger" @click="delall">批量删除</el-button>
            <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
          </div>
        </template>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  // 创建完组件对象后就请求数据
  created(){
    this.getdata();
  },
  data() {
    return {
      page: 1,
      total:0,
      tableData: [],
      pageSize:10,
      multipleSelection: []
    };
  },

  methods: {
    // 批量删除
    delall(){
      let ids=[];
      this.$refs.multipleTable.selection.forEach( (v)=>{
        ids.push(v.id);
      });
      this.deldata(ids.join(','));
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 当前页面显示条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getdata();
    },
    // 跳转页面
    handleCurrentChange(val) {
      this.page = val;
      this.getdata();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 获取数据渲染页面
    getdata(){
      axios.get('http://localhost/sell/users.php?a=list&currentPage='+this.page+'&pageSize='+this.pageSize)
    .then( (d)=>{
      // console.log(d.data.data);
      if(d.data.code==0){
        this.tableData=d.data.data;
        this.total=parseInt(d.data.total);
      }
    });
    },
    // 修改按钮
    handleEdit(row) {
      this.$router.push('/particulars/account-edit/'+row.id);
    },
    // 删除按钮
    handleDelete(row) {
      if(window.confirm('删除我?')){
        // console.log(row);
        this.deldata(row.id);

      }
    },
    // 删除数据的函数
    deldata(id){
      axios.get('http://localhost/sell/users.php?a=delete&id='+id)
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
#account-list .el-header {
  background: #fff;
  border-bottom: 1px solid #eff1f7;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
#account-list .el-container {
  border-radius: 5px;
  box-shadow: 0px 0px 10px #000;
}
#account-list .el-pagination{
  margin-top: 23px;
}
#account-list .el-main{
  border-radius: 5px;
}
</style>
