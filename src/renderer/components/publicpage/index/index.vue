<template>
  <!-- <div id="index" style="background-color: #fff;"> -->
  <div style="background-color: #fff;">
    <div v-if="tonow == 3">
      <cente-nav></cente-nav>
    </div>
    <div v-else-if="tonow == 2">
      <ycenter-nav></ycenter-nav>
    </div>
    <div v-else-if="tonow == 1">
      <gcenter-nac></gcenter-nac>
    </div>
  </div>
</template>
<script>
  //判断是医生还是供应商的(判断未写)
  import CenteNav from '../../supplier/index/index';    //这是供应商的接口
  import YcenterNav from '../../doctor/index/index'
  import GcenterNac from '../../doctor/caselist/casetop'
  export default {
    name: 'index',
    components:{
      CenteNav,
      YcenterNav
    },
      data(){
        return{
          // 默认为供应商页面
            tonow:3,//判断中间页面显示什么
        }
      },
    methods :{
        init(){
          // console.log('init')
            //中间页面判断显示什么类容
            //通过logintt来判断显示页面
            if(this.GLOBAL.logintt == 3){
                this.tonow = this.GLOBAL.logintt
            }else if(this.GLOBAL.logintt == 2){
                this.tonow = this.GLOBAL.logintt
            }else if(this.GLOBAL.logintt == 1){
                this.tonow = this.GLOBAL.logintt
            }
        },
    },
    //自动调用方法
    created(){
        this.init();
    }
  }
</script>
<style>

</style>
