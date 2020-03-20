<template>
  <div style="text-align: left;">
      <!-- 更换手机号 -->
      <div style="border-top:1px solid #EFEFEF;">
        <div style="display:flex;">
              <div class="account" style="">手机号码</div>
              <div class="accnum" style="text-align:left;" >{{hidetelephone}}</div>
              <div style="line-height:40px;text-align:right;margin-left:321px;"><i @click="fold_up()" class="iconfont icon-xiugaibangdingshouji" style="color:#7AA5C9;font-size:12px;cursor:pointer;">&nbsp;&nbsp;更换手机号</i></div>
        </div>
        <!-- 内容 -->
       <el-dialog title="" :visible.sync="dialogFormVisible=priceDialogTel" :modal='false' :close-on-click-modal='true' top="280px" center width="380px">
            <div slot="title" style="display:flex;width:100%;background:#86B0D4;height:40px;line-height:40px;margin-top:10px;">
                <div class="center-top-data">更换手机号</div>
            </div>
            <div class="content" v-if="content_boolean" style="height:200px;margin-top:20px;margin-left:10px;">
              <div style="margin:0px 0px 20px 12px;display:flex;">
                  <p style="font-size:14px;margin-right:10px;">当前手机号码:</p>
                  <p style="font-size:14px;">{{hidetelephone}}</p>
                  <P style="color:#86B0D4;font-size:12px;margin-left:60px;cursor:pointer;" @click="amendTel()" v-if="amendtelephone">更改手机号码</P>
              </div>

              <!-- 确定之后的内容切换   新手机号的绑定-->
              <div v-if="sureBooleanChange">
                    <div style="display:flex;text-align:center;width:90%;margin-bottom:10px;"> 
                          <div style="width:132px;line-height:40px;margin-left:0px;">输入新手机号码</div>
                          <el-input placeholder="" v-model="newTel" style="width:200px;"></el-input>
                    </div>
                    <div style="display:flex;text-align:center;width:90%;margin-bottom:15px;"> 
                        <div style="width:107px;line-height:40px;margin-left:0px;margin-right:23px;">输入验证码</div>
                        <el-input placeholder="" v-model="newTelCode" style="width:132px;"></el-input>
                        <div style="width:72px;padding:5px 5px;background:#86B0D4;line-height:15px;text-align:center;">
                              <div slot="append" @click="getTelCode(0)" style="cursor:pointer;">{{getCode}}</div>
                        </div>
                    </div>
                    <div style="margin-left:65px;">
                        <el-button @click="bindTel()" style="background:#86B0D4;color:#FFFFFF;">绑定</el-button>
                        <el-button @click="cancelBind()" style="color:#999999;margin-bottom:5px;">取消</el-button>
                        <p style="color:#86B0D4;margin-left:-60px;cursor:pointer;" @click="returnTel()">返回修改手机号</p>
                    </div>
              </div>

              <!-- 原手机号获取验证码 -->

              <div v-if="sureBooleanInput"  style="display:;text-align:center;width:50%;margin-bottom:10px;">
                  <el-input placeholder="请输入验证码" v-model="originalinputCode" style="width:233px;margin-left:12px;">
                        <div slot="append" @click="getTelCode(1)" style="cursor:pointer;">{{getCode}}</div>
                  </el-input>
                  
              </div>
              <P style="color:#86B0D4;text-decoration:underline;margin-left:12px;line-height:20px;cursor:pointer;" @click="emaliVertify()" v-if="emailAmendTel">当前手机号码无法使用？使用邮箱验证</P>
              <div v-if="sureBooleanInput" @click="sureChange()" style="width:58px;height:26px;padding:5px 10px;margin:20px 0px 0px 70px;background:#86B0D4;cursor:pointer;">
                    <P style="text-align:center;margin-bottom:5px;"> 下一步</P>
              </div>
              <!-- 邮箱验证的内容 -->
              <div v-if="EmailCheck" style="padding-left:12px;">
                  <div style="display:flex;text-align:center;width:80%;margin-bottom:10px;" v-if="vertifyEmail"> 
                       <div style="width:100px;line-height:40px;text-align:left;margin-right:20px;">输入邮箱</div>
                       <el-input placeholder="" v-model="EmailSwitchTel" style="width:300px;"></el-input>      
                  </div>
                  <div style="display:flex;text-align:center;width:80%;margin-bottom:10px;" v-else> 
                       <div style="width:100px;line-height:40px;text-align:left;margin-right:0px;">当前邮箱</div>
                       <p style="line-height:40px;font-size:14px;">{{emailAccount}}</p>     
                  </div>
                  <div style="display:flex;text-align:center;width:80%;margin-bottom:15px;"> 
                      <div style="width:;line-height:40px;margin-right:10px;text-align:left;">输入验证码</div>
                      <el-input placeholder="" v-model="EmailSwitchTelcode"  style="width:92px;"></el-input>
                      <div style="padding:5px 0px;background:#86B0D4;line-height:30px;text-align:center;width:80px;">
                            <div slot="append" @click="getTelCode(5)">{{getCode}}</div>
                      </div>
                  </div>
                  <div style="margin:25px 0px 0px 25px;">
                      <el-button style="color:#999999;height:38px;width:80px;" @click="cancelEmail()">取消</el-button>
                      <el-button style="background:#86B0D4;color:#FFFFFF;height:38px;" @click="nextBind()">下一步</el-button>
                  </div>
              </div>
               <div style="color:rgba(89,89,89,1);margin:10px 0px;color:rgba(89,89,89,1);" v-if="NewTelbool">
                      <div style="display:flex;text-align:center;width:95%;margin-bottom:10px;margin-top:30px;"> 
                        <div style="width:100px;line-height:40px;text-align:left;margin-right:15px;">输入新手机号码</div>
                        <el-input placeholder="" v-model="inputNewTel" style="width:200px;"></el-input>
                      </div>
                      <div style="margin-left:80px;">
                          <el-button style="background:#86B0D4;color:#FFFFFF;margin:25px 0 0 168px;" @click="getTelCode(6)">下一步</el-button>
                      </div>
              </div>
              <div v-if="getNewTel">
                  <div style="display:flex;">
                          <div class="account" style="width:85px;">新手机号码</div>
                          <div class="accnum" style="text-align:left;" >{{inputNewTel}}</div>
                  </div>
                  <div style="display:flex;text-align:right;width:95%;margin-bottom:10px;"> 
                        <div style="line-height:40px;margin-right:37px;text-align:left;">输入验证码</div>
                        <el-input placeholder="" v-model="changeTelCode" style="width:120px;"></el-input>
                        <div style="width:65px;padding:5px 10px;background:#86B0D4;line-height:30px;text-align:center;">
                            <div slot="append" @click="getTelCode(7)" style="cursor:pointer;width:70px;height:30px;">{{getCode}}</div>
                        </div>
                  </div>
                  <div style="margin-left:80px;">
                          <el-button style="background:#86B0D4;color:#FFFFFF;margin:25px 0 0 155px;" @click="EmailchangeTel()">绑定</el-button>
                   </div>
              </div>
                    
            </div>
      </el-dialog>
      </div>

      <!-- 修改登陆密码 -->
      <div style="border-top:1px solid #EFEFEF;">
          <div style="display:flex;">
              <div class="account" style="">登录密码</div>
              <div class="accnum" style="text-align:left;">*********</div>
              <!-- <div class="accnum" style="width:30%;text-align:left;" v-if="showLoginPwd" >*********</div> -->
              <!-- 后台返回显示的登陆密码 -->
              <!-- <div class="accnum" style="width:30%;text-align:left;" v-else>123</div> -->
              <!-- <div v-if="showLoginPwd" @click="hidePwd()"><i class="iconfont icon-yincangmima" style="color:#666666;line-height:40px;margin-right:-16px;"></i></div> -->
              <!-- <div v-else  @click="showPwd()"><i class="iconfont icon-xianshimima" style="color:#666666;line-height:40px;margin-right:-16px;"></i></div> -->
              <div style="line-height:40px;text-align:right;margin-left:348px;"><i @click="fold_up_secret()" class="iconfont icon-xiugaimima" style="color:#7AA5C9;font-size:12px;cursor:pointer;">&nbsp;&nbsp;修改密码</i></div>
          </div>
        <!-- 修改密码的内容 -->
         <el-dialog title="" :visible.sync="dialogFormVisible=priceDialogSecret" :modal='false' :close-on-click-modal='true' top="280px" center width="380px" style="right:;">
            <div slot="title" style="display:flex;width:100%;background:#86B0D4;height:40px;line-height:40px;">
                <div class="center-top-data">修改登录密码</div>
            </div>
            <div v-if="amend">
                <!-- 密码验证 -->
                <div v-if="amendSecret" style="color:rgba(89,89,89,1);margin:10px 0px;">
                      <div style="display:flex;text-align:center;width:90%;margin-bottom:10px;"> 
                            <div style="width:50%;line-height:40px;margin-right:10px;">输入旧密码</div>
                            <el-input placeholder="" v-model="oldPassword"></el-input>
                      </div>
                      <div style="display:flex;text-align:center;width:90%;margin-bottom:10px;"> 
                            <div style="width:50%;line-height:40px;margin-right:10px;">输入新密码</div>
                            <el-input placeholder="" v-model="newPassword"></el-input>
                      </div>
                      <div style="display:flex;text-align:center;width:90%;margin-bottom:10px;"> 
                            <div style="width:50%;line-height:40px;margin-right:10px;">确认新密码</div>
                            <el-input placeholder="" v-model="surePassword"></el-input>
                      </div>
                      <el-button style="background:#86B0D4;color:#FFFFFF;margin:10px 0 0 226px;" @click="pwdChange()">确认</el-button>
                      <P @click="telVertify()" style="color:#86B0D4;margin:10px 0px 0px 10px;cursor:pointer;text-align:left;">忘记旧密码？使用手机验证</p>
                </div>
                <!-- 手机号码验证 -->
                <div v-else style="color:rgba(89,89,89,1);margin:10px 0px;">
                    <div style="display:flex;">
                          <div class="account" style="">手机号码</div>
                          <div class="accnum" style="text-align:left;" >{{hidetelephone}}</div>
                    </div>
                    <div style="display:flex;text-align:right;width:95%;margin-bottom:10px;"> 
                          <div style="line-height:40px;margin-right:37px;text-align:left;">输入验证码</div>
                          <el-input placeholder="" v-model="pwdGetCode" style="width:120px;"></el-input>
                          <div style="width:65px;padding:5px 10px;background:#86B0D4;line-height:30px;text-align:center;">
                              <div slot="append" @click="getTelCode(1)" style="cursor:pointer;width:70px;height:30px;">{{getCode}}</div>
                          </div>
                    </div>
                    <div style="display:flex;text-align:center;width:95%;margin-bottom:10px;"> 
                          <div style="line-height:40px;text-align:left;margin-right:37px;">输入新密码</div>
                          <el-input placeholder="" v-model="telInputPwd" style="width:204px;"></el-input>
                    </div>
                    <div style="display:flex;text-align:center;width:95%;margin-bottom:10px;"> 
                          <div style="line-height:40px;margin-right:37px;text-align:left;">确认新密码</div>
                          <el-input placeholder="" v-model="TelSurePwd" style="width:204px;"></el-input>
                    </div>
                    <el-button style="background:#86B0D4;color:#FFFFFF;margin:10px 0 0 226px;height:30px;" @click="telChangePwd()">确认</el-button>
                    <span style="color:#86B0D4;margin:10px 0 0 10px;cursor:pointer;font-size:12px;display:block;" @click="returnSecret()">返回密码验证</span>
                </div>
            </div>
        </el-dialog>
      </div>
      
      
      <!-- 绑定邮箱 --> 
      <div style="border-top:1px solid #EFEFEF;">
          <div style="display:flex;position:relative;">
              <div class="account" style="">绑定邮箱</div>
              <div class="accnum"  style="text-align:left;" v-if="bindEmailBoolean" >未绑定</div>
              <div class="accnum"  style="text-align:left;display:flex;" v-else > 
                <P style="margin-left:0px;font-size:14px;margin-top:5px;"><span>{{emailAccount}}</span></P>
                <div style="line-height:40px;text-align:right;margin-left:423px;;position:absolute;"><i @click="fold_up_email()" class="iconfont icon-bangdingyouxiang" style="color:#7AA5C9;font-size:12px;cursor:pointer;">&nbsp;&nbsp;邮箱绑定</i></div>
              </div>
              <div style="line-height:40px;text-align:right;margin-left:376px;" v-if="bindEmailBoolean"><i @click="fold_up_email()" class="iconfont icon-bangdingyouxiang" style="color:#7AA5C9;font-size:12px;cursor:pointer;">&nbsp;&nbsp;邮箱绑定</i></div>
          </div>
          <!-- 绑定邮箱的内容 -->
          <el-dialog title="" :visible.sync="dialogFormVisible=priceDialogBindEmail" :modal='false' :close-on-click-modal='true' center top="280px" width="380px" style="right:;">
            <div slot="title" style="display:flex;width:100%;background:#86B0D4;height:40px;line-height:40px;">
                <div class="center-top-data">邮箱绑定</div>
            </div>
            <div v-if="amendEmail">
                <!-- 点击绑定邮箱 -->
                <!-- 邮箱验证 -->
                <div style="color:rgba(89,89,89,1);margin:10px 0px;color:rgba(89,89,89,1);">
                      <div style="display:flex;text-align:center;width:95%;margin-bottom:10px;margin-top:30px;"> 
                        <div style="width:100px;line-height:40px;text-align:left;margin-right:;">输入邮箱</div>
                        <el-input placeholder="" v-model="inputEmail" style="width:200px;"></el-input>
                      </div>
                      <div style="margin-left:80px;">
                          <el-button style="background:#86B0D4;color:#FFFFFF;margin:25px 0 0 168px;" @click="getTelCode(4)">下一步</el-button>
                      </div>
                </div>
            </div>
            <div v-else>
                <p style="line-height:20px;color:#86B0D4;">我们已经向您的邮箱发送了一封邮件，请登陆邮箱并于下框中输入该邮件中的验证码</p>
                <el-input placeholder="请输入邮箱验证码" v-model="inputEmailCode"  style="width:145px;margin:15px 0 0 80px;"></el-input>
                <el-button style="background:#86B0D4;color:#FFFFFF;margin:20px 0 0 260px;display:block;" @click="bindEmail()">确定</el-button>
            </div>
          </el-dialog>
      </div>
  </div>
</template>

<script>
    export default {
        name: "passwordset",
        data() {
          return {
            priceDialogTel:false,
            priceDialogSecret:false,
            priceDialogPay:false,
            priceDialogBindEmail:false,
            inputone: '',  //第一次输入密码
            inputtwo: '',  //第二次输入密码
            input3:'',//邮箱
            input4:'',//邮箱验证码
            tel:this.GLOBAL.tel,//手机号码 账号
            arrow_top:true,
            arrow_bottom:false,
            content_boolean:false,
            getCode:'获取验证码',
            myreg:/^[1][3,4,5,7,8][0-9]{9}$/,  //手机号码验证
            emailreg:/^\w+((\.\w+){0,3})@\w+(\.\w{2,3}){1,3}$/,
            originalinputCode:'',//更换手机号时的原手机验证码
            intervalid:'', //验证码计时器
            sureBooleanInput:false,//确定之后，进行手机号的更换
            sureBooleanChange:false,
            // 修改登陆密码
            arrow_top_secreat:true,
            arrow_bottom_secret:false,
            amendSecret:true,
            // 修改密码展开的内容
            amend:false,
            // 支付密码修改
            arrow_top_pay:true,
            arrow_bottom_pay:false,
            amendSecretPay:true,
            amendPay:false,
            // 邮箱绑定
            arrow_top_email:true,
            arrow_bottom_email:false,
            amendEmail:true,
            oldPassword:'',
            newPassword:'',
            surePassword:'',
            pwdGetCode:'',//更换密码获取的验证码
            telInputPwd:'',//用手机号更改密码的输入密码
            TelSurePwd:'',//用手机号更改密码的确认密码
            showLoginPwd:true,//显示的登陆密码为****
            newTel:'',//新手机号
            newTelCode:'',//新手机号的验证码
            amendtelephone:true,//更改手机号的提示
            hidetelephone:'',
            paymyreg:/^\d{6}$/,
            oldpaysecret:'',
            newpaysecret:"",
            surepaysecret:'',
            emailAmendTel:true,
            EmailCheck:false,
            inputEmail:'',
            inputEmailCode:'',
            bindEmailBoolean:true,
            emailAccount:'',//邮箱账号
            EmailSwitchTel:'',
            EmailSwitchTelcode:'',
            showEmail:false,//邮箱发送验证码成功后的下一步显示
            vertifyEmail:true,
            bindStatus:'',
            inputNewTel:'',
            changeTelCode:'',
            NewTelbool:false,
            getNewTel:false,
          }
        },
        methods:{
          fold_up(){
            this.priceDialogTel=true
            this.arrow_top=false
            this.arrow_bottom=true
            this.content_boolean=true
          },
          // 更换手机号按钮
          amendTel(){
              this.amendtelephone=false;
              this.sureBooleanInput=true;
              this.EmailCheck=false;
              this.emailAmendTel=true;
          },
          // 返回修改手机号页面
          returnTel(){
             this.sureBooleanInput=false;
             this.sureBooleanChange=false;
             this.emailAmendTel=true   
          },
          cancelEmail(){
            this.priceDialogTel=false
          },
          emaliVertify(){
            this.emailAmendTel=false;
            // 手机验证的内容全部消失
            this.sureBooleanInput=false;
            this.sureBooleanChange=false;
            // 邮箱验证出现
            this.EmailCheck=true;
            this.amendtelephone=true
          },
          nextBind(){
            console.log(this.bindStatus)
            console.log(this.emailAccount)
            if(this.bindStatus!=1){
                 if(this.EmailSwitchTel==''){
                    this.$message.error('邮箱不能为空');
                  }else if(!this.emailreg.test(this.EmailSwitchTel)){
                    this.$message.error('邮箱格式不正确');
                  }else if(this.EmailSwitchTelcode==''){
                    this.$message.error('验证码不能为空');
                  }else{
                      this.changeDatamo("GET","register/verifyActiveEmailTel",{
                        email:this.EmailSwitchTel,
                        emailActiveCode:this.EmailSwitchTelcode
                      },(response) =>{
                        if(response.code==0){
                           this.getCode = "重新发送";
                          //清除计时器
                           clearInterval(this.intervalid);
                          // 让下一步的内容展示出来
                            this.EmailCheck=false
                            this.NewTelbool=true
                        } else{
                          this.$message({
                            message: response.message,
                            type: 'error'
                          });
                        }  
                    })
                  }
            }else if(this.bindStatus==1){
              if(this.EmailSwitchTelcode==''){
                    this.$message.error('验证码不能为空');
              }else{
                  this.changeDatamo("GET","register/verifyActiveEmailTel",{
                    email:this.emailAccount,
                    emailActiveCode:this.EmailSwitchTelcode
                },(response) =>{
                  if(response.code==0){
                     this.getCode = "重新发送";
                      //清除计时器
                      clearInterval(this.intervalid);
                    // 让下一步的内容展示出来
                      this.EmailCheck=false
                      this.NewTelbool=true
                  } else{
                    this.$message({
                      message: response.message,
                      type: 'error'
                    });
                  }  
                })
              } 
            }
           
            
          },
          returnSecret(){
            this.amendSecret=true;
          },
          returnSecretPay(){
              this.amendSecretPay=true
          },
          paySure(){
            if (!this.paymyreg.test(this.oldpaysecret)) {
                this.$message.error('请输入六位数字的密码');
            }else if(!this.paymyreg.test(this.newpaysecret)){
               this.$message.error('请输入六位数字的密码');
            }else if(this.oldpaysecret==this.newpaysecret){
              this.$message.error('密码不能设置相同');
            }
            else if(this.newpaysecret!=this.surepaysecret){
               this.$message.error('密码输入不一致');
            }else if(this.surepaysecret==''){
               this.$message.error('确认密码不能为空');
            }else if(!this.paymyreg.test(this.surepaysecret)){
              this.$message.error('请输入六位数字的密码');
            }
            else{
              console.log('支付密码修改成功')
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
                      this.getCode = "00:"+seconds;
                      seconds--;
                      if (seconds == 0){
                          //时间等于0时候
                          this.getCode = "重新发送";
                          //清除计时器
                          clearInterval(this.intervalid);
                      }
                  },1000);
              }else{
                  //失败
                  this.$message.error(response.msg);
              }
          },
          getTelCode(num){
            console.log(num)
            let url;
              if(num == 0){
                  //给新手机号手机号发送的验证码
                  url = "register/getSMSCodeToRegister"
                  this.changeDataos(this.GLOBAL.logintt,"GET",url,{
                //  这个为后台获取的手机号，不是输入的
                  telNum:this.newTel
                  },(response) =>{
                    console.log(response)
                      //返回值
                    this.Timer(response);
                  },(error) =>{
                      //接口失败
                      console.log(error)
                  });
              }
              else if (num==1) { 
                console.log(this.GLOBAL.tel)
                  //这是通过手机号修改密码时发送的验证码以及给旧手机号发送的验证码
                  url = "register/getSMSCodeToRetrievePassword"
                  this.changeDataos(this.GLOBAL.logintt,"GET",url,{
                //  这个为后台获取的手机号，不是输入的
                  telNum:this.GLOBAL.tel
                },(response) =>{
                  console.log(response)
                    //返回值
                  this.Timer(response);
                },(error) =>{
                    //接口失败
                    console.log(error)
                });
              }
              else if (num==3) {
                // 修改支付密码的验证码（error）
                 url = "register/getSMSCodeToRetrievePassword"
              }else if(num==4){
                 url="register/getEmailActiveCode"
                 if(this.inputEmail==''){
                    this.$message({
                      message: '邮箱不能为空',
                      type: 'warning'
                    });
                 }else if(!this.emailreg.test(this.inputEmail)){
                    this.$message({
                        message: '邮箱格式不正确',
                        type: 'warning'
                    });
                 }
                 else{
                  this.amendEmail=false;
                  this.changeDataos(this.GLOBAL.logintt,"GET",url,{
                  // 输入邮箱
                    email:this.inputEmail
                  },(response) =>{
                      console.log(response)
                    if(response.code==0){
                      // 显示的数据
                       this.amendEmail=false;
                      // this.$message({
                      //   message: '验证码发送成功，请查看',
                      //   type: 'success'
                      // });
                     this.Timer(response);
                    //  页面显示出来
                    }else{
                      this.$message({
                         message:'error',
                        type: 'error'
                        // message:response.message,
                        // type: 'success'
                      });
                    }
                  },(error) =>{
                      //接口失败
                      console.log(error)
                  });
                 }
                
              }else if(num==5){
                // 通过邮箱更换手机号
                 url="register/getEmailActiveCode2"
                 console.log(this.GLOBAL.logintt)
                 console.log(this.emailAccount)
                 if(this.bindStatus!=1){
                       if(this.EmailSwitchTel==''){
                          this.$message({
                            message: '邮箱不能为空',
                            type: 'warning'
                          });
                        }else if(!this.emailreg.test(this.EmailSwitchTel)){
                            this.$message({
                                message: '邮箱格式不正确',
                                type: 'warning'
                            });
                        }else{
                          this.changeDataos(this.GLOBAL.logintt,"GET",url,{
                          // 输入邮箱
                            email:this.EmailSwitchTel
                          },(response) =>{
                              console.log(response)
                            if(response.code==0){
                              // 显示的数据
                              this.$message({
                                message: '验证码发送成功，请查看',
                                type: 'success'
                              });
                            this.Timer(response);
                            }else{
                              this.$message({
                                message:'error',
                                type: 'error'
                              });
                            }
                          },(error) =>{
                              //接口失败
                              console.log(error)
                          });
                        }  
                 }else if(this.bindStatus==1){
                   console.log('是你？')
                     this.changeDataos(this.GLOBAL.logintt,"GET",url,{
                          // 输入邮箱
                            email:this.emailAccount
                          },(response) =>{
                              console.log(response)
                            if(response.code==0){
                              // 显示的数据
                              this.$message({
                                message: '验证码发送成功，请查看',
                                type: 'success'
                              });
                            this.Timer(response);
                            }else{
                              this.$message({
                                message:'error',
                                type: 'error'
                              });
                            }
                          },(error) =>{
                              //接口失败
                              console.log(error)
                          });
                 }
              }else if(num==6){ 
                // 验证新手机号是否被注册过
                 url="register/verifyTelNew"
                  if(this.inputNewTel==''){
                    this.$message({
                      message: '手机号码不能为空',
                      type: 'warning'
                    });
                 }else if(!this.myreg.test(this.inputNewTel)){
                    this.$message({
                        message: '手机格式不正确',
                        type: 'warning'
                    });
                 }else{
                    this.changeDataos(this.GLOBAL.logintt,"POST",url,{ 
                      telephone:this.inputNewTel 
                    },(response)=>{
                      console.log(response)
                      if(response.code==0){
                        this.NewTelbool=false
                        this.getNewTel=true
                    //  页面显示出来
                      }else{
                        this.$message({
                          message:response.msg,
                          type: 'error'
                        });
                      }
                    },(error) =>{
                      //接口失败
                      console.log(error)
                  })
                 }
              }else if(num==7){
                // 新手机号获取验证码
                  url="register/getSMSCodeToUpdateNewTel"
                  // console.log(this.inputNewTel)
                  this.changeDataos(this.GLOBAL.logintt,"GET",url,{ 
                      telNum:this.inputNewTel 
                    },(response)=>{
                      console.log(response)
                      if(response.code==0){
                        this.$message({
                          message:response.message,
                          type: 'success'
                        });
                       this.Timer(response);
                      }else{
                        this.$message({
                          message:response.message,
                          type: 'error'
                        });
                      }
                    },(error) =>{
                      //接口失败
                      console.log(error)
                  })
              }
          },
          // 通过邮箱更换手机号码
          EmailchangeTel(){
            if(this.inputNewTel==''){
               this.$message({
                  message: '手机号码不能为空',
                  type: 'warning'
                });
            }else if(this.changeTelCode==''){
                this.$message({
                    message: '验证码不能为空',
                    type: 'warning'
                });
            }else{
              console.log(this.inputNewTel)
              console.log(this.changeTelCode)
             let url="register/UpdateNewTelVerify"
              this.changeDataos(this.GLOBAL.logintt,"GET",url,{ 
                  telephone:this.inputNewTel ,
                  smsVerCode:this.changeTelCode
              },(response)=>{
                console.log(response)
                if(response.code==0){
                  this.$message({
                    message:'更换成功',
                    type: 'success'
                  });
                  // 弹框消失
                  this.priceDialogTel=false
                }else{
                  this.$message({
                    message:response.message,
                    type: 'error'
                  });
                }
              },(error) =>{
                //接口失败
                console.log(error)
              })
            }
          },
          // 用手机号更改密码
          telChangePwd(){
            if(this.pwdGetCode==''){
              this.$message({
                message: '请输入验证码',
                type: 'warning'
              });
            }else if(this.telInputPwd==''){
                this.$message({
                message: '请输入密码',
                type: 'warning'
              });
            }else if (this.TelSurePwd=='') {
              this.$message({
                message: '请输入确认密码',
                type: 'warning'
              });
            }else if(this.telInputPwd!=this.TelSurePwd){
              this.$message({
                message: '两次密码输入不一致',
                type: 'warning'
              });
            }else{
              // 供应商
                if(this.GLOBAL.logintt==3){
                  this.changeDatamo("POST","supplier/updatePwd",{
                    telephone:this.GLOBAL.tel,
                    password:this.TelSurePwd
                  },(response) =>{
                   this.$message({
                      message: '密码修改成功',
                      type: 'success'
                    });
                    // 清除计时器
                    clearInterval(this.intervalid);
                    this.getCode = "重新发送";
                  },(error) =>{
                    console.log(error)
                  });
                }else if(this.GLOBAL.logintt==2){
                  // 医生端
                  this.changeDatado("POST","doctor/updatePwd",{
                    telephone:this.GLOBAL.tel,
                    password:this.inputone
                  },(response) =>{
                   this.$message({
                      message: '密码修改成功',
                      type: 'success'
                    });
                    clearInterval(this.intervalid);
                    this.getCode = "重新发送";
                  },(error) =>{
                    console.log(error)
                  });
                } 
            }
          },
          showPwd(){
            this.showLoginPwd=true
          },
          hidePwd(){
            this.showLoginPwd=false
          },
          sureChange(){
            clearInterval(this.intervalid)
          
            this.getCode = "发送验证码";
            // 这个为验证码
            if(this.originalinputCode==''){
              this.$message.error('验证码不能为空')
            }else{
              // 清除计数器
              clearInterval(this.intervalid);
              // 进行后台验证码的验证
              // console.log('看下验证码和手机号')
              // console.log(this.GLOBAL.tel)
              // console.log(this.originalinputCode)
              this.changeDatamo("POST","register/retrievePasswordVerification",{
                  telephone:this.GLOBAL.tel,
                  smsVerCode:this.originalinputCode
              },(response)=>{
                console.log(response)
              //// 验证通过
                  if(response.code == 0){
                      // 验证成功，出现更换手机号的页面
                      this.sureBooleanInput=false;
                      this.sureBooleanChange=true;
                      this.emailAmendTel=false;
                  }else{
                      this.$message.error(response.msg);
                  }
              })
            }
          },
          // 绑定手机号
          bindTel(){
            // 掉接口绑定,发送新手机号，验证码以及adminid;
            //绑定之后，跳转到原页面；
            if (this.newTel=='') {
                this.$message({
                  message: '请输入更换的手机号',
                  type: 'warning'
                });
            }else if (this.newTelCode=='') {
                this.$message({
                  message: '请输入验证码',
                  type: 'warning'
                });
            }else{
              this.changeDatamo("POST","register/updateAccount",{
                telephone:this.newTel,
                smsVerCode:this.newTelCode,
                supplierId:this.adminid
              },(response)=>{
                if (response.code==0) {
                    this.$message({
                      message: '手机号更换成功',
                      type: 'success'
                    });
                  // 跳转登陆接口
                  clearInterval(this.intervalid)
                  this.getCode = "重新发送验证码";
                }else{
                  this.$message({
                      message: response.msg,
                      type: 'success'
                    });
                }   
              })
            }
          },
          // 取消绑定
          cancelBind(){
            // 取消绑定就清空输入框内容
            this.newTelCode='';
            this.newTel=''
          },
          //绑定邮箱
          bindEmail(){
            // console.log(this.inputEmail)
            if(this.inputEmailCode==''){
              this.$message({
                message: '验证码不能为空',
                type: 'warning'
              });
            }
            else{
              this.changeDataos(this.GLOBAL.logintt,"GET",'register/verifyActiveEmail',{
                  // 输入邮箱 
                    email:this.inputEmail,
                    emailActiveCode:this.inputEmailCode
                  },(response) =>{
                    console.log(response)
                    if(response.code==0){
                      this.$message({
                        message: '绑定成功',
                        type: 'success'
                      });
                      this.bindEmailBoolean=false
                      // 绑定的账号赋值
                      this.emailAccount=this.inputEmail
                      // 绑定成功之后，弹框消失
                       this.priceDialogBindEmail=false
                    }else{
                       this.bindEmailBoolean=true
                       this.emailAccount=''
                       this.priceDialogBindEmail=true
                      this.$message({
                        message: response.msg,
                        type: 'success'
                      });
                    }  
                })
            }
          },
          cancelBindEmail(){
            this.priceDialogBindEmail=false
          },
          fold_up_secret(){
              this.priceDialogSecret=true;
              this.arrow_top_secreat=false;
              this.arrow_bottom_secret=true;
              this.amend=true; 
          },
          telVertify(){
            this.amendSecret=false;
          },
         
          telVertifyPay(){
            this.amendSecretPay=false;
          },
          fold_up_email(){
            this.priceDialogBindEmail=true;
            this.arrow_top_email=false;
            this.arrow_bottom_email=true;
          },
          // 通过密码修改密码
          pwdChange(){
          // console.log(this.GLOBAL.pwd)  
            if(this.oldPassword==""||this.newPassword==""){
                this.$message({
                    message: '请输入密码',
                    type: 'warning'
                });
            }
            else if(this.newPassword!=this.surePassword){
              this.$message({
                  message: '两次输入的密码不一致',
                  type: 'warning'
              });
            }else if(this.oldPassword!=this.GLOBAL.pwd){
              this.$message({
                  message: '原密码输入错误',
                  type: 'warning'
              });
            }
            else{
              if(this.GLOBAL.logintt==3){
                  this.changeDatamo("POST","supplier/updatePwd",{
                    telephone:this.GLOBAL.tel,
                    password:this.newPassword
                  },(response) =>{
                    console.log(response)
                     this.$message({
                        message: '密码修改成功',
                        type: 'success'
                      });
                    this.arrow_top_secreat=true;   
                  },(error) =>{
                    console.log(error)
                  });
              }else if(this.GLOBAL.logintt==2){
                  this.changeDatado("POST","doctor/updatePwd",{
                    telephone:this.GLOBAL.tel,
                    password:this.newPassword
                  },(response) =>{
                    this.$message({
                        message: '密码修改成功',
                        type: 'success'
                      });   
                  },(error) =>{
                    console.log(error)
                  });
              } 
                
            }
          },
          hideTel(){
            // console.log(this.GLOBAL.tel)
            var telephone=this.GLOBAL.tel
            var length=telephone.length;
            var replaceTel= telephone.substring(3,length-4);
            var gettelephone = telephone.replace(replaceTel,"****");
            return gettelephone;
          },
        },
        created(){
            // this.hidetelephone= this.hideTel(); 
            // 判断该供应商有没有绑定邮箱，有则赋值，没有则显示未绑定
            this.changeDatamo("GET","supplier/getSupplier",{
              },(response) =>{
                console.log(response)
                 var length=response.account.length;
                var tel=response.account
                var telChange=tel.substring(3,length-4)
                this.hidetelephone=tel.replace(telChange,"****")
                console.log(this.hidetelephone)
                this.adminid = response.adminid
                this.bindStatus=response.emailStatus
                if(response.emailStatus==1){
                  // 邮箱已经绑定
                    this.vertifyEmail=false
                    this.bindEmailBoolean=false 
                    this.emailAccount=response.email
                }else{
                   // 无账号，绑定邮箱显示
                   this.bindEmailBoolean=true
                   this.emailAccount==''
                }
              },(error) =>{
                  console.log(error);
              });
        }
    }
</script>

<style scoped>
  .account{
    width:70px;
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:normal;
    letter-spacing: 1px;
    color:rgba(89,89,89,1);
    line-height:40px;
    margin-right: 21px;
  }
  .accnum{
    font-size:14px;
    letter-spacing: 1px;
    font-family:PingFang-SC-Medium;
    font-weight:normal;
    color:rgba(142,142,153,1);
    line-height:40px;
  }

 .content{
   background:#FFFFFF;
   width:100%;
   padding:5px 0px;
   color:rgba(89,89,89,1);
 }


</style>
