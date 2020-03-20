<template>
    <div style="color:white;min-height:665px;background:#FFFFFF;margin-top:55px;padding-left:10px;">
          <div style="position:fixed;top:15px;z-index:100;color:#636772;">
            <div style="display:flex;line-height:32px;">
                <P style="line-height:32px;cursor:pointer;" @click="getBack()"><i class="iconfont icon-fanhui"></i></P>
                <div style="margin:0px 10px;font-size:14px;">首页</div>
                <div>
                    <input type="text" placeholder="搜索" style="width:98px;height:28px;padding:0px 16px;border:1px solid #F3F3F3;border-radius:17px;background:#F3F3F3; 
                    outline:none; -webkit-appearance: none;position:relative;"/>
                    <i class="el-icon-search" style="position:absolute;left:131px;top:11px;" @click="MaterialSearch()"></i>
                </div>
            </div>
          </div>
            <!-- 顶部菜单 -->
            <div style="display:flex;margin-top:22px;">
                <div style="margin-right:20px;">
                    <P style="line-height:40px;color:#333333;font-size:16px;font-weight:bold;">任务列表</p>
                </div>
                <ul id="breadcrumb">
                    <li><p @click="styt(0)" :class="{ttv:toindex==0}"> 新任务</p></li>
                    <li><p @click="styt(1)" :class="{ttv:toindex==1}">制造中</p></li>
                    <li><p @click="styt(2)" :class="{ttv:toindex==2}">已完成</p></li>
                </ul>
            </div>

            <!-- 任务内容列表 -->
          <div style="display:flex;flex-flow:row wrap;height:550px;overflow:scroll;margin-top:10px;">
              <div class="center" v-for="(item,index) in even" :key="index">
                  <div class="center-center">
                  <!--内容-->
                  <div style="height:160px;overflow:auto;">
                      <div class="top">
                    <!--拇关节-->
                          <div>
                              <div v-if="item.threeName == '' || item.threeName == null || item.threeName == undefined">
                                <div><span>科室</span>:<span style="margin-left: 2px;">{{item.oneName}}</span></div>
                                <div><span>位置</span>:<span style="margin-left: 2px;">{{item.twoName}}</span></div>
                              </div>
                              <div v-else>
                                <div><span>科室</span>:<span style="margin-left: 2px;">{{item.oneName}}</span></div>
                                <div><span>位置</span>:<span style="margin-left: 2px;">{{item.twoName}}</span></div>
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
                                <div class="center-top-data" style="line-height:40px;">订单详情</div>
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
                                   <p style="font-size:20px;color:#333333;margin-bottom:5px;">订单详情</p>
                                <div  v-for="(item,index) in detailData" :key="index" style="border-bottom:1px solid #EEEEEE;padding-bottom:10px;margin-top:5px;">
                                   <!-- 详情的展示数据 -->
                                      <el-row :gutter="20" style="color:#666666;font-size:14px;">
                                          <div v-if="item.instrumentName == '' || item.instrumentName == null || item.instrumentName == undefined">
                                              <el-col :span="12"><span>材料类型</span>:<span style="margin-left: 4px;color:#000000;">{{item.guideName}}</span></el-col>
                                              <el-col :span="12"><span>材料</span>:<span style="margin-left: 4px;color:#000000;">{{item.primaryName}}--{{item.secondaryName}}</span></el-col>
                                          </div>
                                          <div v-if="item.guideName == '' || item.guideName == null || item.guideName == undefined">
                                              <el-col :span="12"><span>材料类型</span>:<span style="margin-left: 4px;color:#000000;">{{item.instrumentName}}</span></el-col>
                                              <el-col :span="12"><span>材料</span>:<span style="margin-left: 4px;color:#000000;">{{item.primaryName}}--{{item.secondaryName}}</span></el-col>
                                          </div> 
                                      </el-row>
                                    
                                      <el-row :gutter="20" style="color:#666666;font-size:14px;">
                                        <!-- 导板 -->
                                        <div v-if="item.productType==1?boolshow:boolhide">
                                             <el-col :span="12">克单价<span></span>:<span style="margin-left: 4px;color:#000000;" id="GramPrice">{{item.guidePrice}}</span></el-col>
                                             <el-col :span="12"><span>工时单价</span>:<span style="margin-left: 4px;color:#000000;" id="TimePrice">{{item.guideTimePrice}}</span></el-col>
                                        </div>
                                        <!-- 器械 -->
                                        <div v-else>
                                             <el-col :span="12">克单价<span></span>:<span style="margin-left: 4px;color:#000000;" id="GramPrice">{{item.instrumentPrice}}</span></el-col>
                                             <el-col :span="12"><span>工时单价</span>:<span style="margin-left: 4px;color:#000000;" id="TimePrice">{{item.instrumentTimePrice}}</span></el-col>
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
                                                    <el-input v-model="laborcosts" autocomplete="off"></el-input>
                                                  </el-form-item>
                                              </el-col>
                                          </el-row>
                                        </el-form>
                                        <div><P>计算公式：总费用=总时长*总时价+总重量*单价*工艺系数+后处理</P></div>
                                        <div style="margin-right:10px;">总费用<span>{{sum}}元</span></div>
                                    </div>
                                    <div style="display:flex;margin-top:10px;">
                                         <el-button slot="reference" @click="download(item.guideStl,item.instrumentStl)" id="btn" style="height:30px;padding:0px 10px;">下载stl文件</el-button>           
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
                                    <el-row :gutter="20" style="color:#666666;font-size:14px;">
                                          <el-col :span="12"><span>患者姓名</span>:<span style="margin-left: 4px;color:#000000;">{{elseInfor.patientName}}</span></el-col>
                                          <el-col :span="12"><span>患者性别</span>:<span style="margin-left: 4px;color:#000000;">{{elseInfor.sex}}</span></el-col>
                                    </el-row>
                                    <el-row :gutter="20" style="color:#666666;font-size:14px;">
                                        <el-col :span="12">出生日期<span></span>:<span style="margin-left: 4px;color:#000000;">{{elseInfor.birthday}}</span></el-col>
                                        <el-col :span="12"><span>创建日期</span>:<span style="margin-left: 4px;color:#000000;">{{elseInfor.createTime}}</span></el-col>
                                    </el-row> 
                                    <div style="margin-top:10px;border-top:1px solid #DCDFE6;padding-top:5px;">
                                        <p style="font-size:20px;color:#333333;margin-bottom:5px;">医生信息</p>
                                      
                                            <el-row :gutter="20" style="color:#666666;font-size:14px;">
                                                <el-col :span="12"><span>医生姓名</span>:<span style="margin-left: 4px;color:#000000;">{{item.doctorName}}</span></el-col>
                                                <el-col :span="12"><span>联系电话</span>:<span style="margin-left: 4px;color:#000000;">{{item.doctorPhone}}</span></el-col>
                                            </el-row>
                                            <el-row :gutter="20" style="color:#666666;font-size:14px;">
                                                <el-col :span="12">所属医院<span></span>:<span style="margin-left: 4px;color:#000000;">{{elseInfor.hospita}}</span></el-col>
                                                <el-col :span="12"><span>所属科室</span>:<span style="margin-left: 4px;color:#000000;">{{elseInfor.oneName}}</span></el-col>
                                            </el-row>
                                            <el-row :gutter="20" style="color:#666666;font-size:14px;">
                                                <el-col :span="12"><span>医生职务</span>:<span style="margin-left: 4px;color:#000000;">{{elseInfor.position}}</span></el-col>
                                                <el-col :span="12"><span>医院地址</span>:<span style="margin-left: 4px;color:#000000;">{{elseInfor.hospitalAddress}}</span></el-col>
                                            </el-row>
                                    </div>
                                  </div>
                            </div>
                            <div slot="footer" class="dialog-footer">
                               <div style="color:#333333;font-size:14px;text-align:left;float:left;"> 
                                   <span>订单总金额：</span>
                                   <span>{{totalMoney}}</span>
                                </div>
                                <el-button @click="priceCancel()">取消</el-button>
                                <el-button type="primary" @click="sure(item.orderNo)">确定</el-button>
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
          <!-- <div class="block" style="color:#333333;">
              <el-pagination
                layout="prev, pager, next"
                :total="20"
                prev-text="< 上一页"
                next-text="下一页 >"
                :page-size="pagesize"
                 :current-page="currentpage"
                @current-change="handleCurrentChange"
                >
              </el-pagination>
         </div> -->
    </div>
</template>
<script>
const { ipcRenderer } = require('electron')
export default {
    components:{
    },
    data(){
        return{
          detailDialog:false,
          // 分页相关
          currentpage:1,//初始页
          pagesize:6,//每页的数据
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
            making:true,
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
            bool:true,
            material:[],
            downloadStL:'',
            logistics_boolean:false,//物流信息
            trackingNumber:'',
            postDialog:false,
             stlSize:0,
             tonum:0,
             orderInformation:true,
            fillPrice:false,
            showPrice:true,
            // completeOrPrice:true,
            fillLogistics:true,
            matrialNum:'',
            detailOrderid:'',
            logisticsData:false,//物流数据
            TotalwalletData:'',
            boolshow:true,
            boolhide:false,
            totalMoney:'',//总金额
        }
    },
    methods:{
      // 返回上一步
      getBack(){
        this.$router.go(-1)
      },
      // 搜索
      MaterialSearch(){
        console.log('搜索')
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
              this.totalMoney=response.object.list[0].totalAmount
              console.log(this.totalMoney)
              //  console.log(response.object.list[0])
              this.elseInfor=response.object.list[0]

              },(error) =>{
                  console.log(error)
              });
            }
      },
      offerPrice(id){
          this.matrialNum=id
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
           }else{
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
                 // 完成之后，报价按钮出现
                  this.completeOrPrice=true
                  //从新渲染订单详情
                  this.changeDatamo("GET","omsOrder/getDetails",{    //这里是发送给后台的数据
                        orderNo:orderdetail
                    },(response) =>{
                      if(response.code==0){
                          // 显示数据的页面出现
                        this.matrialNum=''
                        this.detailData=response.object
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
              console.log(response)
              console.log(response.length)
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
      
      // handleCurrentChange(val,num){
      //   console.log(val)
      //   console.log(num)
      //   if (num==0) {
      //     this.Orderstatus=102
      //   }else if (num==1) {
      //     this.Orderstatus=202
      //   }else if(num==2){
      //     this.Orderstatus=402
      //   }
      //   console.log(this.Orderstatus)
      //   // 点击到的当前页，向后台发送每页的页数和数据量；
      //      this.changeDatamo("GET","supplierOrders_manage/getAllTask",{    //这里是发送给后台的数据
      //         page:val,//页码
      //         size:this.pagesize,//每页数据量
      //         orderStatus:this.Orderstatus
      //     },(response) =>{
      //       console.log(response.list)
      //       this.GLOBAL.material=response.list
      //       // one two three 分别是新任务，制造中，已完成
      //         this.one = [];
      //         this.two =[];
      //         this.three = [];
      //         for(let i = 0; i<response.list.length;i++){
      //           // 新任务
      //             if(response.list[i].orderStatus == 102){
      //                 this.one.push(response.list[i]);  
      //             }
      //             // 制作中
      //             if(response.list[i].orderStatus == 202 ){
      //                 this.two.push(response.list[i]);
      //             }
      //           // 已完成
      //             if(response.list[i].orderStatus == 402){
      //                 this.three.push(response.list[i]); 
      //             }
      //         }
      //         console.log('*********')
      //         console.log(this.toindex)
      //         this.styt(this.toindex)
      //     },(error) =>{
      //         console.log(error)
      //     });
      // },
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
                console.log(this.one)
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
        //材料获取接口
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
      sure(id){
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
          // console.log('订单号')
          
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
              console.log(this.detailData)
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
        this.$message({
              message: '订单不可删除',
              type: 'warning'
         });
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
        this.mathercx();
         //监听main process里发出的message
        ipcRenderer.on('downstate', (event, arg,data) => {
            console.log("下载状态：" +arg)
            console.log(data)
        })
    }
}
</script>
<style scoped>
    * {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif,PingFang-SC-Bold;
  font-size: 12px;
  color:#333333;
}

body {
  text-align: center;
  background-color: #34495e;
}
.select-style >>> .el-input__inner{ 
     height: 25px;
}
h1 {
  font-weight: 100;
  font-size: 32px;
  padding: 40px;
  color: #fff;
}
 .icon-fanhui:hover{
     color: #86B0D4; 
  }
/* 面包屑 */
/* -------------------------------- */
#breadcrumb {
  list-style: none;
  display: inline-block;
}
#breadcrumb .icon {
  font-size: 14px;
}
#breadcrumb li {
  float: left;
}
#breadcrumb li p {
  color: #A2A4B0;
  display: block;
  background: #F8F8F8;
  text-decoration: none;
  position: relative;
  height: 40px;
  line-height: 40px;
  padding: 0 10px 0 5px;
  text-align: center;
  margin-right: 23px;
}
#breadcrumb li:nth-child(even) p {
  background-color: #F8F8F8;
}
#breadcrumb li:nth-child(even) p:before {
  border-color: #F8F8F8;
  border-left-color: transparent;
}
#breadcrumb li:nth-child(even) p:after {
  border-left-color: #F8F8F8;
}
#breadcrumb li:first-child p {
  padding-left: 15px;
  -webkit-border-radius: 4px 0 0 4px;
  -moz-border-radius: 4px 0 0 4px;
  -ms-border-radius: 4px 0 0 4px;
  -o-border-radius: 4px 0 0 4px;
  border-radius: 4px 0 0 4px;
}
#breadcrumb li:first-child p:before {
  border: none;
}
#breadcrumb li:last-child p {
  padding-right: 15px;
  -webkit-border-radius: 0 4px 4px 0;
  -moz-border-radius: 0 4px 4px 0;
  -ms-border-radius: 0 4px 4px 0;
  -o-border-radius: 0 4px 4px 0;
  border-radius: 0 4px 4px 0;
}
#breadcrumb li:last-child p:after {
  border: none;
}
#breadcrumb li p:before, #breadcrumb li p:after {
  content: "";
  position: absolute;
  top: 0;
  border: 0 solid #F8F8F8;
  border-width: 20px 10px;
  width: 0;
  height: 0;
}
#breadcrumb li p:before {
  left: -20px;
  border-left-color: transparent;
}
#breadcrumb li p:after {
  left: 100%;
  border-color: transparent;
  border-left-color: #F8F8F8;
}
#breadcrumb li p:hover {
  background-color: #DFEDF9;
}
#breadcrumb li p:hover:before {
  border-color: #DFEDF9;
  border-left-color: transparent;
}
#breadcrumb li p:hover:after {
  border-left-color: #DFEDF9;
}
#breadcrumb li p:active {
  background-color: #DFEDF9;
}
#breadcrumb li p:active:before {
  border-color: #DFEDF9;
  border-left-color: transparent;
}
#breadcrumb li p:active:after {
  border-left-color: #DFEDF9;
}
/* dialog */
/* ------------------------------------------ */
.el-dialog__header{
  padding:0px!important;
}
.el-dialog__headerbtn{
  top: 6px!important;
}
.el-dialog--center .el-dialog__body{
  padding: 5px 25px 30px !important;
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
/* ------------------------------------ */
.orderDetails{
  height: 376px;
  overflow: scroll;
}
.el-button{
  padding: 0px 20px;
  line-height: 2!important;
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
    line-height: 36px;
    cursor: pointer;;
  }
   .download{
    /* display: flex; 
    justify-content: space-around;
    align-items: center; */
  }
  .downdocument{
    text-align: left;
    margin-top:10px;
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
    padding: 5px 10px;
    width: 90px;
    height: 21px;
    font-size: 12px;
  }
  .page-right{
    padding:10px 20px 25px 10px;
    /* width: 265px; */
    width:25%;
    height:100%;
    margin-left: 19px;
    background:rgba(255,255,255,1);;
    position: fixed;
    right:0px;
    top: 50px;
    z-index: 90;
  }

  .page-right .task{
    box-shadow:0px 0px 3px 0px rgba(32,32,32,0.13);
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
  }
  .task-center .title{
    flex: 1;
    cursor:pointer;
    padding-bottom: 20px;
    font-size:13px;
    border-bottom: 2px #80B3DE solid;
    letter-spacing:1px;
    font-family:Adobe Heiti Std R;
    font-weight:normal;
    color:rgba(255,255,255,1);
  }
  /*鼠标移动上的订单事件*/
  .task-center .title:hover{
    border-bottom: 2px #fff solid;
  }
  .ttv{
    color:#86B0D4!important;
  } 
  .center{
    margin-top: 6px;
    width:30%;
    height: 240px;
    border:2px solid #E7EFF6;
    margin-right:20px;
    margin-bottom:20px;
  }
  .center .center-top{
    margin-top: 15px;
    width: 100%;
    display: flex;
  }
  .center-top-circle{
    width:8px;
    height:8px;
    background:#DFEDF9;
    border:1px solid #DFEDF9;
    border-radius:50%;
    margin-left:10px;
  }
  .center-top-data{
    margin: 0px 10px 0px 5px;
    font-size:12px;
    /* line-height: 12px; */
    font-family:Adobe Heiti Std R;
    font-weight:normal;
    color:#333333;
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
    margin-top: 10px;
    padding: 0px 10px;
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
    font-size:13px;
    letter-spacing:1px;
    font-family:PingFang-SC-Bold;
    font-weight:normal;
    color:rgba(128,129,133,1);
    line-height:21px;
  }
  .center-center .but{
    display: flex;
    margin-top: 15px;
  }
  .center-center .but .reply{
    width:46px;
    height:24px;
    background:#FFFFFF;
    border: 1px solid #86B0D4;
    border-radius:15px;
  }
  .center-center .but .rub{
    margin: 0 20px;
    width:46px;
    height:24px;
    border:1px solid #D4D4D4;
    border-radius:15px;
  }
  .center-center .but .tel{
    width:46px;
    height:24px;
    border:1px solid #86B0D4;
    border-radius:15px;
    margin-left: 20px;
  }
  .center-center .but .logistics{
    width:56px;
    height:24px;
    border:1px solid #86B0D4;
    border-radius:15px;
    margin-left: 50px;
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

</style>