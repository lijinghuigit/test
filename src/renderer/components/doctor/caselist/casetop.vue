<template>
    <div class="methary">
        <!-- 病例目录的顶部 -->
        <div>
            <!-- 左边的标题 -->
            <div class="top">
                <div class="titl">
                    病例目录
                </div>
                <div class="center">
                     所有患者的病历信息
                </div>
            </div>
            <div style="display:flex;
            align-items: center;
            justify-content: space-between;">
                <div>
                    <ul id="breadcrumb">
                        <li v-for="(item,index) in tobar" :key="index"><a @click="initor(index)">{{item}}</a></li>
                    </ul>
                </div>
                <div class="methaays" style="display: flex;">
                    <el-input
                            placeholder="请输入内容"
                            v-model="input">
                        <i @click="intosou()" slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </div>
            </div>
        </div>
        <!-- 病例目录 的内容 banner -->
        <div>
            <div style="margin-top: 6px;display: flex;flex-direction:row;flex-wrap:wrap;">
                <!--@click="togo()"-->
                <div class="onebox"  @click="into()">
                    <div class="titles">
                        新建病历
                    </div>
                    <div class="centers">
                        骨折手术常用于修复膝关节软骨病损的技术。
                        医生利用关节透镜将软骨受损部位移除,接下来在
                        骨头上钻几个洞,使骨髓细胞与血液会凝结平滑且坚固的...
                    </div>
                </div>
                <!--循环下面的内容-->
                <div class="box" v-for="(item,index) in metha"  @click="togo(item.fen)" :key="index"> 
                    <el-row style="height: 100%;padding: 4px;">
                        <el-col class="box-img" :style=item.img :span="8">
                        </el-col>

                        <el-col style="height: 100%" :span="16">
                            <div style="margin:8px;">
                                <div class="box-title">
                                    {{item.title}}
                                </div>
                                <div class="box-name">
                                    {{item.fen}}   |   {{item.time}}
                                </div>
                                <div class="box-center">
                                    {{item.center}}
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "casetop",
        data() {
            return {
                input: '',   //搜索病例输入的类容
                metha:[],  //渲染展示的病例
                identity:'ZZ', // 请求参数值，医生自制
                list:[],   //  查询出的所有值
                methas:[],  //   未处理的数据
                tobar:["全部","未发布","未授权","已授权","已完成","参与病例","模拟自建"],//顶部选择
                // bance:false,   //
                cunte:"",   //图片路径头
            }
        },
        components:{

        },
        methods:{
            indt(num){
                console.log(num);
                this.$router.push({
                    path: '/dofa',  // 跳转的路由
                })
            },
            initor(num){
                if(this.GLOBAL.logintt == 1){
                    if(num == 0){
                        console.log("供应商点击全部病例");
                        this.metha = this.list;
                        this.init(0,0);
                        return
                    }
                    if(num == 1){
                        console.log("供应商点击未完成病例");
                        return
                    }
                    if(num == 2){
                        console.log("供应商点击已完成病例");
                        return
                    }
                }else{
                    if(num == 0){
                        this.metha = this.list;
                        this.init(0,0);
                        return
                    }
                    if(num == 1){
                        this.init("WFB","WSQ");
                        // this.initss("WFB","WSQ");
                        return
                    }
                    if(num == 2){
                        this.init("YFB","WSQ");//未授权
                        return
                    }
                    if(num == 3){
                        this.init("YFB","YSQ");//未授权
                        return
                    }
                    if(num == 4){
                        this.init("YWC","YSQ");//未授权
                        return
                    }
                    if(num == 5){
                        this.init(0,0);//协助病例 待修改
                        return
                    }
                    if(num == 6){//未授权
                        this.initse();
                        console.log("这是自建病例");
                        return
                    }
                }
            },
            initse(){
                this.changeDatado("GET","caseHistory/list",{
                    status:"ALL",
                    type:"DC",
                    identity:this.identity
                },(response) =>{
                    console.log(response); //查询所有自建病例
                    this.list = response;
                    this.initss(0,0);
                },(error) =>{
                    console.log(error)
                })
            },
            initss(status,authorizationStatus){
                if(status == 0){
                    console.log("进入了这里了");
                    this.metha = this.list.map((value, i) => {
                        return this.hzname(value.name,value.title,value.picture,value.caseHistoryId,value.createTime);
                    });
                }else{
                    this.methas = this.list.map((value, i) => {
                        if(value.status == status && value.authorizationStatus == authorizationStatus){
                            return this.hzname(value.name,value.title,value.picture,value.caseHistoryId,value.createTime);
                        }
                    });
                    this.metha = [];
                    for ( let i = 0 ;  i<this.methas.length ;i++ ){
                        if(this.methas[i]){
                            this.metha.push(this.methas[i])
                        }
                    }
                }
            },

            hzname(name,title,picture,caseHistoryId,createTime){
                if(this.GLOBAL.logintt == 1){
                    this.cunte = this.GLOBAL.bastuseyo
                }else{
                    this.cunte = this.GLOBAL.bastuse
                }
                if(name){
                    if(title){
                        if(picture){
                            //处理picture图片
                            return {
                                img:{backgroundImage:"url(" + this.cunte+"view-image/"+picture.split(",")[0] + ")",
                                    backgroundPosition: "center center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover"},
                                title:name,
                                fen:caseHistoryId,
                                time:createTime,
                                center:title,
                            }
                        }else{
                            return {
                                img:{backgroundImage:"url(" + require("../../../assets/img/wupgo.png") + ")",
                                    backgroundPosition: "center center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover"},
                                title:name,
                                fen:caseHistoryId,
                                time:createTime,
                                center:title,
                            }//
                        }
                    }else{
                        if(picture){
                            return {
                                img:{backgroundImage:"url(" + this.cunte+"view-image/"+picture.split(",")[0] + ")",
                                    backgroundPosition: "center center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover"},
                                title:name,
                                fen:caseHistoryId,
                                time:createTime,
                                center:"暂无内容",
                            }

                        }else{
                            return {
                                img:{backgroundImage:"url(" + require("../../../assets/img/wupgo.png") + ")",
                                    backgroundPosition: "center center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover"},
                                title:name,
                                fen:caseHistoryId,
                                time:createTime,
                                center:"暂无内容",
                            }
                        }
                    }
                }else{
                    if(title){
                        if(picture){
                            return {
                                img:{backgroundImage:"url(" + this.cunte+"view-image/"+picture.split(",")[0] + ")",
                                    backgroundPosition: "center center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover"},
                                title:"患者病例",
                                fen:caseHistoryId,
                                time:createTime,
                                center:title,
                            }
                        }else{
                            return {
                                img:{backgroundImage:"url(" + require("../../../assets/img/wupgo.png") + ")",
                                    backgroundPosition: "center center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover"},
                                title:"患者病例",
                                fen:caseHistoryId,
                                time:createTime,
                                center:title,
                            }
                        }
                    }else{
                        if(picture){
                            return {
                                img:{backgroundImage:"url(" + this.cunte+"view-image/"+picture.split(",")[0] + ")",
                                    backgroundPosition: "center center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover"},
                                title:"患者病例",
                                fen:caseHistoryId,
                                time:createTime,
                                center:"暂无内容",
                            }
                        }else{
                            return {
                                img:{backgroundImage:"url(" + require("../../../assets/img/wupgo.png") + ")",
                                    backgroundPosition: "center center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover"},
                                title:"患者病例",
                                fen:caseHistoryId,
                                time:createTime,
                                center:"暂无内容",
                            }
                        }
                    }
                }
            },
            intosou(){// 搜索病例
                if(this.input){
                    let tpern = [];
                    for (let i = 0; i<this.metha.length;i++){
                        if(this.metha[i].title == this.input){
                            tpern.push(this.metha[i]);
                        }
                    }
                    this.metha = tpern;
                }else{
                    this.$message({
                        message: '请输入搜索类容',
                        type: 'warning'
                    });
                }
            },
            togo(id){
                this.$router.push({path: '/dofa',
                    query: {
                        id: id,
                    }
                })
            },
            into(){
                if(this.GLOBAL.logintt == 1){
                    // 医疗影像端页面功能
                    this.$confirm('供应商创建病例正在开发中', '关闭', {       //删除 注释:这里会报错因为electronUI和vue的版本不对 需要都升级或者安装对应的版本
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }).then(() => {
                    }).catch(() => {
                    });
                }else{
                    this.$prompt('请输入患者身份证', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        inputPattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$|^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/,
                        inputErrorMessage: '身份证格式不正确'
                    }).then(({value}) => {
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
                                    this.changeDatado("POST","caseHistory/createToPatient",{
                                        patientIDcard:response.iDcard,
                                        type:"DC"
                                    },(response) =>{
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
                                this.changeDatado("POST","caseHistory/createToPatient",{
                                    patientId:response.patientId,
                                    patientIDcard:response.iDcard,
                                    name:response.name,
                                    type:"PC"
                                },(response) =>{
                                    console.log(response.caseHistoryId);
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
                            }
                        },(error) =>{
                            console.log(error)
                        });
                    }).catch(() => {
                        this.$message({type: 'info',
                            message: '取消输入'
                        });
                    });
                }
            },
            init(one,two){
                if(this.GLOBAL.logintt == 1){
                    console.log(one);
                    console.log(two);
                    this.tobar = ["全部","未完成","已完成"];
                    this.changeDatayo("GET","caseHistory/list",{
                    },(response) =>{
                        console.log(response);//查询所有病例
                        this.list = response;
                        this.initss(one,two);
                    },(error) =>{
                        console.log(error)
                    })
                }else{
                    this.tobar = ["全部","未发布","未授权","已授权","已完成","参与病例","模拟自建"];
                    this.changeDatado("GET","caseHistory/list",{
                        status:"ALL",
                        type:"PC",
                        identity:this.identity
                    },(response) =>{
                        console.log(response); //查询所有病例
                        this.list = response;
                        this.initss(one,two);
                    },(error) =>{
                        console.log(error)
                    })
                }

            },
        },
        created(){
            this.init(0,0);
        }
    }
</script>

<style>
    .methaays .el-input__inner{
        width: 170px;
        margin-top: 12px;
        border-radius: 45px;
        height: 30px;
        line-height: 29px;
        font-family: PingFang-SC-Bold;
    }
    .methaays .el-input__prefix{
        margin-top: 7px;
    }
    .methaays .el-input__icon{
        cursor: pointer;
        font-size: 18px;
        line-height: 40px;
    }
</style>

<style scoped>
    .methary{
        margin: 60px 5px 20px 25px;
        padding-bottom: 20px;
        min-height: 680px;
    }

    .top{
        text-align: left;
    }

    .titl{
        font-size:18px;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:rgba(51,51,51,1);
        line-height:26px;
        letter-spacing: 1px;
    }

    .center{
        font-size:12px;
        font-family:PingFang-SC-Bold;
        font-weight:normal;
        color:rgba(157,157,161,1);
        line-height:24px;
        letter-spacing: 1px;
    }

    .methaays{
        margin-right: 45px;
    }

    /* 面包削导航 */
    #breadcrumb {
        cursor: pointer;
        list-style: none;
        margin-left: 0px;
        padding-left: 0px;
    }

    #breadcrumb .icon {
        font-size: 12px;
    }

    #breadcrumb li {
        float: left;
    }

    #breadcrumb li a {
        font-size:12px;
        font-family:PingFang-SC-Medium;
        font-weight:normal;
        color:rgba(162,164,176,1);
        color: #FFF;
        display: block;
        background: #ccc;
        text-decoration: none;
        position: relative;
        height: 30px;
        line-height: 30px;
        padding: 0 10px 0 0;
        text-align: center;
        margin-right: 23px;
    }

    #breadcrumb li:nth-child(even) a {
        background-color: #ccc;
    }

    #breadcrumb li:nth-child(even) a:before {
        border-color: #ccc;
        border-left-color: transparent;
    }

    #breadcrumb li:nth-child(even) a:after {
        border-left-color: #ccc;
    }

    #breadcrumb li:first-child a {
        padding-left: 15px;
    }

    #breadcrumb li:first-child a:before {
        border: none;
    }

    #breadcrumb li:last-child a {
        padding-right: 15px;
    }

    #breadcrumb li:last-child a:after {
        border: none;
    }

    #breadcrumb li a:before, #breadcrumb li a:after {
        content: "";
        position: absolute;
        top: 0;
        border: 0px solid #ccc;
        border-width: 15px 10px;
        width: 0;
        height: 0;
    }

    #breadcrumb li a:before {
        left: -20px;
        border-left-color: transparent;
    }

    #breadcrumb li a:after {
        left: 100%;
        border-color: transparent;
        border-left-color: #ccc;
    }

    #breadcrumb li a:hover {
        color:#03D78F;
        background-color: #fff;
    }

    #breadcrumb li a:hover:before {
        border-color: #fff;
        border-left-color: transparent;
    }

    #breadcrumb li a:hover:after {
        border-left-color: #fff;
    }

    #breadcrumb li a:active {
        background-color: #fff;
    }

    #breadcrumb li a:active:before {
        border-color: #fff;
        border-left-color: transparent;
    }

    #breadcrumb li a:active:after {
        border-left-color: #fff;
    }

    .onebox{
        cursor:pointer;
        min-width:330px;
        max-width:330px;
        min-height:143px;
        background:linear-gradient(-32deg, rgb(91, 213, 254) 0%,rgba(48,184,255,1) 100%);
        border-radius:5px;
        margin: 7px 11px 7px 0;
    }

    .titles{
        text-align: left;
        font-size:16px;
        letter-spacing:2px;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:rgba(254,254,255,1);
        line-height:19px;
        text-shadow:0px 1px 1px rgba(17,33,60,0.1);
        margin: 16px 0 0 9px;
    }

    .centers{
        text-align: left;
        font-size:12px;
        font-family:PingFang-SC-Medium;
        font-weight:normal;
        color:rgba(251,251,255,1);
        letter-spacing: 1px;
        line-height:20px;
        text-shadow:0px 1px 1px rgba(17,33,60,0.1);
        margin: 10px 45px 18px 9px;
    }

    .box{
        cursor:pointer;
        min-width:327px;
        max-width:327px;
        height:143px;
        border-radius:5px;
        margin: 7px 11px 7px 0;
        text-align: left;
    }

    .box:hover{
        background: rgb(241, 241, 241);

    }

    .box-img{
        height: 100%;
    }

    .box-title{
        font-size:16px;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:rgba(51,51,51,1);
        line-height:26px;
        letter-spacing: 1px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    .box-name{
        font-size:12px;
        font-family:PingFang-SC-Regular;
        font-weight:normal;
        color:rgba(190,190,190,1);
        line-height:25px;
        letter-spacing: 1px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    .box-center{
        font-size:12px;
        font-family:PingFang-SC-Regular;
        font-weight:normal;
        color:rgba(190,190,190,1);
        line-height:19px;
        letter-spacing: 1px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }

</style>