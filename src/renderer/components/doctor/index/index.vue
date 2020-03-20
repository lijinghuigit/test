<template>
    <div class="first-page">
        <div class="carousel">
            <img src="../../../assets/img/wait.png" alt="">
        </div>
        <div class="model">
            <el-row :gutter="20">
                <el-col :span="6" v-for="(item,index) in modd" :key='index' style="padding-left: 10px;padding-right: 10px; ">
                    <div class="grid-content bg-purple" :style=item.bac @click="flay(index)">
                        <el-row :gutter="20">
                            <el-col :span="14" style="height: 100%">
                                <div class="dc-title">{{item.title}}</div>
                                <div class="dc-num"> {{item.num}}</div>
                                <div class="dc-center">{{item.center}}</div>
                            </el-col>
                            <el-col :span="10">
                                <div class="dc-icphoto">
                                    <i :class=item.style></i>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="sliteting"></div>
                </el-col>
            </el-row>
        </div>

        <div>
            <el-row :gutter="20">
                <el-col :span="14">
                    <div class="grid-content-b bg-purple-d" style="height: 230px;padding: 15px;">
                        <img style="width: 100%;height: 100%;" alt="" src="../../../assets/img/shoxin.png">
                         <!--<div id="myChart"  style="width:100%; height:250px"></div>-->
                `   </div>
                </el-col>
                <el-col :span="10">
                    <div class="grid-content-b bg-purple-d">
                        <div class="ttopp">
                            <div class="ttopp-title">
                                最新新闻
                            </div>
                            <div style="display: flex;align-items:center;justify-content: center;">
                                <div class="ttopp-pho" @click="leaft()">
                                    <i class="iconfont icon-fanhui" style="margin-left: 1px;font-size: 13px;color: #27DD85;"></i>
                                </div>
                                <div class="ttopp-pho" @click="ringht()">
                                    <i class="iconfont icon-you" style="margin-left: 2px;font-size: 13px;color: #27DD85;"></i>
                                </div>
                            </div>
                        </div>
                        <div class="newcenter">
                            <!--这是第一个显示-->
                            <div style="padding: 8px 12px 6px 4px;display: flex;border-bottom:1px rgba(241,241,241,1) solid">
                                <div style="width: 60px;height: 60px;" :style=onenewsphoto>
                                    <!--<img  alt="">-->
                                </div>
                                <div style=" margin-left: 10px;width: calc(100% - 70px);margin-bottom: 8px;">
                                    <div style="display: flex;justify-content:space-between;">
                                        <div style="font-size:13px;font-family:PingFang-SC-Regular;font-weight:normal;
                                        color:rgba(160,165,177,1);line-height:20px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                                            {{onenews.title}}--{{onenews.author}}
                                        </div>
                                        <div style="font-size:12px;font-family:PingFang-SC-Regular;font-weight:normal;
                                        color:rgba(181,187,199,1);line-height:20px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                                            {{onenews.newstime}}
                                        </div>
                                    </div>
                                    <div style="font-size:12px;font-family:PingFang-SC-Regular;font-weight:normal;margin-top: 4px;
                                    color:rgba(196,198,204,1);line-height:18px;text-align: left;display: -webkit-box;-webkit-box-orient: vertical;
                                    -webkit-line-clamp: 2;overflow: hidden;">
                                        {{onenews.synopsis}}
                                    </div>
                                </div>
                            </div>

                            <!--这里开始循环-->
                            <div style=" padding: 8px 12px 6px 4px;
                            border-bottom:1px rgba(241,241,241,1) solid;height: 60px;"
                            v-for="(item,index) in news" :key="index">
                                <div style="display: flex;justify-content:space-between;">
                                    <div style="font-size:13px;font-family:PingFang-SC-Regular;font-weight:normal;
                                        color:rgba(160,165,177,1);line-height:25px; overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                                        {{item.title}}--{{item.author}}
                                    </div>
                                    <div style="font-size:12px;font-family:PingFang-SC-Regular;font-weight:normal;color:rgba(181,187,199,1);line-height:25px;
                                        overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                                        {{item.newstime}}
                                    </div>
                                </div>
                                <div style="font-size:12px;font-family:PingFang-SC-Regular;font-weight:normal;
                                    color:rgba(196,198,204,1);line-height:18px;text-align: left;display: -webkit-box;-webkit-box-orient: vertical;
                                    -webkit-line-clamp: 2;overflow: hidden;">
                                    {{item.synopsis}}
                                </div>
                            </div>

                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                modd:[
                    {id:'1',title:'已有病例',num:'100',center:'查看病例',img:'',bac:'background:linear-gradient(90deg,rgba(255,119,129,1) 0%,rgba(255,140,111,1) 100%);',style:'iconfont icon-muli1'},
                    {id:'2',title:'立即创建',num:'',center:'新建病例',img:'',bac:'background:linear-gradient(90deg,rgba(118,91,205,1) 2%,rgba(172,96,178,1) 100%);',style:'iconfont icon-zhangdanguangli1'},
                    {id:'3',title:'余额',num:'$100',center:'账单管理',img:'',bac:'background:linear-gradient(90deg,rgba(18,145,204,1) 0%,rgba(99,212,231,1) 100%);',style:'iconfont icon-zhandang'},
                    {id:'4',title:'完善信息',num:'100',center:'个人中心',img:'',bac:'background:linear-gradient(-90deg,rgba(255,168,97,1) 0%,rgba(255,145,91,1) 100%);',style:'iconfont icon-huanzhe'},
                ],    //四大项
                onenews:[],  //新闻对象第一个
                onenewsphoto:'',  //新闻图片
                news:[],    //新闻对象
                isone:false,  //是否是第一页
                islast:false,  //是否是最后一页
                ispagenum:1,  //初始页
                shuxin:"require('../../../assets/img/shoxin.png')"  //最底下那个图片
            }
        },
        components:{

        },
        methods:{
            // open(){
            //     const h = this.$createElement;
            //     this.$msgbox({
            //         title: '消息',
            //         message: h('p', null, [
            //             h('span', null, '内容可以是 '),
            //             h('i', { style: 'color: teal' }, 'VNode')
            //         ]),
            //         showCancelButton: true,
            //         confirmButtonText: '确定',
            //         cancelButtonText: '取消',
            //         beforeClose: (action, instance, done) => {
            //             if (action === 'confirm') {
            //                 instance.confirmButtonLoading = true;
            //                 instance.confirmButtonText = '执行中...';
            //                 setTimeout(() => {
            //                     done();
            //                     setTimeout(() => {
            //                         instance.confirmButtonLoading = false;
            //                     }, 300);
            //                 }, 3000);
            //             } else {
            //                 done();
            //             }
            //         }
            //     }).then(action => {
            //         this.$message({
            //             type: 'info',
            //             message: 'action: ' + action
            //         });
            //     });
            // },
            flay(num){
                //通过num判断点击哪一个
                console.log(num);
                if(num == 0){
                    this.$router.push({
                        path: '/caselist',  // 路由的名称
                    })
                }else if(num == 1){
                    // console.log("点击弹窗");
                    this.$prompt('请输入患者身份证', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        inputPattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$|^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/,
                        inputErrorMessage: '身份证格式不正确'
                    }).then(({ value }) => {
                        //查询患者信息
                        // caseHistory/selectPatientByIDcard
                        this.changeDatado("GET","caseHistory/selectPatientByIDcard",{
                            IDcard:value
                        },(response) =>{
                            console.log(response);
                            if(response.code == 1){
                                this.$confirm('尚未查到该患者是否自建病例', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(() => {
                                    // this.$message({
                                    //     type: 'success',
                                    //     message: '删除成功!'
                                    // });
                                    this.changeDatado("POST","caseHistory/createToPatient",{
                                        patientIDcard:response.iDcard,
                                        type:"DC"
                                    },(response) =>{
                                        // console.log(response.caseHistoryId);
                                        //跳转病例详情并且带参数
                                        this.$router.push({
                                            path: '/necalist',  // 路由的名称
                                            query: {
                                                id: response.caseHistoryId,
                                            }
                                        })
                                    },(error) =>{
                                        console.log(error)
                                    });
                                }).catch(() => {
                                    this.flay(num)
                                });
                            }else if(value == response.iDcard){
                                //跳转病例详情并且带参数
                                this.changeDatado("POST","caseHistory/createToPatient",{
                                    patientId:response.patientId,
                                    patientIDcard:response.iDcard,
                                    name:response.name,
                                    type:"PC"
                                },(response) =>{
                                    console.log(response.caseHistoryId);

                                    this.$router.push({
                                        path: '/necalist',  // 路由的名称
                                        query: {
                                            id: response.caseHistoryId,
                                        }
                                    })
                                },(error) =>{
                                    console.log(error)
                                });

                            }

                        },(error) =>{
                            console.log(error)
                        });
                    }).catch(() => {
                        this.$message({type: 'info',
                            message: '取消输入'
                        });
                    });
                }else if(num == 2){
                    console.log("点击弹窗");
                    this.$confirm('待完善', '关闭', {       //删除 注释:这里会报错因为electronUI和vue的版本不对 需要都升级或者安装对应的版本
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }).then(() => {

                    }).catch(() => {

                    });
                }else if(num == 3){
                    //跳转
                    this.$router.push({
                        path: '/setup',  // 路由的名称
                    })
                }
            },
            leaft(){
                // 新闻点击向左
                if(this.isone){
                    this.$message({
                        message: '这是第一页',
                        type: 'warning'
                    });
                    return
                }else{
                    this.newdata(this.ispagenum-1)
                }
            },
            //新闻点击向右
            ringht(){
                if(this.islast){
                    this.$message({
                        message: '这是最后一页',
                        type: 'warning'
                    });
                    return
                }else{
                    this.newdata(this.ispagenum+1)
                }
            },
            iten(){
              //获取用户个人信息
                this.changeDatado("GET","doctor/getDoctorInformation",{
                },(response) =>{
                    this.GLOBAL.doctcenter = response;
                },(error) =>{
                    console.log(error);
                });
            },
            newdata(page){
                //新闻的类容获取  http://192.168.1.7:8080/news/getNewsList
                this.changeDatado("GET","/news/getNewsList",{
                    page:page,
                    size:3,
                    Identification:''
                },(response) =>{
                    console.log(response);
                    this.onenews = response.list[0];
                    this.news = response.list.slice(1);
                    this.isone = response.isFirstPage;
                    this.islast = response.isLastPage;
                    this.ispagenum = response.pageNum;
                    this.onenewsphoto = {backgroundImage:"url(" + this.GLOBAL.bastuse+"view-image/"+response.list[0].picture + ")",
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover"};
                },(error) => {
                    console.log(error)
                });
            },
        },
        created(){
            this.iten();
            this.newdata(2);
        }
    }
</script>

<style scoped>
    .first-page{
        width: calc(100% - 40px);
        margin: 60px 20px 0 20px;
        overflow: hidden;
        padding-bottom: 10px;
        z-index:70;
        height: 710px;
        max-height: 710px;
    }
    .carousel{
        width:100%;
        height: 280px;
        border-radius:4px;
        background-color: #ccc;
    }
    .carousel img{
        width: 100%;
        height: 100%;
    }
    .model{
        margin-top: 20px;
        margin-bottom: 15px;
    }
    .el-row {

    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple {
        text-align: left;
        padding: 20px 0 0 14px;
        cursor: pointer;
    }
    .dc-title{
        font-size:14px;
        font-family:PingFang-SC-Regular;
        font-weight:normal;
        letter-spacing: 1px;
        color:rgba(255,255,255,1);
        line-height:16px;
        margin-bottom: 14px;
    }
    .dc-num{
        font-size:24px;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        letter-spacing: 2px;
        height: 26px;
        color:rgba(255,255,255,1);
        line-height:26px;
        margin-bottom: 28px;
    }
    .dc-center{
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:normal;
        letter-spacing: 1px;
        color:rgba(255,255,255,1);
        line-height:16px;
    }
    .dc-icphoto i{
        font-size: 60px;
        color: rgba(255,255,255,1);
    }


    .grid-content {
        border-radius: 4px;
        min-height: 110px;
        /* box-shadow:0px 0px 5px 0px rgba(0, 0, 0, 0.1); */
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

    .grid-content-b{
        border-radius: 4px;
        /* box-shadow:0px 0px 5px 0px rgba(18,49,137,0.1); */
    }
    .bg-purple-d{

    }
    .ttopp{
        background:rgba(39,221,133,1);
        border-radius:2px;
        text-align: left;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
    }
    .ttopp-title{
        font-size:14px;
        font-family:PingFang-SC-Regular;
        font-weight:normal;
        color:rgba(254,254,255,1);
        line-height:29px;
        letter-spacing: 1px;
    }
    .ttopp-pho{
        width:16px;
        margin-left: 10px;
        cursor: pointer;
        height:16px;
        background:rgba(255,255,255,1);
        opacity:0.9;
        border-radius:50%;
    }
    .newcenter{
        padding: 0px 4px;
    }

    .sliteting{
        width:100%;
        height:35px;
        margin-top: -55px;
        background:linear-gradient(266deg, rgba(248, 248, 248, 0) 0%, rgba(145, 145, 145, 0.1) 100%);  /*颜色需要更改*/
        border-radius:2px;
    }
</style>