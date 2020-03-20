<template>
    <div class="center">
        <!--stl-->
        <div class="center-d">
            <div class="center-nav-cc">
                上传手术设计STL
            </div>
            <div style="width: calc(100% - 40px);margin: 0 20px 0 20px">
                <div style="margin-bottom: -20px" v-if="!botrue">
                    <el-tag v-show="uploadLogo=='1'">上传中</el-tag>
                    <el-tag v-show="uploadLogo=='2'">上传成功</el-tag>
                    <el-tag v-show="uploadLogo=='3'">上传失败</el-tag>
                    <el-button slot="trigger" size="small" type="primary" @click="tonnn">重新上传</el-button>
                </div>
                <el-upload ref="upload" :action=stlrouurl :auto-upload="false"  :http-request="uploadFile" accept=".stl"
                           :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSucess" :file-list="fileList" >
                    <el-button slot="trigger" size="small" type="primary" v-if="botrue">选取文件</el-button>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload('stl3')" v-if="botrue">开始上传</el-button>
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
        name: "four",
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
                //element-ui插件自带
                dialogImageUrl:'',
                dialogVisible: false,

                //stl预览图上传的数组
                allstlfileid:[],

                filestlData:[],
                //stl文件上传的数组
                stlid:[],

                //上传按钮显示
                uploadLogo:'',

                //tup上传后展示数组
                fileList: [],
                //stl上传后展示数组
                fileStl:[],

                //上传请求头设定
                headers: {
                    Token:localStorage.getItem("Token")
                },
                //图片上传接口
                rouurl:this.GLOBAL.bastuse+"upload/images/partner",
                //stl上传接口
                stlrouurl:this.GLOBAL.bastuse+"addstl",

                //文本框类容
                content: '',
                //文本框的绑定通过id
                editorOption: {
                    modules: {
                        toolbar: '#toolbar'
                    }
                },
                //是否显示开始上传  --> 如果有上传文件则为false
                botrue:true,
            }
        },
        methods: {
            //触发文本类容获取
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

                //上传图片
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
                /*内存创建上传图片input file*/
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
            //开始文件上传设定
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            //图片上传成功返回
            handleAvatarSuccessstl(res){
                console.log("stl预览图上传成功");
                this.allstlfileid.push(res.fileLibId);
            },

            //限制上传个数字
            handleExceed(){
                this.$message.error('诊断图片只能上传九张，请删除后再上传');
            },
            //
            handlePreview(file) {
                console.log(file);
            },
            //文件成功上传返回
            handleSucess(res){
                console.log(res);

            },
            //初始化
            tonnn(){
                this.botrue = true;
                this.filestlData = [];
                this.fileList = [];
            },

            //上传图片
            submitUpload: function (val) {
                console.log(val);
                this.filestlData = new FormData();
                this.$refs.upload.submit();
                let url = '';
                this.filestlData.append('subdirectory',val);
                this.uploadLogo = "1";
                url = "addstl";

                var that = this;
                console.log(this.filestlData);
                this.changePhotodo(url,this.filestlData,(response) =>{
                    console.log(response.data);
                    this.uploadLogo = "2";
                    this.stlid = response.data;
                    // for(let i = 0; i<response.data.length; i++){
                    //     this.stlid.push(response.data[i])
                    // }
                    this.botrue = false;
                    this.filestlData = [];
                    console.log(this.stlid)
                },(error) =>{
                    console.log(error);
                    this.uploadLogo = "3";
                })
            },
            //提交stl文件操作
            uploadFile:function(file){
                console.log("第一步提交stl文件");
                console.log(file);
                this.filestlData.append('file', file.file);
                console.log(this.filestlData)
            },

            // 富文本的获取

            //保存
            clibtn(){

                // console.log(this.content);  //富文本
                // console.log(this.stlid);
                // console.log(this.allstlfileid);

                let stl = '';
                let pic = '';
                console.log(this.stlid);

                for(let i=0;i<this.stlid.length; i++){
                    stl += this.stlid[i]+","
                }
                for(let i=0;i<this.allstlfileid.length; i++){
                    pic += this.allstlfileid[i]+","
                }


                stl = stl.substring(0, stl.lastIndexOf(','));
                pic = pic.substring(0, pic.lastIndexOf(','));
                console.log(stl);
                console.log(pic);
                console.log(this.content);


                this.changeDatado("POST","caseHistory/updateToPatient",{
                    caseHistoryId:this.$route.query.id,
                    STL4:stl,
                    sTL4Picture:pic,
                    effectPrediction:this.content,
                },(response) =>{
                    console.log(response);
                },(error) =>{
                    console.log(error);
                })

            },

            //这是字符串切割(暂无用到)
            stringto(val){
                let stlval = '';
                for(let i=0;i<val.length; i++){
                    stlval += val[i]+","
                }
                stlval = stlval.substring(0, stlval.lastIndexOf(','));
                return stlval
            },
            //根据病例查询详细信息
            bluid(){
                //查询信息渲染
                this.$parent.$parent.tcloading = true;
                this.changeDatado("GET","caseHistory/details",{
                    caseHistoryId:this.$route.query.id
                },(response) =>{
                    this.$parent.$parent.tcloading = false;
                    console.log(response);
                    //stl
                    if(response.caseHistory.sTL4){
                        this.botrue = false;
                        this.uploadLogo = "2";
                        let flist=response.caseHistory.sTL4.split(",");
                        this.fileList = flist.map((value, i) => {
                            return {
                                name: value,
                            }
                        });
                        this.stlid = flist;
                        console.log("这是stl");
                        console.log(this.stlid);
                    }
                    //stl图片
                    if(response.caseHistory.sTL4Picture){
                        let filst = response.caseHistory.sTL4Picture.split(",");
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
                    this.content = response.caseHistory.effectPrediction;
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