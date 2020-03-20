<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 13:33:57
 * @LastEditTime: 2019-09-18 16:36:23
 * @LastEditors: Please set LastEditors
 -->


<template>
    <div class="box" style="text-align:left;margin-top: 22px">
        <div class="box-top">
            <div >公司信息</div>
        </div>
        <div class="box-center">
            <el-row :gutter="20">
                <el-col :span="12"><el-input :disabled="grxa" v-model="inputone" placeholder="公司名称（必填）" ref="CompanyName"></el-input></el-col>
                <el-col :span="12"><el-input :disabled="grxa" v-model="inputtwo" placeholder="负责人姓名" ref="Principal"></el-input></el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12"><el-input :disabled="grxa" v-model="inputthree" placeholder="联系电话" ref="ContactTel"></el-input></el-col>
                <el-col :span="12"><el-input :disabled="grxa" v-model="inputfour" placeholder="公司电话"></el-input></el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12"><el-input :disabled="grxa" v-model="inputfive" placeholder="邮箱"></el-input></el-col>
                <el-col :span="12"><el-input :disabled="grxa" v-model="inputsix" placeholder="公司传真号码"></el-input></el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24"><el-input :disabled="grxa" v-model="inputseven" placeholder="公司地址"></el-input></el-col>
            </el-row>
        </div>
        <div class="box-mid">
            <div class="block">
                <div class="demonstration">企业LOGO</div>
                <el-image :src="myphoto">
                </el-image>
                <input class="one" type="file" v-if="!grxa" @change="pushImg($event,1)" accept="image/jpeg,image/png,image/gif">
            </div>
            <div class="block">
                <div class="sfz">营业执照图片</div>
                <div class="sfz-img">
                    <el-image :src="doctphoto"></el-image>
                </div>
                <input class="two" ref="BusinessLicense" v-if="!grxa" type="file" @change="pushImg($event,2)" accept="image/jpeg,image/png,image/gif">
            </div>
        </div>

        <div>
            <div v-if="grxa" class="anbtn">
                <div style="width:90px;height:34px;background:rgba(80,221,160,1);
                border-radius:2px;color: rgba(255,255,255,1);font-size:14px;font-family:PingFang-SC-Bold;
                font-weight:bold;line-height:34px;cursor: pointer;" @click="xiugai">修改</div>
            </div>
            <div v-else class="anbtn">
                <div style="width:90px;height:34px;background:rgba(80,221,160,1);
                border-radius:2px;color: rgba(255,255,255,1);font-size:14px;font-family:PingFang-SC-Bold;
                font-weight:bold;line-height:34px;cursor: pointer;" @click="baocund">保存</div>
                <div style="width:90px;height:34px;background:rgba(255,255,255,1);
            border:1px solid rgba(178,245,214,1);border-radius:2px;font-size:14px;
            font-family:PingFang-SC-Bold;font-weight:bold;color:rgba(73,213,152,1);
            line-height:34px;margin-right: 24px;cursor: pointer;" @click="quxiaod">取消</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tonsonal",
        data() {
            return {
                options: [{
                    value: '选项1',
                    label: '男'
                }, {
                    value: '选项2',
                    label: '女'
                }],
                value: '',
                myphoto:require('../../../assets/img/sczp.png'),
                doctphoto:require('../../../assets/img/sczp.png'),
                inputone:'',
                inputtwo :'',
                inputthree:'',
                inputfour:'',
                inputfive:'',
                inputsix :'',
                inputseven:'',
                logopho:'',
                biecetu:'',
                grxa:true,

            }
        },
        methods: {
            pushImg(event,num){
                this.file = event.target.files[0]; //获取input的图片file值
                let data = new FormData(); // 创建form对象
                data.append('file', this.file);//对应后台接收图片名  upload/images/{subdirectory}
                console.log(this.file);//这个为file对象；（里面包含了文件的名字，路径，类型，编号等）
                this.changePhotomo("upload/images/supplier",data,(response) => {
                    if(num == 1){
                        //这里是logo
                        this.logopho = response.data.fileLibId;
                        this.myphoto = this.GLOBAL.bastusemo+ "view-image/"+response.data.fileLibId;
                    }else{
                        //这里是营业执照
                        this.biecetu = response.data.fileLibId;
                        this.doctphoto = this.GLOBAL.bastusemo+ "view-image/"+response.data.fileLibId;
                    }
                },(error) => {
                    console.log(error)
                });
            },
            motumm(){
                //获取公司信息
                this.changeDatamo("GET", "supplier/getSupplier", {    //这里是获取的公司信息
                }, (response) => {
                    this.GLOBAL.doctcenter = response;
                    if(response.companyname){
                        this.grxa = true;
                        this.inputone = response.companyname;
                        this.inputtwo = response.name;
                        this.inputthree = response.telephone;
                        this.inputfour = response.fixedtelephone;
                        this.inputfive = response.email;
                        this.inputsix = response.companyfaxnumber;
                        this.inputseven = response.address;
                        this.logopho = response.enterpriseLogo;
                        this.myphoto = this.GLOBAL.bastusemo+ "view-image/"+response.enterpriseLogo;
                        this.biecetu = response.license;
                        this.doctphoto = this.GLOBAL.bastusemo+ "view-image/"+response.license;
                    }else{
                        this.grxa = false
                    }
                }, (error) => {
                    console.log(error)
                });
            },
            xiugai(){
                this.grxa = false
            },
            baocund(){
                this.grxa = true;
                this.motumm();
                // supplier/update    修改供应商
                /*
                *
                * introduce  简介
                * details    详情
                * enterpriseLogo  企业
                *
                * */
               /*
                * @Author: LiJingHui 
                * @Date: 2019-09-10 15:12:15 
                * @Last Modified by:   LiJingHui 
                * @Last Modified time: 2019-09-10 15:12:15 
                */
                // 公司信息的输入页面
                if(this.$refs.CompanyName.value==""){
                      alert("请输入公司名称")
                }
                else if(this.$refs.Principal.value==""){
                     alert("请输入负责人姓名")
                }else if(this.$refs.ContactTel.value==""){
                     alert("请输入联系电话")
                }
                else if(this.doctphoto==""){
                    alert("请上传营业执照")
                }
                else{
                   this.changeDatamo("POST", "supplier/update", {   
                        adminid:this.GLOBAL.doctcenter.adminid,
                        name:this.inputtwo,
                        telephone:this.inputthree,
                        address:this.inputseven,
                        email:this.inputfive,
                        companyfaxnumber:this.inputsix,
                        fixedtelephone:this.inputfour,
                        companyname:this.inputone,
                        enterpriseLogo:this.logopho,
                        license:this.biecetu,
                    }, (response) => {
                        // console.log("会不会执行这步")
                        // console.log(response)  1
                        this.$notify({
                            title: '成功',
                            message: '修改成功',
                            type: 'success'
                        });
                        this.motumm()
                    }, (error) => {
                        console.log(error)
                    });
                  
                // 头像上传接口
              this.changeDatamo("GET","supplier/getSupplier",{
              },(response) =>{
                  this.GLOBAL.doctcenter = response;
                  this.GLOBAL.name = response.companyname;
                  console.log("保存公司信息之后的logo头像")
                  this.GLOBAL.avatar = this.GLOBAL.bastusemo+ "view-image/" + response.enterpriseLogo;
                  console.log(this.GLOBAL.avatar);
              },(error) =>{
                  console.log(error);
              });
                  /*
                    * @Author: LiJingHui 
                    * @Date: 2019-09-10 15:14:30 
                    * @Last Modified by:   LiJingHui 
                    * @Last Modified time: 2019-09-10 15:14:30 
                    */
                //公司信息保存完后，跳转到材料页面，因为实在没其他页面跳了，只能跳到这个页面了
                 this.$router.push('./material')
                }

                /*
                * @Author: LiJingHui 
                * @Date: 2019-09-10 15:16:08 
                * @Last Modified by:   LiJingHui 
                * @Last Modified time: 2019-09-10 15:16:08 
                */

                     // 以下所注释的为上一个人所写

                // if(this.$refs.menuItem.value!=""){
                //     this.changeDatamo("POST", "supplier/update", {    //这里是发送给后台的数据
                //         adminid:this.GLOBAL.doctcenter.adminid,
                //         name:this.inputtwo,
                //         telephone:this.inputthree,
                //         address:this.inputseven,
                //         email:this.inputfive,
                //         companyfaxnumber:this.inputsix,
                //         fixedtelephone:this.inputfour,
                //         companyname:this.inputone,
                //         enterpriseLogo:this.logopho,
                //         license:this.biecetu,
                //     }, (response) => {
                //         console.log(response);
                //         this.$notify({
                //             title: '成功',
                //             message: '修改成功',
                //             type: 'success'
                //         });
                //         this.motumm()
                //     }, (error) => {
                //         console.log(error)
                //     });
                //     alert("保存成功")
                // }
                
                // else{
                //     alert("公司名称或负责人姓名或联系电话或营业执照不能为空")
                //     this.changeDatamo("POST", "supplier/insert", {    //这里是发送给后台的数据
                //         adminid:this.GLOBAL.doctcenter.adminid,
                //         name:this.inputtwo,
                //         telephone:this.inputthree,
                //         address:this.inputseven,
                //         email:this.inputfive,
                //         companyfaxnumber:this.inputsix,
                //         fixedtelephone:this.inputfour,
                //         companyname:this.inputone,
                //         enterpriseLogo:this.logopho,
                //         license:this.biecetu,
                //     }, (response) => {
                //         console.log(response);
                //         this.$notify({
                //             title: '成功',
                //             message: '上传成功',
                //             type: 'success'
                //         });
                //         this.motumm()
                //     }, (error) => {
                //         console.log(error)
                //     });
                // }
                // supplier/insert   添加供应商
            },
            quxiaod(){
                this.grxa = true
            }
        },
        // 这个为点击公司信息时，触发的事件
        created(){
            this.motumm();
        },
    }
</script>

<style>

    .box-center .el-input.is-disabled .el-input__inner{
        background-color: #fff;
    }
</style>

<style scoped>
    .box-top{
        font-size:18px;
        font-family:PingFang-SC-Medium;
        font-weight:bold;
        color:rgba(20,17,45,1);
        margin-bottom: 20px;
    }
    .box-center{
        border-bottom: 1px solid rgba(216,223,227,1);
        opacity:0.75;
        margin-bottom: 20px;
    }
    .el-row {
        margin-bottom: 14px;
    }
    .el-col {
        border-radius: 4px;
    }
    .el-select{
        width: 100%;
    }
    .block{
        margin-right: 40px;
        position: relative;
    }
    .box-bot{

    }

    .sfz{
        text-align: left;
        font-size:18px;
        font-family:PingFang-SC-Medium;
        font-weight:bold;
        color:rgba(20,17,45,1);
        margin-bottom: 12px;
    }

    .sfz-img .el-image{
        width:160px;
        height:110px;
        margin-right: 20px;
    }
    .demonstration{
        text-align: left;
        font-size:18px;
        font-family:PingFang-SC-Medium;
        font-weight:bold;
        color:rgba(20,17,45,1);
        margin-bottom: 12px;
    }
    .box-mid{
        display: flex;
        margin-bottom: 20px;
    }
    .el-image{
        width:110px;
        height:110px;
    }

    .anbtn{
        display: flex;
        margin: 0 12px 60px 12px;
        flex-direction:row-reverse;
        text-align: center;
    }
    .block .one{
        position: absolute;
        top: 35px;
        width: 110px;
        height: 110px;
        opacity: 0;
        cursor: pointer;
        z-index: 5;
    }

    .block .two{
        position: absolute;
        top: 35px;
        width: 160px;
        height: 110px;
        opacity: 0;
        cursor: pointer;
        z-index: 5;
    }





</style>