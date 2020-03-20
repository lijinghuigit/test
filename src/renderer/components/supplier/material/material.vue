<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 13:33:57
 * @LastEditTime : 2020-01-14 11:24:23
 * @LastEditors  : Please set LastEditors
 -->
<template>
  <el-container style="padding: 0px 15px;height: 100%;">
    <el-aside width="100%" style="padding:40px 14px 0px 14px;
    box-shadow:0px 0px 5px 0px rgba(18,49,137,0.1);border-radius:2px;height: 720px;">
      <!--材料库的顶部-->
       <div style="position:fixed;top:15px;z-index:100;color:#636772;">
          <input type="text" placeholder="搜索" style="width:90px;height:28px;padding:0px 16px;border:1px solid #F3F3F3;border-radius:17px;background:#F3F3F3; 
          outline:none; -webkit-appearance: none;position:relative;"/>
          <i class="el-icon-search" style="position:absolute;left:90px;top:11px;" @click="MaterialSearch()"></i>
      </div>
      <el-row class="matebox">
        <el-col :xs="11" :sm="12" :md="18" :lg="19" :xl="21" class="title">材料库</el-col>

        <el-col :xs="13" :sm="12" :md="6" :lg="5" :xl="3" style="text-align: center;">
          <!-- <div style="margin-left:90px;font-size:12px;
            font-family:PingFang-SC-Bold;font-weight:bold;color:#7F7F7F;" >
            <i class="el-icon-circle-plus" style="color:#86B0D4;font-size:34px;cursor: pointer;" @click="newto"></i>
            <P style="float:right;font-size:14px;line-height:34px;text-align:center;">新建材料</P> 
          </div> -->
        </el-col>
      </el-row>
      <!--手术方法库不够时候是否居中-->
      <!--循环手术方法库-->
      <div style="display: flex;flex-direction:row;flex-wrap:wrap;height:560px;">
        
        <!--第一个-->
          <div class="center-arte-new" @click="newto" style="cursor:pointer;" @mouseover="addclass()" @mouseleave="minuclass()" :class="{addhover:changecolor}">
          <!-- 材料库的背景图片 -->
              <div style="margin-top:60px;">
                  <i class="iconfont icon-tianjia" style="color:#949494;font-size:48px;text-align:center;"  @mouseover="addclass()" @mouseleave="minuclass()" :class="{addfonthover:changecolor}"></i>
                  <p style="color:#333333;font-size:14px;margin-top:10px;"  @mouseover="addclass()" @mouseleave="minuclass()" :class="{addfonthover:changecolor}">新建材料</p>
              </div>
        </div>
        <!-- 显示材料的页面 -->
        <div class="center-arte" style="position:relative;" v-for="(item,index) in materail" :key="index" @mouseover="addclass(index)" @mouseleave="minuclass(index)" :class="{addallcolor:index==changeclass}" >
            <div class="center-bt-left" @click="mainto(item.materialsIdApplication,item.materialScienceId)" style="cursor:pointer;">
                <div><span>材料应用：</span>{{item.one_name}}</div>
                <div><span>材料属性：</span>{{item.two_name}}</div>
                <div><span>3D技术: </span>{{item.two_technology}}</div>
                <div><span>制作工时单价：</span>{{item.timeprice}}￥/小时</div>
                <div><span>材料单价：</span>{{item.price}}￥/克</div>
            </div>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
                <i class="iconfont icon-shanchu" style="position:absolute;right:15px;top:155px;color:#86B0D4;cursor:pointer;" @click="deleteMaterial(item.materialScienceId)"></i>
            </el-tooltip>  
        </div>
      </div>
      <el-dialog title="" :visible.sync="dialogFormVisible=priceDialog" :modal='false' :close-on-click-modal='true' center>
            <div slot="title" style="display:flex;width:100%;background:#86B0D4;height:40px;line-height:40px;">
                <div class="center-top-data">材料详情</div>
            </div>
            <el-form :model="form">
              <el-row>
                <el-col :span="12">
                    <el-form-item label="材料应用：" :label-width="formLabelWidth" style="margin-bottom:0px;">
                      <el-select v-model="valueone" placeholder="应用" @change="getlisttwo">
                        <el-option
                              v-for="item in optionone"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                              :disabled="item.label"
                              >
                        </el-option>
                      </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">  
                    <el-form-item label="材料属性：" :label-width="formLabelWidth" style="margin-bottom:0px;">
                        <el-select v-model="valuetwo" placeholder="属性" @change="getlistthree">
                          <el-option
                                v-for="item in optiontwo"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                          </el-option>
                      </el-select>
                    </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10" style="margin-right:50px;">
                      <el-form-item label="3D技术：" :label-width="formLabelWidth" style="margin-bottom:0px;">
                          <el-select v-model="valuethree" placeholder="技术" :disabled="true">
                          </el-select>
                      </el-form-item>
                </el-col>
                <el-col :span="9">  
                      <el-form-item label="制作工时单价：" :label-width="formLabelWidth" style="margin-bottom:0px;">
                        <el-input v-model="inputtwo" placeholder="单价" autocomplete="off"></el-input>
                      </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="9">
                      <el-form-item label="材料单价（元/克）" :label-width="formLabelWidth" style="margin-bottom:0px;">
                        <el-input  v-model="inputhree" placeholder="单价" autocomplete="off"></el-input>
                      </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="priceCancel()">取消</el-button>
              <el-button type="primary" @click="sure()">保存</el-button>
            </div>
      </el-dialog>
        <div class="block" style="color:#333333;position:fixed;left:550px;bottom:5px;">
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
        </div>
    </el-aside>
  </el-container>
  <!---->
</template>
<script>

    export default {
        name: "material",
      data(){
          return({
            priceDialog: false,
            input: '',
            optionone: [],
            optiontwo: [],
            optionthree: [],
            optionfirst:[
                // {label:'一级',category:'1',disabled:false},
                // {label:'二级',category:'2',disabled:true},
                // {label:'三级',category:'3',disabled:true}
            ],
            value: '',
            valueone: '',
            valuetwo: '',
            valuethree:'',
            inputone:'',
            inputtwo:'',
            inputhree:'',
            //一级id
            materialsId:'',
            //二级id
            materialsIdApplication:'',
            //材料id
            materialScienceId:'',
            num:1,
            noto:[],
            materail:[],
            changecolor:false,
            changeclass:-1,
             // 分页相关
            currentpage:1,//初始页
            pagesize:11,//每页的数据
            xiugs:true,
            formLabelWidth: '',
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
          })
      } ,components:{

        },
        methods:{
            handleCurrentChange(val){
                // 所有材料库查询
                this.changeDatamo("GET","material/getlist",{    //这里是发送给后台的数据
                    page:val,
                    size:this.pagesize,
                },(response) =>{
                    console.log("获取所有的材料")
                    console.log(response);
                    this.materail = response.data;
                    for(let i = 0;i<this.materail.length;i++){
                        if(this.materail[i].materialPicture){
                            this.noto.push({
                                backgroundImage: "url("+ this.GLOBAL.bastusemo+ "view-image/"+this.materail[i].materialPicture + ") ",
                                backgroundPosition: "center center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",   //cover纵向    contain横向
                            })
                        }else{
                            this.noto.push({
                                backgroundImage: "url("+ require("../../../assets/img/wupgo.png") + ") ",
                                backgroundPosition: "center center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",   //cover纵向    contain横向
                            })
                        }

                    }
                },(error) =>{
                    console.log(error)
                });
            },
            mathercx(){
                // 所有材料库查询
                this.changeDatamo("GET","material/getlist",{    //这里是发送给后台的数据
                    page:1,
                    size:10000,
                },(response) =>{
                    console.log("获取所有的材料")
                    console.log(response);
                    this.materail = response.data;
                    for(let i = 0;i<this.materail.length;i++){
                        if(this.materail[i].materialPicture){
                            this.noto.push({
                                backgroundImage: "url("+ this.GLOBAL.bastusemo+ "view-image/"+this.materail[i].materialPicture + ") ",
                                backgroundPosition: "center center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",   //cover纵向    contain横向
                            })
                        }else{
                            this.noto.push({
                                backgroundImage: "url("+ require("../../../assets/img/wupgo.png") + ") ",
                                backgroundPosition: "center center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",   //cover纵向    contain横向
                            })
                        }
                    }

                },(error) =>{
                    console.log(error)
                });
            },
            mainto(id,iid){
                this.$router.push({
                    path: '/materce',  // 路由的名称
                    query: {
                        id: id,
                        iid:iid
                    }
                })
            },
            newto(){
                this.changeDatamo("GET","supplier/getSupplier",{
                    },(response) =>{
                      console.log(response)
                       if(response.filingStatus=='0'){
                         this.$message({
                            message: '备案处于待审核状态，请等待',
                            type: 'warning'
                          });
                        }else if(response.filingStatus=='2'){
                            this.$message({
                              message: '备案未通过，请重新上传备案材料',
                              type: 'warning'
                            });
                        }
                        else if(response.filingStatus=='1'){
                           this.priceDialog=true
                        }else{
                          return;
                        }
                      
                    },(error) =>{
                        console.log(error);
               }); 
            },
            priceCancel(){
              this.priceDialog=false
            },
            sure(){
              this.addma();
            },
            addma:function(){
                // console.log(this.valueone); //应用
                // console.log(this.materialsId);
                // console.log(this.valuetwo); //属性
                // console.log(this.materialsIdApplication);
                // console.log(this.valuethree); //技术  (这个只是传不是看)
                // console.log(this.inputtwo); //工时价
                // console.log(this.inputhree);  //价格
                if(this.materialsId==''){
                     this.$message({
                        message: '请选择材料应用',
                        type: 'warning'
                     });
                }else if(this.materialsIdApplication==''){
                     this.$message({
                        message: '请选择材料属性',
                        type: 'warning'
                     });
                }else if(this.inputhree==''){
                      this.$message({
                        message: '请输入制作工时单价',
                        type: 'warning'
                      }); 
                }else if(this.inputtwo==''){
                      this.$message({
                        message: '请输入材料单价',
                        type: 'warning'
                      }); 
                }else{
                    this.changeDatamo("POST","material/add",{    //这里是发送给后台的数据
                        materialsId:this.materialsId,   //材料应用类型
                        materialsIdApplication:this.materialsIdApplication, //应用类下具体的材料
                        price:this.inputhree,  //价格
                        timeprice:this.inputtwo,         //工时价
                        // adminId:'',   //供应商id
                        materialPicture:this.phoid //材料图片
                    },(response) =>{
                        if(response.code == 1){
                          this.$message({
                              message: response.msg,
                              type: 'success'
                            });
                            // 弹出框消失
                          this.priceDialog=false  
                        }else{
                          this.$message.error(response.msg);
                        }
                    },(error) =>{
                        console.log(error)
                    });
                }
            },
            //一级材料获取
            getlistone(){
                console.log('看下类别')
                console.log(this.GLOBAL.supplier.categoryId) 
                // console.log('资质备案类别')
                // console.log(categoryid)
                this.changeDatamo("GET","materials/getlistone",{
                    categoryId: this.GLOBAL.supplier.categoryId
                },(response) =>{
                    // console.log("一级材料获取");
                    // console.log(response);
                    this.optionone = response.map((value, i) => {
                        return {
                            laber: value.materialsid,
                            value: value.name,
                        }
                    })
                    console.log(this.optionone)
                },(error) =>{
                    console.log(error)
                });
            },
            // 二级材料获取的方法
            getlisttwo(disabled){
                this.valuethree = '';
                this.materialsIdApplication = '';
                for (let i = 0;i<this.optionone.length;i++){
                    if(disabled == this.optionone[i].value){
                        this.materialsId = this.optionone[i].laber
                        console.log(this.optionone[i].laber)
                    }
                }
                // console.log('测试下id')
                // console.log(this.optionone)
                // console.log(this.materialsId)
                this.changeDatamo("GET","materials/getson",{
                    materialsId:this.materialsId,
                    
                },(response) =>{
                    // console.log("这是二级材料")
                    // console.log(response);
                    this.optiontwo = response
                },(error) =>{
                    console.log(error)
                });
            },
            getlistthree(disabled){
                // 这个是二级材料的id
                // console.log("这个是二级材料的id")
                // console.log(disabled);
                for (let i = 0;i<this.optiontwo.length;i++){
                    if(disabled == this.optiontwo[i].id){
                        this.materialsIdApplication = this.optiontwo[i].id;
                        this.valuethree = this.optiontwo[i].technology
                    }
                }
            },
            addclass(index){
              if (index!=undefined) {
                 this.changeclass=index
              }else{
                 this.changeclass=-1
                 this.changecolor=true
              }  
            },
            minuclass(index){
              if (index!=undefined) {
                 this.changeclass=index
              }else{
                 this.changeclass=-1
                 this.changecolor=false
              }
            },
            deleteMaterial(num){
              // console.log('hahahah')
              // console.log(num)
               //删除材料接口
                this.$confirm('是否删除该材料', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // console.log(id);
                    this.changeDatamo("GET","material/delete",{    //这里是发送给后台的数据
                        materialScienceId:num,
                    },(response) =>{
                        if(response.code == 1){
                            this.$message({
                                message: response.msg,
                                type: 'success'
                            });
                          this.mathercx()
                            //调用所有
                        }else if(response.code == 0){
                            this.$message.error(response.msg);
                        }else if(response.code == -1){
                              this.$message.error('删除失败');
                        }
                    },(error) =>{
                        console.log(error)
                    });
                }).catch(() => {
                    this.$message({type: 'info',
                        message: '取消输入'
                    });
                });
            }
        },
        created(){
            //所有材料库查询
            this.handleCurrentChange(1);
            this.getlistone();
        }
    }
</script>

<style scoped>
  .matebox{
    margin-right: 0px;
    margin-bottom: 0px;
    margin-top: 14px;
    padding: 0px 20px 0px 10px;
  }
  .title{
    text-align: left;
    font-size:17px;
    letter-spacing: 1px;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(102,102,102,1);
    line-height:34px;
  }
  .one{
    font-size:13px;
    font-family:PingFang-SC-Bold;
    font-weight:normal;
    color:rgba(187,187,187,1);
    line-height:20px;
  }
  /*竖线的样式*/
  .solidmid{
    width:2px;
    height:20px;
    margin: 0 auto;
    background:rgba(238,238,238,1);
  }
  .center-arte{
    width: 23%;
    height: 180px;
    background:#E7EFF6;
    border-radius:1px;
    margin: 7px;
  }
  .center-arte-new{
     width: 23%;
    height: 180px;
    background:#E7EFF6;
    border-radius:1px;
    margin: 7px;
  }
  .addhover{
    background: #b3cee5;
  }
  .addfonthover{
    color: #ffffff!important;
  }
  .addallcolor{
    background: #b3cee5;
  }
  /*图片显示问题*/
  /* .center-img{
    margin: 14px 14px 10px 14px;
    height: 170px;
    background-size: cover;
    background-position: center center;
  } */
  .center-bt-left{
    position: relative;
    text-align: left;
    margin: 14px;
    color: black;
  }
  .center-bt-left div{
    margin-top: 10px;
    font-size: 14px;
    font-weight: normal;
    color: gray;
  }
  .center-left-title{
    font-size:17px;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    letter-spacing: 1px;
    color:rgba(102,102,102,1);
    line-height:27px;
    width: 65%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .center-left-center{
    font-size:13px;
    font-family:PingFang-SC-Bold;
    font-weight:normal;
    color:rgba(168,166,166,1);
    line-height:27px;
    width: 72%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .center-money{
    font-size:15px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    /*letter-spacing: 1px;*/
    color:rgba(255,82,82,1);
    line-height:25px;
  }
  .center-morbtn{
    width:32px;
    height:22px;
    margin-top: 3px;
    margin-left: auto;
    text-align: center;
    background:rgba(225,225,225,1);
    border-radius:2px;
  }
  input::-webkit-input-placeholder {
         color: #CCCCCC;     /* placeholder颜色  */
         font-size: 12px;    /* placeholder字体大小  */
     }
  icon-shanchu :hover{
    color: red;
  }

</style>
<style>
  .el-dialog__headerbtn{
    top:12px!important;
  }
</style>
