<template>
    <div class="center">
        <div class="center-d">
            <div class="center-nav-cc">
                材料类别
            </div>
            <div style="width: calc(100% - 40px);margin: 0 20px 0 20px">
                <div class="trongs">
                    <!--</el-cascader>-->
                    <el-select v-model="valueone" placeholder="请选择" @change="clickmath">
                        <el-option
                                v-for="item in optione"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                :disabled="item.disabled">
                        </el-option>
                    </el-select>
                    <el-select v-model="valuetwo" placeholder="请选择" @change="clickson" style="margin-left: 30px">
                        <el-option
                                v-for="item in optitwo"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                :disabled="item.disabled">
                        </el-option>
                    </el-select>

                </div>
            </div>
        </div>
        <div class="center-d">
            <div class="center-nav-cc">
                手术设计WORD
            </div>
            <div style="width: calc(100% - 40px);margin: 0 20px 0 20px">

                <div style="margin-bottom: -20px"  v-if="!boword">
                    <el-tag v-show="uploadLogo=='1'" >上传中</el-tag>
                    <el-tag v-show="uploadLogo=='2'">上传成功</el-tag>
                    <el-tag v-show="uploadLogo=='3'">上传失败</el-tag>
                    <el-button slot="trigger" size="small" type="primary" @click="wonn">重新上传</el-button>
                </div>

                <el-upload ref="uploadone" :action=stlrouurl :auto-upload="false" :limit="1" :http-request="uploadFile" accept=".doc,.docx"
                           :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSucess" :file-list="fileWist" >
                    <el-button slot="trigger" size="small" type="primary" v-if="boword">选取文件</el-button>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload('word')"  v-if="boword">开始上传</el-button>
                </el-upload>
            </div>
        </div>

        <div class="center-d">
            <div class="center-nav-cc">
                手术设计PPT
            </div>
            <div style="width: calc(100% - 40px);margin: 0 20px 0 20px">
                <div style="margin-bottom: -20px" v-if="!boppt">
                    <el-tag v-show="uploadLogo=='1'" >上传中</el-tag>
                    <el-tag v-show="uploadLogo=='2'">上传成功</el-tag>
                    <el-tag v-show="uploadLogo=='3'">上传失败</el-tag>
                    <el-button slot="trigger" size="small" type="primary" @click="ponn">重新上传</el-button>
                </div>
                <el-upload ref="uploadtwo" :action=stlrouurl :auto-upload="false" :limit="1" :http-request="uploadFile" accept=".ppt,.pptx"
                           :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSucess" :file-list="filePist" >
                    <el-button slot="trigger" size="small" type="primary" v-if="boppt">选取文件</el-button>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload('ppt')" v-if="boppt">开始上传</el-button>
                </el-upload>
            </div>
        </div>
        <!--stl-->
        <div class="center-d">
            <div class="center-nav-cc">
                上传手术设计STL
            </div>
            <div style="width: calc(100% - 40px);margin: 0 20px 0 20px">
                <div style="margin-bottom: -20px" v-if="!botrue">
                    <el-tag v-show="uploadLogo=='1'" >上传中</el-tag>
                    <el-tag v-show="uploadLogo=='2'">上传成功</el-tag>
                    <el-tag v-show="uploadLogo=='3'">上传失败</el-tag>
                    <el-button slot="trigger" size="small" type="primary" @click="tonnn">重新上传</el-button>
                </div>
                <el-upload ref="upload" :action=stlrouurl :auto-upload="false"  :http-request="uploadFile" accept=".stl"
                           :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSucess" :file-list="fileList" >
                    <el-button slot="trigger" size="small" type="primary" v-if="botrue">选取文件</el-button>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload('stl2')" v-if="botrue">开始上传</el-button>
                </el-upload>
            </div>
        </div>
        <div class="center-d">
            <div class="center-nav-cc">
                上传手术设计预览图
            </div>
            <div style="width: calc(100% - 40px);margin: 0 20px 0 20px">
                <el-upload
                        :action = rouurl
                        :on-success="handleAvatarSuccessstl"
                        accept=".jpg,.jpeg,.psd,.png,.swf"
                        :limit="9"
                        :file-list="fileStl"
                        :headers = "headers"
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
                手术设计文案
            </div>
            <div style="width: calc(100% - 40px);margin: 0 20px 45px 20px">
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
                                        class="ql-fill" cx="6" cy="7" r="1"></circle><polyline class="ql-even ql-fill"
                                        points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline></svg>
                            </button>
                        </span>
                    </div>
                </quilleditor>
            </div>
        </div>
        <div class="anbtn">
            <div style="width:90px;height:34px;background:rgba(80,221,160,1);
            border-radius:2px;color: rgba(255,255,255,1);font-size:14px;font-family:PingFang-SC-Bold;
            font-weight:bold;line-height:34px;cursor: pointer;" @click="clibtn">保存</div>
            <div style="width:90px;height:34px;background:rgba(255,255,255,1);
            border:1px solid rgba(178,245,214,1);border-radius:2px;font-size:14px;
            font-family:PingFang-SC-Bold;font-weight:bold;color:rgba(73,213,152,1);
            line-height:34px;margin-right: 24px;cursor: pointer;">取消</div>
        </div>
    </div>
</template>

<script>
    import {quillEditor} from 'vue-quill-editor'
    export default {
        name: "three",
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
                optione:[], //材料类别一级选择
                optitwo: [],  //材料类别二级选择
                father:'',   //材料一级
                son:'',     //材料二级
                valueone:'',  //选择的材料类别一级
                valuetwo:'',  //选择的材料类别二级
                //插件带有 eleemnt-ui
                dialogImageUrl: '',
                dialogVisible: false,


                fileStl:[],//展示的stl数组

                botrue:true,  //是否有上传stl文件
                boword:true,   //是否有上传word文件
                boppt:true,   //是否有上传ppt文件

                allstlfileid:[],   //stl预览图上传
                filestlData:[],   //stl文件上传

                wordid:'',  //上传word的id
                pptid:'',  //上传ppt的id
                stlid:[],  //stl获取的数组展示

                uploadLogo:'',   //word上传按钮
                uploadLogo1:'',  //ppt上传的按钮
                uploadLogo2:'',  //stl上传的展示

                fileList: [],   //如有stl时候通过这个数组显示
                fileWist:[],   //有word
                filePist:[],   //有ppt

                headers: {
                    Token:localStorage.getItem("Token")
                },
                //上传接口
                rouurl:this.GLOBAL.bastuse+"upload/images/partner",
                stlrouurl:this.GLOBAL.bastuse+"addstl",

                //文本类容
                content: '',
                editorOption: {
                    modules: {
                        toolbar: '#toolbar'
                    }
                },
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
                console.log(file, fileList);
            },
            //选择图片
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            //图片上传成功
            handleAvatarSuccessstl(res){
                console.log("stl预览图上传成功");
                this.allstlfileid.push(res.fileLibId);
            },

            //限制上传个数字
            handleExceed(){
                this.$message.error('诊断图片只能上传九张，请删除后再上传');
            },
            handlePreview(file) {
                console.log(file);
            },
            handleSucess(res){
                console.log(res);

            },

            //word从新上传
            wonn(){
                this.boword = true;
                // this.filestlData = [];
                this.fileWist = [];
            },
            //ppt重新上传
            ponn(){
                this.boppt = true;
                // this.filestlData = [];
                this.filePist = [];
            },
            // stl的从新上传
            tonnn(){
                this.botrue = true;
                this.filestlData = [];
                this.fileList = [];
            },

            //上传按钮  通过val判断是上传ppt/word/stl
            submitUpload: function (val) {
                console.log(val);

                this.filestlData = new FormData();
                let url = '';
                if(val == 'ppt'){
                    this.uploadLogo1 = "1";
                    this.$refs.uploadtwo.submit();
                    url = "upload/ppt"
                }else if(val == 'word'){
                    this.uploadLogo = "1";
                    this.$refs.uploadone.submit();
                    url = "upload/word"
                }else if(val == 'stl2'){
                    this.$refs.upload.submit();
                    this.filestlData.append('subdirectory',val);
                    this.uploadLogo2 = "1";
                    url = "addstl"
                }

                this.changePhotodo(url,this.filestlData,(response) =>{
                    console.log(response.data);
                    if(val == 'ppt'){
                        this.uploadLogo1 = "2";
                        this.pptid = response.data.fileLibId;
                        this.boppt = false;
                        console.log(this.pptid)
                    }else if(val == 'word'){
                        this.uploadLogo = "2";
                        this.wordid = response.data.fileLibId;
                        this.boword = false;
                        console.log(this.wordid)
                    }else if(val == 'stl2'){
                        this.uploadLogo2 = "2";
                        this.stlid = response.data;
                        this.botrue = false;
                        this.filestlData = [];
                    }
                },(error) =>{
                    console.log(error);
                    if(val == 'ppt'){
                        this.uploadLogo1 = "3";
                    }else if(val == 'word'){
                        this.uploadLogo = "3";
                    }else if(val == 'stl2'){
                        this.uploadLogo2 = "3";
                    }
                })
            },
            uploadFile:function(file){
                this.filestlData.append('file', file.file);
            },

            // 富文本的获取富文本的获取
            //保存
            clibtn(){
                if(this.content == '' || this.content == undefined){
                    this.content = ""
                }
                console.log(this.content);  //富文本
                console.log(this.wordid);   //word
                console.log(this.pptid);    //ppt
                console.log(this.stlid);    //stl
                console.log(this.allstlfileid);   //stl预览图
                let stl = '';
                let pic = '';

                for(let i=0;i<this.stlid.length; i++){
                    stl += this.stlid[i]+","
                }
                for(let i=0;i<this.allstlfileid.length; i++){
                    pic += this.allstlfileid[i]+","
                }
                stl = stl.substring(0, stl.lastIndexOf(','));
                pic = pic.substring(0, pic.lastIndexOf(','));
                let word = '';
                if(this.wordid){
                    word = this.wordid
                }else{
                    word = 0;
                }
                let ppt = '';
                if(this.pptid){
                    ppt = this.pptid
                }else{
                    ppt = 0;
                }
                //
                this.changeDatado("POST","caseHistory/updateToPatient",{
                    caseHistoryId:this.$route.query.id,
                    surgicalDesign:this.content,
                    STL3:stl,
                    surgicalPlanWP:word,
                    surgicalDesignWP:ppt,
                    materialsId:this.father,
                    materialsIdApplication:this.son,
                    STL3Picture:pic,
                    // data值
                },(response) =>{
                    console.log(response);
                },(error) =>{
                    console.log(error);
                })

            },

            stringto(val){
                let stlval = '';
                for(let i=0;i<val.length; i++){
                    stlval += val[i]+","
                }
                stlval = stlval.substring(0, stlval.lastIndexOf(','));
                return stlval
            },
            methary(){  //diseaseCategory/parentList  获取父级的方法
                //需要一级的然后是二级的最后是三级的
                this.changeDatado("GET","doctMaterials/getlistone",{    //
                },(response) =>{
                    console.log(response);
                    this.optione = response.map((value, i) => {
                        return {
                            value: value.materialsId,
                            label: value.applicationtype
                        }
                    });
                },(error) =>{
                    console.log(error)
                });
            },
            clickmath(diseaseCategoryId,num){   //上一级获取下一级可调用同样的方法
                this.father = diseaseCategoryId;
                this.changeDatado("GET","doctMaterials/getson",{
                    materialsId:diseaseCategoryId  //参数点击了的一级的id
                },(response) =>{
                    console.log(response);
                    this.optitwo = response.map((value, i) => {
                        return {
                            value: value.materialsId,
                            label: value.applicationtype
                        }
                    });
                    if(num == 1){
                        return
                    }else{
                        this.valuetwo = "";
                    }
                    this.valuetwo = "";
                },(error) =>{
                    console.log(error)
                })
            },
            clickson(diseaseCategoryId){   //上一级获取下一级可调用同样的方法
                this.son = diseaseCategoryId;
                console.log(this.son)
            },
            //查询材料的详情
            clxq(diseaseCategoryId,num){
                this.changeDatado("GET","doctMaterials/getById",{
                    materialsId:diseaseCategoryId  //参数点击了的一级的id
                },(response) =>{
                    console.log(response);
                    if(num == 1){
                        this.valueone = response.applicationtype;
                    }else{
                        this.valuetwo = response.applicationtype;
                    }
                },(error) =>{
                    console.log(error)
                })
            },
            //根据病例查询详细信息
            bluid(){
                this.$parent.$parent.tcloading = true;
                this.changeDatado("GET","caseHistory/details",{
                    caseHistoryId:this.$route.query.id
                },(response) =>{
                    this.$parent.$parent.tcloading = false;
                    console.log(response);


                    if(response.caseHistory.surgicalPlanWP && response.caseHistory.surgicalPlanWP !== '0'){
                        this.boword = false;
                        this.uploadLogo = "2";
                        let flist=response.caseHistory.surgicalPlanWP.split(",");
                        this.fileWist = flist.map((value, i) => {
                            return {
                                name: value,
                            }
                        });
                        this.wordid = response.caseHistory.surgicalPlanWP;
                    }
                    if(response.caseHistory.surgicalDesignWP && response.caseHistory.surgicalDesignWP !== '0'){
                        this.boppt = false;
                        this.uploadLogo1 = "2";
                        let flist=response.caseHistory.surgicalDesignWP.split(",");
                        this.filePist = flist.map((value, i) => {
                            return {
                                name: value,
                            }
                        });
                        this.pptid = response.caseHistory.surgicalDesignWP;
                    }
                    if(response.caseHistory.sTL3){
                        this.botrue = false;
                        this.uploadLogo2 = "2";
                        let flist=response.caseHistory.sTL3.split(",");
                        this.fileList = flist.map((value, i) => {
                            return {
                                name: value,
                            }
                        });
                        this.stlid = flist;
                    }
                    if(response.caseHistory.sTL3Picture){
                        let filst = response.caseHistory.sTL3Picture.split(",");
                        let filsts = [];
                        for(let i=0;i<filst.length;i++){
                            filsts.push(this.GLOBAL.bastuse+"view-image/"+filst[i])
                        }
                        this.allstlfileid = filst;
                        this.fileStl = filsts.map((value, i) => {
                            return {
                                url: value,
                            }
                        });
                    }
                    this.content = response.caseHistory.surgicalDesign;
                    if(response.caseHistory.materialsIdApplication){
                        this.father = response.caseHistory.materialsId;
                        this.son = response.caseHistory.materialsIdApplication;

                        this.clxq(response.caseHistory.materialsId,1);
                        this.clxq(response.caseHistory.materialsIdApplication,2);
                        this.methary();
                        this.clickmath(response.caseHistory.materialsId,1);
                    }else{
                        this.father = "";
                        this.son = "";
                        this.methary();
                    }
                },(error) =>{
                    console.log(error);

                });
            },
        },
        created(){
            this.bluid();
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

<style scoped>
    .center{
        width: calc(100% - 510px);
        background-color: #fff;
        /* box-shadow:0px 0px 5px 0px rgba(18,49,137,0.09); */
        border-radius:0px 0px 2px 2px;
        position: fixed;
        height: 650px;
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
</style>