<template>
    <div style="color:white;min-height:665px;background:#FFFFFF;margin-top:55px;padding-left:10px;">
          <div style="position:fixed;top:15px;z-index:100;color:#636772;">
            <div style="display:flex;line-height:32px;">
                <P style="line-height:32px;cursor:pointer;" @click="getBack()"><i class="iconfont icon-fanhui"></i></P>
                <div style="margin:0px 10px;font-size:14px;">首页</div>
                <div>
                    <input type="text" placeholder="搜索" v-model="searchWallet" style="width:60px;height:28px;padding:0px 16px;border:1px solid #F3F3F3;border-radius:17px;background:#F3F3F3; 
                    outline:none; -webkit-appearance: none;position:relative;"/>
                    <i class="el-icon-search" style="position:absolute;left:131px;top:11px;cursor:pointer;" @click="Search()"></i>
                </div>
            </div>
          </div>
          <!-- 顶部菜单栏 -->
          <div>
             <el-row style="color:#AEAEAE;font-size:14px;">
                <el-col>
                    <div class="set-left">
                        <div class="account_security" :class="{setfun:dnon==1}" @click="fn(1)" style="letter-spacing:;font-size:14px;cursor:pointer;margin:0 30px 0 15px;">我的钱包</div>
                        <!-- <div class="normal_set" :class="{setfun:dnon==2}" @click="fn(2)" style="letter-spacing:;font-size:14px;cursor:pointer;margin-right:25px;">账单管理</div> -->
                        <div class="normal_set" :class="{setfun:dnon==3}" @click="fn(3)" style="letter-spacing:;font-size:14px;cursor:pointer;">收支明细</div>
                    </div>
                </el-col>
             </el-row>
              <div class="set-right" style="height:600px;overflow:auto;">
                    
                    <div v-if="dnon==1">
                        <Wallet></Wallet>
                    </div> 
                    <div v-if="dnon==2">
                        <Account-manage></Account-manage>  
                    </div>
                    <div v-if="dnon==3">  
                        <Income-detail></Income-detail>
                    </div>
             </div>
          </div>        
         
    </div>
</template>
<script>
import Wallet from './Wallet/Wallet';
import AccountManage from './Wallet/AccountManage';
import IncomeDetail from './Wallet/IncomeDetail';
export default {
    components:{
         Wallet,
         AccountManage,
         IncomeDetail
    },
    data(){
        return{
            searchWallet:'',
             dnon:1, 
        }

    },
    methods:{
        getBack(){
            this.$router.go(-1)
        },
        // 搜索框
        Search(){
           if(this.searchWallet=='') {
               this.$message({
                    showClose: true,
                    message: '请输入搜索的内容',
                    duration:2000,
                });
           }else{
               this.changeDatamo('GET',"url",{
                   search:this.searchWallet
               },(response)=>{
                   if(response.code==0){
                       console.log('内容的展示')
                   }else{
                       console.log('暂无内容')
                   }
               })
               this.$message({
                    showClose: true,
                    message: '暂无查询结果',
                    duration:2000,
                });
           }
        },
        fn(bool){
          if(bool == 1){
            this.dnon = 1;
          }else if(bool == 2){
            this.dnon = 2;
          }else if(bool == 3){
            this.dnon = 3
          }
        }
    }
}
</script>
<style scoped>
    .set-left{
        display:flex;
        text-align:center;
        line-height:50px;
        height: 50px;
        font-size:16px;
        color:#AEAEAE;
        background:#F7F7F9;
        border-radius:2px;
        margin-left:-8px;
        padding-left:-8px; 
   }
   .setfun{
        color:#86B0D4;
        border-bottom:2px solid #86B0D4;
  }
  .icon-fanhui:hover{
     color: #86B0D4; 
  }
</style>