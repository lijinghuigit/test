<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 13:33:57
 * @LastEditTime: 2019-09-18 16:36:23
 * @LastEditors: Please set LastEditors
 -->


<template>
    <div class="box" style="text-align:left;">
        <!-- 顶部按钮 -->
        <el-row>
            <el-col :span="12" style="position:fixed;top:0px;right:10px;width:200px;;">
                <div style="margin-left:120px;">
                    <i class="el-icon-minus" @click="TopMenu(2)" style="margin: 7px;-webkit-app-region: no-drag;font-size:22px;cursor:pointer;"></i>
                    <i class="el-icon-close" @click="TopMenu(1)" style="margin: 7px;-webkit-app-region: no-drag;font-size:22px;cursor:pointer;"></i>
                </div>
                
            </el-col>
        </el-row>
        <div class="set-center">
            <el-row>
                <el-col style="display:flex;">
                    <div class="set-left">
                        <div class="com_infor" :class="{setclass:classBoolean==0}" @click="componyTopmenu(0)" style="letter-spacing:5px;">公司信息</div>
                        <div style="background:darkgray;width:1px;height:30px;margin:10px 5px 0px 5px;"></div>
                        <div class="account_security" :class="{setclass:classBoolean==1}" @click="componyTopmenu(1)" style="letter-spacing:5px;">备案证件</div>
                    </div>
                    <div style="color:#86B0D4;font-size:14px;float:right;margin-left:390px;width:250px;">注：带“ * ”内容为必填，其余为选填 审核时间为9：00-18:00，30分钟内完成</div>
                </el-col>
            </el-row>
            <div class="set-right" style="height:645px;overflow:auto;">
                <!-- 公司信息 -->
                <div v-if="classBoolean==0">
                    <Basic-information></Basic-information>
                </div> 
                <!--材料备案-->
                <div v-if="classBoolean==1">
                    <Material-record></Material-record>
                </div> 
            </div>
        </div>
    </div>
</template>

<script>
import BasicInformation from './BasicInformation';
import MaterialRecord from './MaterialRecord';
    export default {
        name: "InforAudit",
         components:{
            BasicInformation,
            MaterialRecord
         },
        data() {
            return {
                classBoolean:0,
                options: [{
                    value: '选项1',
                    label: '男'
                }, {
                    value: '选项2',
                    label: '女'
                }],
                value: '',
                myphoto:require('../../../assets/img/sczp.png'),
                doctphoto:require('../../../assets/img/sczp.png'),
                inputone:'',
                inputtwo :'',
                inputthree:'',
                inputfour:'',
                inputfive:'',
                inputsix :'',
                inputseven:'',
                logopho:'',
                biecetu:'',
                grxa:true,
            }
        },
        methods: {
            componyTopmenu(bool){
                if(bool == 0){
                    this.classBoolean = 0
                }else if(bool == 1){
                    this.classBoolean = 1
                }
            },
            TopMenu (num) {
                 //点击上面按钮通过num判断点击的是关闭app或者是最小化app
                //最小化app
                if(num == 2){
                    console.log(num);
                    this.$electron.ipcRenderer.send('minimize'); //最小化
                    return
                }
                //关闭app
                if(num == 1){
                    console.log("退出页面");
                    this.$confirm('是否退出软件?', '关闭', {//删除 注释:这里会报错因为electronUI和vue的版本不对
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }).then(() => {
                        
                        //本地获取logintt判断当前登录的端口
                        if(this.GLOBAL.logintt == 2){
                            //医生端退出
                            this.changeDatado("GET","/login/loginOut",{
                            },(response) =>{
                                if(response.code == 0){
                                    //成功退出
                                    localStorage.removeItem("Token");
                                    this.$electron.ipcRenderer.send('close')
                                }
                            },(error) =>{
                                console.log(error)
                            });
                        }else if(this.GLOBAL.logintt == 3){
                            //供应商退出
                            this.changeDatamo("GET","token/out",{
                            },(response) =>{
                                if(response.code == 0){
                                    //成功退出
                                    localStorage.removeItem("Token");
                                    this.$electron.ipcRenderer.send('close')
                                }
                                console.log(response);
                            },(error) =>{
                                console.log(error)
                            });
                        }
                        //还有一个被删了？
                    }).catch(() => {

                    });
                }
            },
        },
        // 这个为点击公司信息时，触发的事件
        created(){
            // this.motumm();
        },
    }
</script>

<style>
    .box{
        width: 80%;
        height: 100%;
        padding: 10px 40px;
    }
</style>

<style scoped>
    .el-row {
        margin-bottom: 14px;
    }
    .el-col {
        border-radius: 4px;
    }
    /* --------------------------------------- */
     .com_infor{
      margin:0px 10px;
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
    margin: 20px 15px 10px 15px;
    height: 100%;
    /* box-shadow:0px 0px 4px 2px rgba(18,49,137,0.06); */
    border-radius:2px;
    /* overflow: auto; */
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
    font-size:16px;
    color:#666666;
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
    color:#333333;
    font-size:20px;
  }
  .dn{
    display: none;
  }
    /* ---------------------------------------------- */
</style>