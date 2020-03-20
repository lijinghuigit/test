<template>
    <div class="top">
        <div class="tops">
            <div class="title">手术方法详情</div>
        </div>
        <div class="center">
            <div class="photo">
                <div class="block">
                    <el-carousel trigger="click" height="200px">
                        <el-carousel-item v-for="(item,index) in stlbj" :key="index">
                            <div :style=item>
                                <viewer>
                                    <img style="opacity:0;height: 200px" :src=stlpo[index] alt="">
                                </viewer>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
            <div class="mid">
                <div style="margin-bottom: 5px;margin-top: 15px;">
                    <span style="color:rgba(189,196,203,1);">手术方法名称 :</span><span style="color:rgba(102,102,102,1);">{{docffname}}</span>
                </div>
                <div style="margin-bottom: 5px;margin-top: 15px;">
                    <span style="color:rgba(189,196,203,1);">所属医生 :</span><span style="color:rgba(102,102,102,1);">{{doname}}</span>
                    <span style="color:rgba(189,196,203,1);">材料应用 :</span><span style="color:rgba(102,102,102,1);">{{clyy}}</span>
                </div>
            </div>
            <div class="center-d" style="padding-bottom: 20px;" >
                <!--手术方法详情-->
                <div>
                    <div class="center-nav-cc">
                        手术方法详情
                    </div>
                    <div class="center-center-nav" v-html="doxongq">
                    </div>
                </div>
            </div>
            <div class="center-d">
                <div class="center-nav-cc">
                    WORD
                </div>
                <div>
                    <div class="center-center-nav" style="border: 1px solid #ccc;" v-if="word">
                        <!--pdf转换-->
                        <webview style="height: 400px;" :src=wordpdf plugins></webview>
                        <!--<iframe style="width: 100%;" :src=wordpdf></iframe>-->
                    </div>
                    <div v-else>
                        没有word文件
                    </div>
                </div>
            </div>

            <div class="center-d" style="padding-bottom: 90px;">
                <div class="center-nav-cc">
                    PPT
                </div>
                <div>
                    <div class="center-center-nav" style="border: 1px solid #ccc;" v-if="ppt">
                        <!--pdf转换-->
                        <webview style="height: 400px;" :src=pptpdf plugins></webview>
                        <!--<iframe style="width: 100%;" :src=pptpdf></iframe>-->
                    </div>
                    <div class="center-center-nav" v-else>
                        没有ppt文件
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "methods",
        data(){
            return{
                stlbj:[],    //手术方法详情stl
                stlpo:[],    //手术方法详情图片
                // twosh:[],   //
                wordpdf:'',   //word文件
                pptpdf:'',   //ppt文件
                clyy:'',   //应用材料
                doname:'',  //所属医生
                doxongq:'',
                docffname:'',

                word:true,
                ppt:true,
            }
        },
        methods:{
            // 调用的详情
            login(){
                //
                this.changeDatado("GET","surgicalPlan/detailSurgicalPlan",{
                    surgicalPlanId:this.$route.query.id
                },(response) =>{
                    this.doname = response.SurgicalPlan.doctorName;
                    this.doxongq = response.SurgicalPlan.surgicalPlan;
                    this.docffname = response.SurgicalPlan.surgicalPlanName;

                    this.changeDatado("GET","guidePlateMaterial/getGuidePlateMaterialDetails",{
                        guideguidePlateMaterialId:response.SurgicalPlan.spare1
                    },(response) =>{
                        if(response.sTLPicture){
                            let stlp=response.sTLPicture.split(",");
                            for(var i=0;i<stlp.length;i++){
                                this.stlpo.push(this.GLOBAL.bastuse+"view-image/"+stlp[i]);
                                this.stlbj.push({backgroundImage: "url(" + this.GLOBAL.bastuse+"view-image/"+stlp[i] + ")",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover"});
                            }
                        }else{
                            this.stlpo.push(require("../../../assets/img/wupgo.png"));
                            this.stlbj.push({backgroundImage: "url(" + require("../../../assets/img/wupgo.png") + ")",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover"});
                        }
                    },(error) =>{
                        console.log(error)
                    });

                    if(response.SurgicalPlan.wordPPT){
                        console.log("这是word");
                        this.word = true;
                        this.wordpdf = this.GLOBAL.bastuse+"/wordppt?fileLibId="+response.SurgicalPlan.wordPPT+"&WP=word"
                    }else{
                        this.word = false;
                        console.log("没有word")
                    }

                    if(response.SurgicalPlan.ppt){
                        this.ppt = true;
                        this.pptpdf = this.GLOBAL.bastuse+"/wordppt?fileLibId="+response.SurgicalPlan.ppt+"&WP=ppt"
                    }else{
                        this.ppt = false;
                        console.log("没有ppt")
                    }

                    //材料应用
                    this.clyy = "材料应用";
                },(error) =>{
                    console.log(error)
                });
            }

        },
        created(){
            this.login();
        }
    }
</script>

<style scoped>
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

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
        /*margin-left: 15px;*/
        width: calc(100% - 510px);
        background-color: #fff;
        border-radius:0px 0px 2px 2px;
        position: fixed;
        height: 650px;
        overflow: scroll;
        margin-top: 115px;
        /* box-shadow:0px 0px 5px 0px rgba(18,49,137,0.09); */
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