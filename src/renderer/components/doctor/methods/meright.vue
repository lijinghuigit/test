<template>
    <div class="box">
        <div class="box-center-do">
            <div class="box-ing-a">
                <img :src="phot" alt="" :οnerrοr="defaultImg">
            </div>
            <div class="box-title-b">
                {{name}}(创建者)
            </div>
            <div class="box-title-c">
                {{cont}}
            </div>
        </div>
        <!--<video-player  class="video-player vjs-custom-skin"-->
                       <!--ref="videoPlayer"-->
                       <!--:playsinline="true"-->
                       <!--:options="playerOptions">-->
        <!--</video-player>-->
    </div>
</template>

<script>
    export default {
        name: "meright",
        data(){
            return{
                name:'',   //创建者名称
                cont:'',    //介绍
                defaultImg:'this.src="' + require('../../../assets/img/wupgo.png') + '"',  //无图片
                phot:'',   //头像

                doid:'',   //医生id
            }
        },
        methods: {
            init(){
                //通过点击的id查询详情渲染
                this.changeDatado("GET","surgicalPlan/detailSurgicalPlan",{
                    surgicalPlanId:this.$route.query.id
                },(response) =>{
                    this.doctn = response.SurgicalPlan.doctorId
                    this.doid = response.SurgicalPlan.doctorId;

                    this.changeDatado("GET","doctor/getDoctorById",{
                        doctorId:response.SurgicalPlan.doctorId
                    },(response) =>{
                        this.phot = this.GLOBAL.bastuse+ "view-image/" + response.avatar;
                        this.name = response.name;
                        this.cont = response.title;
                    },(error) =>{
                        console.log(error)
                    })
                },(error) =>{
                    console.log(error)
                });
            },
        },
        created(){
            this.init();
        }
    }
</script>

<style>
    .box-center-mo .el-button{
        font-family:PingFang-SC-Medium!important;
        height: 30px!important;
        line-height: 30px!important;
        width: 220px;
        padding: 0!important;
    }

</style>

<style scoped>
    .box{
        position: fixed;
        right:0px;
        top: 50px;
        z-index: 90;
        width:260px;
        height:900px;
        text-align: center;
        background-color: #fff;
    }

    .box-center-do{
        margin: 20px 15px 0px 0px;
        height:190px;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 5px 0px rgba(18,49,137,0.1);
        border-radius:2px;
        box-shadow:0px 0px 5px 0px rgba(18,49,137,0.1);
        border-radius:2px;
        padding: 10px;
    }
    .box-ing-a{
        margin: 10px auto;
        width: 100px;
        height: 100px;
        background-color: #ccc;
        border-radius:50%;
    }

    .box-ing-a img{
        width: 100%;
        height: 100%;
        border-radius:50%;
    }

    .box-title-b{
        font-size:14px;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:rgba(68,85,95,1);
        line-height: 25px;
    }

    .box-title-c{
        font-size:12px;
        font-family:PingFang-SC-Medium;
        font-weight:normal;
        color:rgba(91,112,124,1);
        line-height: 16px;
    }

    .box-btn-t{
        display: flex;
        align-items:center;
        justify-content: center;
        cursor: pointer;
        width:92px;
        height:30px;
        background:rgba(27,218,154,1);
        border-radius:45px;
    }

    .ttmmoo{
        font-size:20px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height: 30px;
    }

    .ttmmoof{
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height: 30px;
        margin-right: 5px;
    }

    .iconfont{
        font-size: 20px;
    }

    .box-center-mo{
        margin: 20px 15px 0px 0px;
        height:260px;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 5px 0px rgba(18,49,137,0.1);
        border-radius:2px;
        box-shadow:0px 0px 5px 0px rgba(18,49,137,0.1);
        border-radius:2px;
    }

    .box-mid-top{
        display: flex;
        align-items:center;
        justify-content: center;
        background:rgba(27,218,154,1);
        margin-bottom: 10px;
    }

    .cctn .iconfont{
        color:#fff;
        font-size: 55px;
    }

    .llssdd{
        font-size:13px;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:rgba(255,255,255,1);
        line-height:20px;
    }

    .last-center{
        padding: 10px;
    }

    .center-last-end{
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: space-between;
    }
    .but-conter{
        margin: 20px 15px 0px 0px;
        height:140px;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 5px 0px rgba(18,49,137,0.1);
        border-radius:2px;
        box-shadow:0px 0px 5px 0px rgba(18,49,137,0.1);
        border-radius:2px;
    }

</style>