<template>
    <div class="center">
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
        </div>
        <!--医疗患情-->
        <div class="center-d">
            <div class="center-nav-cc">
                医疗患情
            </div>
            <div style="width: calc(100% - 40px);margin: 0 20px 0px 20px">
                <el-input
                        style="font-family: PingFang-SC-Medium;font-size: 14px;letter-spacing: 1px;"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="hzlqtext">
                </el-input>
            </div>
        </div>
        <!--上传诊断文件  -->
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

        <!--富文本-->
        <div class="center-d">
            <div class="center-nav-cc">
                <el-row :gutter="20" style="margin: 0;">
                    <el-col :span="12" style="padding-left: 0;padding-right: 20px;">
                        <div>就诊人</div>
                        <el-input :disabled=jzrsf v-model="jzr" placeholder="患者姓名"></el-input>
                    </el-col>
                    <el-col :span="12" style="padding-left: 0;padding-right: 20px;">
                        <div>性别</div>
                        <el-input :disabled=jzrsf v-model="sexb" placeholder="性别"></el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin: 0">
                    <el-col :span="12" style="padding-left: 0;padding-right: 20px;">
                        <div>出生日期</div>
                        <el-input :disabled=jzrsf v-model="csbir" placeholder="出生日期"></el-input>
                    </el-col>
                    <el-col :span="12" style="padding-left: 0;padding-right: 20px;">
                        <div>病历号</div>
                        <el-input :disabled="true" v-model="cahao" placeholder="病历号"></el-input>
                    </el-col>
                </el-row>
            </div>
            <div style="display: flex;flex-direction: row;flex-wrap:wrap;margin-top: 20px">
                <div class="tewxian" v-for="(item,index) in shier" @click="twoxi(index)" :class="{tewcol : topindex == index}" :key="index">
                    {{item}}
                </div>
            </div>
            <div style="width: calc(100% - 40px);margin: 8px 20px 45px 20px;color: #000;">
                <!---->
                <quilleditor v-model="content"
                             ref="myTextEditor"
                             :options="editorOption"
                             @change="onChange">
                    <div id="toolbar" slot="toolbar">
                        <select class="ql-size">
                            <option value="small"></option>
                            <option selected></option>
                            <option value="large"></option>
                            <option value="huge"></option>
                        </select>
                        <span class="ql-formats"><button class="ql-script" value="sub"></button></span>
                        <span class="ql-formats"><button class="ql-script" value="super"></button></span>
                        <span class="ql-formats"><button type="button" class="ql-bold"></button></span>
                        <span class="ql-formats"><button type="button" class="ql-italic"></button></span>
                        <span class="ql-formats"><button type="button" class="ql-blockquote"></button></span>
                        <span class="ql-formats"><button type="button" class="ql-list" value="ordered"></button></span>
                        <span class="ql-formats"><button type="button" class="ql-list" value="bullet"></button></span>
                        <span class="ql-formats">
        <button type="button" @click="imgClick" style="outline:none">
        <svg viewBox="0 0 18 18"> <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect> <circle
                class="ql-fill" cx="6" cy="7" r="1"></circle> <polyline class="ql-even ql-fill"
                points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg>
        </button>
      </span>
                    </div>
                </quilleditor>
            </div>
        </div>

        <div class="anbtn">
            <div style="width:90px;height:34px;background:rgba(80,221,160,1);
            border-radius:2px;color: rgba(255,255,255,1);font-size:14px;font-family:PingFang-SC-Bold;
            font-weight:bold;line-height:34px;cursor: pointer;" @click="tobuild">保存</div>
            <div style="width:90px;height:34px;background:rgba(255,255,255,1);
            border:1px solid rgba(178,245,214,1);border-radius:2px;font-size:14px;
            font-family:PingFang-SC-Bold;font-weight:bold;color:rgba(73,213,152,1);
            line-height:34px;margin-right: 24px;cursor: pointer;" @click="$router.back(-1)">取消</div>
        </div>
    </div>
</template>

<script>

    import {quillEditor} from 'vue-quill-editor'
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
            return {
                jzrsf:false,
                jzr:"",
                cahao:"",
                csbir:"",
                sexb:"",

                dialogImageUrl: '',
                dialogVisible: false,

                allfileid:[],
                allstlfileid:[],
                filestlData:[],
                allstlwjfileid:[],
                hzlqtext: '',

                uploadLogo:'',

                fileList: [],
                fileStl:[],
                filePic:[],

                headers: {
                    Token:localStorage.getItem("Token")
                },
                rouurl:this.GLOBAL.bastuse+"upload/images/partner",
                stlrouurl:this.GLOBAL.bastuse+"addstl",

                content: '',
                editorOption: {
                    modules: {
                        toolbar: '#toolbar'
                    }
                },
                shier:["诊断信息","主诉","现病史","既往史",
                    "过敏史","个人史(女性月经史）","体格检查","化验检查",
                    "特殊检查:CT、B超、X光片、PET-CT/病理检查、核磁共振(MR）",
                    "疾病诊断","鉴别诊断","建议治疗方案"],
                twotext:["","","","","","","","","","","",""],
                topindex:0,
                dqsy:0,

                botrue:true,
            }
        },
        methods: {
            onChange() {
                this.$emit('input', this.content)
            },
            /*选择上传图片切换*/
            onFileChange(e) {
                var fileInput = e.target;
                if (fileInput.files.length === 0) {
                    return
                }
                this.editor.focus();
                //获取图片的大小
                console.log(fileInput.files[0].size);
                // 判断图片大小尚未处理
                // if (fileInput.files[0].size > this.maxUploadSize) {
                //     this.$alert('图片不能大于500KB', '图片尺寸过大', {
                //         confirmButtonText: '确定',
                //         type: 'warning',
                //     })
                // }
                let data = new FormData();
                data.append(this.fileName,fileInput.files[0]);

                this.changePhotodo(this.uploadUrl,data,(response) =>{
                    this.editor.insertEmbed(this.editor.getSelection().index, 'image', this.GLOBAL.bastuse+"view-image/"+response.data.fileLibId)
                },(error) =>{
                    console.log(error)
                })
            },
            /*点击上传图片按钮*/
            imgClick() {
                if (!this.uploadUrl) {
                    console.log('请设置上传接口');
                    return;
                }
                /*内存创建input file*/
                var input = document.createElement('input');
                input.type = 'file';
                input.name = this.fileName;
                input.accept = 'image/jpeg,image/png,image/jpg,image/gif';
                input.onchange = this.onFileChange;
                input.click()
            },

            /*图片上传*/
            handleRemove(file, fileList) {
                console.log(file);
                console.log(this.allfileid);
                console.log(file.num);
                //诊断图
                if(file.tt == "zdt"){
                    console.log(this.allfileid);
                }
                //stl
                if(file.tt == "stl"){
                    console.log(this.allstlwjfileid)
                }
                //stl预览图
                if(file.tt == "stlp"){
                    console.log(this.allstlfileid);

                }
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            //上传成功返回
            handleAvatarSuccess(res){
                this.allfileid.push(res.fileLibId);
            },
            handleAvatarSuccessstl(res){
                console.log("stl预览图上传成功");
                this.allstlfileid.push(res.fileLibId);
            },

            //限制上传个数字
            handleExceed(){
                this.$message.error('诊断图片只能上传九张,请删除后再上传');
            },
            handlePreview(file) {
                console.log(file);
            },
            handleSucess(res){
                console.log(res);

            },
            tonnn(){
                this.botrue = true;
                this.filestlData = [];
                this.fileList = [];
            },

            submitUpload: function () {
                this.filestlData = new FormData();
                this.$refs.upload.submit();
                this.filestlData.append('subdirectory','STL1');
                this.uploadLogo = "1";
                var that = this;
                console.log(this.filestlData);
                this.changePhotodo("addstl",this.filestlData,(response) =>{
                    that.uploadLogo = "2";
                    this.allstlwjfileid = response.data;
                    console.log(response.data);
                    //切换成修改上传
                    // 清除this.filestlData
                    this.botrue = false;
                    this.filestlData = [];

                },(error) =>{
                    console.log(error);
                    that.uploadLogo = "3";
                })
            },
            uploadFile:function(file){
                console.log(file);
                this.filestlData.append('file', file.file);
            },
            // 十二项富文本获取
            twoxi(index){
                this.dqsy = index;
                this.twotext[this.topindex] = this.content;
                this.content = this.twotext[this.dqsy];
                this.topindex = this.dqsy;
            },

            //根据病例查询详细信息
            bluid(){
                this.$parent.$parent.tcloading = true;
                this.changeDatado("GET","caseHistory/details",{
                    caseHistoryId:this.$route.query.id
                },(response) =>{
                    this.$parent.$parent.tcloading = false;
                    console.log(response);
                    //病例id
                    this.cahao = response.caseHistory.caseHistoryId;
                    //名字
                    this.name = response.caseHistory.name;
                    //十二项
                    this.content = response.caseHistory.explain1;
                    this.twotext[0] = response.caseHistory.explain1;
                    this.twotext[1] = response.caseHistory.explain2;
                    this.twotext[2] = response.caseHistory.explain3;
                    this.twotext[3] = response.caseHistory.explain4;
                    this.twotext[4] = response.caseHistory.explain5;
                    this.twotext[5] = response.caseHistory.explain6;
                    this.twotext[6] = response.caseHistory.explain7;
                    this.twotext[7] = response.caseHistory.explain8;
                    this.twotext[8] = response.caseHistory.explain9;
                    this.twotext[9] = response.caseHistory.explain10;
                    this.twotext[10] = response.caseHistory.explain11;
                    this.twotext[11] = response.caseHistory.explain12;

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
                            filsts.push(this.GLOBAL.bastuse+"view-image/"+filst[i])
                        }
                        // console.log("stl预览图");
                        // console.log(filst);
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
                            filstspic.push(this.GLOBAL.bastuse+"view-image/"+filstpic[j])
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
                        console.log("无就诊病例")
                    }
                    //详情上传
                    this.hzlqtext = response.caseHistory.title
                },(error) =>{
                    console.log(error);
                });
            },
            //上传病例信息
            tobuild(){
                this.$parent.$parent.tcloading = true;
                // this.loading = true;

                //点击保存把当前的十二项那个储存进去
                this.twotext[this.dqsy] = this.content;
                console.log(this.twotext[this.dqsy]);
                let stl = '';
                let stlp = '';
                let zdp = '';
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

                this.changeDatado("POST","caseHistory/updateToPatient",{
                    caseHistoryId:this.$route.query.id,
                    name:'',
                    picture:zdp,
                    STL1Picture:stlp,
                    CT:"",//ct的诊断
                    STL1:stl,
                    title:this.hzlqtext,
                    explain1:this.twotext[0],
                    explain2:this.twotext[1],
                    explain3:this.twotext[2],
                    explain4:this.twotext[3],
                    explain5:this.twotext[4],
                    explain6:this.twotext[5],
                    explain7:this.twotext[6],
                    explain8:this.twotext[7],
                    explain9:this.twotext[8],
                    explain10:this.twotext[9],
                    explain11:this.twotext[10],
                    explain12:this.twotext[11],
                },(response) =>{
                    console.log(response);
                    this.$parent.$parent.tcloading = false;
                    if(response.code == 0){
                        this.$notify({
                            title: '成功',
                            message: '保存成功',
                            type: 'success'
                        });
                        this.bluid()
                    }else{
                        this.$notify.error({
                            title: '错误',
                            message: '保存失败'
                        });
                    }
                },(error) =>{
                    this.$notify.error({
                        title: '错误',
                        message: error
                    });
                });
            },
        },
        created(){
            console.log(this.$route.query.id);
            this.bluid()
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quill
            }
        },
        components: {
            'quilleditor': quillEditor
        },
        mounted() {
            this.content = this.value
        },
        watch: {
            'value'(newVal, oldVal) {
                if (this.editor) {
                    if (newVal !== this.content) {
                        this.content = newVal
                    }
                }
            },
        }

    }
</script>
<style>

    .el-button--primary{
        background-color:#80B3DE !important;
        border-color:#e3f8ed !important;
    }
    .el-tag{
        background-color: #f6fcf9!important;
        border-color: #e3f8ed !important;
        color:#80B3DE !important;
    }

</style>
<style>
    .center-nav-cc .el-input.is-disabled .el-input__inner{
        background-color: rgba(249,249,249,1);
        border: 0px;
        font-size: 14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(74,75,78,1);
    }
</style>

<style scoped>
    .center{
        width: calc(100% - 510px);
        background-color: #fff;
        /* box-shadow:0px 0px 5px 0px rgba(18,49,137,0.09); */
        border-radius:0px 0px 2px 2px;
        position: fixed;
        height: 700px;
        overflow: scroll;
        margin-top: 115px;
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
        margin-top: 10px;
    }
    .ivu-upload {
        display: none;
    }

    .anbtn{
        display: flex;
        margin: 0 12px 60px 12px;
        flex-direction:row-reverse;
    }

    .tewxian{
        height:32px;background: #cecece;line-height: 32px;
        /* box-shadow:0px 0px 2px 0px rgba(32,32,32,0.13); */
        border-radius:2px;padding: 0px 16px;
        font-size:14px;font-family:PingFang-SC-Medium;font-weight:500;margin: 8px 0px 8px 20px;
        color:rgba(255,255,255,1);cursor: pointer;
    }
    .tewcol{
        background:rgba(80,221,160,1) !important;
    }


</style>