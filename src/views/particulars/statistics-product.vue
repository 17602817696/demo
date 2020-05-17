<template>
  <div id="statistics-product">
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
        <!-- 商品统计 -->
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
      x: [],
      goods: [],
      users: [],
    };
  },
  methods: {
    initCharts() {
      let myChart = echarts.init(this.$refs.chart);
      // 绘制图表
      myChart.setOption({
        title: {
        text: '商品统计'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['邮件营销', '联盟广告',]
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: this.x
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '商品数量',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: this.goods
        },
        {
            name: '用户数量',
            type: 'line',
            stack: '总量',
            areaStyle: {},
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
#statistics-product .box-card{
  height: 500px;
  background: #fff;
  box-shadow: 0px 0px 10px #000;
  border-radius: 5px;
  padding: 40px 40px;
  margin-top: 30px;
}
</style>
