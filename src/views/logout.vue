<template>
<div id="logout">
    <h1>正在退出......</h1>
</div>
</template>

<script>
export default {
  mounted(){
    //   清除sessionStorage
    sessionStorage.clear();
    // 跳转到登录页面
    setTimeout( ()=>{
        this.$router.replace('/');
    },2000)
  }
};
</script>

<style>
</style>
