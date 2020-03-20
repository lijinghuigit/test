<template>
   <div class="box" style="text-align:left;">
        <div class="box-top">
            <div>
                <span>材料备案</span>
            </div>
        </div>

        <div class="box-center">
            <el-row :gutter="20">
                <el-col :span="12">
                    <div style="display:flex;">   
                        <p style="margin-right:10px;width:100px;"><span>*</span>备案证件类别:</p>
                        <p v-if="amendBoolean">{{showdata}}</p>
                        <select v-else v-model="SelectInput" @change="getvalue" style="border:1px solid #E3E7E8;border-radius:4px;;width:136px;height:36px;" :disabled="grxa"> 
                            <option value="" style="display:none;" checked>请选择备案类别</option>
                            <option value="1" style="">一类</option>
                            <option value="2" style="">二类</option>
                            <option value="3" style="">三类</option>
                        </select>
                    </div>    
                </el-col>       
            </el-row>
        </div>

        <div class="box-mid">
            <div class="block" style="display:flex;">
                <div class="demonstration" style="width:100px;"><span style="color:#86B0D4;">*</span>材料备案证件：</div>
                <div style="display:flex;flex-wrap:wrap">
                    <div style="border: 1px solid #E3E7E8;width:160px;height:110px;text-align:center;margin-right:15px;">
                        <i class="iconfont icon-xiangji" style="color:#ECECEC;font-size:48px;line-height:110px;"></i>
                        <input class="componyLogo" type="file" v-if="!grxa" @change="pushImg($event,1)" accept="image/jpeg,image/png,image/gif" multiple="multiple">
                    </div>
                    <div v-for="(item,index) in id" :key="index" style="position:relative;word-wrap:break-word;">
                        <!-- <el-image :src="'http://192.168.31.141:8081/medical-treatment-supplier/view-image/'+id[index]" ></el-image><span @click="del(index)"><i v-show="delboolean" class="el-icon-delete" style="color:rgb(128, 179, 222);position:absolute;top:84px;right:90px;font-size:20px;cursor:pointer;"></i></span> -->
                         <el-image :src="'http://supplier.shoyii.com/view-image/'+id[index]" ></el-image><span @click="del(index)"><i v-show="delboolean" class="el-icon-delete" style="color:rgb(128, 179, 222);position:absolute;top:84px;right:90px;font-size:20px;cursor:pointer;"></i></span>
                    </div>
                </div>
            </div>
             <div style="border:1px solid #E3E7E8;width:160px;height:110px;text-align:center;margin-left:100px;margin-top:10px;position:relative;" :class="{inputClass:bool==0}">
                <i class="iconfont icon-gongyingshang-renwuliebiao" style="color:#ECECEC;font-size:48px;line-height:110px;" :class="{iconClass:bool==0}"></i>
                <span style="color:#999999;position:absolute;left:55px; top:78px;" :class="{iconClass:bool==0}">上传文件</span>
                <input class="inputFile" type="file" v-if="!grxa" @change="pushImg($event,2)" accept="image/*">
            </div>
        </div>
        <!-- 审核的展示 -->
        <div v-if="amendAudit">
            <span style="color:#333333;font-size:12px;">审核备案状态：</span>
            <span v-if="Noaudit" style="color:#F05656;font-size:12px;cursor:pointer;text-decoration:underline;" @click="reAudit()"><i class="iconfont icon-weitongguo" style="margin-right:8px;"></i>审核没通过,去重新上传</span>
            <span v-if="AgreeAudit" style="color:#7AA5C9;font-size:12px;"><i class="iconfont icon-yitongguo" style="margin-right:8px;"></i>审核通过</span>
            <span v-if="awaitAudit" style="color:#7AA5C9;font-size:12px;"><i class="iconfont icon-shenhezhong" style="margin-right:8px;"></i>待审核</span>
        </div>
          
        <div v-if="grxa" class="anbtn">
            <div style="width:90px;height:34px;background:#7AA5C9;
                border-radius:2px;color: rgba(255,255,255,1);font-size:14px;font-family:PingFang-SC-Bold;
                font-weight:bold;line-height:34px;cursor: pointer;" @click="amend">
                修改
            </div>
        </div>
        <div v-else class="anbtn">
            <div style="width:90px;height:34px;background:#7AA5C9;
                border-radius:2px;color: #FEFEFE;font-size:14px;font-family:PingFang-SC-Bold;
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
</template>
<script>
export default {
    components:{

    },
    data(){
        return{
            SelectInput:'',
            grxa:true,//修改按钮
            Noaudit:false,//审核不通过不出现
            AgreeAudit:false,//默认不出现
            awaitAudit:false,
            recordImage:require('../../../assets/img/sczp.png'),
            recordImageId:'',
            id:[],
            delboolean:false,
            bool:1,
            documentid:'',
            amendBoolean:true,//默认的页面显示方式
            showdata:'',
            amendAudit:true,
        }
    },
    methods:{
        // 上传执照
        pushImg(event,num){
            this.file=event.target.files[0];
            let data=new FormData();
            data.append('file',this.file)
            if(num==1){
                this.changePhotomo("upload/images/filingDocuments",data,(response) => {
                    //这里是logo
                    this.recordImageId = response.data.fileLibId;
                    this.id.push(response.data.fileLibId);  
                },(error) => {
                    console.log(error)
                });
            }else if(num==2){
                this.changePhotomo("upload/filingDocuments",data,(response) => {
                this.bool=0
                 // 文件id
                this.documentid =response.data.fileLibId;
                console.log('上传成功') 
              },(error) => {
                 console.log(error)
              });
            }
            
        },
        del(i) {  // 根据下标删除
            this.id.splice(i, 1)
            console.log(this.id)
        },
        getvalue(){
            // 选中的类别
            console.log(this.SelectInput)
        },
        amend(){
             this.grxa = false;
             this.delboolean=true;
             this.amendBoolean=false;
             this.amendAudit=false;
        },
        cancel(){
             this.grxa = true;
             this.delboolean=false;
             this.amendBoolean=true;
             this.amendAudit=true;
        },
        Save(){
            this.grxa = true;
            this.delboolean=false;
            // this.delboolean=false;
            if (this.SelectInput=='') {
                this.$message({
                    message: '请选择备案证件类别',
                    type: 'warning'
                });
            }else if (this.recordImageId==''||this.recordImageId==undefined) {
                 this.$message({
                    message: '请上传备案照片',
                    type: 'warning'
                });
            }else{
                // 通过接口判断过来的状态，决定是否显示通过或者不通过提示，如果没有上传 ，则两者都不需要出现
                 this.changeDatamo("POST","supplier/update",{
                    adminid:this.GLOBAL.doctcenter.adminid,
                    categoryId:this.SelectInput,
                    filingDocumentsPicture:this.id.toString().toString(),
                    filingDocuments:this.documentid,
                 },(response)=>{
                     console.log(response)
                     if (response.code==1) {
                         this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                     }else{
                        this.$message({
                            message: '提交失败',
                            type: 'warning'
                        });
                     }
                 })
            }
        },
        reAudit(){
            // 重新审核，可以修改
            this.grxa=false
            // 点击重新上传之后，通过与不通过提示都消失不见
            this.Noaudit=false
            this.AgreeAudit=false
            this.awaitAudit=false
        },
        showAuditData(){
                this.changeDatamo("GET", "supplier/getSupplier", {},(response)=>{ 
                    console.log(response)
                    // console.log(response)
                this.SelectInput=response.categoryId
                if(response.categoryId==1){
                    this.showdata="一级"
                }else if(response.categoryId==2){
                     this.showdata="二级"
                }else if(response.categoryId==3){
                     this.showdata="三级"
                }
                // localStorage.setItem("categoryMaterial",response.categoryId);  //备案的类别
                this.GLOBAL.ID=response.categoryId
                this.recordImageId=response.filingDocumentsPicture 
                // 文件id
                if(response.filingDocuments!=''||response.filingDocuments!=null||response.filingDocuments!=undefined){
                    this.bool=0
                }else{
                    this.bool=1
                }
                this.documentid=response.filingDocuments
                // 转化成数组
                this.id=response.filingDocumentsPicture.split(',')
                this.filingStatus=response.filingStatus//审核状态
                //  2未通过；1已通过；0待审核
                 if (this.filingStatus=='2') {
                      this.Noaudit=true
                 }else if (this.filingStatus=='1') {
                      this.AgreeAudit=true
                 }else if(this.filingStatus=='0'){
                      this.awaitAudit=true
                 }else{
                     this.awaitAudit=''
                 }
             })
        }
    },
    created(){
        this.showAuditData();
    }
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
        color:#55555D;
    }
    .box-center p span{
        color:#86B0D4;
    }
    select:focus { outline: none; }
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
        opacity:0.75;
        margin-bottom: 20px 0px;
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
    .box-mid{
        /* display: flex; */
        margin-bottom: 20px;
    }
    .block{
        margin-right: 40px;
        position: relative;
    }
    .demonstration{
        /* text-align: center; */
        font-size:12px;
        font-weight:bold;
        color:#55555D;
        margin-bottom: 12px;
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
        width:160px;
        height:110px;
        margin-right: 20px;
    }
    .anbtn{
        display: flex;
        margin: 100px 12px 0px 12px;
        flex-direction:row-reverse;
        text-align: center;
    }
    .block .componyLogo{
        position: absolute;
        top: 0px;
        left:100px;
        width: 160px;
        height: 110px;
        opacity: 0;
        cursor: pointer;
        z-index: 10;
       
    }
    .inputFile{
        position: absolute;
        top: 0px;
        left:0px;
        width: 160px;
        height: 110px;
        opacity: 0;
        cursor: pointer;
        z-index: 10;
    }
     .block .IdcardFront{
        position: absolute;
        top: 35px;
        width: 160px;
        height: 110px;
        opacity: 0;
        cursor: pointer;
        z-index: 5;
    }
    .block .IdcardReverse{
        position: absolute;
        top: 35px;
        width: 160px;
        height: 110px;
        opacity: 0;
        cursor: pointer;
        z-index: 5;
    }
    .iconClass{
        color: #86B0D4 !important;
    }
    .inputClass{
        border: 1px solid #86B0D4 !important;
    }
</style>