<!--
 * @Author: your name
 * @Date: 2020-03-09 09:39:35
 * @LastEditTime: 2020-03-12 13:54:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ElectronDemoc:\Users\Administrator\Desktop\shoyiiPc19\src\renderer\components\publicpage\apmaker\topnav.vue
 -->
<template>
    <div class="boxs" style="">
        <el-row style="text-align:left;color:#858D9E;font-size:14px;">
            <el-col :span="24">
                 <span>|</span>
                 <span>必备软件</span>
            </el-col>
        </el-row>
        <div style="display:flex;justify-content:space-around;">
            <div v-for="(item,index) in arr" :key='index' style="height:160px;padding:10px 6px;border:1px solid #AEB3C1;border-radius:4px;box-shadow:0 0 5px 0px #AEB3C1;">
                <div style="display:flex;">
                    <img :src=item.src style="height:60px;"/>
                    <div style="margin-left:10px;;">
                        <p>{{item.title}}</p>
                        <p style=" overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100px;">{{item.description}}</p>
                    </div>
                </div>
                <p style="color:#999999;font-size:12px;margin-top:5px;"><span>下载次数:</span><span>{{item.downCount}}</span></p>
                <p style="color:#999999;font-size:12px;"><span>大小:</span><span>{{item.size}}</span></p>
                <el-button type="primary" round style="float:left;margin-top:10px;">{{item.ifPay}}</el-button>
            </div>
        </div>
           
        
    </div>
</template>

<script>
    export default {
        name: "topnav",

        data(){
            return{
                arr:[
                    {src:'../../../../../static/img/ppp.png',title:'幻境',description:'精准的手势识别...',downCount:'1w次',size:'116.8M',ifPay:'免费下载'},
                    {src:'../../../../../static/img/ppp.png',title:'汉邦科技',description:'专注金属(SLM)3...',downCount:'1w次',size:'116.8M',ifPay:'免费下载'},
                    {src:'../../../../../static/img/ppp.png',title:'艾科赛龙',description:'聚焦生物医学大数...',downCount:'1w次',size:'116.8M',ifPay:'免费下载'},
                    {src:'../../../../../static/img/ppp.png',title:'抢票王',description:'提供专业可信赖的...',downCount:'1w次',size:'116.8M',ifPay:'免费下载'},  
                ]
            }
        }
    }
</script>

<style scoped>
    p{
        line-height:26px ;
        text-align: left;
        color:#666666;
        font-size: 14px;
    }
   .el-col{
       
   }
</style>