<template>
    <div style="color:#666666;text-align:left;">
        <div style="display:flex;">
            <div>
                <span style="color:#666666;font-size:14px;">支付内容：</span>
                 <el-select v-model="value6" placeholder="选择账单类型">
                    <el-option
                    v-for="item in cities"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    <span style="float: left">{{ item.label }}</span>
                    <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
                    </el-option>
                </el-select>
            </div>
            <div style="margin:0px 10px 0px 30px;">
                 <span style="color:#666666;font-size:14px;">查询时间：</span>
                 <el-select v-model="value7" placeholder="6个月内">
                    <el-option
                    v-for="item in cities"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    <span style="float: left">{{ item.label }}</span>
                    <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
                    </el-option>
                </el-select>
            </div>
            <div>
                <input type="text" placeholder="输入病历相关信息，如病历号等" style="width:170px;height:36px;padding:0px 16px;border:1px solid #EEEEEE; 
                outline:none; -webkit-appearance: none;position:relative;"/>
                <i class="el-icon-search" style="position:absolute;right:296px;top:128px;cursor:pointer;font-size:16px;"></i>
            </div>
            <el-button style="border:1px solid #86B0D4;margin-left:10px;">查询</el-button>
        </div>
        <div style="margin-top:20px;">
            <div style="display:flex;background:#E9F4FD;height:40px;">
                <p v-for="(item,index) in menu" :key="index" style="flex:1;line-height:40px;">{{item.title}}</p>
            </div>
            <!-- <div style="display:flex;background:#E9F4FD;height:40px;">
                <p v-for="(item,index) in data" :key="index" style="flex:1;line-height:40px;">{{item.title}}</p>
            </div> -->
        </div>
    </div>
</template>
<script>
export default {
    components:{

    },
    data(){
        return{
            cities: [{
                value: 'Beijing',
                label: '北京'
                }, {
                value: 'Shanghai',
                label: '上海'
                }, {
                value: 'Nanjing',
                label: '南京'
                }, {
                value: 'Chengdu',
                label: '成都'
                }, {
                value: 'Shenzhen',
                label: '深圳'
                }, {
                value: 'Guangzhou',
                label: '广州'
                }],
                value6: '',
                value7:'',
                menu:[
                    {'title':'订单编号'},{'title':'下单时间'},{'title':'账单类型'},{'title':'金额(元)'},{'title':'对应病历'},{'title':'备注'}
                ]
            }
        }
}
</script>
<style scoped>
    input::-webkit-input-placeholder{
        color:#999999;
        font-size: 12px;
        text-indent: 10px
    }
</style>