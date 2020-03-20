<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 13:33:57
 * @LastEditTime : 2020-01-04 10:43:24
 * @LastEditors  : Please set LastEditors
 -->
<template>
    <div class="box" style="text-align:left;">
        <div v-if="showDataBool">
            <div style="height:535px;overflow:auto;" >
                <div class="box-top">
                    <div >{{grxs}}</div>
                </div>
                <div class="box-center">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <p><span>*</span>公司名称</p>
                            <el-input :disabled="grxa" v-model="companyName" placeholder="真实姓名"></el-input>
                        </el-col>
                        <el-col :span="12">
                            <p><span>*</span>公司联系电话</p>
                            <el-input :disabled="grxa" v-model="componyTel" placeholder="请输入公司联系电话"></el-input>
                        </el-col>
                    
                    </el-row>
                    <el-row :gutter="20">
                    
                        <el-col :span="12">
                                <p>负责人姓名</p>
                                <el-input :disabled="grxa" v-model="bossName" placeholder="请输入负责人姓名"></el-input>
                        </el-col>
                        <el-col :span="12">
                                <p>负责人联系电话</p>
                                <el-input :disabled="grxa" v-model="bossTel" placeholder="请输入负责人联系电话"></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                                <p>公司邮箱</p>
                                <el-input :disabled="grxa" v-model="Email" placeholder="请输入公司邮箱"></el-input>
                        </el-col>
                        <el-col :span="12">
                                <p>公司传真</p>
                                <el-input :disabled="grxa" v-model="Fax" placeholder="请输入公司传真号码"></el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                            <p>公司地址</p>
                            <el-col :span="24"><el-input :disabled="grxa" v-model="address" placeholder="请输入公司地址"></el-input></el-col>
                    </el-row>
                </div>

                <div class="box-mid">
                    <div class="block" style="display:flex;">
                        <div class="demonstration">公司LOGO</div>
                        <el-image :src="componyLogo"></el-image>
                        <input class="componyLogo" type="file" v-if="!grxa" @change="pushImg($event,1)" accept="image/jpeg,image/png,image/gif">
                    </div>
                    <div class="block" style="display:flex;">
                        <div class="demonstration">营业执照</div>
                        <div>
                            <el-image :src="businessLicense"></el-image>
                            <input class="componyLogo" type="file" v-if="!grxa" @change="pushImg($event,2)" accept="image/jpeg,image/png,image/gif">
                        </div>
                    </div>
                
                </div>
                <el-row>
                    <p style="color:#B1B8C3;">公司简介</p>
                    <textarea style="width:100%;height:120px;resize:none;outline:none;cursor:text;background:white;color:#B1B8C3; font-size:14px;
                    font-family:SimSun;border:1px solid #E3E7E8;" maxlength='250' v-model="Introduction" :disabled="grxa" placeholder="请输入250字或以内公司简介，将展示于供应商选择页面">
                    </textarea>
                </el-row>
            </div>
            <div class="anbtn">
                <div style="width:90px;height:34px;background:#7AA5C9;
                    border-radius:2px;color: rgba(255,255,255,1);font-size:14px;font-family:PingFang-SC-Bold;
                    font-weight:bold;line-height:34px;cursor: pointer;" @click="Save">
                    保存
                </div>
                <div style="width:90px;height:34px;background:rgba(255,255,255,1);
                    border:1px solid #7AA5C9;border-radius:2px;font-size:14px;
                    font-family:PingFang-SC-Bold;font-weight:bold;color:#7AA5C9;
                    line-height:34px;margin-right: 24px;cursor: pointer;" @click="cancel">
                    取消
                </div>
            </div>
        </div>
       
<!-- ---------------------------------------------------- -->
        <div v-else>
            <div class="box-top">
                <div >{{grxs}}</div>
            </div>
            <div class="box-center show">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <p style="margin-right:32px;">公司名称</p>
                        <P class="showdata">{{companyName}}</P>
                    </el-col>
                    <el-col :span="12">
                        <p style="margin-right:32px;">公司联系电话</p>
                        <P class="showdata">{{componyTel}}</P>
                    </el-col>
                
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                            <p>负责人姓名</p>
                            <P class="showdata">{{bossName}}</P>
                    </el-col>
                    <el-col :span="12">
                            <p>负责人联系电话</p>
                            <P class="showdata">{{bossTel}}</P>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                            <p style="margin-right:32px;">公司邮箱</p>
                            <P class="showdata">{{Email}}</P>
                    </el-col>
                    <el-col :span="12">
                            <p style="margin-right:56px;">公司传真</p>
                            <P class="showdata">{{Fax}}</P>
                    </el-col>
                </el-row>
                <el-row>
                     <el-col :span="12">
                        <p style="margin-right:32px;">公司地址</p>
                        <P class="showdata" style="margin-right:32px;">{{address}}</P>
                     </el-col>
                </el-row>
            </div>

            <div class="box-mid">
                <div class="block" style="display:flex;">
                    <div class="demonstration">公司LOGO</div>
                    <el-image :src="componyLogo"></el-image>
                    <!-- <input class="componyLogo" type="file" v-if="!grxa" @change="pushImg($event,1)" accept="image/jpeg,image/png,image/gif"> -->
                </div>
                <div class="block" style="display:flex;">
                    <div class="demonstration">营业执照</div>
                    <div style="margin-left:66px;">
                       <i class="iconfont icon-yitongguo" style="font-size:16px;margin-right:10px;"></i><i style="color:#333333;font-size:14px;font-style:normal;">{{checkresult}}</i>
                    </div>
                </div>
               
            </div>
            <el-row>
                <div style="display:flex;">
                     <div style="color:#B1B8C3;margin-right:32px;margin-top:6px;width:232px;">公司简介</div>
                     <P style="background:white;color:#333333; font-size:14px;font-family:PingFang-SC-Medium;">{{Introduction}}</P>
                </div> 
            </el-row>
             <div class="anbtn">
                <div style="width:90px;height:34px;background:#7AA5C9;margin-top:45px;
                    border-radius:2px;color: rgba(255,255,255,1);font-size:14px;font-family:PingFang-SC-Bold;
                    font-weight:bold;line-height:34px;cursor: pointer;" @click="amend">
                    修改
                </div>
            </div>
        </div>
<!-- --------------------------------------------------------------- -->
 </div>
</template>

<script>
import { constants } from 'zlib';
    export default {
        name: "personal",
        data() {
            return {
                companyName:'',
                componyTel:'',
                bossTel:'',
                bossName:'',
                address:'',
                Introduction:'',
                grxs:'公司信息',
                Email: '',
                Fax:'',
                value: '',
                businessLicense:require('../../../assets/img/sczp.png'),
                componyLogo:require('../../../assets/img/sczp.png'),
                logophone:'',
                licensePhone:'',
                avatar:'',//头像
                grxa:true,   
                showDataBool:false, //数据是否展示
                checkresult:''//审核的结果
            }
        },
        methods:{
            // num =1为logo 2为执照
            pushImg(event,num){
                this.file=event.target.files[0];
                let data=new FormData();
                data.append('file',this.file)
                this.changePhotomo("upload/images/supplier ",data,(response) => {
                    if(num == 1){
                        //这里是logo
                        this.logophone = response.data.fileLibId;
                        this.componyLogo = this.GLOBAL.bastusemo+ "view-image/"+response.data.fileLibId;
                    }else if(num == 2){
                        //这里是医生执照
                         this.licensePhone = response.data.fileLibId;
                         this.businessLicense = this.GLOBAL.bastusemo+ "view-image/"+response.data.fileLibId;
                    }
                },(error) => {
                    console.log(error)
                });
            },
            amend(){
                this.grxa = false;
                this.showDataBool=true;
            },
            Save(){
                const h = this.$createElement;
                if(this.companyName==undefined||this.companyName==''){
                    this.$notify({
                        title: '',
                        message: h('i', { style: 'color: red'}, '请输入公司名称')
                    });
                }else if(this.componyTel==undefined||this.componyTel==''){
                    this.$notify({
                        title: '',
                        message: h('i', { style: 'color: red'}, '请输入公司联系电话')
                    });
                }else if(this.licensePhone==''||this.licensePhone==undefined){
                    this.$notify({
                        title: '',
                        message: h('i', {style: 'color: red'}, '请上传营业执照')
                    });
                }else if(this.logophone==''||this.logophone==undefined){
                    this.$notify({
                    title: '',
                    message: h('i', { style: 'color: red'}, '请上传公司LOGO')
                    });
                }else {
                    this.grxa = true;
                    this.showDataBool=false;
                    this.changeDatamo("POST","supplier/update",{
                        adminid:this.GLOBAL.doctcenter.adminid,
                        companyname:this.companyName,
                        fixedtelephone:this.componyTel,
                        name:this.bossName,
                        telephone:this.bossTel,
                        address:this.address,
                        email:this.Email,
                        companyfaxnumber:this.Fax,
                        introduce:this.Introduction,
                        enterpriseLogo:this.logophone,
                        license:this.licensePhone,
                    },(response) =>{
                        this.$notify({
                            title: '成功',
                            message: '保存成功',
                            type: 'success'
                        });
                        // // 保存完之后要显示出来
                        this.ShowPersonInformation()
                    },(error) =>{
                        console.log(error);
                    });
                }
            },
            cancel(){
                // 修改按钮显示
                this.grxa = true;
                // 数据展示
                this.showDataBool=false;
            },
            ShowPersonInformation(){
                // 获取公司信息渲染到页面
                 this.changeDatamo("GET", "supplier/getSupplier", {},(response)=>{
                     this.GLOBAL.supplier = response;//供应商的id
                     this.companyName=response.companyname;//公司名称
                     this.GLOBAL.companyName=response.companyname;//公司名称(全局)
                     this.componyTel=response.fixedtelephone;
                     this.bossTel=response.telephone;
                     this.bossName=response.name;//供应商姓名
                     this.GLOBAL.supplierName=response.name;//供应商姓名（全局）
                     this.address=response.address;
                     this.Introduction=response.introduce;
                     this.Email=response.email;
                     this.Fax=response.companyfaxnumber;
                     this.businessLicense= this.GLOBAL.bastusemo+ "view-image/"+response.license;
                     this.componyLogo=this.GLOBAL.bastusemo+ "view-image/"+response.enterpriseLogo;
                     this.GLOBAL.avatar=this.GLOBAL.bastusemo+ "view-image/"+response.enterpriseLogo;
                     this.logophone=response.enterpriseLogo;
                     this.licensePhone=response.license
                    //  营业执照的审核结果展示
                     var checkdata=response.auditStatus
                     console.log(checkdata)
                     if(checkdata=='PS'){
                         this.checkresult='待审核'
                     }else if(checkdata=='AP'){
                        this.checkresult='已通过'
                     }else if(checkdata=='NP'){
                        this.checkresult='未通过'
                     }else{
                         this.checkresult=''
                     }
                 }) 
            }
        },
        created(){
            // 这个就是要展示的信息
            this.ShowPersonInformation()
        },
    }
</script>
<style>
    .box-center .el-input.is-disabled .el-input__inner{
        color: #606266;
    }

    .box-center .el-input.is-disabled .el-input__inner{
        background-color: #fff;
    }
    .box-center p{
        color:#B1B8C3;
    }
    .box-center p span{
        color:#86B0D4;
    }
</style>

<style scoped>
    .box{
        padding:0px;
    }
    .box-top{
        font-size:18px;
        font-family:PingFang-SC-Medium;
        font-weight:bold;
        color:rgba(20,17,45,1);
        margin-bottom: 10px;
    }
    .box-center{
        /* border-bottom: 1px solid rgba(216,223,227,1); */
        opacity:0.75;
        margin-bottom: 20px;
    }
    .showdata{
        color: #333333;
        font-size: 14px;
    }
    .show .el-row .el-col {
        display: flex;
    }
     .show .el-row .el-col p{
        margin-right: 20px;
    }
    /* .box-center .show .el-row {
        margin-bottom: 20px !important;
    } */
    .el-col {
        border-radius: 4px;
    }
    .el-select{
        width: 100%;
    }
    .box-mid{
        display: flex;
        margin-bottom: 20px;
    }
    .block{
        margin-right: 40px;
        position: relative;
    }
    .demonstration{
        text-align: center;
        font-size:12px;
        font-family:PingFang-SC-Medium;
        font-weight:bold;
        color:rgba(20,17,45,1);
        margin-bottom: 12px;
        margin-right: 10px;
        width:60px;
    }
    .el-image{
        width:110px;
        height:110px;
    }
    .box-bot{
        display: flex;
        margin-bottom: 20px;
    }
    .sfz{
        text-align: left;
        font-size:18px;
        font-family:PingFang-SC-Medium;
        font-weight:bold;
        color:rgba(20,17,45,1);
        margin-bottom: 12px;
    }
    .block .el-image{
        width:110px;
        height:110px;
        margin-right: 20px;
    }
    .anbtn{
        display: flex;
        margin: 0 12px 0px 12px;
        flex-direction:row-reverse;
        text-align: center;
    }
    .block .componyLogo{
        position: absolute;
        top: 0px;
        left:55px;
        width: 110px;
        height: 110px;
        opacity: 0;
        cursor: pointer;
        z-index: 10;
    }
     .block .IdcardFront{
        position: absolute;
        top: 35px;
        width: 110px;
        height: 110px;
        opacity: 0;
        cursor: pointer;
        z-index: 5;
    }
    .block .IdcardReverse{
        position: absolute;
        top: 35px;
        width: 110px;
        height: 110px;
        opacity: 0;
        cursor: pointer;
        z-index: 5;
    }
    .icon-yitongguo{
        color: #86B0D4;
    }
</style>