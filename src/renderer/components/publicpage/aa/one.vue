<template>
    <div class="center">
        <div class="photo" v-if="zsng">
            <div class="block">
                <el-carousel trigger="click" height="200px">
                    <el-carousel-item v-for="(item,index) in stlbj">
                        <div :style=item>
                            <viewer>
                                <img style="opacity:0;height: 200px" :src=stlpo[index] alt="">
                            </viewer>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>

        <div v-if="!zsng">
            <!--stl-->
            <div class="center-d">
                <div class="center-nav-cc">
                    上传诊断文件
                </div>
                <div style="width: calc(100% - 40px);margin: 0 20px 0 20px">
                    <div style="margin-bottom: -20px" v-if="!botrue">
                        <el-tag v-show="uploadLogo=='1'" >上传中</el-tag>
                        <el-tag v-show="uploadLogo=='2'">上传成功</el-tag>
                        <el-tag v-show="uploadLogo=='3'">上传失败</el-tag>
                        <el-button slot="trigger" size="small" type="primary" @click="tonnn">重新上传</el-button>
                    </div>

                    <el-upload ref="upload" :action=stlrouurl :auto-upload="false"  :http-request="uploadFile" accept=".zip,.rar,.stl"
                               :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSucess" :file-list="fileList" >
                        <el-button slot="trigger" size="small" type="primary" v-if="botrue">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload" v-if="botrue">开始上传</el-button>
                    </el-upload>

                </div>
            </div>
            <div class="center-d">
                <div class="center-nav-cc">
                    上传CT/STL预览图
                </div>
                <div style="width: calc(100% - 40px);margin: 0 20px 0 20px">
                    <el-upload
                            :action = rouurl
                            :on-success="handleAvatarSuccessstl"
                            accept=".jpg,.jpeg,.psd,.png,.swf"
                            :limit="9"
                            :headers = "headers"
                            :on-exceed="handleExceed"
                            :file-list="fileStl"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
                <!---->
            </div>

            <div class="center-d">
                <div class="center-nav-cc">
                    上传诊断图片
                </div>
                <div style="width: calc(100% - 40px);margin: 0 20px 0 20px">
                    <el-upload
                            :action = rouurl
                            :on-success="handleAvatarSuccess"
                            accept=".jpg,.jpeg,.psd,.png,.swf"
                            :limit="9"
                            :headers = "headers"
                            :file-list="filePic"
                            :on-exceed="handleExceed"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
            </div>
        </div>

        <div class="mid">
            <div style="margin-top: 5px">
                <span style="color:rgba(189,196,203,1);">病因 :</span><span style="color:rgba(102,102,102,1);">{{biny}}</span>
            </div>
            <div style="margin-bottom: 5px">
                <span style="color:rgba(189,196,203,1);">病人姓名 :</span><span style="color:rgba(102,102,102,1);">{{name}}</span>
                <span class="line">|</span>
                <span style="color:rgba(189,196,203,1);">创建时间 :</span><span style="color:rgba(102,102,102,1);">{{createTime}}</span>
            </div>
        </div>
        <div class="center-d" style="padding-bottom: 90px;" >
            <div v-if="zsng">
                <div class="center-nav-cc" v-if="zdtbool" >
                    疾病诊断图
                </div>
                <div class="demo-image__preview" style="margin-left: 16px;margin-right: 16px;margin-bottom: 20px">
                    <viewer>
                        <img v-for="item in pic" :src=item style="width: 80px; height: 80px;margin-left: 10px;margin-right: 10px;">
                    </viewer>
                </div>
            </div>

            <!--十二项循环这个-->
            <div v-for="(item,index) in twosh" v-if="item !== ''">
                <div class="center-nav-cc">
                    {{natwosh[index]}}
                </div>
                <div class="center-center-nav" v-html="item">
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "one",
        props: {
            value: {
                type: String
            },
            /*上传图片的地址*/
            uploadUrl: {
                type: String,
                default: "upload/images/partner"
            },
            /*上传图片的file控件name*/
            fileName: {
                type: String,
                default: 'file'
            },
            // 大小
            maxUploadSize:{
                type:Number,
                default: 1024 * 1024 * 500
            }
        },
        data(){
            return{
                stlbj:[],   //stl图对应的style
                stlpo:[],   //stl图片数据
                pic:[],     //疾病诊断图数据
                zdtbool:false,   //是否有疾病诊断图
                url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',  //上传让图片测试默认显示(有真图无需理会);
                name:'待完成',         //病人名称
                zsng:true,            //在医生端时候显示疾病诊断图，影视端时候显示上传图片文件
                biny:'尚未确定',        //病因
                createTime:'',             //创建时间
                twosh:["","","","","","","","","","","",""],    //十二项的类容
                natwosh:["诊断信息","主诉","现病史","既往史",
                    "过敏史","个人史(女性月经史）","体格检查","化验检查",
                    "特殊检查:CT、B超、X光片、PET-CT/病理检查、核磁共振(MR）",
                    "疾病诊断","鉴别诊断","建议治疗方案"],                      //十二项的标题
                uploadLogo:'',   //标记图片是 上传中/上传成功/上传失败  1是上传中 2上传成功 3上传失败
                botrue:true,     //标记是否之前有文件上传过 true为第一次上传，false为当前有文件
                fileList: [],    //上传stl图片文件对象
                fileStl:[],      //上传stl文件对象
                filePic:[],      //上传诊断图对象
                headers: {
                    Token:localStorage.getItem("Token")    //文件上传方法请求头所带的header
                },
                dialogImageUrl: '',     //element-ui插件自带请自行研究,未知。但不能删除
                dialogVisible: false,   //element-ui插件自带请自行研究,未知。但不能删除
                rouurl:this.GLOBAL.bastuseyo+"upload/images/partner",     //图片上传的接口
                stlrouurl:this.GLOBAL.bastuseyo+"addstl",          //stl上传的接口
            }
        },
        methods:{

            //诊断图片的上传
            uploadFile:function(file){
                console.log(file);
                //图片上传append
                this.filestlData.append('file', file.file);
            },

            handlePreview(file) {
                //尚未启用
                //有这个需求新增请查看element-ui插件
                // console.log(file);
            },
            /**/
            handleRemove(file, fileList) {
                //尚未启用
                //有这个需求新增请查看element-ui插件
            },
            handleSucess(res){
                //尚未启用
                //有这个需求新增请查看element-ui插件
            },

            //限制上传个数字
            handleExceed(){
                this.$message.error('诊断图片只能上传九张,请删除后再上传');
            },

            //stl预览图上传
            handleAvatarSuccessstl(res){
                console.log("stl预览图上传成功");
                this.allstlfileid.push(res.fileLibId);
            },

            //stl上传
            handleAvatarSuccess(res){
                this.allfileid.push(res.fileLibId);
            },


            //插件可从element-ui插件查询可知道
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            //上传stl
            submitUpload: function () {

                //插件复制
                this.filestlData = new FormData();
                //上传
                this.$refs.upload.submit();

                this.filestlData.append('subdirectory','STL1');
                var that = this;
                //修改按钮状态
                that.uploadLogo = "1";
                console.log("开始上传stl");
                this.changePhotoyo("addstl",this.filestlData,(response) =>{
                    //修改按钮状态
                    that.uploadLogo = "2";
                    //返回的stl文件
                    this.allstlwjfileid = response.data;
                    // console.log(response.data);
                    //修改是否有文件展示
                    this.botrue = false;
                    //清空按钮上的file
                    this.filestlData = [];
                },(error) =>{
                    //上传失败修改状态
                    console.log(error);
                    that.uploadLogo = "3";
                })
            },

            tonnn(){
                this.botrue = true;
                this.filestlData = [];
                this.fileList = [];
            },

            //上传类容
            toupsll(){
                //该方法在父级里面调用
                //stl文件
                let stl = '';
                //stl图片
                let stlp = '';
                //诊断图
                let zdp = '';

                //图片文件的处理
                for(let i=0;i<this.allstlwjfileid.length; i++){
                    if(this.allstlwjfileid[i]){
                        stl += this.allstlwjfileid[i]+","
                    }
                }
                for(let i=0;i<this.allstlfileid.length; i++){
                    if(this.allstlfileid[i]){
                        stlp += this.allstlfileid[i]+","
                    }
                }
                for(let i=0;i<this.allfileid.length; i++){
                    if(this.allfileid[i]){
                        zdp += this.allfileid[i]+","
                    }
                }
                stl = stl.substring(0, stl.lastIndexOf(','));
                stlp = stlp.substring(0, stlp.lastIndexOf(','));
                zdp = zdp.substring(0, zdp.lastIndexOf(','));

                //上传类容
                this.changeDatayo("POST","caseHistory/updateToPatient",{
                    caseHistoryId:this.$route.query.id,
                    picture:zdp,
                    STL1Picture:stlp,
                    CT:"",//ct的诊断
                    STL1:stl,
                },(response) =>{
                    // console.log(response);
                    //成功
                    this.$notify({
                        title: '成功',
                        message: '保存成功',
                        type: 'success'
                    });
                    this.login();

                },(error) =>{
                    //失败
                    console.log(error);

                });
            },


            // 调用的详情
            login(){
                //获取详情前判断是医生端还是影视端
                if(this.GLOBAL.logintt == 1){
                    //这是影视端状态修改
                    this.zsng = false;
                    console.log(this.$route.query.id);
                    //获取病例详情
                    this.changeDatayo("GET","caseHistory/details",{
                        caseHistoryId:this.$route.query.id
                    },(response) =>{
                        console.log(response);
                        //诊断时间
                        this.createTime = response.caseHistory.createTime;
                        //名称
                        this.name = response.caseHistory.name;
                        //病因 biny 通知 应用市场 设置

                        //十二项渲染  explain1
                        if(response.caseHistory.explain1){
                            this.twosh.splice(0,1,response.caseHistory.explain1)
                        }
                        if(response.caseHistory.explain2){
                            this.twosh.splice(1,1,response.caseHistory.explain2)
                        }
                        if(response.caseHistory.explain3){
                            this.twosh.splice(2,1,response.caseHistory.explain3)
                        }
                        if(response.caseHistory.explain4){
                            this.twosh.splice(3,1,response.caseHistory.explain4)
                        }
                        if(response.caseHistory.explain5){
                            this.twosh.splice(4,1,response.caseHistory.explain5)
                        }
                        if(response.caseHistory.explain6){
                            this.twosh.splice(5,1,response.caseHistory.explain6)
                        }
                        if(response.caseHistory.explain7){
                            this.twosh.splice(6,1,response.caseHistory.explain7)
                        }
                        if(response.caseHistory.explain8){
                            this.twosh.splice(7,1,response.caseHistory.explain8)
                        }
                        if(response.caseHistory.explain9){
                            this.twosh.splice(8,1,response.caseHistory.explain9)
                        }
                        if(response.caseHistory.explain10){
                            this.twosh.splice(9,1,response.caseHistory.explain10)
                        }
                        if(response.caseHistory.explain11){
                            this.twosh.splice(10,1,response.caseHistory.explain11)
                        }
                        if(response.caseHistory.explain12){
                            this.twosh.splice(11,1,response.caseHistory.explain12)
                        }

                        //stl文件
                        if(response.caseHistory.sTL1){
                            this.botrue = false;
                            this.uploadLogo = "2";
                            let flist=response.caseHistory.sTL1.split(",");
                            this.fileList = flist.map((value, i) => {
                                return {
                                    name: value,
                                    num:i,
                                    tt:"stl"
                                }
                            });
                            console.log("stl文件");
                            this.allstlwjfileid = flist;
                            console.log(flist)
                        }

                        //stl预览图
                        if(response.caseHistory.sTL1Picture){
                            let filst = response.caseHistory.sTL1Picture.split(",");
                            let filsts = [];
                            for(let i=0;i<filst.length;i++){
                                filsts.push(this.GLOBAL.bastuseyo+"view-image/"+filst[i])
                            }
                            this.allstlfileid = filst;
                            this.fileStl = filsts.map((value, i) => {
                                return {
                                    url: value,
                                    num:i,
                                    tt:"stlp"
                                }
                            });
                        }else{
                            console.log("无手术预览图")
                        }

                        //诊断图
                        if(response.caseHistory.picture){
                            let filstpic = response.caseHistory.picture.split(",");
                            let filstspic = [];
                            for(let j=0;j<filstpic.length;j++){
                                filstspic.push(this.GLOBAL.bastuseyo+"view-image/"+filstpic[j])
                            }
                            // console.log("诊断图");
                            // console.log(filstpic);
                            this.allfileid = filstpic;
                            this.filePic = filstspic.map((value, i) => {
                                return {
                                    url: value,
                                    num:i,
                                    tt:"zdt"
                                }
                            });
                        }else{
                            console.log("无就诊病例");
                        }

                    },(error) =>{
                        console.log(error);

                    });
                }else{
                    this.zsng = true;
                    this.changeDatado("GET","caseHistory/details",{
                        caseHistoryId:this.$route.query.id
                    },(response) =>{
                        console.log(response);
                        //诊断时间
                        this.createTime = response.caseHistory.createTime;
                        //名称
                        this.name = response.caseHistory.name;
                        //病因 biny 通知 应用市场 设置

                        //十二项渲染  explain1
                        if(response.caseHistory.explain1){
                            this.twosh.splice(0,1,response.caseHistory.explain1)
                        }
                        if(response.caseHistory.explain2){
                            this.twosh.splice(1,1,response.caseHistory.explain2)
                        }
                        if(response.caseHistory.explain3){
                            this.twosh.splice(2,1,response.caseHistory.explain3)
                        }
                        if(response.caseHistory.explain4){
                            this.twosh.splice(3,1,response.caseHistory.explain4)
                        }
                        if(response.caseHistory.explain5){
                            this.twosh.splice(4,1,response.caseHistory.explain5)
                        }
                        if(response.caseHistory.explain6){
                            this.twosh.splice(5,1,response.caseHistory.explain6)
                        }
                        if(response.caseHistory.explain7){
                            this.twosh.splice(6,1,response.caseHistory.explain7)
                        }
                        if(response.caseHistory.explain8){
                            this.twosh.splice(7,1,response.caseHistory.explain8)
                        }
                        if(response.caseHistory.explain9){
                            this.twosh.splice(8,1,response.caseHistory.explain9)
                        }
                        if(response.caseHistory.explain10){
                            this.twosh.splice(9,1,response.caseHistory.explain10)
                        }
                        if(response.caseHistory.explain11){
                            this.twosh.splice(10,1,response.caseHistory.explain11)
                        }
                        if(response.caseHistory.explain12){
                            this.twosh.splice(11,1,response.caseHistory.explain12)
                        }

                        //预览图渲染  sTL1Picture
                        let stlp=response.caseHistory.sTL1Picture.split(",");
                        for(var i=0;i<stlp.length;i++){
                            this.stlpo.push(this.GLOBAL.bastuse+"view-image/"+stlp[i]);
                            this.stlbj.push({backgroundImage: "url(" + this.GLOBAL.bastuse+"view-image/"+stlp[i] + ")",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover"})
                        }
                        //诊断图渲染  picture
                        if(response.caseHistory.picture){
                            this.zdtbool = true;
                            let picp=response.caseHistory.picture.split(",");
                            for(var i=0;i<picp.length;i++){
                                this.pic.push(this.GLOBAL.bastuse+"view-image/"+picp[i]);
                            }
                            console.log(this.pic)
                        }else{
                            this.zdtbool = false;
                        }
                    },(error) =>{
                        console.log(error);

                    });
                }

            }
        },
        created(){
            this.login();
        }
    }
</script>

<style>

</style>

<style scoped>
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .center{
        width: calc(100% - 510px);
        background-color: #fff;
        border-radius:0px 0px 2px 2px;
        position: fixed;
        height: 650px;
        overflow: scroll;
        margin-top: 115px;
        box-shadow:0px 0px 5px 0px rgba(18,49,137,0.09);
    }
    .photo{
        width: 100%;
        height: 196px;
    }
    .photo img{
        width: 100%;
        height: 100%;
    }
    .mid{
        width: 100%;
        border-bottom: 1px solid rgba(239,239,239,1);
        text-align: left;
    }
    .mid span{
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        line-height:35px;
        margin-left: 20px;
        letter-spacing: 1px;
    }
    .line{
        width:2px;
        height:14px;
        font-size:18px!important;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(153,153,153,1);
        letter-spacing: 1px;
        line-height:21px;
        margin: 0 18px 0 32px!important;
        text-align: center;
    }
    .center-d{
        text-align: left;
    }
    .center-nav-cc{
        font-size:14px;
        letter-spacing: 1px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(102,102,102,1);
        line-height:40px;
        margin-left: 20px;
    }
    .img-smal{
        background-color: #ccc;
        width: 80px;
        height: 80px;
        margin-right: 16px;
    }
    .img-smal img{
        width: 100%;
        height: 100%;
    }
    .center-center-nav{
        /*max-width: 720px;*/
        /*width: 100%;*/

        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        letter-spacing: 1px;
        color:rgba(102,102,102,1);
        line-height:40px;
        margin: 5px 20px 35px 20px;

    }
</style>