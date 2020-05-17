import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)


export default new VueRouter({
  routes : [
    {path: '/',component: Home},
    {path: '/UserCenter',component: () => import('../views/UserCenter.vue'),children:[
      {path:'', component:() => import('../views/particulars/backstage-page.vue'),meta:['后台首页']},
      {path:'/particulars/account-add', component:() => import('../views/particulars/account-add.vue'),meta:['账户管理','添加账户']},
      {path:'/particulars/account-list', component:() => import('../views/particulars/account-list.vue'),meta:['账户管理','账户列表']},
      {path:'/particulars/account-chagpwd', component:() => import('../views/particulars/account-chagpwd.vue'),meta:['账户管理','修改密码']},
      {path:'/particulars/account-edit/:id', component:() => import('../views/particulars/account-edit.vue'),meta:['账户管理','修改账户']},
      {path:'/particulars/statistics-oder', component:() => import('../views/particulars/statistics-oder.vue'),meta:['销售统计','订单统计']},
      {path:'/particulars/statistics-product', component:() => import('../views/particulars/statistics-product.vue'),meta:['销售统计','商品统计']},
      {path:'/particulars/product-add', component:() => import('../views/particulars/product-add.vue'),meta:['商品管理','添加商品']},
      {path:'/particulars/product-list', component:() => import('../views/particulars/product-list.vue'),meta:['商品管理','商品列表']},
      {path:'/particulars/product-edit/:id', component:() => import('../views/particulars/product-edit.vue'),meta:['商品管理','修改商品']},
      {path:'/particulars/order-form', component:() => import('../views/particulars/order-form.vue'),meta:['订单管理']},
      {path:'/particulars/shop-manage', component:() => import('../views/particulars/shop-manage.vue'),meta:['店铺管理']},
      {path:'/particulars/head_portrait', component:() => import('../views/particulars/head_portrait'),meta:['个人信息']},
    ]
  },
  {path: '/logout',component: () => import('../views/logout.vue')}
  ]
})


