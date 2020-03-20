<template>
  <!--<div style="width: 310px;"></div>-->
  <el-container style="margin: 37px 15px 0px 15px;height: 100%;">
    <div style="width: 280px;"></div>
    <!--这里循环消息 后台接口和图片接口-->
    <el-aside class="butname" width="260px" style="margin-left:-10px;overflw:hidden;">
      <!--顶部搜索和通知-->
      <el-row style="margin: 2px 4px 2px 0px;border-bottom:1px solid #f3f3f3;">
        <el-col :span="12" class="tztzone">
          <template >
            <el-select v-model="value" placeholder="通知"  @change="selectTitle">
              <el-option
                v-for="item in options"
                :key="item.type"
                :label="item.label"
                :value="item.type"
                :disabled="item.disabled"
                >
              </el-option>
            </el-select>
          </template>
        </el-col>
          <!-- 搜索 -->
        <el-col :span="12" style="display: flex;margin-top:4px">
          <div style="color:#636772;">
            <input type="text" placeholder="搜索" v-model="searchContent" style="width:60px;height:28px;padding:0px 16px;border:1px solid #F3F3F3;border-radius:17px;background:#F3F3F3; 
            outline:none; -webkit-appearance: none;position:relative;"/>
            <i class="el-icon-search" style="position:absolute;left:188px;top:13px;" @click="MaterialSearch()"></i>
          </div>
        </el-col>
      </el-row>
      <!--下面的通知-->
      <div style="overflow:auto;height:100%;">
          <div class="butcat" v-for="(item,index) in toncenter" :key="index"
              @mouseover="addClassload(index)"
              @mouseleave="removeClassload(index)"
              @click="addClassalways(index)"
              :class="{centerhover:ltcenter&&index==leftc,clican:index==clilef}">
              <el-row>
                <el-col :span="16">
                  <div class="name">
                      <el-row>
                          <el-col :span="7">
                            <!-- 医生头像 -->
                            <img :src="'http://supplier.shoyii.com/view-image/'+item.doctoravatar" alt="">  
                            <!-- <img :src="'http://192.168.31.141:8081/medical-treatment-supplier/view-image/'+item.doctoravatar" alt="">   -->
                          </el-col>
                          <el-col style="margin: 5px 0 5px 0" :span="17">
                            <div class="name-c" :class="{fff:index==clilef}">
                              {{item.title}}
                            </div>
                            <div class="name-b" :class="{fff:index==clilef}">
                              {{item.content}}
                            </div>
                          </el-col>
                      </el-row>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="time" :class="{fff:index==clilef}">
                    {{item.createTime}}
                  </div>
                </el-col>
              </el-row>
          </div>
      </div>
     

    </el-aside>
    <el-container style="
      background:rgba(255,255,255,1);
      border-radius:2px 2px 2px 0px;">
      <el-aside width="100%" style="height: 682px;">
        <el-row style="height:40px;">
          <el-col :span="24" class="center-one">
            <!-- 订单title 医生姓名，医院-->
              <span style="margin-right:5px;">{{xqtitle}}</span>
              <span>{{doctorname}}</span>
              <span>{{hospital}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="center-two">
            <!-- 内容 -->
            {{xqcenter}}
          </el-col>
        </el-row>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: "notice",
    data() {
      return {
        searchContent:'',
          //选择框的下来的类容
        options: [{
          type: '1',
          label: '钱包通知'
        },{
          type: '2',
          label: '病例通知',
          disabled: false
        },{
          type: '3',
          label: '资料审核'
        },{
          type: '4',
          label: '手术方法审核'
        },{
          type: '5',
          label: '平台公告通知'
        }],
        value: '', //选中的类容
        toncenter:[    //获取选中的类别下面所有的消息
        ],
          clilef:0,   //点击的按钮 点击了按钮获取按钮的id
          leftc:0,  //鼠标移动到的按钮的位置
          ltcenter:false,   //鼠标经过的按钮 切换了true

          xqtitle:'',  //消息标题
          xqcenter:'',  //消息类容
          doctorname:'',
          hospital:'',
      }
    },
    methods:{
      MaterialSearch(){
        if(this.searchContent==''){
          this.$message('请输入搜索的内容');
        }else{
            this.changeDatamo("GET","Message/getSystemMessageList",{    //供应商端
                  targetId:this.GLOBAL.doctcenter.adminid,//供应商id
                  pageNum:1,
                  pageSize:1000000,
                  target:'G',//用户类型
                  title:this.searchContent,//消息类型
              },(response) =>{
                  if(response.object.list.length == 0){
                      this.$message({
                            message: '搜索的内容为空',
                            type: 'warning'
                        });
                      this.toncenter=[{"content":'暂无此类消息',"title":""}]
                      this.xqtitle=''
                      this.xqcenter="暂无此类消息"
                  }else{
                      this.toncenter = response.object.list;
                      this.xqtitle = response.object.list[0].title;
                      this.xqcenter = response.object.list[0].content;
                  }
              },(error) =>{
                  console.log(error)
          });
        }
      },
      selectTitle(val){
        
        // 打印出来的是type，即数据类型
        // console.log('你是全局的id吗')
        // console.log(this.GLOBAL.doctcenter.adminid)
        this.changeDatamo("GET","Message/getSystemMessageList",{    //供应商端
                    targetId:this.GLOBAL.doctcenter.adminid,//供应商id
                    pageNum:1,
                    pageSize:1000000,
                    target:'G',//用户类型
                    type:val,//消息类型
                },(response) =>{
                    if(response.object.list.length == 0){
                        this.$message({
                            message: '通知为空',
                            type: 'warning'
                        });
                      this.toncenter=[{"content":'暂无此类消息',"title":""}]
                      this.xqtitle=''
                      this.xqcenter="暂无此类消息"

                    }else{
                        console.log(response);
                        this.toncenter = response.object.list;
                        this.xqtitle = response.object.list[0].title;
                        this.xqcenter = response.object.list[0].content;
                        this.doctorname=response.object.list[0].doctorname;
                        this.hospital=response.object.list[0].doctorhospital 
                    }
                },(error) =>{
                    console.log(error)
            });
      },
      // 鼠标移入事件
      addClassload(index){
          this.ltcenter=true;
          this.leftc=index;
      },
      // 鼠标移除的时候事件
      removeClassload(index){
          this.ltcenter=false;
          this.leftc=index;
      },
      //点击事件
      addClassalways(index){
          this.clilef = index;
          this.xqtitle = this.toncenter[index].title;
          this.xqcenter = this.toncenter[index].content;
      },

      init(){
          if(this.GLOBAL.logintt == 1){
              this.changeDatayo("GET","Message/getAllSystemMessageList",{    //
              },(response) =>{
                  console.log(response);
                  if(response.list.length == 0){
                      this.$message({
                            message: '通知为空',
                            type: 'warning'
                        });
                  }else{
                      this.toncenter = response.object.list;
                      this.xqtitle = response.object.list[0].title;
                      this.xqcenter = response.object.list[0].content;
                  }
              },(error) =>{
                  console.log(error)
              });
          }else if(this.GLOBAL.logintt == 2){
              this.changeDatado("GET","doctor/getAllSystemMessageList",{    //医生端
              },(response) =>{
                  console.log(response);
                  if(response.list.length == 0){
                      this.$message({
                            message: '通知为空',
                            type: 'warning'
                        });
                  }else{
                      this.toncenter = response.object.list;
                      this.xqtitle = response.object.list[0].title;
                      this.xqcenter = response.object.list[0].content;
                  }

              },(error) =>{
                  console.log(error)
              });
          }else if(this.GLOBAL.logintt == 3){
            // console.log(this.GLOBAL.doctcenter.adminid)
              this.changeDatamo("GET","Message/getSystemMessageList",{    //供应商端（默认是全部消息）
                  targetId:this.GLOBAL.doctcenter.adminid,//供应商id
                  // pageNum:1,
                  // pageSize:1000000,
                  target:'G',//用户类型
              },(response) =>{
                  if(response.object.list.length == 0){
                      this.$message({
                            message: '通知为空',
                            type: 'warning'
                        });
                    this.toncenter=[{"content":'暂无此类消息',"title":""}] 
                    this.xqtitle=''
                    this.xqcenter="暂无此类消息"
                  }else{
                      this.toncenter = response.object.list;
                      this.xqtitle = response.object.list[0].title;
                      this.xqcenter = response.object.list[0].content;
                      this.doctorname=response.object.list[0].doctorname;
                      this.hospital=response.object.list[0].doctorhospital 
                  }
              },(error) =>{
                  console.log(error)
              });
          }
      }
      },
      created(){
        this.init()
      }
  }

</script>
<style>
.tztzone .el-input__inner{
  border: 0px solid #DCDFE6;
}


</style>

<style scoped>
  /*按钮的样式*/
  .popper__arrow{
    left: 55px !important;
  }
  .el-input__inner {
    height: 20px;
    font-size: 13px;
    box-shadow: none;
    border: 0 solid #e9e9e9;
    margin-left: 15px;
    color:#606266;
  }
  .el-input__inner::-webkit-input-placeholder {
    line-height: 20px;
  }
  .el-select-dropdown__item.selected{
    color: #49DE9D;
  }
  .el-select-dropdown__item{
    overflow: auto;
  }
  .el-input__icon{
    line-height: 24px;
  }
.el-select-dropdown__item.selected{
  color: #86B0D4;
}

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-aside{
    overflow: hidden;
  }
  .butname{
    height: calc(100% - 75px);
    /* overflow: scroll; */
    position: fixed;
    /* box-shadow:0px 0px 4px 0px rgba(0, 0, 0, 0.1); */
    border-right: 2px solid #F3F3F3;
    border-top: 2px solid #F3F3F3;
    border-radius:2px;
    color: #333;
  }
  .butcat{
    cursor: pointer;
    padding: 5px 13px 5px 10px;
    height: 60px;background-color: rgba(255,255,255,1);
  }
  /*鼠标移动上去背景*/
  .background{
    padding: 5px 13px 5px 10px;
    height: 60px;
    background:linear-gradient(90deg,#03D78F 0%,#37E6DC 100%);
  }
  .time{
    text-align: right;
    line-height: 20px;
    font-size:10px;
    font-family:PingFang-SC-Medium;
    color:#A1A4B0;
    font-weight:normal;
    margin-right: 5px;
  }
  .fff{
    color:#A1A4B0!important;
  }
  .name{
    text-align: left;
    height: 50px
  }
  .name img{
    margin: 5px 0 5px 0;
    width:40px;
    height:40px;
    border-radius:50%;
  }
  .name-c{
    font-size:15px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:#333333;
    line-height:20px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .name-b{
    font-size:12px;
    font-family:name-b;
    font-weight:normal;
    color:#A1A4B0;
    line-height:20px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .center-one{
    background:rgba(255,255,255,1);
    /* box-shadow:0px 0px 5px 0px rgba(18,49,137,0.06); */
    border-bottom: 1px solid #F3F3F3;
    border-top: 1px solid #F3F3F3;
    border-radius:2px 2px 2px 0px;
    font-size:16px;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:#333333;
    line-height:40px;
    text-align: left;
    padding-left: 40px;
    overflow: hidden;
  }
  .center-two{
    /* border-top: 1px solid rgba(239,239,239,1); */
    padding: 20px 40px 20px 50px;
    text-align: left;
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:normal;
    color:rgba(102,102,102,1);
    line-height:38px;
    letter-spacing: 1px;
  }
  .center-btn{
    margin: 12px;
    width:128px;
    height:40px;
    cursor: pointer;
    border-radius:90px;
    font-size:14px;
    letter-spacing: 1px;
    font-family:PingFang-SC-Bold;
    font-weight:normal;
    color:rgba(255,255,255,1);
    line-height:40px;
  }
  .btn{
    margin: 0 auto;
    padding: 50px 20px 100px;
    display: flex;
    justify-content:center;
  }
  .clican{ /*点击的样式的效果*/
    padding: 5px 13px 5px 10px;
    height: 60px;
    background:linear-gradient(90deg,#DFEDF9 0%,#DFEDF9 100%)!important;
  }
  /*鼠标移动的触发的样式*/
  .centerhover{
    background:#F6F6F6;
    color:#86B0D4;
  }
</style>
