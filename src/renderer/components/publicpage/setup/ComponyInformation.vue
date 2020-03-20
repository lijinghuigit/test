<template>
     <div class="set-center">
        <el-row style="margin:0px -10px 0px -15px;">
            <el-col>
                <div class="set-left">
                    <div class="com_infor" :class="{setclass:classBoolean==0}" @click="componyTopmenu(0)" style="cursor:pointer;font-size:14px;letter-spacing:;">公司信息</div>
                    <div class="account_security" :class="{setclass:classBoolean==1}" @click="componyTopmenu(1)" style="cursor:pointer;font-size:14px;letter-spacing:;">资质备案</div>
                    <!-- <div v-if="compony">
                        <div class="outarrowInfor"></div>
                        <div class="innerarrowInfor"></div>
                    </div>
                    <div v-if="material_record">
                        <div class="outarrowAccount"></div>
                        <div class="innerarrowAccount"></div>
                    </div> -->
                </div>
            </el-col>
        </el-row>
        <div class="set-right" style="height:584px;overflow:auto;">
            <!-- 公司信息 -->
            <div v-if="classBoolean==0">
                <Basic-information></Basic-information>
            </div> 
            <!--资质备案-->
            <div v-if="classBoolean==1">
                <Material-record></Material-record>
            </div> 
        </div>
     
    </div>
</template>
<script>
import BasicInformation from './BasicInformation';
import MaterialRecord from './MaterialRecord';
export default {
    components:{
        BasicInformation,
        MaterialRecord
    },
    data(){
        return{
            classBoolean:0,
            // compony:true,
            // material_record:false,
        }
    },
    methods:{
        componyTopmenu(bool){
            if(bool == 0){
                this.classBoolean = 0
                // this.compony=true,
                // this.material_record=false
            }else if(bool == 1){
                this.classBoolean = 1
                // this.compony=false,
                // this.material_record=true
            }
        }
    }
}
</script>
<style scoped>
     .com_infor{
      margin:0px 45px 0px 25px;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
    .outarrowInfor {
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
        left: 30px;
      }
    .innerarrowInfor{
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
        left: 30px;
        margin-top: -3px;
      }
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
        left: 105px;
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
        left: 105px;
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
        left: 182px;
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
        left: 182px;
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
    line-height:50px;
    height: 50px;
    /* margin-top: 10px; */
    font-size:16px;
    color:#AEAEAE;
    /* border-bottom:1px solid #E3E7E8;
    border-top:1px solid #E3E7E8; */
    /* background:rgba(244,245,245,1); */
    background:#F7F7F9;
    border-radius:2px;
  }
  .account_security{
    margin:0px 10px 0px 5px;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .normal_set{
    margin:0px 10px 0px 5px;
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
  .setclass{
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