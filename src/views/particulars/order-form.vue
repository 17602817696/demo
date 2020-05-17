<template>
  <div id="order-form">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="订单号">
        <el-input v-model="form.ordernum" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item label="收货人">
        <el-input v-model="form.consignee" placeholder="收货人"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="form.orderstatus" placeholder="订单状态">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <!-- 选择时间 -->
      <div class="block">
        <span class="demonstration">选择时间</span>
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </div>
    </el-form>

    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 1300px;margin:40px 0px;">
      <el-table-column fixed prop="ordernmb" label="订单号" width="130"></el-table-column>
      <el-table-column prop="ordertime" label="下单时间" width="120"></el-table-column>
      <el-table-column prop="phonenum" label="手机号" width="120"></el-table-column>
      <el-table-column prop="consigneepe" label="收货人" width="120"></el-table-column>
      <el-table-column prop="site" label="配送地址" width="300"></el-table-column>
      <el-table-column prop="deliverytm" label="送达时间" width="120"></el-table-column>
      <el-table-column prop="remark" label="用户备注" width="120"></el-table-column>
      <el-table-column prop="ordermoney" label="订单金额" width="120"></el-table-column>
      <el-table-column prop="orderstatus" label="订单状态" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block paging">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="100"
          layout="total,prev, pager, next, jumper"
          :total="1000"
        ></el-pagination>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 分页
      currentPage3: 1,
      // 表单
      form: {
        ordernum: "",
        consignee: "",
        phone: "",
        orderstatus: ""
      },
      // 默认时间
      value1: [new Date(2019, 10, 10, 10, 10), new Date(2020, 10, 11, 10, 10)],
      // 表格
      tableData: [
        {
          ordernmb: 202020,
          ordertime: "20/20/20",
          phonenum: "18320202020",
          consigneepe: "阿三",
          site: "上海市普陀区金沙江路 1518 ",
          deliverytm: "20-20-20",
          remark: "入口柔,一线喉",
          ordermoney: 1000,
          orderstatus: "已受理"
        },
        {
          ordernmb: 202020,
          ordertime: "20/20/20",
          phonenum: "18320202020",
          consigneepe: "阿三",
          site: "上海市普陀区金沙江路 1518 ",
          deliverytm: "20-20-20",
          remark: "入口柔,一线喉",
          ordermoney: 1000,
          orderstatus: "已受理"
        },
        {
          ordernmb: 202020,
          ordertime: "20/20/20",
          phonenum: "18320202020",
          consigneepe: "阿三",
          site: "上海市普陀区金沙江路 1518 ",
          deliverytm: "20-20-20",
          remark: "入口柔,一线喉",
          ordermoney: 1000,
          orderstatus: "已受理"
        },
        {
          ordernmb: 202020,
          ordertime: "20/20/20",
          phonenum: "18320202020",
          consigneepe: "阿三",
          site: "上海市普陀区金沙江路 1518 ",
          deliverytm: "20-20-20",
          remark: "入口柔,一线喉",
          ordermoney: 1000,
          orderstatus: "已受理"
        },
        {
          ordernmb: 202020,
          ordertime: "20/20/20",
          phonenum: "18320202020",
          consigneepe: "阿三",
          site: "上海市普陀区金沙江路 1518 ",
          deliverytm: "20-20-20",
          remark: "入口柔,一线喉",
          ordermoney: 1000,
          orderstatus: "已受理"
        }
      ],

    };
  },
  methods: {
    // 表单
    onSubmit() {
      console.log("submit!");
    },
    // 表格
    handleClick(row) {
      console.log(row);
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style>
#order-form {
  background-color: #fff;
  height: 100%;
}
#order-form .el-input__inner {
  width: 180px;
}
#order-form .paging .el-input__inner {
  width: 40px;
}
#order-form .el-form-item {
  display: inline-block;
  margin-top: 30px;
}

#order-form .el-range-editor {
  width: 45%;
}
#order-form .block {
  margin-left: 10px;
}
#order-form .demonstration {
  margin-right: 12px;
  color: #606266;
  font-size: 14px;
}
#order-form .el-button {
  margin-left: 20px;
}
</style>