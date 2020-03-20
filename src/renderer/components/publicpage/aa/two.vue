<template>
    <div class="center">
        <div class="photo">
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

        <div class="mid">
            <div style="margin-top: 5px">
                <span style="color:rgba(189,196,203,1);">所属医生 :</span><span style="color:rgba(102,102,102,1);">{{name}}</span>
            </div>
            <!--<div style="margin-top: 5px">-->
                <!--<span style="color:rgba(189,196,203,1);">手术材料 :</span><span style="color:rgba(102,102,102,1);">葵花果</span>-->
            <!--</div>-->
            <div style="margin-top: 5px">
                <span style="color:rgba(189,196,203,1);">手术方案 :</span><span style="color:rgba(102,102,102,1);">{{sjname}}</span>
            </div>
        </div>

        <div class="center-d">
            <div class="center-nav-cc">
                方法文档
            </div>
            <div class="center-center-nav">
                <webview style="width: 100%;height: 400px;" :src=wordpdf></webview>
            </div>
        </div>

        <div class="center-d">
            <div class="center-center-nav">
                <webview style="width: 100%;height: 400px;" :src=pptpdf></webview>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "two",
        data(){
            return{
                stlpo:[], //stl图片的数组
                stlbj:[], //stl图片背景的数组

                sjname:'', //手术方案名称
                name:'',   //所属医生

                wordpdf:'', //wordpdf展示
                pptpdf:'',  //pptpdf展示
            }
        },
        methods:{
            // 调用的详情
            login(){
                this.changeDatado("GET","caseHistory/details",{
                    caseHistoryId:this.$route.query.id
                },(response) =>{
                    console.log(response);
                    //如果有值
                    if(response.caseHistory.video){
                        //手术方法
                        this.ssff(response.caseHistory.video);
                    }else{
                        console.log("未选择手术方法")
                    }
                },(error) =>{
                    console.log(error);

                });
            },
            ssff(id){
                //通过id查询手术方法
                this.changeDatado("GET","surgicalPlan/detailSurgicalPlan",{
                    surgicalPlanId:id
                },(response) =>{
                    //手术方法所属医生名称
                    this.name = response.SurgicalPlan.doctorName;
                    //手术方案名称
                    this.sjname = response.SurgicalPlan.diseaseCategoryName;

                    //手术方法和背景图片
                    if(response.SurgicalPlan.stlPic){
                        let stlp=response.SurgicalPlan.stlPic.split(",");
                        for(var i=0;i<stlp.length;i++){
                            this.stlpo.push(this.GLOBAL.bastuse+"view-image/"+stlp[i]);
                            this.stlbj.push({backgroundImage: "url(" + this.GLOBAL.bastuse+"view-image/"+stlp[i] + ")",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover"})
                        }
                    }else{
                        console.log("没有手术设计预览图")
                    }

                    //显示word和ppt功能
                    if(response.SurgicalPlan.wordPPT){
                        //word的pdf显示
                        this.wordpdf = this.GLOBAL.bastuse+"/wordppt?fileLibId="+response.SurgicalPlan.wordPPT+"&WP=word"
                    }else{
                        console.log("没有手术设计word")
                    }

                    if(response.SurgicalPlan.ppt){
                        //ppt的pdf显示
                        this.pptpdf = this.GLOBAL.bastuse+"/wordppt?fileLibId="+response.SurgicalPlan.ppt+"&WP=ppt"
                    }else{
                        console.log("没有手术设计ppt")
                    }

                },(error) =>{
                    console.log(error);
                });
            }
        },
        created(){
            this.login();
        }
    }
</script>

<style scoped>
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
        padding-bottom: 90px;
    }
</style>