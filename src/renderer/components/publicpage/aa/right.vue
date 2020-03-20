<template>
    <div class="box">
        <div class="box-center-do">
            <div class="box-ing-a">
                <img :src="phot" alt="" :οnerrοr="defaultImg">
            </div>
            <div class="box-title-b">
                {{name}}(主治医师)
            </div>
            <div class="box-title-c">
                {{cont}}
            </div>
            <div style="display: flex;justify-content: space-between;margin-top: 20px;" v-if="rtn">
                <div class="box-btn-t">
                    <div class="ttmmoo">
                        <i class="iconfont icon-tianjiaxiezhu"></i>
                    </div>
                    <div class="ttmmoof">
                        添加协助
                    </div>

                </div>
                <div class="box-btn-t">
                    <div class="ttmmoo">
                        <i class="iconfont icon-quanxianshezhi"></i>
                    </div>
                    <div class="ttmmoof">
                        权限设置
                    </div>
                </div>
            </div>
        </div>

        <div class="box-center-mo" v-if="rtn">
            <div style="width: 100%;" class="box-mid-top">
                <div class="cctn">
                    <i class="iconfont icon-cailiao"></i>
                </div>

                <div style="text-align: left;">
                    <div class="llssdd">
                        请选择材料
                    </div>
                    <div class="llssdd">
                        并确定生产供应商
                    </div>
                </div>

            </div>
            <div>
                <el-button plain>{{impval}}</el-button>
            </div>


            <div class="last-center">
                <div class="center-last-end" v-for="(item,index) in togys">
                    <div style="display: flex;text-align: left;">
                        <div style="font-size:14px;font-family:PingFang-SC-Bold;
                        overflow: hidden;text-overflow:ellipsis;white-space: nowrap;
                    font-weight:bold;color:rgba(102,102,102,1);line-height: 20px;width: 100px;">
                            {{item.companyname}}
                        </div>
                        <div style="font-size:14px;font-family:PingFang-SC-Bold;
                        overflow: hidden;text-overflow:ellipsis;white-space: nowrap;
                    font-weight:bold;color:rgba(102,102,102,1);margin-left: 5px;width: 58px;">
                            ¥{{item.price}}/G
                        </div>
                    </div>
                    <div style="width:40px;height:20px;background:rgba(22,204,143,1);
                    font-size:10px;font-family:PingFang-SC-Medium;font-weight:500;
                    color:rgba(255,255,255,1);border-radius:2px;line-height: 20px;cursor: pointer;" @click="gysxq(item.materialsIdApplication,item.adminId)">
                        选择
                    </div>
                </div>
            </div>
        </div>
        <div class="but-conter" v-if="rtn">
            <div style="width: 100%;" class="box-mid-top">
                <div style="text-align: left;">
                    <div class="llssdd" style="line-height: 40px;">
                        供应商报价  <!---->
                    </div>
                </div>
            </div>
            <div style="text-align: center;">
                <div style="font-size:24px;font-family:PingFang-SC-Bold;
                font-weight:bold;color:rgba(27,218,154,1);line-height:30px;">
                    {{teams}}
                </div>
                <!--<div style="font-size:14px;font-family:PingFang-SC-Bold;font-weight:bold;-->
                <!--color:rgba(102,102,102,1);line-height:40px;margin-left: 17px">-->
                    <!--更多信息尽在订单<span style="color: rgba(27,218,154,1);cursor: pointer;">详情</span>-->
                <!--</div>-->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "right",
        data(){
            return{
                defaultImg:'this.src="' + require('../../../assets/img/wupgo.png') + '"',  //无图片时候显示

                name:'',    //主治医生名称
                cont:'',   //部门
                phot:'',  //主治医生图片

                togys:[],
                allcenter:'',

                clyjname:'',
                clyjnames:'',
                impval:'尚未选择材料',    //供应商材料显示文本
                teams:"尚未选择供应商",   //是否选择供应商文本

                rtn:true,  //供应商报价是否显示
            }
        },
        methods: {
            login() {
                if(this.GLOBAL.logintt == 1){
                    this.rtn = false;
                }else{
                    // this.gysbj();
                    this.rtn = true;
                    // 头部信息
                    this.changeDatado("GET","caseHistory/details", {
                        caseHistoryId: this.$route.query.id
                    }, (response) => {
                        this.allcenter = response;
                        if(response.caseHistory.supplierOrdersId){
                            this.teams = "待报价"
                        }else{
                            this.teams = "尚未选择供应商"
                        }
                        // 这是侧边的信息
                        this.name = response.attendingDoctor[0].doctor.name;
                        this.cont = response.attendingDoctor[0].doctor.department;
                        this.phot = this.GLOBAL.bastuse+ "view-image/" + response.attendingDoctor[0].doctor.avatar;
                        if(response.caseHistory.materialsIdApplication){
                            this.hqcl(response.caseHistory.materialsId,1);  //获取一级
                            this.hqcl(response.caseHistory.materialsIdApplication,2);  //获取二级
                            this.gys(response.caseHistory.materialsIdApplication)
                        }else{
                            //尚未选择供应商
                            console.log("尚未选择供应商");
                        }
                    }, (error) => {
                        console.log(error);
                    });
                }

            },
            hqcl(id,num){
                this.changeDatado("GET", "doctMaterials/getById", {
                    materialsId: id
                }, (response) => {
                    console.log(response);
                    //通过id渲染供应商
                    if(num == 1){
                        this.clyjname = response.applicationtype;
                    }else if(num == 2){
                        this.clyjnames = response.applicationtype;
                    }
                    // if(this.clyjname && this.clyjnames){ //设置尚未开启
                        this.impval = this.clyjname + "--" + this.clyjnames
                    // }
                }, (error) => {
                    console.log(error);
                });

            },
            gys(id){
                this.changeDatado("GET", "materialScience/getMaterialsId", {
                    materialsIdApplication: id
                }, (response) => {
                    console.log("获取材料的选择商家");
                    console.log(response);
                    this.togys = response;
                }, (error) => {
                    console.log(error);
                });
            },

            gysxq(id,admid){
              //通过供应商获取详细信息
                console.log(id,admid);
                //获取供应商的类容
                this.changeDatado("GET", "materialScience/getMaterialsIdApplicationByAdminId", {
                    materialsIdApplication: id,
                    adminId:admid
                },(response)=>{
                    console.log("这是获取供应商的类容");
                    console.log(response);
                    //姓名  companyname  /  name
                    //电话  telephone
                    //单价  price
                    //工时费  timeprice
                    //弹窗
                },(error) => {
                    console.log(error);
                });
                //通过id选择供应商
                // console.log(this.allcenter.attendingDoctor[0].);
                // console.log(this.allcenter.caseHistory);
                this.changeDatado("GET", "materialScience/placeOrder", {
                    materialsIdApplication: id,
                    adminId:admid,
                    attendingDoctorId:this.allcenter.attendingDoctor[0].doctor.doctorId,
                    attendingDoctorName:this.allcenter.attendingDoctor[0].doctor.name,
                    doctorphone:this.allcenter.attendingDoctor[0].doctor.telephone,
                    hospitalAddress:this.allcenter.attendingDoctor[0].doctor.hospital,
                    caseHistoryId:this.allcenter.caseHistory.caseHistoryId,
                    STL3:this.allcenter.caseHistory.sTL3,
                    STL3Picture:this.allcenter.caseHistory.sTL3Picture,
                    materialsId:this.allcenter.caseHistory.materialsId,
                    // guidePlateMaterialsId:''
                },(response)=>{
                    console.log(response);
                },(error) =>{
                    console.log(error);
                });
            },
            // gysbj(){
            //     //查询供应商是否报价
            //     this.changeDatado("GET", "materialScience/getQuotationById", {
            //         supplierOrdersId: "",  //供应商id
            //         attendingDoctorId:"",   //主治医生id
            //
            //     }, (response) => {
            //         console.log("获取材料的选择商家");
            //         console.log(response);
            //         this.togys = response;
            //     }, (error) => {
            //         console.log(error);
            //     });
            // },
        },
        created(){
            this.login();

        }
    }
</script>

<style>
    .box-center-mo .el-button{
        font-family:PingFang-SC-Medium!important;
        height: 30px!important;
        line-height: 30px!important;
        width: 220px;
        padding: 0!important;
    }

</style>

<style scoped>
    .box{
        position: fixed;
        right:0px;
        top: 50px;
        z-index: 90;
        width:260px;
        height:900px;
        text-align: center;
        background-color: #fff;
    }

    .box-center-do{
        margin: 20px 15px 0px 0px;
        height:220px;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 5px 0px rgba(18,49,137,0.1);
        border-radius:2px;
        box-shadow:0px 0px 5px 0px rgba(18,49,137,0.1);
        border-radius:2px;
        padding: 10px;
    }

    .box-ing-a{
        margin: 10px auto;
        width: 100px;
        height: 100px;
        background-color: #ccc;
        border-radius:50%;
    }

    .box-ing-a img{
        width: 100%;
        height: 100%;
        border-radius:50%;
    }

    .box-title-b{
        font-size:14px;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:rgba(68,85,95,1);
        line-height: 25px;
    }

    .box-title-c{
        font-size:12px;
        font-family:PingFang-SC-Medium;
        font-weight:normal;
        color:rgba(91,112,124,1);
        line-height: 16px;
    }

    .box-btn-t{
        display: flex;
        align-items:center;
        justify-content: center;
        cursor: pointer;
        width:92px;
        height:30px;
        background:rgba(27,218,154,1);
        border-radius:45px;
    }

    .ttmmoo{
        font-size:20px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height: 30px;
    }

    .ttmmoof{
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height: 30px;
        margin-right: 5px;
    }

    .iconfont{
        font-size: 20px;
    }

    .box-center-mo{
        margin: 20px 15px 0px 0px;
        height:260px;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 5px 0px rgba(18,49,137,0.1);
        border-radius:2px;
        box-shadow:0px 0px 5px 0px rgba(18,49,137,0.1);
        border-radius:2px;
    }

    .box-mid-top{
        display: flex;
        align-items:center;
        justify-content: center;
        background:rgba(27,218,154,1);
        margin-bottom: 10px;
    }

    .cctn .iconfont{
        color:#fff;
        font-size: 55px;
    }

    .llssdd{
        font-size:13px;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:rgba(255,255,255,1);
        line-height:20px;
    }

    .last-center{
        padding: 10px;
    }

    .center-last-end{
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: space-between;
    }
    .but-conter{
        margin: 20px 15px 0px 0px;
        height:140px;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 5px 0px rgba(18,49,137,0.1);
        border-radius:2px;
        box-shadow:0px 0px 5px 0px rgba(18,49,137,0.1);
        border-radius:2px;
    }

</style>