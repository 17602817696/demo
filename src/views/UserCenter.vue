<template>
  <div id="user">
    <el-container style="width:100%;height: 100%; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu
          router
          :default-active="this.$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
        <!-- 左侧侧边栏 -->
          <el-menu-item index="">
            <i class="el-icon-dish-1"></i>
            <span slot="title">外卖商家中心</span>
          </el-menu-item>

          <el-menu-item index="/UserCenter">
            <i class="el-icon-s-home"></i>
            <span slot="title">后台首页</span>
          </el-menu-item>

          <el-menu-item index="/particulars/order-form">
            <i class="el-icon-document"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/particulars/product-list">商品列表</el-menu-item>
              <el-menu-item index="/particulars/product-add">添加商品</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item index="/particulars/shop-manage">
            <i class="el-icon-s-shop"></i>
            <span slot="title">店铺管理</span>
          </el-menu-item>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>账号管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/particulars/account-list">账号列表</el-menu-item>
              <el-menu-item index="/particulars/account-add">添加账号</el-menu-item>
              <el-menu-item index="/particulars/account-chagpwd">修改密码</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span>销售统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/particulars/statistics-product">商品统计</el-menu-item>
              <el-menu-item index="/particulars/statistics-oder">订单统计</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <!-- 右侧顶部 -->
        <el-header style="text-align: right; font-size: 12px">
          <!-- 面包屑导航 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/UserCenter' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(v,i) in this.$route.meta" :key="i">{{v}}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 头像 -->
          <el-dropdown>
            <span class="el-dropdown-link">
              <span class="head_portrait">{{username}}</span>
              <el-avatar :size="60" :src="headimg"></el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><router-link to="/particulars/head_portrait">个人信息</router-link></el-dropdown-item>
              <el-dropdown-item><router-link to="/logout">退出系统</router-link></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>

        <el-main>
          <!--添加二级路由显示容器-->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username:'',
      headimg: '',
    }
  },
  async created(){
    let user=sessionStorage.getItem('user');
    let id= user ? JSON.parse(user).id : '';
    let token=sessionStorage.getItem('token');
    let d=await this.axios.get('/users.php?a=chklogin&id='+id+'&token='+token);
      // console.log(d)
    if(d.data.code>0){
      this.$message.error('请登录后在操作！！！');
      this.$router.replace('/');
    }
  },
  mounted(){
    let user=JSON.parse(sessionStorage.getItem('user'));
    this.username=user.account;
    this.headimg=user.imgUrl;
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style>
#user {
  width: 100%;
  height: 100%;
  display: block;
}
#user .el-menu {
  border: 0;
  height: 100%;
  background-color: #304156 !important;
}
#user .el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  font-size: 14px !important;
  display: flex;
  justify-content: space-between;
}
#user .el-menu-item {
  background-color: #304156 !important;
}
#user .el-submenu__title {
  background-color: #304156 !important;
}
#user .el-menu-item-group__title {
  padding: 0;
}
#user .el-icon-dish-1 {
  font-size: 26px;
  color: aquamarine;
}
#user .el-breadcrumb {
  line-height: 60px;
}
#user .el-dropdown-link{
  display: inline-block;
  height: 60px;
  line-height: 60px;
  display: flex;
  align-items:center;
}
#user .head_portrait{
  margin-right: 6px;
}
#user .el-main {
  background: #f0f2f5;
}
</style>
