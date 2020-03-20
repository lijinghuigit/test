<template>
    <div class="top">
        <div class="tops">
            <div class="title">添加手术方法</div>
        </div>
        <div class="center">
            <div class="center-d">
                <div class="center-nav-cc">
                    病种类别
                </div>
                <div style="width: calc(100% - 40px);margin: 0 20px 0 20px">
                    <div class="trongs">
                        <el-select v-model="valueone" placeholder="请选择" @change="clickmath">
                            <el-option
                                    v-for="item in optione"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    :disabled="item.disabled">
                            </el-option>
                        </el-select>
                        <el-select v-model="valuetwo" placeholder="请选择" @change="clickmaths" style="margin-left: 30px">
                            <el-option
                                    v-for="item in optitwo"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    :disabled="item.disabled">
                            </el-option>
                        </el-select>
                        <el-select v-model="valuethree" placeholder="请选择" @change="metharyer" style="margin-left: 30px">
                            <el-option
                                    v-for="item in optithree"
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
                    材料应用
                </div>
                <div style="width: calc(100% - 40px);margin: 0 20px 0 20px">
                    <div class="trongs">
                        <el-select v-model="inputone" placeholder="请选择" @change="cailyiny">
                            <el-option
                                    v-for="item in optifour"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    :disabled="item.disabled">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <!--手术导板-->
            <div style="margin: 20px auto 0;width: 720px;background:rgba(248,248,248,1);border-radius:2px;">
                <div style="font-size:14px;font-family:PingFang-SC-Medium;font-weight:normal;color:rgba(153,153,153,1);
                    line-height:30px;text-align: left;margin-left: 20px;">手术导板</div>
            </div>
            <div style="margin: 0 auto;width: 720px;border:1px solid rgba(239,239,239,1);
            border-radius:0px 0px 1px 1px;">
                <div class="center-d">
                    <div class="center-nav-cc">
                        手术导板stl
                    </div>
                    <div style="width: calc(100% - 40px);margin: 0 20px 0 20px">
                        <div style="margin-bottom: -20px" v-if="!botrue">
                            <el-tag v-show="uploadLogo2=='1'" >上传中</el-tag>
                            <el-tag v-show="uploadLogo2=='2'">上传成功</el-tag>
                            <el-tag v-show="uploadLogo2=='3'">上传失败</el-tag>
                            <el-button slot="trigger" size="small" type="primary" @click="tonnn">重新上传</el-button>
                        </div>
                        <el-upload ref="upload" :action=stlrouurl :auto-upload="false"  :http-request="uploadFile" accept=".stl"
                                   :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSucess" :file-list="fileList" >
                            <el-button slot="trigger" size="small" type="primary" v-if="botrue">选取文件</el-button>
                            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload('stl2')" v-if="botrue">开始上传</el-button>
                        </el-upload>
                    </div>
                </div>

                <div class="center-d" style="margin-bottom: 20px">
                    <div class="center-nav-cc" >
                        手术导板预览图
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
            </div>

            <!--手术器械-->
            <div style="margin: 20px auto 0;width: 720px;background:rgba(248,248,248,1);border-radius:2px;">
                <div style="font-size:14px;font-family:PingFang-SC-Medium;font-weight:normal;color:rgba(153,153,153,1);
                    line-height:30px;text-align: left;margin-left: 20px;">手术器械</div>
            </div>
            <div style="margin: 0 auto;width: 720px;border:1px solid rgba(239,239,239,1);
            border-radius:0px 0px 1px 1px;">
                <div class="center-d">
                    <div class="center-nav-cc">
                        手术器械stl
                    </div>
                    <div style="width: calc(100% - 40px);margin: 0 20px 0 20px">
                        <div style="margin-bottom: -20px" v-if="!botrues">
                            <el-tag v-show="uploadLogo3=='1'" >上传中</el-tag>
                            <el-tag v-show="uploadLogo3=='2'">上传成功</el-tag>
                            <el-tag v-show="uploadLogo3=='3'">上传失败</el-tag>
                            <el-button slot="trigger" size="small" type="primary" @click="tonnns">重新上传</el-button>
                        </div>
                        <el-upload ref="uploadthree" :action=stlrouurl :auto-upload="false"  :http-request="uploadFile" accept=".stl"
                                   :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSucess" :file-list="fileLists" >
                            <el-button slot="trigger" size="small" type="primary" v-if="botrues">选取文件</el-button>
                            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload('stl3')" v-if="botrues">开始上传</el-button>
                        </el-upload>
                    </div>
                </div>
                <div class="center-d" style="margin-bottom: 20px">
                    <div class="center-nav-cc">
                        手术器械预览图
                    </div>
                    <div style="width: calc(100% - 40px);margin: 0 20px 0 20px">
                        <el-upload
                                :action = rouurl
                                :on-success="handleAvatarSuccessstls"
                                accept=".jpg,.jpeg,.psd,.png,.swf"
                                :limit="9"
                                :file-list="fileStls"
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
            </div>
            <div class="center-d">
                <div class="center-nav-cc">
                    WORD文档
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
                    PPT文档
                </div>
                <div style="width: calc(100% - 40px);margin: 0 20px 0 20px">
                    <div style="margin-bottom: -20px" v-if="!boppt">
                        <el-tag v-show="uploadLogo1=='1'" >上传中</el-tag>
                        <el-tag v-show="uploadLogo1=='2'">上传成功</el-tag>
                        <el-tag v-show="uploadLogo1=='3'">上传失败</el-tag>
                        <el-button slot="trigger" size="small" type="primary" @click="ponn">重新上传</el-button>
                    </div>
                    <el-upload ref="uploadtwo" :action=stlrouurl :auto-upload="false" :limit="1" :http-request="uploadFile" accept=".ppt,.pptx"
                               :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSucess" :file-list="filePist" >
                        <el-button slot="trigger" size="small" type="primary" v-if="boppt">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload('ppt')" v-if="boppt">开始上传</el-button>
                    </el-upload>
                </div>
            </div>

            <div class="center-d">
                <div class="center-nav-cc">
                    视频描述
                </div>
                <div style="width: calc(100% - 40px);margin: 0 20px 0 20px">
                    <div style="margin-bottom: -20px" v-if="!bovideo">
                        <el-tag v-show="uploadLogo4=='1'" >上传中</el-tag>
                        <el-tag v-show="uploadLogo4=='2'">上传成功</el-tag>
                        <el-tag v-show="uploadLogo4=='3'">上传失败</el-tag>
                        <el-button slot="trigger" size="small" type="primary" @click="ponvideo">重新上传</el-button>
                    </div>
                    <el-upload ref="uploadfive" :action=stlrouurl :auto-upload="false" :limit="1" :http-request="uploadFile" accept=".AVI,.mov,.rmvb,.rm,.FLV,.mp4,.3GP"
                               :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSucess" :file-list="filevideo" >
                        <el-button slot="trigger" size="small" type="primary" v-if="bovideo">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload('video')" v-if="bovideo">开始上传</el-button>
                    </el-upload>
                </div>
            </div>
            <!--富文本-->
            <div class="center-d">
                <div class="center-nav-cc">
                    手术方法文案
                </div>
                <div style="width: calc(100% - 40px);margin: 0 20px 45px 20px;color: #000;">
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
                font-weight:bold;line-height:34px;cursor: pointer;" @click="clibtn">发布</div>
                <div style="width:90px;height:34px;background:rgba(255,255,255,1);
                border:1px solid rgba(178,245,214,1);border-radius:2px;font-size:14px;
                font-family:PingFang-SC-Bold;font-weight:bold;color:rgba(73,213,152,1);
                line-height:34px;margin-right: 24px;cursor: pointer;">取消</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {quillEditor} from 'vue-quill-editor'
    export default {
        name: "addmethod",
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
                optione:[],
                optitwo: [],
                optithree:[],
                optifour:[],

                inputone:'',

                father:'',
                son:'',
                valueone:'',
                valuetwo:'',
                valuethree:'',
                clida:"",

                dialogImageUrl: '',
                dialogVisible: false,
                fileStl:[],
                fileStls:[],

                botrue:true,
                botrues:true,
                boword:true,
                boppt:true,
                bovideo:true,

                zjid:"",

                allstlfileid:[],
                allstlfileids:[],
                filestlData:[],

                videoid:'',
                wordid:'',
                pptid:'',
                stlid:[],
                stlids:[],

                uploadLogo:'',
                uploadLogo1:'',
                uploadLogo2:'',
                uploadLogo3:'',
                uploadLogo4:'',

                fileList: [],
                fileLists:[],
                fileWist:[],
                filePist:[],
                filevideo:[],



                dbid:"", // 导板id

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

                ssdb:[""],
                ssqx:[""],
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
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            handleAvatarSuccessstl(res){
                console.log("stl预览图上传成功");
                this.allstlfileid.push(res.fileLibId);
            },
            handleAvatarSuccessstls(res){
                console.log("stl预览图上传成功");
                this.allstlfileids.push(res.fileLibId);
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

            wonn(){
                this.boword = true;
                this.fileWist = [];
            },
            ponn(){
                this.boppt = true;
                this.filePist = [];
            },
            ponvideo(){
                this.bovideo = true;
                this.filevideo = [];
            },
            // stl的
            tonnn(){
                this.botrue = true;
                this.filestlData = [];
                this.fileList = [];
            },
            tonnns(){
                this.botrues = true;
                this.filestlData = [];
                this.fileLists = [];
            },

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
                    this.uploadLogo2 = "1";
                    this.$refs.upload.submit();
                    this.filestlData.append('subdirectory',"stl");
                    url = "addstl"
                }else if(val == 'stl3'){
                    this.uploadLogo3 = "1";
                    this.$refs.uploadthree.submit();
                    this.filestlData.append('subdirectory',"stl");
                    url = "addstl"
                }else if(val == 'video'){
                    this.uploadLogo4 = "1";
                    this.$refs.uploadfive.submit();
                    url = "upload/video/video"
                }
                console.log(this.filestlData);
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
                        console.log(response);
                        this.botrue = false;
                        this.filestlData = [];
                    }else if(val == 'stl3'){
                        this.uploadLogo3 = "2";
                        this.stlids = response.data;
                        console.log(response);
                        this.botrues = false;
                        this.filestlData = [];
                    }else if(val == 'video'){
                        this.uploadLogo4 = "2";
                        this.videoid = response.data;
                        this.bovideo = false;
                    }
                },(error) =>{
                    console.log(error);
                    if(val == 'ppt'){
                        this.uploadLogo1 = "3";
                    }else if(val == 'word'){
                        this.uploadLogo = "3";
                    }else if(val == 'stl2'){
                        this.uploadLogo2 = "3";
                    }else if(val == 'stl3'){
                        this.uploadLogo3 = "3";
                    }else if(val == 'video'){
                        this.uploadLogo4 = "3";
                    }
                })
            },
            uploadFile:function(file){
                console.log(file);
                this.filestlData.append('file', file.file);
            },
            //保存
            clibtn(){
                if(this.content == '' || this.content == undefined){
                    this.content = ""
                }
                console.log(this.content);  //富文本

                let stl = '';
                let stls = '';
                let pic = '';
                let pics = '';

                for(let i=0;i<this.stlid.length; i++){
                    stl += this.stlid[i]+","
                }
                for(let i=0;i<this.stlids.length; i++){
                    stls += this.stlids[i]+","
                }
                for(let i=0;i<this.allstlfileid.length; i++){
                    pic += this.allstlfileid[i]+","
                }
                for(let i=0;i<this.allstlfileids.length; i++){
                    pics += this.allstlfileids[i]+","
                }
                stl = stl.substring(0, stl.lastIndexOf(','));
                stls = stls.substring(0, stls.lastIndexOf(','));
                pic = pic.substring(0, pic.lastIndexOf(','));
                pics = pics.substring(0, pics.lastIndexOf(','));
                console.log(stl);
                console.log(stls);
                console.log(pic);
                console.log(pics);
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
                console.log(this.GLOBAL.doctcenter);
                // 创建导板
                // guidePlateMaterial/add
                this.changeDatado("POST","guidePlateMaterial/add",{
                    // data值
                    applicationtype:"dbdb",
                    STLPicture:pic,
                    STL:stl
                },(response) =>{
                    if(response){
                        this.dbid = response;
                        this.changeDatado("POST","Instrument/insert",{
                            // data值
                            name:"ssqx",
                            picture:pics,
                            STL:stls
                        },(response) =>{
                            if(response){
                                this.ssqx = response;
                                //创建手术方法
                                this.changeDatado("POST","surgicalPlan/addSurgicalPlan",{
                                    doctorId:this.GLOBAL.doctcenter.doctorId,
                                    doctorName:this.GLOBAL.doctcenter.name,
                                    surgicalPlan:this.content,
                                    video:this.videoid,
                                    wordPPT:this.wordid,
                                    ppt:this.pptid,
                                    cost:"10",  //价格
                                    diseaseCategoryId:this.zjid,
                                    materialsId:this.clida,
                                    spare1:this.dbid,
                                    spare2:this.ssqx,
                                },(response) =>{
                                    console.log(response);
                                    if(response.code == 1){

                                        this.$notify({
                                            title: '成功',  //
                                            message: '添加手术方法成功',
                                            type: 'success'
                                        });
                                        let i = 2;
                                        let intervalste = setInterval(()=>{
                                            i--;
                                            if (i == 0){
                                                clearInterval(intervalste);
                                                this.$router.push({
                                                    path: '/methary'      //跳转的路径
                                                });
                                            }
                                        }, 1000);
                                    }else{
                                        this.$notify.error({
                                            title: '错误',
                                            message: response.msg
                                        });
                                    }
                                },(error) =>{
                                    console.log(error);
                                })
                            }
                        },(error) =>{
                            console.log(error);
                        })
                    }
                },(error) =>{
                    console.log(error);
                })
            },

            cailyiny(diseaseCategoryId){
                //这是手术文档的所有类容
              console.log("这是手术文档的所有类容");
              this.clida = diseaseCategoryId
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
                this.changeDatado("GET","diseaseCategory/parentList",{    //
                },(response) =>{
                    console.log(response);
                    this.optione = response.map((value, i) => {
                        return {
                            value: value.diseaseCategoryId,
                            label: value.diseaseCategoryName
                        }
                    });
                    this.metharyer("")
                },(error) =>{
                    console.log(error)
                });

                this.changeDatado("GET","doctMaterials/getlistone",{
                },(response) =>{
                    console.log(response);
                    this.optifour = response.map((value, i) => {
                        return {
                            value: value.diseaseCategoryId,
                            label: value.diseaseCategoryName
                        }
                    });
                    this.metharyer("")
                },(error) =>{
                    console.log(error)
                });
            },

            clickmaths(diseaseCategoryId){   //上一级获取下一级可调用同样的方法
                // /diseaseCategory/sonList
                this.son = '';
                this.valuethree = '';
                this.zjid = diseaseCategoryId;
                this.main = diseaseCategoryId;
                this.changeDatado("GET","diseaseCategory/sonList",{
                    diseaseCategoryId:diseaseCategoryId  //参数点击了的一级的id
                },(response) =>{
                    this.optithree = response.map((value, i) => {
                        return {
                            value: value.diseaseCategoryId,
                            label: value.diseaseCategoryName
                        }
                    });
                    this.metharyer("")
                },(error) =>{
                    console.log(error)
                })
            },

            metharyer(diseaseCategoryId2){
                this.son = diseaseCategoryId2;
                this.zjid = diseaseCategoryId2;
            },
            clickmath(diseaseCategoryId){   //上一级获取下一级可调用同样的方法
                // /diseaseCategory/sonList
                //点击了父级的函数之后获取第二级的
                this.zjid = diseaseCategoryId;
                this.father = diseaseCategoryId;
                this.main = '';
                this.son = '';
                this.valuetwo = '';
                this.valuethree = '';
                this.changeDatado("GET","diseaseCategory/sonList",{
                    diseaseCategoryId:diseaseCategoryId  //参数点击了的一级的id
                },(response) =>{
                    console.log(response);
                    this.optitwo = response.map((value, i) => {
                        return {
                            value: value.diseaseCategoryId,
                            label: value.diseaseCategoryName
                        }
                    });
                    //清空二级的内容
                    this.metharyer("")
                },(error) =>{
                    console.log(error)
                })
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
        },
        created(){
            this.methary()
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
    .top{
        margin: 0px 300px 0px 19px;
        overflow: scroll;
        height: calc(100% - 75px);
        background: rgba(255,255,255,1);
        padding-bottom: 10px;
        z-index:70;
        top: 0;
        left: 0;
    }
    .tops{
        background: rgba(255,255,255,1);
        display: flex;
        position: fixed;
        /* box-shadow:0px 1px 3px 0px rgba(18,49,137,0.09); */
        border-radius:2px 2px 0px 0px;
        width: calc(100% - 508px);
        z-index:50;
        margin-top: 60px;
        background-color: #fff;
    }
    .tops .title{
        margin-left: 15px;
        background: rgba(255,255,255,1);
        flex: 1;
        cursor: pointer;
        font-size:14px;
        line-height: 55px;
        text-align: left;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(164,169,178,1);
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