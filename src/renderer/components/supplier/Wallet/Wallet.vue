<template>
    <div style="color:#666666;text-align:left;padding-left:10px;">
       <div style="border-bottom:1px solid #EFEFEF;height:84px;">
           <P style="line-height:84px;"><span style="font-size:14px;color:#333333;margin-right:10px;">余额(元):</span><span style="color:#2B5C83;font-size:24px;margin-right:20px;">{{TotalwalletData}}</span><el-button style="border:1px solid #86B0D4;" @click="withDraw()">提现</el-button></P>
       </div>
       <div style="display:flex;padding-top:15px;">
           <p style="margin-right:20px;">银行卡:</p>
           <div style="">
               <!-- <P><span>建设银行（储蓄卡 **** **** **** 1234）</span><span style="color:#86B0D4;font-size:12px;margin-left:10px;cursor:pointer;" @click="unbindCard()">解绑</span></P> -->
               <!-- <P><span>{{bankType}}</span><span style="color:#86B0D4;font-size:12px;margin-left:10px;cursor:pointer;" @click="unbindCard()">解绑</span></P>  -->
               <div style="">
                    <el-button  style="border:1px solid #86B0D4;color:#86B0D4;" @click="bindBankCard()">绑定银行卡</el-button>
               </div>
           </div>
       </div>
       <div class="bindcard" v-if="bindCard">
           <P><span>手机号</span><span style="margin-left:55px;">{{telephone}}</span></P>
           <P><span style="margin-right:23px;">持卡人</span><el-input v-model="bankPerson" placeholder="请输入持卡人姓名" style="width:20%;margin-left:34px;"></el-input></P>
           <P><span >银行卡卡号</span><el-input v-model="bankcard" placeholder="请输入银行卡号" style="width:20%;margin-left:34px;" @blur="getBank()"></el-input></P>
           <P><span>银行卡（类型）</span><span style="margin-left:10px;">{{bankName}}</span></P>
            <div style="margin-left:60px;margin-top:15px;">
                <el-button style="background:#86B0D4;color:#FFFFFF;" @click="bind()">绑定</el-button>
                <el-button style="color:#999999" @click="cancelBind()">取消</el-button>
            </div>
       </div>
        <div v-if="telvertify" style="margin-top:20px;">
            <P style="margin-bottom:15px;"><span>手机号码</span><el-input v-model="inputTel" placeholder="请输入手机号" style="width:20%;margin-left:30px;"></el-input></P>
            <div style="display:flex;">
                <P><span>验证码</span></P>
                <div style="display:flex;text-align:center;width:60%;margin-bottom:15px;margin-left:40px;"> 
                    <el-input placeholder="" v-model="getcode"  style="width:120px;"></el-input>
                    <div style="padding:5px 10px;background:#86B0D4;line-height:15px;text-align:center;">
                        <div slot="append" @click="getTelCode()" style="margin-top:5px;">{{vertifyCode}}</div>
                    </div>
                </div>
            </div>
            <el-button @click="next()" style="margin-left:70px;">下一步</el-button>
        </div>

    </div>
</template>
<script>
var BIN = require('bankcardinfo')
export default {
    components:{

    },
    data(){
        return{
            bindCard:false,
            inputTel:'',
            bankcard:'',
            bankName:'',
            cardTypeName:'',
            getcode:'',
            vertifyCode:'获取验证码',
            telvertify:false,
            telephone:'',
            myreg:/^[1][3,4,5,7,8][0-9]{9}$/,
            bankPerson:'',
            personNameReg:/^[\u4e00-\u9fa5]{2,4}$/,
            TotalwalletData:'',
        }
    },
    methods:{
          // 获取钱包数据
        myWalletData(){
            // console.log('钱包id')
            // console.log(this.GLOBAL.doctcenter.adminid)
            this.changeDatamo("GET","account/getMyWalletForPage",{
              supplierId:this.GLOBAL.doctcenter.adminid,//必传
              },(response)=>{
                  console.log(response)
                  if(response.code==0){
                    this.TotalwalletData=response.object.supAccount.amount
                  }else{
                    console.log('error')
                  }
              })
        },
        // 提现
        withDraw(){
            this.$notify({
                title: '警告',
                message: '暂无金额',
                type: 'warning',
            });
        },
        // 绑定银行卡
        bindBankCard(){
            this.telvertify=true
        },
        getBank(){
            BIN.getBankBin(this.bankcard,(err,data)=>{
                if(!err){
                    // 获得银行卡的信息
                    console.log(data)
                    // 银行名
                    this.bankName=data.bankName
                    // // 银行卡种类
                    this.cardTypeName=data.cardTypeName
                }else{
                    this.bankName=''
                    var message=err.split(',')[0].split(':')[1]
                    this.$notify({
                        title: '警告',
                        message: message,
                        type: 'warning',
                    });
                }
            })
        },
        getTelCode(){
            if(this.inputTel==''){
                this.$message({
                    message: '  请输入手机号',
                    type: 'warning'
                });
            }else if(!this.myreg.test(this.inputTel)){
                this.$message({
                    message: '手机号格式不正确',
                    type: 'warning'
                });
            }
            else{
                let url = "register/getSMSCodeToRetrievePassword"
                this.changeDataos(this.GLOBAL.logintt,"GET",url,{
                    telNum:this.inputTel
                },(response) =>{
                    console.log(response)
                    //返回值
                    this.Timer(response);
                },(error) =>{
                    //接口失败
                    console.log(error)
                })
            }
         
        },
        //计时器
        Timer(response){
            if(response.code == 0){
                //账号验证成功验证码发送
                this.$message({
                    message: response.msg,
                    type: 'success'
                });
                //计时器六十秒
                let seconds = 60;
                //计时器
                this.intervalid = setInterval(()=>{
                    //验证码显示
                    this.vertifyCode = "00:"+seconds;
                    seconds--;
                    if (seconds == 0){
                        //时间等于0时候
                        this.vertifyCode = "重新发送";
                        //清除计时器
                        clearInterval(this.intervalid);
                    }
                },1000);
            }else{
                //失败
                this.$message.error(response.msg);
            }
        },
        next(){
            if(this.inputTel==''){
                this.$message({
                    message: '手机号不能为空',
                    type: 'warning'
                });
            }else if(!this.myreg.test(this.inputTel)){
                this.$message({
                    message: '手机号格式不正确',
                    type: 'warning'
                });
            }
            else if(this.getcode==''){
                 this.$message({
                    message: '验证码不能为空',
                    type: 'warning'
                });
            }else{
                 // 清除计数器
              clearInterval(this.intervalid);
              // 进行后台验证码的验证
              // console.log(this.GLOBAL.tel)
              // console.log(this.originalinputCode)
              this.changeDatamo("POST","register/retrievePasswordVerification",{
                  telephone:this.inputTel,
                  smsVerCode:this.getcode
              },(response)=>{
                   console.log(response)
                 //验证通过
                  if(response.code == 0){
                    // 进行验证码的校验，成功后，进入下一步
                    this.telvertify=false
                    this.bindCard=true
                    // 下一步成功后，把电话赋值给下一步
                    this.telephone=this.inputTel
                  }else{
                    this.$message.error(response.msg);
                  }
               
              
              })
             
            }
         
        },
        bind(){
            if(this.bankPerson==''){
                this.$message({
                    message: '持卡人姓名不能为空',
                    type: 'warning'
                });
            }else if(!this.personNameReg.test(this.bankPerson)){
                this.$message({
                    message: '必须为汉字且2-4位',
                    type: 'warning'
                });
            }else if(this.bankcard==''){
                this.$message({
                    message: '银行卡不能为空',
                    type: 'warning'
                });
            }
            else{
                // 绑定成功后，调接口回显绑定的银行卡信息
                this.$message({
                    message: '该功能尚未开通',
                    type: 'warning'
                });
            }
        },
        cancelBind(){
            this.bindCard=false
        },
        unbindCard(){
            console.log('解绑银行卡')
        }
    },
    created(){
        this.myWalletData();
    }
}
</script>
<style scoped>
    .bindcard{
      margin-top: 15px;  
    }
    .bindcard p{
        margin-bottom: 10px;
    }
</style>