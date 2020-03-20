<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 13:33:57
 * @LastEditTime : 2019-12-26 11:35:48
 * @LastEditors  : Please set LastEditors
 -->
<template>
  <div class="set-center">
    <el-row style="margin:0px -10px 0px -15px;">
      <el-col>
        <div class="set-left">
              <div class="normal_set" :class="{setfun:dnon==2}" @click="fn(2)" style="letter-spacing:;font-size:14px;cursor:pointer;">通用设置</div>
              <div class="account_security" :class="{setfun:dnon==1}" @click="fn(1)" style="letter-spacing:;font-size:14px;cursor:pointer;">账号安全</div>
              <!-- <div v-if="account_boolean">
                  <div class="outarrowAccount"></div>
                  <div class="innerarrowAccount"></div>
              </div>
              <div v-if="normal_boolean">
                  <div class="outarrowNormal"></div>
                  <div class="innerarrowNormal"></div>
              </div> -->


            <!-- <div class="chagp" :class="{setfun:dnon==0}" @click="fn(0)">修改密码</div>
            <div class="chagp" :class="{setfun:dnon==1}" @click="fn(1)">设置基础</div>

            <div>
              <div v-if="this.GLOBAL.logintt == 2" class="chagp" :class="{setfun:dnon==2}" @click="fn(2)">个人中心</div>
              <div v-if="this.GLOBAL.logintt == 3" class="chagp" :class="{setfun:dnon==3}" @click="fn(3)">公司信息</div>
            </div> -->
        </div>
      </el-col>
    </el-row>
    <div class="set-right" style="height:565px;overflow:auto;">
          <!--点击设置基础-->
          <div v-if="dnon==1">
              <Account-security></Account-security>
          </div> 
          <!-- 通用设置 -->
          <div v-if="dnon==2">
               <basic-set></basic-set>  
          </div>
          <div v-if="dnon==3">
              <P>3</p>
              <!-- <ton-sonal></ton-sonal> -->
          </div>
    </div>
     
  </div>
</template> 

<script>
  import BasicSet from './basicset';
  import AccountSecurity from './AccountSecurity';
  // import TonSonal from './tonsonal';
    export default {
        name: "setup",
        //data存的内容
        data(){
          return {
            dnon:2,
            // account_boolean:true,
            // normal_boolean:false
          }
        },
        components:{
          BasicSet,
          AccountSecurity,
        },
      //调用的方法
      methods:{
        fn(bool){
          if(bool == 1){
            this.dnon = 1;
            // this.account_boolean=true,
            // this.normal_boolean=false
          }else if(bool == 2){
            this.dnon = 2;
            // this.account_boolean=false,
            // this.normal_boolean=true
          }else if(bool == 3){
            this.dnon = 3
          }else{
             this.dnon = 4
          }
        }
      }
    }
</script>

<style scoped>
    .outarrowAccount{
      border-top-color: #86B0D4;
        border-right-color: transparent;
        border-bottom-color: transparent;
        border-left-color: transparent;
        border-style: solid;
        border-width: 8px;
        height: 0;
        width: 0;
        position: absolute;
        top: 51px;
        left: 28px;
  }
  .innerarrowAccount{
      border-top-color: white;
        border-right-color: transparent;
        border-bottom-color: transparent;
        border-left-color: transparent;
        border-style: solid;
        border-width: 8px;
        height: 0;
        width: 0;
        position: absolute;
        top: 51px;
        left: 28px;
        margin-top: -3px;
  }
    .outarrowNormal{
      border-top-color: #86B0D4;
        border-right-color: transparent;
        border-bottom-color: transparent;
        border-left-color: transparent;
        border-style: solid;
        border-width: 8px;
        height: 0;
        width: 0;
        position: absolute;
        top: 51px;
        left: 109px;
  }
  .innerarrowNormal{
        border-top-color: white;
        border-right-color: transparent;
        border-bottom-color: transparent;
        border-left-color: transparent;
        border-style: solid;
        border-width: 8px;
        height: 0;
        width: 0;
        position: absolute;
        top: 51px;
        left: 109px;
        margin-top: -3px;
  }
  .set-center{
    margin: 60px 15px 10px 15px;
    height: 100%;
    /* box-shadow:0px 0px 4px 2px rgba(18,49,137,0.06); */
    border-radius:2px;
  }
  .normal_set{
    height: 100%;
    border-radius:2px;
  }
  /*这是左变的点击样式*/
  .set-left{
    display:flex;
    text-align:center;
    line-height:60px;
    height: 60px;
    font-size:16px;
    margin-top: 10px;
    color:#AEAEAE;
    /* border-bottom:1px solid #E3E7E8;
    border-top:1px solid #E3E7E8; */
    /* background:rgba(244,245,245,1); */
    background:#F7F7F9;
    border-radius:2px;
  }
  .account_security{
    margin:0px 30px 0px 25px;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .normal_set{
    margin:0px 10px 0px 20px;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  /*右边显示设置的样式*/
  .set-right{

    height: 100%;
    background:rgba(255,255,255,1);
    margin: 0px 0px 0px 10px;
  }

  .chagp{
    width: 100%;
    font-size:16px;
    cursor:pointer;
    font-family:PingFang-SC-Regular;
    font-weight:normal;
    color:rgba(77,85,94,1);
    line-height:60px;
  }
  /*鼠标点击的样式*/
  .setfun{
    color:#86B0D4;
    /* border-top:1px solid #86B0D4; */
    border-bottom:2px solid #86B0D4;
    /* width: 100%;
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:normal;
    color:rgba(77,85,94,1);
    background-color: rgba(255,255,255,1);
    line-height:60px; */
  }
  .dn{
    display: none;
  }
</style>
