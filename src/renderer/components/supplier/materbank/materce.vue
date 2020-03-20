<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-15 18:10:00
 * @LastEditTime : 2020-01-14 11:26:00
 * @LastEditors  : Please set LastEditors
 -->
<template>
    <div class="first-page">
        <div class="page-left">
            <div class="box_detail">
                <div class="box-top">
                    <div v-if="newzen">材料详情</div>
                    <div v-else>新增材料</div>
                </div>
                <div class="box-center">
                    <el-row :gutter="20">
                        <!-- <el-col :span="10">
                            <div class="box-center-name">材料类别</div>
                            <el-select v-model="valuefirst" placeholder="材料类别" :disabled="newzen" @change="getlistCategory">
                                <el-option
                                    v-for="item in optionfirst"
                                    :key="item.category"
                                    :label="item.label"
                                    :value="item.category"
                                    :disabled="item.disabled"
                                    >
                                </el-option>
                            </el-select>
                        </el-col> -->
                        <el-col :span="10" >
                            <div style="display:flex;">
                                 <div class="box-center-name" style="">材料应用</div>
                                 <div style="color:#333333;line-height:30px;">{{valueone}}</div>    
                            </div>
                           
                            <!-- <el-select v-model="valueone" placeholder="应用" :disabled="newzen" @change="getlisttwo">
                                <el-option
                                    v-for="item in optionone"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    :disabled="item.label"
                                    >
                                </el-option>
                            </el-select> -->
                        </el-col>
                        <el-col :span="10">
                            <div style="display:flex;">
                                <div class="box-center-name" style="">材料属性</div>
                                <div style="color:#333333;line-height:30px;">{{valuetwo}}</div> 
                            </div> 
                            <!-- <el-select v-model="valuetwo" placeholder="属性" :disabled="newzen" @change="getlistthree">
                                <el-option
                                        v-for="item in optiontwo"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select> -->
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="10">
                            <div style="display:flex;">
                                <div class="box-center-name">3D技术</div>
                                <div style="color:#333333;line-height:30px;margin-left:10px;">{{valuethree}}</div>  
                            </div>  
                            <!-- <el-select v-model="valuethree" placeholder="技术" :disabled="true">
                            </el-select> -->
                        </el-col>
                        <el-col :span="10">
                            <div style="display:flex;">
                                <div class="box-center-name" style="margin-right:40px;">制作工时单价</div> 
                                <div style="color:#333333;line-height:30px;">{{inputtwo}}</div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="10">
                            <div style="display:flex;"> 
                                <div class="box-center-name" style="margin-right:45px;">材料单价/克</div>
                                <div style="color:#333333;line-height:30px;">{{inputhree}}</div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <el-dialog title="" :visible.sync="dialogFormVisible=priceDialog" :modal='false' :close-on-click-modal='true' center width="55%" style="right:100px;">
                    <div slot="title" style="display:flex;width:100%;background:#86B0D4;height:40px;line-height:40px;">
                        <div class="center-top-data" style="margin-top:13px;">材料修改</div>
                    </div>
                    <el-form :model="form">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="材料应用：" :label-width="formLabelWidth" style="margin-bottom:0px;">
                                <el-select v-model="valueone" placeholder="应用" @change="getlisttwo" :disabled="newzen">
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
                                    <el-select v-model="valuetwo" placeholder="属性" @change="getlistthree" :disabled="newzen">
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
                            <el-col :span="12">
                                <el-form-item label="3D技术：" :label-width="formLabelWidth" style="margin-bottom:0px;">
                                    <el-select v-model="valuethree" placeholder="技术" :disabled="true">
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">  
                                <el-form-item label="制作工时单价：" :label-width="formLabelWidth" style="margin-bottom:0px;">
                                    <el-input v-model="inputtwoDialog" placeholder="单价" autocomplete="off"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="材料单价（元/克）" :label-width="formLabelWidth" style="margin-bottom:0px;">
                                    <el-input  v-model="inputhreeDialog" placeholder="单价" autocomplete="off"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="priceCancel()">取消</el-button>
                        <el-button type="primary" @click="sure()">确定</el-button>
                    </div>
                </el-dialog>
            </div>
            <div>
                <div v-if="xiug" class="anbtn">
                    <!-- <div style="width:90px;height:34px;background:#86B0D4;
                        border-radius:2px;color: rgba(255,255,255,1);font-size:14px;font-family:PingFang-SC-Bold;
                        font-weight:bold;line-height:34px;cursor: pointer;" @click="xiugai">
                        修改
                    </div> -->
                    <p @click="xiugai" style="color:#86B0D4;font-size:14px;font-family:PingFang-SC-Bold;cursor: pointer;font-weight:bold;margin-right:60px;">修改材料</p>
                    <p @click="tel(materialScienceId,0)" style="color:#86B0D4;font-size:14px;font-family:PingFang-SC-Bold;cursor: pointer;font-weight:bold;">删除材料</p>
                    <!-- <div style="width:90px;height:34px;background:rgb(255, 255, 255);
                        border:1px solid #86B0D4;margin-left:20px;border-radius:2px;font-size:14px;
                        font-family:PingFang-SC-Bold;font-weight:bold;color:#86B0D4;
                        line-height:34px;cursor: pointer;" @click="tel(materialScienceId,0)">
                        删除
                    </div> -->
                </div>
                <div v-else class="anbtn">
                    <div style="width:90px;height:34px;background:rgb(134, 176, 212);
                        border-radius:2px;color: rgb(255, 255, 255);font-size:14px;font-family:PingFang-SC-Bold;
                        font-weight:bold;line-height:34px;cursor: pointer;margin-right: 24px;" @click="baocund">
                        保存
                    </div>
                    <div style="width:90px;height:34px;background:rgb(255, 255, 255);
                        border:1px solid rgb(134, 176, 212);border-radius:2px;font-size:14px;
                        font-family:PingFang-SC-Bold;font-weight:bold;color:rgb(134, 176, 212);
                        line-height:34px;cursor: pointer;" @click="quxiaod">
                        取消
                </div>
                </div>
            </div>
        </div>
        <!-- 右侧材料显示 -->
        <div class="page-right">
            <div class="task" style="padding-bottom:10px;">
                <div class="task-title">
                    材料目录({{materail.length}})
                </div>
            </div>
            <div class="center">
                <div v-for="(item,i) in materail" :key="i">
                    <div class="center-top">
                        <div class="center-top-circle" :class="{yanse:item.materialScienceId==materialScienceId}"></div>
                        <div class="center-top-data"></div>
                        <div class="center-top-last"></div>
                    </div>
                    <div class="center-center" @click="replay(item.materialsIdApplication,item.materialScienceId)" @mouseover="replayClass(item.materialsIdApplication,materialScienceId)" :class="{borderClass:item.materialScienceId==materialScienceId}">
                      
                        <div class="top">
                            <div><span>材料应用</span>:<span style="margin-left: 2px;margin-bottom:5px;">{{item.one_name}}</span></div>
                            <div><span>材料属性</span>:<span style="margin-left: 2px;margin-bottom:5px;">{{item.two_name}}</span></div>
                            <div><span>3D技术</span>:<span style="margin-left: 2px;margin-bottom:5px;">{{item.two_technology}}</span></div>
                            <!-- <div><span>制作工时单价</span>:<span style="margin-left: 2px;">{{item.timeprice}}</span></div>
                            <div><span>材料单价/克</span>:<span style="margin-left: 2px;">{{item.price}}</span></div> -->
                        </div>
                        <div class="but">
                            <!-- <div class="reply" @click="replay(item.materialsIdApplication,item.materialScienceId)">
                                <i class="iconfont icon-bianji"></i>
                            </div> -->
                            <div class="tel" @click="tel(item.materialScienceId,1)">
                                <i class="iconfont icon-shanchu"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
    export default {
        name: "materce",
        data(){
            return{
                priceDialog: false,
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
                // valuefirst:'',
                inputone:'',
                inputtwo:'',
                inputhree:'',
                inputtwoDialog:'',
                inputhreeDialog:"",
                myphoto:require('../../../assets/img/sczp.png'),
                materail:'',
                phoid:'',
                //一级id
                materialsId:'',
                //二级id
                materialsIdApplication:'',
                //材料id
                materialScienceId:'',
                xiugs:true,
                xiug:true,
                newzen:true,
                num:1,
                SelectInput:''
            }
        },
        components:{

        },
        //事件
        methods:{
            replay(id,tid){
                this.num = 0;
                this.materialsIdApplication = id;
                this.materialScienceId = tid;
                this.getlistall(this.num);
            },
            replayClass(id,tid){
                this.num = 0;
                this.materialsIdApplication = id;
                this.materialScienceId = tid;
                this.getlistall(this.num);
            },
            tel(id,num){
                //删除材料接口
                this.$confirm('是否删除该材料', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // console.log(id);
                    this.changeDatamo("GET","material/delete",{    //这里是发送给后台的数据
                        materialScienceId:id,
                    },(response) =>{
                        if(response.code == 1){
                            this.$message({
                                message: response.msg,
                                type: 'success'
                            });
                            if(num == 0){
                                // 在页面内的删除键
                                this.methesc()
                            }else if(num == 1){
                                // 右侧列表目录的删除键,再重新渲染数据
                                this.mathercx()
                            }
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
            },
            
            // 修改
            xiugai(){
            // 材料修改只能修改价钱，不能修改材料
              this.xiugs = false
              this.xiug=true
              this.priceDialog=true
            },
            priceCancel(){
              this.priceDialog=false
            },
            sure(){
              this.priceDialog=false
              this.xiug=false
              this.inputtwo=this.inputtwoDialog
              this.inputhree=this.inputhreeDialog
            },
            //添加材料 的接口和问题
            addma:function(){
                // console.log(this.valueone); //应用
                // console.log(this.valuetwo); //属性
                // console.log(this.valuethree); //技术  (这个只是传不是看)
                // console.log(this.inputtwo); //工时价
                // console.log(this.inputhree);  //价格
                this.changeDatamo("POST","material/add",{    //这里是发送给后台的数据
                    materialsId:this.materialsId,   //材料应用类型
                    materialsIdApplication:this.materialsIdApplication, //应用类下具体的材料
                    price:this.inputhree,  //价格
                    timeprice:this.inputtwo,         //工时价
                    // adminId:'',   //供应商id
                    materialPicture:this.phoid //材料图片
                },(response) =>{
                    console.log(response);
                    if(response.code == 1){
                        this.$message({
                            message: response.msg,
                            type: 'success'
                        });
                        // this.getlistall(this.num);
                        this.mathercx();
                    }else{
                        this.$message.error(response.msg);
                    }
                },(error) =>{
                    console.log(error)
                });
            },
            // 保存
            baocund(){
                if(this.$route.query.id == -1 && this.$route.query.iid == -1){
                    this.xiugs = true;
                    this.newzen = true;
                    this.addma();
                    this.$router.push("/material")
                }else{
                    this.xiugs = true;
                    this.revise();
                }

            },
            // 取消
            quxiaod(){
              this.xiugs = true
              this.xiug=true
            },
        
            //修改材料的调用
            revise(){
                // 材料修改的接口
                this.changeDatamo("POST","material/update",{    //这里是发送给后台的数据
                    materialScienceId:this.$route.query.iid,
                    materialsId:this.materialsId,
                    materialsIdApplication:this.materialsIdApplication,
                    price:this.inputhree,
                    timeprice:this.inputtwo,  //工时价
                    materialPicture:this.phoid  //图片材料
                },(response) =>{
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    //修改成功
                    this.getlistall(this.num)
                    this.$router.push("/material")
                },(error) =>{
                    console.log(error)
                });
            },
            //所有材料获取的方法
            mathercx(){
                // 所有材料库查询
                // 所有材料库查询
                this.changeDatamo("GET","material/getlist",{    //这里是发送给后台的数据
                    page:1,
                    size:10000,
                },(response) =>{
                    console.log('获取所有的材料')
                    console.log(response.data);
                    this.materail = response.data;
                },(error) =>{
                    console.log(error)
                });
            },
            //删除后的方法
            methesc(){
                // 所有材料库查询
                this.changeDatamo("GET","material/getlist",{    //这里是发送给后台的数据
                    page:1,
                    size:10000,
                },(response) =>{
                    console.log(response)
                    this.materail = response.data;
                    this.materialScienceId = response.data[0].materialScienceId;
                    this.materialsIdApplication = response.data[0].materialsIdApplication;
                    this.getlistall()
                },(error) =>{
                    console.log(error)
                });
            },

            /*
            * 新建材料
            * */
        //    获取材料类型
          
        // 材料类别的点击获取
            // getlistCategory(){
                 
            // },
           
            //一级材料获取
          getlistone(){
                this.changeDatamo("GET","materials/getlistone",{
                    categoryId:this.GLOBAL.supplier.categoryId
                },(response) =>{
                    console.log("一级材料获取");
                    console.log(response);
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
                        console.log('这个执行了吗')
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
                console.log("这个是二级材料的id")
                console.log(disabled);
                for (let i = 0;i<this.optiontwo.length;i++){
                    if(disabled == this.optiontwo[i].id){
                        this.materialsIdApplication = this.optiontwo[i].id;
                        this.valuethree = this.optiontwo[i].technology
                    }
                }
            },
            //渲染
            getlistall(num){
                if(this.$route.query.id == -1 && this.$route.query.iid == -1){
                    //这里是新增材料获取
                    //开启输入
                    this.xiugs = false;
                    this.newzen = false;
                    //一级材料获取
                    console.log('轮到一级的了')
                    this.getlistone();
                }else{
                    if(num == 1){
                        this.changeDatamo("GET","materials/getByMaterialsId",{
                            materialsIdApplication:this.$route.query.id,
                            materialScienceId:this.$route.query.iid
                        },(response) =>{
                            this.valueone = response.materials.mname;
                            this.valuetwo = response.materials.bname;
                            this.valuethree = response.materials.technology;
                            this.inputhree = response.materialsScience.price;
                            this.inputtwo = response.materialsScience.timeprice;
                            this.phoid = response.materialsScience.materialPicture;
                            this.myphoto = this.GLOBAL.bastusemo+ "view-image/"+response.materialsScience.materialPicture;
                            //一级id  materialsScience
                            this.materialsId = response.materials.materialsId;
                            this.materialScienceId = response.materialsScience.materialScienceId;
                            //二级id
                            this.materialsIdApplication = response.materials.materialsIdApplication;
                        },(error) =>{
                            console.log(error)
                        });
                    }else{
                        this.changeDatamo("GET","materials/getByMaterialsId",{
                            materialsIdApplication:this.materialsIdApplication,
                            materialScienceId:this.materialScienceId
                        },(response) =>{
                            console.log(response);
                            this.valueone = response.materials.mname;
                            this.valuetwo = response.materials.bname;
                            this.valuethree = response.materials.technology;
                            this.inputhree = response.materialsScience.price;
                            this.inputtwo = response.materialsScience.timeprice;
                            this.phoid = response.materialsScience.materialPicture;
                            this.myphoto = this.GLOBAL.bastusemo+ "view-image/"+response.materialsScience.materialPicture;
                            //一级id
                            this.materialsId = response.materials.materialsId;
                            this.materialScienceId = response.materialsScience.materialScienceId;
                            //二级id
                            this.materialsIdApplication = response.materials.materialsIdApplication;
                        },(error) =>{
                            console.log(error)
                        });
                    }
                }


            }
        },
        created(){
            // 从备案材料那块添加的
            console.log(localStorage.getItem('categoryMaterial'))
            //材料查询
            this.getlistall(this.num);
            // //材料的获取
            this.mathercx();
        }
    }
</script>

<style scoped>
    .first-page{
        position: fixed;
        height: 100%;
        flex: 1;
        /* width: 100%; */
        display: flex;
        margin-top: 60px;
        background-color: #fff;
    }
    .right{
        overflow: hidden;
    }


    .page-left{
        margin: 0px 305px 0 19px;
        overflow: scroll;
        height: calc(100% - 75px);
        background: rgba(255,255,255,1);
        /* background: yellow; */
        position: fixed;
        flex: 1;
        z-index:70;
        max-width: 750px;
        min-width: 750px;
        width: 750px;
        box-shadow:0px 0px 10px 0px rgba(18,49,137,0.1);
        border-radius:4px;
    }
    .box_detail{
        margin: 20px;
        padding: 0px 2%;
    }
    .box-top{
        font-size:18px;
        font-family:PingFang-SC-Medium;
        font-weight:bold;
        color:rgba(20,17,45,1);
        margin-bottom: 20px;
        text-align: left;
    }
    .box-center{
        opacity:0.75;
        margin-bottom: 20px;
        margin-left: -27px;
    }
    .el-row {
        margin-bottom: 14px;
    }
    .el-col {
        border-radius: 4px;
    }
    .el-select,.el-input{
        width: 80%;
    }
    .box-center-name{
        font-size:12px;
        font-family:PingFang-SC-Medium;
        font-weight:normal;
        color: rgb(168, 168, 168);
        margin: 6px 60px 10px 23px;
    }
    .dox{
        font-size:12px;
        font-family:PingFang-SC-Medium;
        font-weight:normal;
        color: rgb(151, 151, 151);
        margin: 26px 0 10px 35px;
        text-align: left;
    }
    .block{
        margin-right: 100px;
        position: relative;
    }
    .block .one{
        position: absolute;
        top: 30px;
        left: 26px;
        width: 140px;
        height: 140px;
        opacity: 0;
        cursor: pointer;
        z-index: 5;
    }
    .demonstration{
        text-align: center;
        font-size:18px;
        font-family:PingFang-SC-Medium;
        font-weight:bold;
        color:rgba(20,17,45,1);
        margin-bottom: 12px;
    }
    .el-image{
        width:140px;
        height:140px;
    }


    .page-right{
        padding:10px 15px 25px 5px;
        overflow:scroll;
        width: 269px;
        height: calc(100% - 75px);
        /* margin-left: 19px; */
        background:rgba(255,255,255,1);
        /* background: red; */
        /* background: green; */
        position: fixed;
        right:0px;
        top: 50px;
        z-index: 8000;
    }

    .page-right .task{
        padding: 12px 0 0 0;
    }

    .task-title{
        text-align: left;
        font-size:15px;
        font-family:PingFang-SC-Medium;
        font-weight:bold;
        color:rgba(52,55,60,1);
    }
    .center{
        margin-top: 6px;
    }
    .center .center-top{
        margin-top: 15px;
        width: 100%;
        display: flex;
    }
    .center-top-circle{
        width:11px;
        height:11px;
        background:rgba(255,255,255,1);
        border:1px solid #86B0D4;
        border-radius:50%;
    }
    .yanse{
        background-color: #86B0D4 !important;
    }
    .borderClass{
        border: 1px solid #86B0D4;
        box-shadow:0px 0px 0px 0px #ffffff !important;
    }
    .center-top-data{
        margin: 0 10px;
        font-size:12px;
        line-height: 12px;
        font-family:Adobe Heiti Std R;
        font-weight:normal;
        color:rgba(102,102,102,1);
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
        padding: 14px 23px 16px 23px;
        box-shadow:0px 0px 10px 2px rgba(18,49,137,0.1);
        border-radius:4px;
        display: flex;
        justify-content: center; /* 水平居中 */
        align-items: center;     /* 垂直居中 */
        height: 100%;
    }
    .center-center :hover{
        border: 1px soild blue;
        cursor:pointer;
    }
    .center-center .top{
        flex: 5;
        text-align: left;
        font-size:14px;
        letter-spacing:1px;
        font-family:PingFang-SC-Bold;
        font-weight:normal;
        color:rgba(128,129,133,1);
        line-height:20px;
        margin-right: 10px;
    }
    .center-center .but{
        flex: 1;
        width:40px;
        height:30px;
    }
    .center-center .but .reply{
        margin: 15px 10px 15px 0;
        width:38px;
        height:20px;
        border:1px solid rgb(134, 176, 212);
        border-radius:12px;
        cursor: pointer;
    }
    .center-center .but .tel{
        margin: 15px 0 10px 0;
        width:50px;
        height:22px;
        border:1px solid rgb(134, 176, 212);
        border-radius:12px;
        cursor: pointer;
    }

    .reply i{
        font-size: 21px;
        color: rgb(134, 176, 212);
        line-height: 22px;
    }
    .tel i{
        font-size: 15px;
        color: rgb(134, 176, 212);
        line-height: 22px;
    }

   .center-center .but .tel :hover{
        color: red;
    }
    .anbtn{
        display: flex;
        margin: 0 12px 60px 30px;
        flex-direction:row;
        text-align: center;
    }
</style>
