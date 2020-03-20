<template>
  <div id="app">
    <transition name="fade" mode="in-out">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  //查看登录是医生还是供应商引入各自的首页

  export default {
    name: 'index',
    data(){
        return({

        })
    },
    components:{
    },
    methods : {
      
    },
  }
</script>

<style>
  @import "./font/ttf.css";

  #app {
    width: 1160px;
    height: 100%;
    font-family: 'PingFang-SC-Bold';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* box-shadow:0px 1px 12px 1px rgba(0,0,0,0.88); */
    text-align: center;
    background:#fff;
    /* 不可赋值字体 */
    user-select:none;

  }
  .none{
    display: none;
  }
  body{
    margin: 0;
    padding: 0;
    height: 100%;
  }
  .el-header {
    position: fixed;
    top: 0;
    right: 0;
    text-align: right;
    width: 100%;
    font-size: 25px;
    background:rgba(255,255,255,1);
    /* box-shadow:0px 2px 5px -1px rgba(18,49,137,0.06); */
    color: #333;
    line-height: 45px;
    z-index: 10000;
  }
  .el-header li{
    margin: 10px;
  }
  .left {
    position: fixed;
    height: 100%;
    left: 0;
    top: 0;
    background:rgba(255,255,255,1);
    /* box-shadow:1px 0px 5px -1px rgba(18,49,137,0.1); */
    z-index: 100000;
  }
  ::-webkit-scrollbar {
    /*隐藏滚轮*/
    display: none;
  }
  .fade-enter {
    opacity:0;
  }
  .fade-leave{
    opacity:1;
  }
  .fade-enter-active{
    transition:opacity 2s;
  }
  .fade-leave-active{
    opacity:0;
    transition:opacity 2s;
  }
  p{
    padding:0px;
    margin:0px;
    font-size:12px;
    line-height:30px;
  }
  a{
     text-decoration:none;
  }
  ul,li{
    padding:0px;
       margin:0px;
  }
</style>
