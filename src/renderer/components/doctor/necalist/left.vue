<template>
    <div  class="top">
        <div class="tops">
            <div class="title" :class="{green:toto==1}" @click="tonum(1)">电子病例</div>
            <div class="title" :class="{green:toto==2}" @click="tonum(2)">手术方法</div>
            <div class="title" :class="{green:toto==3}" @click="tonum(3)">手术设计</div>
            <div class="title" :class="{green:toto==4}" @click="tonum(4)">效果预测</div>
            <div class="title" :class="{green:toto==5}" @click="tonum(5)">术后随访</div>
            <div style="flex: 3;"></div>
        </div>
        <div class="dww">
            <div v-if="this.toto == 1">
                <one-val></one-val>
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
        <!--<div class="botctn">-->
            <!--<span @click="xiug()">-->
                <!--<i class="iconfont icon-bianji" style="font-size: 22px"></i>-->
                <!--<span style="margin: 0;padding-left: 5px;">-->
                    <!--返回目录-->
                <!--</span>-->
            <!--</span>-->
            <!--<span @click="delel()">-->
                <!--<i class="iconfont icon-shanchu"></i>-->
                <!--<span style="margin: 0;padding-left: 5px;"> min-height-->
                    <!--取消-->
                <!--</span>-->
            <!--</span>-->
            <!--<span @click="fabu()">-->
                <!--<i class="iconfont icon-fabu"></i>-->
                <!--<span style="margin: 0;padding-left: 5px;">-->
                    <!--保存-->
                <!--</span>-->

            <!--</span>-->
        <!--</div>-->

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
                toto:1,//默认进入页面时候显示第一个
                blucenter:'尚未获取到消息',
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
            tonum(num){
                //点击导航
                this.toto = num
            },
            xiug(){
                //修改病例

            },
            fabu(){
                //发布病例

            },
            delel(){
                //删除病例

            },
        },
        created(){
            this.cid = this.$route.query.id;
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
        width: calc(100% - 508px);
        /* box-shadow:0px 1px 3px 0px rgba(18,49,137,0.09); */
        border-radius:2px 2px 0px 0px;
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

</style>