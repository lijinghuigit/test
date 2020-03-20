<template>
    <div class="center">
        <div class="center-d">
            <div class="center-nav-cc">
                选择分类
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
                    <el-select v-model="valuetwo" placeholder="请选择" style="margin-left: 25px" @change="clickson">
                        <el-option
                                v-for="item in optitwo"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                :disabled="item.disabled">
                        </el-option>
                    </el-select>
                    <el-select v-model="valuethree" placeholder="请选择" style="margin-left: 25px" @change="ssfatr">
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

        <div class="center-d" style="display: flex;margin-bottom: 20px;" >
            <div style="flex: 1;">
                <div class="center-nav-cc">
                    选择方法
                </div>
                <div style="width: calc(100% - 40px);margin: 0 20px 0 20px">
                    <div class="trongs">
                        <el-input :disabled="false" v-model="fanfa" placeholder="选择方法"></el-input>
                    </div>
                </div>
            </div>
            <div style="flex: 1;">
                <div class="center-nav-cc">
                    病历号
                </div>
                <div style="width: calc(100% - 40px);margin: 0 20px 0 20px">
                    <div class="trongs">
                        <el-input :disabled="true" v-model="catio" placeholder="病历号"></el-input>
                    </div>
                </div>
            </div>
        </div>

        <div class="hehe" style="display: flex;margin:0 20px 40px 0;flex-direction:row;flex-wrap:wrap;">
            <div style="margin:10px 15px;
           width:140px;height:170px;border: 4px solid #fff;
            box-shadow:0px 0px 3px 0px rgba(140,140,140,0.2);"
                 v-for="(item,i) in xiangxi" @click="fainti(item.toid)" :key="i"
            :class="{border:item.toid == blid}">
                <div style="width: 140px;height: 120px;" :style=item.id>
                    <img style="width: 100%;height: 100%;" src="../../../assets/img/wupgo.png" alt="">
                </div>
                <div>
                    <div style="margin-top:5px;line-height:25px;overflow: hidden;text-overflow:ellipsis;
                    white-space: nowrap;font-size:14px;font-family:PingFang-SC-Regular;font-weight:400;color:rgba(98,107,124,1);">{{item.laber}}</div> -->
                     <div style="line-height:20px;text-overflow:ellipsis;overflow: hidden;
                    white-space: nowrap;font-size:12px;font-family:PingFang-SC-Regular;font-weight:normal;color:rgba(98,107,124,1);">
                        {{item.title}}
                    </div>
                </div>
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
    export default {
        name: "two",
        data(){return{
            valueone:'',//种类一级
            valuetwo:'',//种类二级
            valuethree:'',//种类三级

            optione:[],//所有的一级种类
            optitwo:[],//所有的二级种类
            optithree:[],//所有的三级种类

            xiangxi:[],//塞选获取的手术方法

            fanfa:'', //选择的方法名称
            catio:'',  //病例号
            blid:0,  //获取选择方法给予选中状态


        }},
        methods:{
            //获取第一个的父级的信息
            father(){
                this.changeDatado("GET", "diseaseCategory/parentList", {
                }, (response) => {
                    this.$parent.$parent.tcloading = false;
                    console.log(response);
                    this.optione = response.map((value, i) => {
                        return {
                            value: value.diseaseCategoryId,
                            label: value.diseaseCategoryName
                        }
                    });
                    this.ssfats();
                }, (error) => {
                    console.log(error);

                });
            },
            //通过一级获取二级的信息
            clickmath(diseaseCategoryId){
                this.valueone = diseaseCategoryId;
                this.changeDatado("GET", "diseaseCategory/sonList", {
                    diseaseCategoryId: diseaseCategoryId
                }, (response) => {
                    this.$parent.$parent.tcloading = false;
                    console.log(response);
                    this.optitwo = response.map((value, i) => {
                        return {
                            value: value.diseaseCategoryId,
                            label: value.diseaseCategoryName
                        }
                    });
                    this.ssfats();
                }, (error) => {
                    console.log(error);

                });
            },
            //通过二级获取三级信息
            clickson(diseaseCategoryId){
                this.valuetwo = diseaseCategoryId;
                this.changeDatado("GET", "diseaseCategory/sonList", {
                    diseaseCategoryId: diseaseCategoryId
                }, (response) => {
                    this.$parent.$parent.tcloading = false;
                    console.log(response);
                    this.optithree = response.map((value, i) => {
                        return {
                            value: value.diseaseCategoryId,
                            label: value.diseaseCategoryName
                        }
                    });
                    this.ssfats();
                }, (error) => {
                    console.log(error);

                });
            },
            //通过三级获取详情信
            ssfatr(diseaseCategoryId){
                this.valuethree = diseaseCategoryId;
                this.ssfats();
            },
            //手术方法渲染
            ssfats(){
                this.changeDatado("GET", "surgicalPlan/list", {
                    start: 1,
                    length:8,
                    parentId:this.valueone,
                    diseaseCategoryId:this.valuetwo,
                    diseaseCategoryId2:this.valuethree
                }, (response) => {
                    this.$parent.$parent.tcloading = false;
                    console.log(response.list);
                    this.xiangxi = response.list.map((value, i) => {
                        return {
                            toid:value.surgicalPlanId,
                            laber: value.diseaseCategoryName,
                            title: value.title,
                            id:{backgroundImage:"url(" + this.GLOBAL.bastuse+"view-image/"+value.stlPic.split(",")[0] + ")",
                                backgroundPosition: "center center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover"}
                        }
                    });
                }, (error) => {
                    console.log(error);

                });
            },

            //获取手术方法id
            fainti(id){
              console.log("获取病例id="+id);
                this.blid = id
            },


            //根据病例查询详细信息
            bluid() {

                this.catio = this.$route.query.id;
                //加载状态开启
                this.$parent.$parent.tcloading = true;
                this.changeDatado("GET", "caseHistory/details", {
                    caseHistoryId: this.$route.query.id
                }, (response) => {
                    //加载状态关闭
                    this.$parent.$parent.tcloading = false;
                    console.log(response);
                    if(response.caseHistory.video){
                        console.log("已经选择了病例")
                    }else{
                        console.log("尚未选择病例")
                    }
                }, (error) => {
                    console.log(error);

                });
            },
            //保存
            clibtn(){
                this.changeDatado("POST","caseHistory/updateToPatient",{
                    caseHistoryId:this.$route.query.id,
                    video:this.blid,

                },(response) =>{
                    console.log(response);
                },(error) =>{
                    console.log(error);
                })
            },
        },

        //儿子获取父级的信息

        created(){
            this.father();
            this.bluid();
        }
    }
</script>
<style>
.hehe{
    color:rgb(0, 0, 0)
}
    .trongs .el-input__inner{
        background:rgba(249,249,249,1);
        box-shadow:0px 0px 2px 0px rgba(32,32,32,0.13);
        border: 0;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(74,75,78,1) !important;
    }
</style>

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
    /*.ivu-upload {*/
        /*display: none;*/
    /*}*/

    .anbtn{
        display: flex;
        margin: 0 12px 60px 12px;
        flex-direction:row-reverse;
    }

    .border{
        border: 4px solid #03D78F !important;
    }
</style>