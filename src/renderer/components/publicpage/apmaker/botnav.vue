<!--
 * @Author: your name
 * @Date: 2020-03-09 09:39:35
 * @LastEditTime: 2020-03-12 15:34:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ElectronDemoc:\Users\Administrator\Desktop\shoyiiPc19\src\renderer\components\publicpage\apmaker\botnav.vue
 -->
<template>
    <div class="boxx" style="">
       
        <el-container>
            <el-main style="padding-right:40px;padding-left:10px;">
                <el-row style="text-align:left;color:#858D9E;font-size:14px;">
                    <el-col :span="24">
                        <span>|</span>
                        <span>热门推荐</span>
                        <span style="display:block;float:right;">更多</span>
                    </el-col>
                </el-row>
                <div style="display:flex;justify-content:space-around;flex-direction: row;flex-wrap: wrap;">
                    <div style="height:88px;width:20%;display:flex;margin-bottom:15px;padding:10px 10px;border:1px solid #AEB3C1;border-radius:4px;box-shadow:0 0 5px 0px #AEB3C1;" v-for="(item,index) in arr" :key="index">
                            <img :src=item.src style="height:56px;margin-top:15px;width:30%;"/>
                            <div style="float:right;text-align:left;margin-top:15px;margin-left:10px;width:70%;" class="commond">
                                <p>{{item.title}}</p>
                                <p>{{item.description}}</p>
                                <p>{{item.downCount}}下载</p>
                            </div>
                    </div>
                </div>
                <el-row style="text-align:left;color:#858D9E;font-size:14px;">
                    <el-col :span="24">
                        <span>|</span>
                        <span>自定义</span>
                    </el-col>
                </el-row>
            </el-main>
            <el-aside width="245px" style="padding:20px 20px 20px 0px;">
                 <el-row style="text-align:left;color:#858D9E;font-size:14px;">
                    <el-col :span="24">
                        <span>|</span>
                        <span>热门下载</span>
                        <span style="display:block;float:right;">全部</span>
                    </el-col>
                </el-row>
                <div style="display:flex;line-height:50px;">
                        <span style="display:block;width:14px;height:14px;margin-top:18px;color:#ffffff;background:#FF764B;line-height:14px;">{{onedata.index}}</span>
                        <img :src=onedata.src style="width:44px;height:50px;margin-left:10px;"/>
                        <div class="hotcontent">
                            <p>{{onedata.title}}</p>
                            <p>{{onedata.description}}</p>
                        </div>
                        <img src="../../../../../static/img/ppp.png" style="width:30px;height:22px;margin-top:10px;"/>
                </div>
                <ul v-for="(item,index) in hotarr" :key="index">
                    
                    <li style="display:flex;margin-bottom:10px;position:relative;">
                        <span style="display:block;width:14px;height:14px;color:#ffffff;line-height:14px;background: #86B0D4;" :class="{twoList:0==index,threeList:1==index}">{{item.index}}</span>
                        <span style="margin-left:5px;">{{item.title}}</span>
                        <span style="position:absolute;right:0px;">{{item.downCount}}</span>
                    </li>
                </ul>
            </el-aside>
        </el-container>

        
    </div>
</template>

<script>
    export default {
        name: "botnav",
       data(){
           return{
               arr:[
                   {src:'../../../../../static/img/ppp.png',title:'幻境',description:'精准的手势识别...',downCount:'1w次',size:'116.8M',ifPay:'免费下载'},
                   {src:'../../../../../static/img/ppp.png',title:'汉邦科技',description:'专注金属(SLM)3...',downCount:'1w次',size:'116.8M',ifPay:'免费下载'},
                    {src:'../../../../../static/img/ppp.png',title:'艾科赛龙',description:'聚焦生物医学大数...',downCount:'1w次',size:'116.8M',ifPay:'免费下载'},
                    {src:'../../../../../static/img/ppp.png',title:'抢票王',description:'提供专业可信赖的...',downCount:'1w次',size:'116.8M',ifPay:'免费下载'}, 
                    {src:'../../../../../static/img/ppp.png',title:'幻境',description:'精准的手势识别...',downCount:'1w次',size:'116.8M',ifPay:'免费下载'},
                   {src:'../../../../../static/img/ppp.png',title:'汉邦科技',description:'专注金属(SLM)3...',downCount:'1w次',size:'116.8M',ifPay:'免费下载'},
                    {src:'../../../../../static/img/ppp.png',title:'艾科赛龙',description:'聚焦生物医学大数...',downCount:'1w次',size:'116.8M',ifPay:'免费下载'},
                    {src:'../../../../../static/img/ppp.png',title:'抢票王',description:'提供专业可信赖的...',downCount:'1w次',size:'116.8M',ifPay:'免费下载'},   
               ],
               onedata:{
                   index:1,src:'../../../../../static/img/ppp.png',title:'骨头3D设计器',description:'精准的手势识别...',downCount:'1w次下载'
               },
               hotarr:[
                   {index:2,src:'../../../../../static/img/ppp.png',title:'骨头3D设计器',downCount:'1w次下载'},
                   {index:3,src:'../../../../../static/img/ppp.png',title:'骨头重建器',downCount:'1.9w次下载'},
                   {index:4,src:'../../../../../static/img/ppp.png',title:'骨头3D设计器',downCount:'1w次下载'},
                   {index:5,src:'../../../../../static/img/ppp.png',title:'骨头重建器',downCount:'1w次下载'},
                   {index:6,src:'../../../../../static/img/ppp.png',title:'骨头3D设计器',downCount:'1w次下载'},
                   {index:7,src:'../../../../../static/img/ppp.png',title:'骨头重建器',downCount:'1.9w次下载'},
                    {index:8,src:'../../../../../static/img/ppp.png',title:'骨头3D设计器',downCount:'1w次下载'},
                   {index:9,src:'../../../../../static/img/ppp.png',title:'骨头重建器',downCount:'1w次下载'},
                   {index:10,src:'../../../../../static/img/ppp.png',title:'骨头重建器',downCount:'1.9w次下载'},
                    {index:11,src:'../../../../../static/img/ppp.png',title:'骨头3D设计器',downCount:'1w次下载'},
                   {index:12,src:'../../../../../static/img/ppp.png',title:'骨头重建器',downCount:'1w次下载'},
               ]
           }
       }
    }
</script>

<style scoped>
  .boxx{
      color: black;
      width:98%;
  }
  .commond p{
      line-height: 20px;
      overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
  }
  .hotcontent p{
      line-height: 20px;
      margin: 0 15px;
      text-align: left;
  }
   .twoList{
       background:#FFA027 !important;
   }
   .threeList{
       background: #FFD200 !important;
   }
</style>