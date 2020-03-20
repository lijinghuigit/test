<template>
    <div style="color:#666666;text-align:left;">
        <div style="display:flex;">
            <div>
                <span style="color:#666666;font-size:14px;">支付内容：</span>
                 <el-select v-model="value6" placeholder="选择类型">
                    <el-option
                    v-for="item in bill"
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
                  <el-date-picker
                        v-model="value7"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions2"
                        @change="selectTime"
                        >
                  </el-date-picker>
            </div>
            <el-button style="border:1px solid #86B0D4;" @click="query">查询</el-button>
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
            bill: [{
                value: 'Beijing',
                label: '提现'
                }, {
                value: 'Shanghai',
                label: '结算'
                },],
            value6: '',
            menu:[
                {'title':'订单编号'},{'title':'付款时间'},{'title':'支付内容'},{'title':'金额(元)'},{'title':'支付方式'},{'title':'收款方'},{'title':'有疑问'}
            ],
            pickerOptions2: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            },
            value7: ''
        }
    },
    methods:{
        selectTime(val){
            // 这两个一样
            console.log(this.value7)
            console.log(val)
        },
        query(){
            this.$message('暂无明细');
        }
    }
}
</script>
<style scoped>

</style>