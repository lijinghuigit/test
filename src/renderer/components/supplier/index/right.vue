<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 13:33:57
 * @LastEditTime : 2019-12-26 11:15:32
 * @LastEditors  : Please set LastEditors
 -->
<template>
  <!--供应商右边的模块-->
  <div class="page-right">
     <div class="task" style="background:#878DDB">
      <div class="task-title" style="display:flex;justify-content:space-between;margin-bottom:20px;">
        <router-link to='/MyWallet'>
            <P style="font-size:20px;color:#FFFFFF;">我的钱包</P>
        </router-link>
        <i class="iconfont icon-zhandang" style="font-size:24px;color:#FFFFFF;float:right;"></i>
      </div>
      <div class="" style="display:flex;margin-bottom:20px;">
           <P style="font-size:16px;margin-bottom:10px;">￥{{TotalwalletData}}</P>
      </div>
    </div>

    <!--标题-->
    <div class="task">
      <div class="task-title">
        <router-link to='/OrderList' style="color:#FFFFFF;font-size:20px;">任务列表</router-link>
        <i class="iconfont icon-zhangdanguangli1" style="font-size:24px;color:#FFFFFF;float:right;"></i>
      </div>
      <div class="task-center">
        <div class="title" @click="styt(0) " :class="{ttv:toindex==0}">
          新任务({{this.one.length}})
        </div>
        <div class="title" @click="styt(1)" :class="{ttv:toindex==1}">
          制造中({{this.two.length}})
        </div>
        <div class="title" @click="styt(2)" :class="{ttv:toindex==2}">
          已完成({{this.three.length}})
        </div>
      </div>
    </div>

    <div>
      <div class="center-top">
      </div>
    </div>

    <!-- 任务列表下的新单子 -->
      <div class="orderDetails">
          <div class="center" v-for="(item,index) in even" :key="index">
              <div class="center-center" style="position:relative;">
                  <div class="center-top-circle" style="position:absolute;left:0px; top:10px;"></div>
                  <!--内容-->
                  <div class="top">
                        <div>
                            <div v-if="item.threeName == '' || item.threeName == null || item.threeName == undefined">
                                <div><span>科室</span>:<span style="margin-left: 2px;">{{item.oneName}}</span></div>
                                <div><span>位置</span>:<span style="margin-left: 2px;">{{item.twoName}}</span></div>
                                <div><span style="display:block;">订单号:</span><span style="margin-left: 2px;">{{item.orderNo}}</span></div>
                            </div>
                            <div v-else>
                                <div><span>科室</span>:<span style="margin-left: 2px;">{{item.oneName}}</span></div>
                                <div><span>位置</span>:<span style="margin-left: 2px;">{{item.twoName}}</span></div>
                                <div><span style="display:block;">订单号</span>:<span style="margin-left: 2px;">{{item.orderNo}}</span></div>
                            </div>
                        </div>
                        <div>
                            <span>病因</span>:<span style="margin-left: 2px;" v-if="item.title == '' || item.title == null">无</span>
                            <span style="margin-left: 2px;" v-else>{{item.title}}</span>
                        </div>
                  </div>
                  <div class="mid">
                    <div><span>医院</span>:<span style="margin-left: 2px;">{{item.hospital}}</span></div>
                    <div><span>医生</span>:<span style="margin-left: 2px;">{{item.doctorName}}</span></div>
                    <div><span>联系方式</span>:<span style="margin-left: 2px;">{{item.telephone}}</span></div>
                    <div><span>总费用：</span><span style="margin-left: 2px;">{{item.totalAmount}}</span></div>
                    <div v-if="logisticsData"><span style="margin-left: 2px;">物流单号</span>:<span style="margin-left: 2px;">{{item.logisticsNumber}}</span></div>
                  </div>
                  
                   
                  <div class="but">
                      <!-- 物流信息 -->
                      <el-dialog title="" :visible.sync="dialogFormVisible=postDialog" :modal='false' :close-on-click-modal='true' center>
                        <div slot="title" style="display:flex;width:100%;background:#86B0D4;height:40px;line-height:40px;">
                            <div class="center-top-data">物流信息</div>
                        </div>
                        <div style="margin-bottom:10px;margin-top:10px;"> 
                            <el-row :gutter="20">
                                <el-col><span>收货人</span>:<span style="margin-left: 2px;">{{logisticsData.doctorName}}</span></el-col>
                            </el-row>
                            <el-row :gutter="20">        
                                <el-col><span>联系号码</span>:<span style="margin-left: 2px;">{{logisticsData.doctorphone}}</span></el-col>                          
                            </el-row>    
                            <el-row :gutter="20">        
                                <el-col><span>收货地址</span>:<span style="margin-left: 2px;">{{logisticsData.hospitalAddress}}</span></el-col>                          
                            </el-row>
                            <el-row :gutter="20">        
                                <el-col><span>快递公司</span>:<span style="margin-left: 2px;">{{logisticsData.logisticsCompany}}</span></el-col>                          
                            </el-row>  
                        </div>
                        <el-form :model="form">
                          <el-form-item label="物流单号：" :label-width="formLabelWidth">
                            <el-input v-model="trackingNumber" autocomplete="off"></el-input>
                          </el-form-item>
                        </el-form>
                      
                        <div slot="footer" class="dialog-footer">
                          <el-button @click="postCancel()">取消</el-button>
                          <el-button type="primary" @click="postsure(logisticsData.orderNo)">确定</el-button>
                        </div>
                      </el-dialog>
                      <!--订单详情弹窗 -->
                      <el-dialog title="" :visible.sync="dialogFormVisible=detailDialog" :modal='false' :close-on-click-modal='true' center>
                        <!-- 顶部title -->
                              <div slot="title" style="display:flex;width:100%;background:#86B0D4;height:40px;line-height:40px;">
                                  <div class="center-top-data">订单详情</div>
                              </div>
                              <!-- 菜单 -->
                              <div style="display:flex;height:46px;background:#DFEDF9;margin:0px -25px 15px -25px;">
                                <P style="line-height:46px;color:#333333;font-size:16px;width:100px;padding:0px 15px;text-align:center;cursor:pointer;" @click="clickMenu(0)" :class="{setclassMenu:tonum==0}">订单信息</P>
                                <P style="line-height:46px;color:#333333;font-size:16px;width:100px;padding:0px 15px;text-align:center;cursor:pointer;" @click="clickMenu(1)" :class="{setclassMenu:tonum==1}">其他信息</P>
                              </div>
                              <!-- 订单信息  -->
                              <div v-if="orderInformation" style="max-height:300px;overflow:auto;min-height:200px;"> 
                                  <!-- 订单详情  -->
                                  <div class="detailOrders">
                                      <div  v-for="(item,index) in detailData" :key="index" style="border-bottom:1px solid #EEEEEE;padding-bottom:10px;margin-top:5px;">
                                        <!-- 详情的展示数据 -->
                                            <el-row :gutter="20" style="color:#666666;font-size:14px;">
                                                <div v-if="item.instrumentName == '' || item.instrumentName == null || item.instrumentName == undefined">
                                                    <el-col :span="12"><span>材料类型</span>:<span style="margin-left: 4px;">{{item.guideName}}</span></el-col>
                                                    <el-col :span="12"><span>材料</span>:<span style="margin-left: 4px;">{{item.primaryName}}--{{item.secondaryName}}</span></el-col>
                                                </div>
                                                <div v-if="item.guideName == '' || item.guideName == null || item.guideName == undefined">
                                                    <el-col :span="12"><span>材料类型</span>:<span style="margin-left: 4px;">{{item.instrumentName}}</span></el-col>
                                                    <el-col :span="12"><span>材料</span>:<span style="margin-left: 4px;">{{item.primaryName}}--{{item.secondaryName}}</span></el-col>
                                                </div> 
                                            </el-row>
                                            <el-row :gutter="20" style="color:#666666;font-size:14px;">
                                                <!-- 导板 -->
                                                <div v-if="item.productType==1?boolshow:boolhide">
                                                    <el-col :span="12">克单价<span></span>:<span style="margin-left: 4px;" id="GramPrice">{{item.guidePrice}}</span></el-col>
                                                    <el-col :span="12"><span>工时单价</span>:<span style="margin-left: 4px;" id="TimePrice">{{item.guideTimePrice}}</span></el-col>
                                                </div>
                                                <!-- 器械 -->
                                                <div v-else>
                                                    <el-col :span="12">克单价<span></span>:<span style="margin-left: 4px;" id="GramPrice">{{item.instrumentPrice}}</span></el-col>
                                                    <el-col :span="12"><span>工时单价</span>:<span style="margin-left: 4px;" id="TimePrice">{{item.instrumentTimePrice}}</span></el-col>
                                                </div>
                                            </el-row>
                                            <!-- 显示价钱 -->
                                            <div v-if="item.id==matrialNum?fillPrice:showPrice">
                                                  <el-row :gutter="20">        
                                                    <el-col :span="12">总克重<span></span>:<span style="margin-left: 4px;">{{item.weight}}</span></el-col>
                                                    <el-col :span="12"><span>制作时长</span>:<span style="margin-left: 4px;">{{item.totalWorkingHours}}</span></el-col>
                                                  </el-row> 
                                                  <el-row :gutter="20">        
                                                      <el-col :span="12">工艺系数<span></span>:<span style="margin-left: 4px;">{{item.processFactor}} </span></el-col>
                                                      <el-col :span="12"><span>后处理</span>:<span style="margin-left: 4px;">{{item.laborCosts}} </span></el-col>
                                                  </el-row> 
                                                  <el-row :gutter="20">        
                                                      <el-col :span="12">总金额<span></span>:<span style="margin-left: 2px;">{{item.totalPrice}}</span></el-col>
                                                      <el-col :span="12"><span></span><span style="margin-left: 2px;"></span></el-col>
                                                  </el-row> 
                                            </div>
                                            <!-- 输入价钱 -->
                                            <div v-else>
                                                <el-form :model="form" class="select-style">
                                                  <el-row :gutter="20">
                                                      <el-col :span="12" style="height:30px;">
                                                          <el-form-item label="总克重：" :label-width="formLabelWidth">
                                                            <el-input v-model="GramWeight" autocomplete="off" style="height:20px;"></el-input>
                                                          </el-form-item>
                                                      </el-col>
                                                      <el-col :span="12" style="height:30px;">
                                                          <el-form-item label="总工时：" :label-width="formLabelWidth">
                                                            <el-input v-model="WorkTime" autocomplete="off"></el-input>
                                                          </el-form-item>
                                                      </el-col>
                                                  </el-row>
                                                  <el-row :gutter="20">
                                                      <el-col :span="12" style="height:30px;">
                                                          <el-form-item label="工艺系数：" :label-width="formLabelWidth">
                                                            <el-input v-model="processFactor" autocomplete="off"></el-input>
                                                          </el-form-item>
                                                      </el-col>
                                                      <el-col :span="12" style="height:30px;">
                                                          <el-form-item label="后处理：" :label-width="formLabelWidth">
                                                            <el-input v-model="laborcosts" autocomplete="off" ></el-input>
                                                          </el-form-item>
                                                      </el-col>
                                                  </el-row>
                                                </el-form>
                                                <div><P>计算公式：总费用=总时长*总时价+总重量*单价*工艺系数+后处理</P></div>
                                                <div style="margin-right:10px;">总费用<span>{{sum}}元</span></div>
                                            </div>
                                            <div style="display:flex;margin-top:10px;">
                                                <el-button slot="reference" @click="download(item.guideStl,item.instrumentStl)" id="btn" style="padding:0px 10px;">下载stl文件</el-button>           
                                                <!-- 报价与保存按钮 -->
                                                <el-button style="border:1px solid #86B0D4;border-radius:12px;color:#86B0D4;margin-left:300px;height:30px;" @click="offerPrice(item.id)" v-if="item.id==matrialNum?fillPrice:showPrice">报价</el-button>
                                                <el-button style="border:1px solid #86B0D4;border-radius:12px;color:#86B0D4;margin-left:300px;height:30px;" @click="complete(item.id,item.orderNo)" v-else>保存</el-button>
                                            </div>
                                      </div>  
                                  </div> 
                              </div>
                              <!-- 其他信息 -->
                              <div v-else>         
                                  <div style="margin-top:10px;padding-top:5px;">
                                      <p style="font-size:20px;color:#333333;margin-bottom:5px;">病历信息</p>
                                      <el-row :gutter="20" style="color:#666666;font-size:12px;">
                                            <el-col :span="12"><span>患者姓名</span>:<span style="margin-left: 4px;">{{elseInfor.patientName}}</span></el-col>
                                            <el-col :span="12"><span>患者性别</span>:<span style="margin-left: 4px;">{{elseInfor.sex}}</span></el-col>
                                      </el-row>
                                      <el-row :gutter="20" style="color:#666666;font-size:14px;">
                                          <el-col :span="12">出生日期<span></span>:<span style="margin-left: 4px;">{{elseInfor.birthday}}</span></el-col>
                                          <el-col :span="12"><span>创建日期</span>:<span style="margin-left: 4px;">{{elseInfor.createTime}}</span></el-col>
                                      </el-row> 
                                      <div style="margin-top:10px;border-top:1px solid #DCDFE6;padding-top:5px;">
                                          <p style="font-size:20px;color:#333333;margin-bottom:5px;">医生信息</p>
                                        
                                              <el-row :gutter="20" style="color:#666666;font-size:12px;">
                                                 <el-col :span="12"><span>订单号</span>:<span style="margin-left: 4px;">{{elseInfor.orderNo}}</span></el-col>
                                                  <el-col :span="12"><span>医生姓名</span>:<span style="margin-left: 4px;">{{elseInfor.doctorName}}</span></el-col>
                                                  <el-col :span="12"><span>联系电话</span>:<span style="margin-left: 4px;">{{elseInfor.doctorPhone}}</span></el-col>
                                              </el-row>
                                              <el-row :gutter="20" style="color:#666666;font-size:12px;">
                                                  <el-col :span="12">所属医院<span></span>:<span style="margin-left: 4px;">{{elseInfor.hospita}}</span></el-col>
                                                  <el-col :span="12"><span>所属科室</span>:<span style="margin-left: 4px;">{{elseInfor.oneName}}</span></el-col>
                                              </el-row>
                                              <el-row :gutter="20" style="color:#666666;font-size:12px;">
                                                  <el-col :span="12"><span>医生职务</span>:<span style="margin-left: 4px;">{{elseInfor.position}}</span></el-col>
                                                  <el-col :span="12"><span>医院地址</span>:<span style="margin-left: 4px;">{{elseInfor.hospitalAddress}}</span></el-col>
                                              </el-row>
                                      </div>
                                    </div>
                              </div>
                              <div slot="footer" class="dialog-footer">
                                  <div style="color:#333333;font-size:12px;text-align:left;float:left;"> 
                                    <span>订单总金额：</span>
                                    <span>{{totalMoney}}</span>
                                  </div>
                                  <!-- <P style="color:red;"><span>订单号</span>{{elseInfor.orderNo}}</P> -->
                                  <el-button @click="priceCancel()" style="">取消</el-button>
                                  <el-button type="primary" @click="sure(elseInfor.orderNo)">确定</el-button>
                              </div>
                      </el-dialog>
                      <!-- 订单底部功能键 -->
                      <div style="display:flex;flex:1;">
                        
                          <!-- 关闭订单 -->
                          <el-tooltip content="删除订单" placement="top">  
                              <div class="rub" @click="rub(item.orderNo)" v-show="bool" disabled> <i class="iconfont icon-guanbidingdan two"></i></div>
                          </el-tooltip>
                          <!-- 电话 -->
                          <el-tooltip content="拨打电话" placement="top">
                                <div class="tel" @click="tel(item.supplierOrdersId,item.doctorphone)"> <i class="iconfont icon-yishengdianhua three"></i></div>
                          </el-tooltip>
                          <el-tooltip content="修改订单" placement="top">
                              <el-button type="text" @click="dialogFormVisible = priceDialog" >
                                  <!-- 编辑  -->
                                  <div class="reply" v-show="bool"  @click="edit(item.orderNo)"><i class="iconfont icon-bianjibaojia one"></i></div>
                              </el-button>
                          </el-tooltip>
                          <!-- 物流弹窗 -->
                          <el-tooltip content="物流单号" placement="top">
                              <div class="logistics" @click="logistics(item.orderNo)" v-if="logistics_boolean"> <i class="iconfont icon-bianjiwuliu four"></i></div>
                          </el-tooltip>
                      </div> 
                  </div>
              </div>
          </div>
         
      </div> 
  </div>
</template>

<script>
const { ipcRenderer } = require('electron')
  export default {
    name: "right",
    data(){
        return{
            detailDialog:false,
            gridData: [],
            toindex:0,
            one:[],
            two:[],
            three:[],
            even:[],
            detailData:[],
            elseInfor:'',
            STL3:'',
            GramWeight:'',
            WorkTime:'',
            laborcosts:'',
            processFactor:'',
            priceDialog: false,
            form: {
              name: '',
              region: '',
              date1: '',
              date2: '',
              delivery: false,
              type: [],
              resource: '',
              desc: ''
            },
            formLabelWidth: '85px',
            bool:true,//编辑图标与删除图标默认出现
            material:[],
            downloadStL:'',
            logistics_boolean:false,//物流信息
            logisticsData:false,//物流单号是否显示
            trackingNumber:'',
            postDialog:false,
            stlSize:0,
            tonum:0,
            orderInformation:true,
            fillPrice:false,
            showPrice:true,
            fillLogistics:true,
            matrialNum:'',
            detailOrderid:'',
            TotalwalletData:'',
            totalMoney:'',//总金额
            boolshow:true,
            boolhide:false,
      }
    },
    components:{

    },
      methods:{
        // 我的钱包
        myWalletData(){
          console.log('钱包id')
          console.log(this.GLOBAL.doctcenter)
          console.log(this.GLOBAL.doctcenter.adminid)
          this.changeDatamo("GET","account/getMyWalletForPage",{
            supplierId:this.GLOBAL.doctcenter.adminid,//必传
            },(response)=>{
                console.log(response)
                if(response.code==0){
                  this.TotalwalletData=response.data.supAccount.amount
                }else{
                  console.log('error')
                }
            })
        },
        // 点击顶部菜单
        clickMenu(num){
          // console.log(num)
          // console.log('你是订单的id吗')
          // console.log(this.detailOrderid)
          if(num==0){
            this.tonum=0
            this.orderInformation=true
          }else if(num==1){
            this.tonum=1
            this.orderInformation=false
            this.changeDatamo("GET","omsOrder/getAllTask",{    //这里是发送给后台的数据
              //  订单的id
                orderNo:this.detailOrderid
            },(response) =>{
             console.log(response.object.list[0])
             this.elseInfor=response.object.list[0]
             this.totalMoney=response.object.list[0].totalAmount
            },(error) =>{
                console.log(error)
            });
          }
        },
        offerPrice(id){
          this.matrialNum=id
          // this.sum='',
          this.GramWeight='',
          this.WorkTime='',
          this.laborcosts='',
          this.processFactor=''
        },
        complete(id,orderdetail){
          // console.log(id)
          // 完成之后，应该将填写的数据清空
           if(this.GramWeight==''){
              this.$message({
                message: '总克重不能为空',
                type: 'warning'
              });
           }else if (this.WorkTime =='') {
             this.$message({
                message: '总工时不能为空',
                type: 'warning'
              });
           }else if (this.processFactor==''){
              this.$message({
                message: '工艺系数不能为空',
                type: 'warning'
              });
           }else if(this.laborcosts==''){
              this.$message({
                message: '后处理不能为空',
                type: 'warning'
              });
           }
           else{
             console.log(this.sum)
              this.changeDatamo("POST","omsOrder/update",{    //这里是发送给后台的数据
                  id:id,
                  weight:this.GramWeight,//材料总克重
                  totalWorkingHours:this.WorkTime,//总工时
                  laborCosts:this.laborcosts,//加工服务费用
                  processFactor:this.processFactor,//工艺系数
                  totalPrice:this.sum,//总费用；（工时，工艺系数等）
              },(response) =>{
                if(response.code==0){
                     this.$notify({
                        title: '成功',
                        message: "保存成功",
                        type: 'success'
                      });
                  //从新渲染订单详情
                  this.changeDatamo("GET","omsOrder/getDetails",{    //这里是发送给后台的数据
                        orderNo:orderdetail
                    },(response) =>{
                      if(response.code==0){
                          // 显示数据的页面出现
                        this.matrialNum=''
                        this.detailData=response.object
                        console.log(this.detailData)
                         // 获取总金额
                        this.clickMenu(1)
                        this.tonum=0
                        this.orderInformation=true
                         // 任务列表渲染
                        this.styt(0)
                      }else{
                        this.matrialNum=id
                         this.$notify({
                            title: '警告',
                            message: '保存失败',
                            type: 'warning'
                          });
                      }
                    },(error) =>{
                      this.$notify.error({
                            title: '错误',
                            message: error.msg
                        });
                        console.log(error)
                    })
                  }
                 
              },(error) =>{
                this.$notify.error({
                      title: '错误',
                      message: error.msg
                  });
                  console.log(error)
              });
            }
        },
        TipSize(num){
            // 提示该文件内存多大，再由用户决定该不该下载
           this.changeDatamo('GET','file_nameList',{
             fileLibIdList:num
            },(response)=>{
              // console.log(response)
              // console.log(response.length)
              var kb=0;
              for(var i=0;i<response.length;i++){
                if(response[i].fileSize=='undefined'||response[i].fileSize==''){
                  response[i].fileSize=0
                  var kb=+Number(response[i].fileSize)
                }else{
                    kb +=Number(response[i].fileSize)
                } 
              }
              this.stlSize = (kb/1024/1024).toFixed(2) + "MB"
                  this.$confirm(`该stl文件下载预计${this.stlSize }`, '提示', {
                    confirmButtonText: '确定下载',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    // 在这可以根据设置的路径判断是否按照默认路径还是选择下载路径
                    var filePath=this.$store.state.arr.downloadDirectory
                    console.log(filePath)
                    // 设置路径
                    var a="http://supplier.shoyii.com/downzip/"+num;
                    // var b="E:\\下载的文件目录\\";//下载文件存放路径
                    var b=filePath;//
                    ipcRenderer.send('download',a+"+"+b)            
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消下载'
                    });          
                  });
      
             })
        },
        download(guideStl,instrumentStl){
          // console.log('看下stlid是不是不同')
          //  console.log(guideStl)
          //  console.log(instrumentStl)
           if(guideStl==undefined||guideStl==null||guideStl==''){
             console.log('执行的是导板')
           } else{
            //  在这可以调stl文件的大小
            this.TipSize(guideStl)
           }
           if(instrumentStl==undefined||instrumentStl==null||instrumentStl==''){
             console.log('执行的是器械')
           }else{
              this.TipSize(instrumentStl)
           }
           if(guideStl==undefined&&instrumentStl==undefined){
              this.$message('没有下载的文件');
           }
        },
        styt(num){
          // 新任务
            if(num == 0){
              // 编辑图标与删除图标出现
                this.bool=true;
                // 物流图标消失
                this.logistics_boolean=false;
                this.logisticsData=false;
                this.toindex = num;
                //调用查询新的订单的接口
                this.even=this.one;
                console.log(this.even)
            }
            // 制造中
            if(num == 1){
                this.bool=false;
                // 物流出现
                this.logistics_boolean=true;
                this.logisticsData=false;
                this.toindex = num;
                //调用调用正在进行中的订单接口
                this.even =this.two;
            }
            // 已完成
            if(num == 2){
              // 只有电话出现
                this.bool=false
                 this.logistics_boolean=false;
                 this.logisticsData=true;
                this.toindex = num;
                //调用调用已完成的订单接口
                this.even =this.three;
            }
        },
          //材料获取接口（根据不同的状态获取相对应的不同数据）
        mathercx(){
          console.log('获取所有材料')
            // 所有材料库查询
            this.changeDatamo("GET","omsOrder/getAllTask",{    //这里是发送给后台的数据
                page:1,
                size:1000000,
                orderStatus:""
            },(response) =>{
             console.log(response.object.list)
              this.GLOBAL.material=response.object.list
              // one two three four  分别是新任务，制造中，已完成,已发货
                this.one = [];
                this.two =[];
                this.three = [];
                for(let i = 0; i<response.object.list.length;i++){
                    // 新任务
                    if(response.object.list[i].orderStatus == 102){
                        this.one.push(response.object.list[i]); 
                        console.log(this.one)
                    }
                    // 制作中
                    if(response.object.list[i].orderStatus == 202){
                        this.two.push(response.object.list[i]);
                    }
                    // 已完成
                    if(response.object.list[i].orderStatus == 402){
                        this.three.push(response.object.list[i]); 
                    }
                }
                this.styt(this.toindex)
            },(error) =>{
                console.log(error)
            });
        },
      
        // 弹出框信息填写确定
        sure(id){
          console.log(id)
            this.$confirm('此操作将订单加入制作中, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                 this.changeDatamo("POST","omsOrder/modifyTotalAmount",{    //这里是发送给后台的数据
                 // 订单号 总金额 
                  orderNo:id, //材料id
                  // totalAmount:admid, //订单总金额  
              },(response) =>{
                if(response.code==0){
                     this.$notify({
                      title: '成功',
                      message: "添加成功",
                      type: 'success'
                  });
                  // 成功之后，数据切换到制造中
                  //从新渲染订单
                  this.mathercx() 
                  this.detailDialog=false
                }
              },(error) =>{
                this.$notify.error({
                      title: '错误',
                      message: error.msg
                  });
                  console.log(error)
              });
                // 报价弹框消失（取消）
               this.priceDialog=false
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                });          
              });
             
        },
        priceCancel(){
          this.matrialNum=''
          this.detailDialog=false;
          this.sum='',
          this.GramWeight='',
          this.WorkTime='',
          this.laborcosts='',
          this.processFactor=''
        },
        edit(id){
             // ---------------------------------
          // console.log('订单id')
          // console.log(id)
          this.detailOrderid=id
          this.detailDialog=true;
          // 获取订单详情数据
          this.changeDatamo("GET","omsOrder/getDetails",{    //这里是发送给后台的数据
                page:1,
                size:1000000,
                orderNo:id
            },(response) =>{
              console.log(response.object.length)
              this.detailData=response.object
               // 渲染出总金额
              this.clickMenu(1)
              this.tonum=0;
              this.orderInformation=true
            },(error) =>{
              this.$notify.error({
                    title: '错误',
                    message: error.msg
                });
                console.log(error)
            })
        },
        postsure(id){
            console.log(id)
            if(this.trackingNumber==''){
                this.$message({
                  message: '请输入物流单号',
                  type: 'warning'
                });
            }else{
              this.changeDatamo("POST","omsOrder/modifyLogistics",{
                 orderNo:id,
                 logisticsNumber:this.trackingNumber,
              },(response)=>{
                console.log(response.code)
                if (response.code==0) {
                  this.postDialog=false
                  // 重新渲染数据
                  this.mathercx();
                }else{
                  this.$message({
                      message: response.message,
                      type: 'warning'
                  });
                }
                this.postDialog=false
              })
            }
        },
        postCancel(){
          this.postDialog=false;
        },
        logistics(id){
          // 物流单号
          // console.log(id)
          this.postDialog=true; 
          this.changeDatamo("GET","omsOrder/getAllTask",{
                orderNo:id,
            },(response)=>{
              console.log(response)
              if (response.code==0) {
                // 获取到的数据
                this.logisticsData=response.object.list[0]
              }else{
                this.$message({
                    message: response.message,
                    type: 'warning'
                });
              }
            })

        },
        rub(id){
       
          // -------------------------------
            this.$message({
              message: '订单不可删除',
              type: 'warning'
            });
            // console.log('要删除我吗')
            // this.$confirm('确定删除么', '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            // }).then(() => {
            //     this.changeDatamo("GET","supplierOrders_manage/updateBySupplierOrders",{ //这里是发送给后台的数据
            //         supplierOrdersId:id,
            //         orderStatus:"-1",
            //     },(response) =>{
            //         console.log(response);
            //         this.$notify({
            //             title: '成功',
            //             message: "删除成功",
            //             type: 'success'
            //         });
            //         //从新渲染订单
            //         this.mathercx()
            //     },(error) =>{
            //         console.log(error);
            //         this.$notify.error({
            //             title: '错误',
            //             message: '删除失败'
            //         });
            //     });
            // }).catch(() => {
            //     this.$message({
            //         type: 'info',
            //         message: '取消完成'
            //     });
            // });
        },
        tel(one,telp){
            this.$alert(telp, '联系电话', {
                confirmButtonText: '确定',
                callback: action => {
                }
            });
        }
      },
      computed:{
        sum(){  
              // 克单价
          var GramPrice=document.getElementById('GramPrice').innerHTML
          // 时价
          var TimePrice=document.getElementById('TimePrice').innerHTML
          return  Number(this.WorkTime) * Number(TimePrice)  + Number(GramPrice) *Number(this.GramWeight) *Number(this.processFactor)+ Number(this.laborcosts)
        }
      },
      created(){
        console.log("我是材料")
        this.myWalletData();
        this.mathercx();  //待结单
          //监听main process里发出的message
        ipcRenderer.on('downstate', (event, arg,data) => {
            console.log("下载状态：" +arg)
            console.log(data)
        })
      }
  }
</script>
<style scoped>
   
.select-style >>> .el-input__inner{ 
     height: 25px;
}

</style>
<style>
.el-dialog__header{
  padding:0px!important;
}
.el-dialog__headerbtn{
  top: 6px!important;
}
.el-dialog--center .el-dialog__body{
  padding: 0px 25px 10px !important;
}
.el-form-item__label{
  text-align: left!important;
}
.el-row{
  margin-bottom: 10px !important;
}
.el-form-item{
  margin-bottom: 11px;
}
.orderDetails{
  height: 376px;
  overflow: scroll;
}
.el-button{
  padding: 15px 20px;
  line-height: 0!important;
}
.el-button--text{
  padding-top: 0px!important;
}

#downloadStl{
  padding: 3px;
  background-color: #86B0D4;
  text-align: center;
  color: #fff;
  border-radius: 5px;
  margin-left: 20px;
  line-height: 30px;
  width: 70px;
  cursor: pointer;;
}
  .download{
    display: flex; 
    justify-content: space-around;
    align-items: center;
  }
  .update{
    display: flex;
    justify-content: space-between;
    margin: 5px 0px;
  }
  #btn{
    color: #86B0D4;
    text-align: center;
    border: 1px solid #86B0D4;
    border-radius:10px;
    /* margin-left: 20px; */
  }
  .page-right{
    padding:10px 10px 25px 16px;
    width: 265px;
    height:100%;
    background:rgba(255,255,255,1);
    position: fixed;
    right:0px;
    top: 50px;
    z-index: 90;
  }

  .page-right .task{
    /* box-shadow:0px 0px 3px 0px rgba(32,32,32,0.13); */
    background:#80B3DE;
    border-radius:4px;
    padding: 12px 12px 0px 12px;
  }
  .task-title{
    font-size:22px;
    font-family:Adobe Heiti Std R;
    font-weight:normal;
    color:rgba(255,255,255,1);
    text-align: left;
  }
  .task-center{
    margin-top: 32px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }
  .task-center .title{
    cursor:pointer;
    margin-bottom: 20px;
    font-size:16px;
    letter-spacing:1px;
    font-family:Adobe Heiti Std R;
    font-weight:normal;
    color:rgba(255,255,255,1);
    padding-bottom: 2px;
  }
  /*鼠标移动上的订单事件*/
  .task-center .title:hover{
    /* border-bottom: 2px #fff solid; */
  }
  .ttv{
    border-bottom: 2px #fff solid!important;
  }
  .center{
    margin-top: 6px;
    border-bottom: 1px solid #F5F5F5;
  }
  .center .center-top{
    margin-top: 15px;
    width: 100%;
    display: flex;
  }
  .center-top-circle{
    width:0px;
    height:21px;
    background:rgba(255,255,255,1);
    border:1px solid #86B0D4;
    margin-top: 5px;
  }
  .center-top-data{
    margin: 0 10px;
    font-size:12px;
    line-height: 40px;
    font-family:Adobe Heiti Std R;
    font-weight:normal;
    color:#FFFFFF;
    margin-left: 10px;
  }
  .center-top-last{
    margin-left:auto;
    font-size:12px;
    line-height: 12px;
    font-family:Adobe Heiti Std R;
    font-weight:normal;
    color:rgba(153,153,153,1);
  }
  .center-center{
    padding: 10px 23px 16px 12px;
    /* box-shadow:0px 0px 10px 2px rgba(18,49,137,0.1); */
    border-radius:4px;
  }
  .center-center .top{
    text-align: left;
    font-size:13px;
    letter-spacing:1px;
    font-family:PingFang-SC-Bold;
    font-weight:normal;
    color:rgba(128,129,133,1);
    line-height:20px;
  }
  .center-center .mid{
    text-align: left;
    margin-top: 12px;
    font-size:13px;
    letter-spacing:1px;
    font-family:PingFang-SC-Bold;
    font-weight:normal;
    color:rgba(128,129,133,1);
    line-height:21px;
  }
  .center-center .but{
    margin-top: 21px;
    display: flex;
  }
  .center-center .but .reply{
    /* flex: 1; */
    width:46px;
    height:24px;
    background:#FFFFFF;
    border: 1px solid #86B0D4;
    border-radius:15px;
  }
  .center-center .but .rub{
    /* flex: 1; */
   
    margin-left: 15px;
    width:46px;
    height:24px;
    border:1px solid #D4D4D4;
    border-radius:15px;
  }
  .center-center .but .tel{
    /* flex: 1; */
    width:46px;
    height:24px;
    border:1px solid #86B0D4;
    border-radius:15px;
    margin: 0 30px 0px 36px;
  }
  .center-center .but .logistics{
    width:56px;
    height:24px;
    border:1px solid #86B0D4;
    border-radius:15px;
    margin-left: 40px;
  }
  .but .four{
     font-size: 14px;
    color: #86B0D4;
    line-height:24px;
  }
  .but .one{
    font-size: 14px;
    color: #86B0D4;
    line-height:24px;
  }
  .but .two{
    font-size: 14px;
    color: #D4D4D4;
    line-height:24px;
  }
  .but .three{
    font-size: 14px;
    color: #86B0D4;
    line-height:24px;
  }
  .setclassMenu{
    background: #FFFFFF;
  }
</style>
