<template>
  <div id="statistics-order">
    <div class="block">
      <span class="demonstration">时间范围&nbsp;:&nbsp;</span>
      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        style="width:500px"
      ></el-date-picker>
      <el-button type="primary" style="margin-left:20px">查询</el-button>
    </div>
    <div class="box-card">
        <!-- 订单查询 -->
        <div style="width:100%;height:100%" ref="chart"></div>
    </div>
  </div>
</template>

<script>
const echarts = require("echarts");
export default {
  data() {
    return {
      value1: "",
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
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ["商品数量", "订单数量"]
        },
        xAxis: [
          {
            type: "category",
            data: this.x,
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: "{value} "
            }
          },
          {
            type: "value",
            name: "",
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: "{value} "
            }
          }
        ],
        series: [
          {
            name: "商品数量",
            type: "bar",
            data: this.goods
          },
          {
            name: "订单数量",
            type: "bar",
            data: this.users
          }
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
#statistics-order .box-card {
  height: 500px;
  background: #fff;
  box-shadow: 0px 0px 10px #000;
  border-radius: 5px;
  padding: 40px 40px;
  margin-top: 30px;
}
</style>
