<template>
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

        <div class="center-d">
            <div class="center-nav-cc">
                效果预测
            </div>
            <div class="center-center-nav" v-html="shj">

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "four",
        data(){
            return{
                stlbj:[],//stl预览图的style
                stlpo:[],//stl预览图展示
                shj:'', //效果预测类容
            }
        },
        methods:{
            // 调用的详情
            login(){
                this.changeDatado("GET","caseHistory/details",{
                    caseHistoryId:this.$route.query.id
                },(response) =>{
                    console.log(response);
                    //预览图渲染  sTL1Picture
                    if(response.caseHistory.sTL4Picture){
                        let stlp=response.caseHistory.sTL4Picture.split(",");
                        for(var i=0;i<stlp.length;i++){
                            this.stlpo.push(this.GLOBAL.bastuse+"view-image/"+stlp[i]);
                            this.stlbj.push({backgroundImage: "url(" + this.GLOBAL.bastuse+"view-image/"+stlp[i] + ")",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover"})
                        }
                    }else {
                        console.log("没有手术设计预览图")
                    }
                    if(response.caseHistory.effectPrediction){
                        this.shj = response.caseHistory.effectPrediction;
                    }else{
                        //没有效果预测文本
                        this.shj = "暂无效果预测";
                        console.log("没有效果预测")
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
        box-shadow:0px 0px 5px 0px rgba(18,49,137,0.09);
        border-radius:0px 0px 2px 2px;
        position: fixed;
        height: 650px;
        overflow: scroll;
        margin-top: 115px;
    }
    .photo{
        width: 100%;
        height: 196px;
    }
    .photo img{
        width: 100%;
        height: 100%;
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
        word-wrap:break-word;
        word-break:break-all;
        overflow: hidden;
    }
</style>