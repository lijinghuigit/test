<template>
    <div  class="top">
        <div class="tops">
            <div class="title" :class="{green:toto==1}" @click="tonum(1)">电子病例</div>
            <div class="title" :class="{green:toto==2}" v-if="trn" @click="tonum(2)">手术方法</div>
            <div class="title" :class="{green:toto==3}" v-if="trn" @click="tonum(3)">手术设计</div>
            <div class="title" :class="{green:toto==4}" v-if="trn" @click="tonum(4)">效果预测</div>
            <div class="title" :class="{green:toto==5}" v-if="trn" @click="tonum(5)">术后随访</div>
            <div style="flex: 3;"></div>
        </div>
        <div class="dww">
            <div v-if="this.toto == 1">
                <one-val ref="mychild"></one-val>
            </div>
            <div v-if="this.toto == 2">
                <two-val></two-val>
            </div>
            <div v-if="this.toto == 3">
                <three-val></three-val>
            </div>
            <div v-if="this.toto == 4">
                <four-val></four-val>
            </div>
            <div v-if="this.toto == 5">
                <five-val></five-val>
            </div>
        </div>
        <div class="botctn" v-if="trn">
            <span @click="xiug()" v-if="xiugaiqt">
                <i class="iconfont icon-bianji" style="font-size: 22px"></i>
                <span style="margin: 0;padding-left: 5px;">
                    修改
                </span>
            </span>
            <span @click="delel()" v-if="shanchudel">
                <i class="iconfont icon-shanchu"></i>
                <span style="margin: 0;padding-left: 5px;">
                    删除
                </span>
            </span>
            <span @click="fabu()" v-if="fabqx">
                <i class="iconfont icon-fabu"></i>
                <span style="margin: 0;padding-left: 5px;" v-if="wcfb">
                    发布
                </span>
                <span style="margin: 0;padding-left: 5px;" v-else>
                    完成
                </span>
            </span>
        </div>

        <div class="botctn" v-else>
            <span @click="togobackyi()">
                <span style="margin: 0;padding-left: 5px;">
                    取消
                </span>
            </span>
            <span @click="baocunt()">
                <span style="margin: 0;padding-left: 5px;">
                    保存
                </span>
            </span>
        </div>
    </div>
</template>

<script>
    import OneVal from './one'
    import TwoVal from './two'
    import ThreeVal from './three'
    import FourVal from './four'
    import FiveVal from './five'
    export default {
        name: "left",
        data(){
          return{
              toto:1,  //默认第一个病例详情
              fabqx:true,  //发布按钮
              wcfb:true,   //完成发布按钮
              shanchudel:true,   //删除按钮
              xiugaiqt:true,  //修改按钮
              trn:true,  //按钮是否显示
              autd:'',
          }
        },
        components:{
            OneVal,
            TwoVal,
            ThreeVal,
            FourVal,
            FiveVal
        },
        methods:{
            //保存类容按钮
            baocunt(){
                //保存类容 保存类容方法在子页面父级页面只是调用
                this.$refs.mychild.toupsll();
            },
            //取消按钮
            togobackyi(){
                this.$router.push({
                    path: '/caselist',  // 路由的名称
                })
            },
            tonum(num){
                //点击导航
                /**
                 * 通过num来判断显示什么页面
                 * */
                this.toto = num
            },
            //点击修改按钮
            xiug(){
                //修改病例 跳转页面
                this.$router.push({
                    path: '/necalist',  // 路由的名称
                    query: {
                        id: this.$route.query.id,
                    }
                })
            },
            //点击发布病例
            fabu(){
                //判断能否发布
                if(this.wcfb){
                    //判断是否有手术设计和预览效果stl图片
                    if(this.sTL3Picture && this.sTL4Picture){
                        this.$confirm('发布病例', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            //发布
                            this.changeDatado("POST","caseHistory/updateCaseHisStatus",{
                                caseHistoryId: this.$route.query.id,
                                status:"YFB"
                            },(response) =>{
                                console.log(response);

                                if(response.code == 0){
                                    //发布成功
                                    this.$message({
                                        type: 'success',
                                        message: '发布成功!'
                                    });
                                }else{
                                    //发布失败
                                    this.$message({
                                        type: 'info',
                                        message: response.msg
                                    });
                                }
                                //调用刷新渲染
                                this.init();
                            },(error) =>{
                                console.log(error);
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '发布失败'
                            });
                        });
                    }else{
                        this.$message({
                            type: 'info',
                            message: '请先完善手术设计'
                        });
                    }
                }else{
                    //完成病例 完成病历有需求类容 判断需求
                    this.$confirm('完成病历', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        //完成病例
                        this.changeDatado("POST","caseHistory/updateCaseHisStatus",{
                            caseHistoryId: this.$route.query.id,
                            status:"YWC"
                        },(response) =>{
                            console.log(response);
                            if(response.code == 0){
                                //病例完成
                                this.$message({
                                    type: 'success',
                                    message: '完成病历!'
                                });
                            }else{
                                //病例未完成
                                this.$message({
                                    type: 'info',
                                    message: response.msg
                                });
                            }
                            //从新渲染
                            this.init();
                        },(error) =>{
                            console.log(error);
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '操作失败'
                        });
                    });
                }

            },
            delel(){
                //删除病例
                this.$confirm('删除病例', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //删除病例
                    this.changeDatado("POST","caseHistory/deletCaseHistory",{
                        caseHistoryId: this.$route.query.id
                    },(response) =>{
                        console.log(response);
                        if(response.code == 1){
                            this.$message({
                                type: 'info',
                                message: '删除失败'
                            });
                        }else{
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            //跳转页面
                            this.$router.push({
                                path: '/caselist'  // 路由的名称
                            })
                        }
                    },(error) =>{
                        console.log(error);
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            init(){
                //渲染页面
                if(this.GLOBAL.logintt == 1){
                    this.trn = false;
                }else{
                    this.trn = true;
                    this.changeDatado("GET","caseHistory/details",{
                        caseHistoryId:this.$route.query.id
                    },(response) =>{
                        //查看是否能发布或者是否能完成病例作用
                        this.autd = response.caseHistory.authorizationStatus;
                        this.sTL3Picture = response.caseHistory.sTL3Picture;
                        this.sTL4Picture = response.caseHistory.sTL4Picture;
                        this.supplierOrdersId = response.caseHistory.supplierOrdersId;


                        if(response.caseHistory.status == "YWC"){
                            //如果是已完成病例
                        }else{
                            // 否则显示修改按钮;
                            this.xiugaiqt = true;
                            if (response.caseHistory.status == "WFB") {
                                //未发布病例显示发布按钮和删除按钮
                                this.wcfb=true;
                                this.shanchudel = true;
                            } else {
                                //关闭发布按钮显示完成按钮删除按钮取消
                                this.wcfb=false;
                                this.shanchudel = false
                            }
                        }
                    },(error) =>{
                        console.log(error);

                    });
                }

            }
        },
        created(){
            this.init();
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
        box-shadow:0px 1px 3px 0px rgba(18,49,137,0.09);
        border-radius:2px 2px 0px 0px;
        width: calc(100% - 508px);
        z-index:50;
        margin-top: 60px;
        background-color: #fff;
    }
    .tops .title{
        background: rgba(255,255,255,1);
        flex: 1;
        cursor: pointer;
        font-size:14px;
        line-height: 55px;
        text-align: center;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(164,169,178,1);
    }
    .green{
        color:rgba(3,215,143,1) !important;
        background:rgba(224,248,233,1) !important;
        border-radius:2px 2px 0px 0px!important;
    }
    .botctn{
        height: 20px;
        position: fixed;
        bottom: 0;
        text-align: right;
        width: 760px;
        z-index:50;
        padding-bottom: 30px;
        margin-bottom: 10px;
        background-color: #fff;
        /*background:rgba(255,255,255,1);*/
        border:1px solid rgba(230,230,230,1);
        border-radius:0px 0px 2px 2px;
    }
    .botctn span{
        background: rgba(255,255,255,1);
        font-size:16px;
        font-family:PingFang-SC-Medium;
        margin: 10px 20px;
        padding-right: 10px;
        font-weight:500;
        color:rgba(175,174,174,1);
        line-height:50px;
        cursor: pointer;
    }

</style>