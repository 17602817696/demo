<template>
  <div id="backstage-page">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <i class="el-icon-document"></i>
          <div>
            <p class="order-all">总订单</p>
            <p class="order-num">103,400</p>
          </div>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="grid-content bg-purple">
          <i class="el-icon-coin"></i>
          <div>
            <p class="order-all">总销售额</p>
            <p class="order-num">103,400</p>
          </div>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="grid-content bg-purple">
          <i class="el-icon-s-order"></i>
          <div>
            <p class="order-all">今日订单数</p>
            <p class="order-num">103,400</p>
          </div>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="grid-content bg-purple">
          <i class="el-icon-notebook-2"></i>
          <div>
            <p class="order-all">今日销售额</p>
            <p class="order-num">103,400</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <!-- echarts图表 -->
          <div style="width:90%;height:90%" ref="chart"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  data() {
    return {
      x:[],
      goods:[],
      users:[],
    };
  },
  methods: {
    initCharts() {
      let myChart = echarts.init(this.$refs.chart);
      // 绘制图表
      myChart.setOption({
        title: {
          text: "商品统计图"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["商品数量","用户数量"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.x
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "商品数量",
            type: "line",
            stack: "总量",
            data: this.goods
          },
          {
            name: "用户数量",
            type: "line",
            stack: "总量",
            data: this.users
          },
        ]
      });
    }
  },
  async mounted() {
    var d=await this.axios.get('/counter.php?a=goods&field=date');
    d.data.data.forEach( v=>{
      this.x.push(v.ctime);
      this.goods.push(v.num);
    })

    var dd=await this.axios.get('/counter.php?a=users&field=date');
    dd.data.data.forEach( v=>{
      this.users.push(v.num);
    })

    this.initCharts();
  }
};
</script>

<style>
#backstage-page {
  height: 100%;
}
#backstage-page .el-row {
  margin-bottom: 20px;
}
#backstage-page .el-row:last-child {
  height: 80%;
  margin-bottom: 0;
}
#backstage-page .el-col {
  height: 100%;
  border-radius: 4px;
}
#backstage-page .bg-purple-dark {
  background: #fff;
}
#backstage-page .bg-purple {
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 25px;
}
#backstage-page .el-icon-document {
  font-size: 60px;
  color: skyblue;
}
#backstage-page .el-icon-coin {
  font-size: 60px;
  color: #d4237a;
}
#backstage-page .el-icon-s-order {
  font-size: 60px;
  color: #1296db;
}
#backstage-page .el-icon-notebook-2 {
  font-size: 60px;
  color: #1afa29;
}
#backstage-page .order-all {
  text-align: center;
  color: #99a9bf;
}
#backstage-page .order-num {
  font-weight: 800;
}

#backstage-page .grid-content {
  height: 100%;
  border-radius: 4px;
  min-height: 36px;
  padding-top: 20px;
}
#backstage-page .row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
