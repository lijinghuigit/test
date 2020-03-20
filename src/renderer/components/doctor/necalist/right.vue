<template>
    <div class="box">
        <div class="box-center-do">
            <div class="box-ing-a">
                <img src="../../../assets/img/wait.png" alt="">
            </div>
            <div class="box-title-b">
                (主治医师)
            </div>
            <div class="box-title-c">
                外科医生
            </div>
            <div style="display: flex;justify-content: space-between;margin: 20px 7px 0 7px;">
                <div class="box-btn-t">
                    <div class="ttmmoo">
                        <i class="iconfont icon-tianjiaxiezhu"></i>
                    </div>
                    <div class="ttmmoof">
                        添加协助

                    </div>

                </div>
                <div class="box-btn-t">
                    <div class="ttmmoo">
                        <i class="iconfont icon-quanxianshezhi"></i>
                    </div>
                    <div class="ttmmoof">
                        权限设置
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "right",
        data(){
            return{
                // options: [{
                //     value: '1',
                //     label: '骨头'
                // }, {
                //     value: '2',
                //     label: '小骨头'
                // }, {
                //     value: '3',
                //     label: '大骨头'
                // }, {
                //     value: '4',
                //     label: '龙骨'
                // }, {
                //     value: '5',
                //     label: '头骨'
                // }],
                // value: ''
            }
        }
    }
</script>

<style>
    .box-center-mo .el-input__inner{
        font-family:PingFang-SC-Medium;
        height: 35px;
        line-height: 35px;
    }
    .box-center-mo .el-input__icon{
        line-height: 35px;
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
        height:220px;
        background:rgba(255,255,255,1);
        /* box-shadow:0px 0px 5px 0px rgba(18,49,137,0.1); */
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
        width:100px;
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
/**/
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

</style>