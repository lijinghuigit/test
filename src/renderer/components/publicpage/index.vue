<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 13:33:57
 * @LastEditTime: 2020-03-18 09:54:35
 * @LastEditors: Please set LastEditors
 -->
<template>
    <div class="app">
        <!--页面启动的动画效果-->
        <div class="tolog" v-if="InitAnimation"> 
            <img class="anim_fade_image" src="../../assets/img/dlogo.png" alt="">
        </div>
        <!--判断有没有登录 -->
        <div style="opacity:1;height:720px;" v-loading="indexload"
             element-loading-text="正在登陆中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(255, 255, 255, 0.9)"  class="scnde">
            <el-container style="height:720px;box-shadow:0px 1px 12px 1px rgba(0,0,0,0.88);">
                <!--左边菜单栏的内容-->
                <el-aside  class="left" width="210px" style="">
                    <transition name="fade" mode="in-out">
                        <Aside ref="leftr"></Aside>
                    </transition>
                </el-aside>
                <!--站着定位的内容-->
                <el-aside width="210px">
                </el-aside>
                <el-container style="height:100%; border-top:1px solid #F8F8F8;">
                    <!--顶部的菜单内容-->
                    <!-- <el-header style="height:;-webkit-app-region:drag;width:600px;position:fixed;right:120px;"> -->
                    <el-header style="height:45px;-webkit-app-region:drag;border-top:1px solid #F8F8F8;">
                        <!-- 这个是关闭，缩小等的内容 -->
                        <div style="position:fixed;right:10px;top:0px;display:flex;"  id="Topdialog" >
                            <!-- 个人信息 -->
                            <div style="display:flex;align-items:center;margin-top:3px;">
                                <div class="grid-content bg-purple"><img :src="this.GLOBAL.avatar" @click="clickimg()" style="width:24px;height:24px;margin-top:10px;cursor:pointer;-webkit-app-region: no-drag; border-radius: 90%;box-shadow:0px 0px 10px 0px rgba(18,49,137,0.05);"/></div>
                                <div class="grid-content bg-purple componyName" style="margin:0px 10px;cursor:pointer;-webkit-app-region: no-drag;" @click="clickname()" >{{this.GLOBAL.companyName}}</div>
                                <div class="grid-content bg-purple" v-if="arrow_down"><i class="el-icon-arrow-down" @click="drop_down()" style="margin: 7px;-webkit-app-region: no-drag;cursor:pointer;"></i></div>
                                <div class="grid-content bg-purple" v-if="arrow_up"><i class="el-icon-arrow-up" @click="drop_up()" style="margin: 7px;-webkit-app-region: no-drag;cursor:pointer;"></i></div>
                                <div class="" style="position:fixed;top:55px;right:45px;width:210px;height:214px;background:#FFFFFF;padding:0px 10px;border:1px solid #FFFFFF;border-radius:10px;box-shadow:4px 4px 14px #6F6F6F;"  v-if="boolean">
                                    <div style="display:flex;height:90px;">
                                        <div style="width:30%;line-height:110px;text-align:left;">
                                            <img :src="this.GLOBAL.avatar" style="width:48px;height:48px;"/>
                                        </div>
                                        <div style="width:60%;text-align:left;margin-top:10px;">
                                            <p style="font-size:12px;margin:0px;line-height:20px;">{{this.GLOBAL.supplierName}}</p>
                                            <p style="font-size:12px;margin:0px;line-height:20px;">{{this.GLOBAL.companyName}}</p>
                                            <p style="font-size:12px;margin:0px;line-height:20px;">{{this.GLOBAL.filingStatus}}<span style="margin-left:5px;color:#86B0D4;cursor:pointer;" @click="GoamendStatus()" v-if="amenStatus">上传备案</span></p>
                                        </div>
                                    </div>
                                    <div style="width:100%;text-align:left;" class="select_infor">
                                        <p @click="componySetting()" style="cursor:pointer;"><i class="iconfont icon-xiala-shezhi"></i>我的信息设置<i class="el-icon-arrow-right" style="float:right;margin-top:10px;"></i></P>
                                        <p style="cursor:pointer;" @click="feedbackAdvice()"><i class="iconfont icon-xiala-fankui"></i>反馈建议</P>
                                        <p style="cursor:pointer;" @click="AboutUs()"><i class="iconfont icon-xiala-guanyuwomen"></i>关于我们</P>
                                        <p style="cursor:pointer;" @click="switchover()"><i class="iconfont icon-xiala-qiehuanzhanghao"></i>切换账号</P>
                                    </div>
                                </div>
                            </div>
                            <!-- 弹出框 -->
                            <!-- 关于我们的弹出框 -->
                            <el-dialog title="" :visible.sync="dialogFormVisible=AboutUsBool" :modal='false' :close-on-click-modal='true' center width="425px">
                                <div slot="title" style="display:flex;width:100%;background:#86B0D4;height:40px;line-height:40px;">
                                    <div class="center-top-data"><i class="iconfont icon-shuyilogo" style="color:#FFFFFF;font-size:14px;margin-right:10px;"></i>关于我们</div>
                                </div>
                                <div style="color:#333333;font-size:14px;height:180px;position:relative;"> 
                                    <p><span>当前版本：</span><span style="margin-left: 2px;">{{version}}</span></p>
                                    <p><span>官网：</span><span style="margin-left: 2px;color:#7AA5C9;"><a  @click.prevent="openLink($event)" href="https://www.shoyii.com">https://www.shoyii.com</a></span></p>                          
                                    <p><span>电话：</span><span style="margin-left: 2px;">020-89883433</span></p> 
                                    <p><span>邮箱：</span><span style="margin-left: 2px;">info@shoyii.com</span></p>
                                    <p><span>业务联系：</span><span style="margin-left: 2px;">19157432399</span></p>                          
                                    <img src="../../assets/img/shoyiilogo.png" style="width:72px;height:72px;position:absolute;top:55px;right:115px;"/>
                                    <img src="../../assets/img/shoyiiwechat.jpg" style="width:72px;height:72px;position:absolute;top:55px;right:0px;"/>
                                    <p><span style="margin-left: 2px;">Copyright © 2019 Shoyii. All Rights Reserved.</span></p> 
                                </div>
                            </el-dialog>
                            <!-- 反馈建议的弹窗 -->
                            <el-dialog title="" :visible.sync="dialogFormVisible=feedback" :modal='false' :close-on-click-modal='true' center width="450px" >
                                    <div slot="title" style="display:flex;width:100%;background:#86B0D4;height:40px;line-height:40px;">
                                        <div class="center-top-data"><i class="iconfont icon-shuyilogo" style="color:#FFFFFF;font-size:14px;margin-right:10px;"></i>反馈建议</div>
                                    </div>
                                    <div style="color:#333333;font-size:14px;height:160px;position:relative;margin-left:-10px">
                                            <P style="font-size:14px;">问题反馈</P> 
                                             <div class="" style="margin-bottom:15px;">
                                                  <el-input 
                                                    resize="none"
                                                    type="textarea"
                                                    size="200px"
                                                    autosize
                                                    placeholder="请输入您遇到的问题，如：升级/下载异常，交易异常等。为了更好地解决您的问题，请提供以下信息： 1.电脑操作系统； 2.问题的描述与截图"
                                                    v-model="feedQuestion">   
                                                 </el-input>
                                             </div> 
                                             <!-- 上传图片 -->
                                             <div style="display:flex;">
                                                <div style="border: 1px solid #E3E7E8;width:80px;height:80px;text-align:center;" class="inputImage">
                                                        <i class="iconfont icon-tianjia" style="color:#ECECEC;font-size:48px;line-height:80px;"></i>
                                                        <input class="componyLogo" type="file"  @change="pushImg($event,1)" accept="image/jpeg,image/png,image/gif" multiple="multiple">
                                                </div>
                                                <div v-for="(item,index) in id" :key="index" style="position:relative;word-wrap:break-word;"> 
                                                    <!-- <el-image :src="'http://192.168.31.141:8081/medical-treatment-supplier/view-image/'+id[index]" style="width:60px;height:60px;"></el-image><span @click="del(index)"><i class="el-icon-delete" style="color:rgb(128, 179, 222);position:absolute;top:36px;right:20px;font-size:20px;cursor:pointer;"></i></span> -->
                                                    <el-image :src="'http://supplier.shoyii.com/view-image/'+id[index]" style="width:80px;height:80px;" ></el-image><span @click="del(index)"><i class="el-icon-delete" style="color:rgb(128, 179, 222);position:absolute;top:57px;right:30px;font-size:20px;cursor:pointer;"></i></span>
                                                </div>
                                             </div>
                                              <el-radio-group v-model="telselect" @change="switchQuestion">
                                                    <el-radio :label="0">电话联系</el-radio>
                                                    <el-radio :label="1">邮箱联系</el-radio>
                                               </el-radio-group>  
                                             <div class="contact" v-if="feedbackBool">  
                                                     <el-select v-model="value" placeholder="请选择时间段" @change="selectTime">
                                                        <el-option
                                                            v-for="item in timePeriods"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value">
                                                        </el-option>
                                                    </el-select>
                                                 <el-input v-model="telephone" placeholder="请输入电话" style="margin-top:10px;"></el-input>
                                             </div>
                                             <div class="contact" v-else>
                                                 <el-input v-model="email" placeholder="请输入邮箱"></el-input>
                                             </div>   

                                    </div>
                                    <div slot="footer" class="dialog-footer" style="margin-top:170px;">
                                        <el-button @click="feedbackCancel()">取消</el-button>
                                        <el-button type="primary" @click="feedbackSure(radioFrame)">确定</el-button>
                                    </div>
                            </el-dialog> 

                            <el-dialog title="关闭提示" :visible.sync="dialogVisible" :modal='false' center width="400px" top="35vh">
                                <P style="border-top:1px solid #F8F8F8;margin-top:10px;padding-top:5px;">点击关闭按钮时</P>
                                <template>
                                    <el-radio-group v-model="radio" @change="closeSelect">
                                        <div style="margin:15px 0;">
                                            <el-radio :label="3">最小化到系统托盘</el-radio>
                                        </div>
                                        <div>
                                             <el-radio :label="6">退出树蚁医疗</el-radio>
                                        </div>
                                       
                                    </el-radio-group>
                                </template>
                                <span slot="footer" class="dialog-footer" style="display:flex;">
                                    <el-checkbox v-model="Notip" @change="tipApp" style="margin-left:7px;">不再提醒</el-checkbox>
                                    <el-button type="primary" @click="closeSure(sureRdio)" style="margin-left:170px;margin-top:5px;height:35px;">确 定</el-button>
                                </span>
                            </el-dialog>


                            <div style="background:darkgray;width:1px;height:30px;margin:10px 5px 0px 5px;"></div>
                            <!-- 顶部菜单 -->
                            <div> 
                                <!-- 最小化 -->
                                <i class="iconfont icon-minimum minimize" @click="topMenu(1)" style="margin:10px 7px 7px;-webkit-app-region: no-drag;font-size:14px;cursor:pointer;"></i>
                                <!-- 最大化 -->
                                <!-- <i class="iconfont icon-zuidahua" @click="topMenu(2)" style="margin: 7px;-webkit-app-region: no-drag;"></i> -->
                                <!-- 关闭 -->
                                <i class="iconfont icon-guanbi closeApp" @click="topMenu(3)" style="margin: 7px;-webkit-app-region: no-drag;font-size:14px;cursor:pointer;"></i> 
                            </div> 
                        </div>          
                    </el-header>
                    <!--中间的内容-->
                    <div style="width: 100%;height: ;color: #fff;">
                        <!-- 里面是该index 的所有子组件，页面初始化，最先调用子组件的内容 -->
                        <router-view  ref="zideo" v-if="Sonboolean==true"/>
                    </div>
                </el-container>
            </el-container>
        </div>
        
        <!-- 端口登陆页面 -->
        <el-collapse-transition > 
            <div v-show="!show" class="yinyc">
              <!-- 退出软件 -->
               <el-button type="text" @click="exit" style="position:relative;left:179px;top:24px"><i class="iconfont icon-guanbi" style="color:rgb(153, 153, 153);font-size:20px;"></i></el-button>  

                <!--头部logo-->
                 <div class="top" style="width: 130px; height: 45px;margin: 20px auto">   
                    <img style="width: 100%;height: 100%;" src="../../assets/img/dlogo.png" alt="">
                 </div> 
                <!--不同用户登陆端口-->
                  <div style="margin: 35px 15px 15px 15px">
                    <el-row :gutter="20">  
                        <!-- <el-col :span="8"><div class="grid-content bg-purple" style="cursor: pointer" @click="checkPort(2)">医生端<div v-if="henone == 2" class="hessqqnxian"></div></div></el-col> --> 
                         <el-col :span="24"><div class="grid-content bg-purple" style="cursor: pointer;font-size:18px;font-weight:800" @click="checkPort(3)">3D打印 <div v-if="henone == 3" class="hessqqnxian"></div></div></el-col> 
                        <!-- <el-col :span="12"><div class="grid-content bg-purple" style="cursor: pointer" @click="checkPort(1)">医疗影像 <div v-if="henone == 1" class="hessqqnxian"></div></div></el-col> -->
                     </el-row>
                </div> 
               <div style="height:50px;font-size:25px;font-family:PingFang-SC-Medium;font-weight:500;
                            color:rgba(51,51,51,1);line-height:50px;text-align: left;margin-left: 25px;"
                     :style="txtwb">
                    {{mags}}
                </div>  
                <!--账号密码-->
                 <div style="margin-top: 0px" v-if="zcyzm">
                    <div class="inputlogin" v-if="paname">
                        <i class="iconfont icon-denglu-shouji" style="vertical-align:middle;font-size:53px;color: #999999;"></i>
                        <el-input placeholder="输入您的用户名/手机号" v-model="input" clearable></el-input>
                    </div>  
                    <!-- 忘记密码的页面 -->
                    <div class="inputlogin" id='heihei' v-if="!paname">
                        <i class="iconfont icon-denglu-mima" style="vertical-align:middle;font-size:53px;color: #999999;"></i>
                        <el-input placeholder="请输入你的密码" v-model="input" show-password></el-input>
                    </div> 
                    <!--这个密码页面依据具体情况而定，-->
                    <!-- tonum，默认0是登陆页面的密码,1是注册，2和4 有一个是注册和忘记密码的输入验证码-->
                     <div class="inputlogin" id='hehe' style="margin: 10px 30px 0px 30px;" v-if="tonum == 0 || tonum == 1 || tonum == 3 || tonum == 5">
                        <i class="iconfont icon-denglu-mima" style="vertical-align:middle;font-size: 46px;color: #999999;"></i>
                        <el-input :placeholder="pamima" v-model="inputP" show-password></el-input>
                    </div> 
                    <div class="inputlogin loginyzm" v-if="tonum == 4 || tonum == 2">
                        <div>
                            <i class="iconfont icon-shezhimima" style="vertical-align:middle;font-size: 40px;color: #999999;"></i>
                            <el-input placeholder="请输入验证码" v-model="inputP"></el-input>
                        </div> 
                        <!--倒计时-->
                         <div class="yzmtime" @click="GetCode(0)">
                            {{hqyzmd}}
                        </div>
                    </div>
                </div>  
                <!--注册时候的获取验证码-->
                <div style="margin-top: 0px" v-if="!zcyzm"> 
                    <!-- 输入手机号 -->
                   <div class="inputlogin">
                        <i class="iconfont icon-denglu-shouji" style="vertical-align:middle;font-size:53px;color: #999999;"></i>
                        <el-input placeholder="输入您的用户名/手机号" v-model="input" clearable></el-input>
                    </div>
                    <!-- 输入验证码 -->
                     <div class="inputlogin loginyzm">
                        <div>
                            <i class="iconfont icon-shezhimima" style="vertical-align:middle;font-size: 40px;color: #999999;"></i>
                            <el-input placeholder="请输入验证码" v-model="inputP"></el-input>
                        </div>  
                        <!--倒计时-->
                        <div class="yzmtime" @click="GetCode(1)">
                            {{hqyzmd}}
                        </div>
                    </div>
                </div>  
                <!--操作-->
                <div style="display: flex;justify-content:space-between;margin: 35px 30px 0px 30px;">
                    <div style="" class="iyt" v-if="tonum == 0">
                        <el-checkbox v-model="checked">自动登录</el-checkbox>
                    </div>
                    <div style="font-size:16px;font-family:PingFang-SC-Medium;cursor:pointer;
                    font-weight:500;line-height:34px; color:#80B3DE;"
                    @click="czbtn(tonum)"
                    @mouseover="addload(1)"
                    @mouseleave="addload(0)"
                    :class="{btncolho:btncolor==1}">
                        {{msgnomima}}
                    </div>
                </div>
                <!--按钮-->
                <div style="width:360px;height:50px;background:#80B3DE;letter-spacing: 3px;
                margin: 0 auto;font-size:22px;
                    font-family:PingFang-SC-Bold;font-weight:bold;color:rgba(255,255,255,1);
                    margin-top: 55px;line-height:50px;cursor: pointer;" @click="nexbtn(tonum)"
                     @mouseover="addloaddl(1)"
                     @mouseleave="addloaddl(0)"
                     :class="{backbtncolor:btncolordl==1}">
                    {{msgbtn}}
                </div> 
                <!--注册操作-->
                <div @click="nexbtn(1)" style="width: 88px;font-size:14px;font-family:PingFang-SC-Bold;font-weight:bold;text-decoration:underline;
                color:#80B3DE;line-height:45px;margin: 0 auto;letter-spacing: 1px;margin-top: 20px;cursor: pointer;" v-if="tonum == 0"
                     @mouseover="addloadzc(1)"
                     @mouseleave="addloadzc(0)"
                     :class="{btncolho:btncolorzc==1}">
                    立即注册
                </div>
            </div>
        </el-collapse-transition>
    </div>
</template> 

<script>
import config from '../../../../package.json'
 const { ipcRenderer,shell } = require('electron')
    //查看登录是医生还是供应商引入各自的首页zhege
    import Aside from './Aside/Aside';
    import { log } from 'util';
    export default {
        name: 'index',
        components:{
             Aside,
        },
        data(){
            return({
                Sonboolean:true,
                telselect:0,
                boolean:false,
                feedbackBool:true,//反馈建议输入框默认出现
                dialogVisible:false,
                arrow_down:true,
                arrow_up:false,
                isdoct:'',//登录的是医生还是供应商 -- > don't know
                show:true,    //登录端口页面显示
                InitAnimation:true,    //登录动画显示
                input: '',    //账号
                inputP:'',      //账号密码
                checked:false,   //自动登录是否勾选
                mags:'',  //顶部提示类容  例如登录 注册 找回密码 这些文本
                txtwb:'{margin-top:50px}',    //顶部masg的style
                tonum:0,      //判断按钮是登录或者注册还是修改密码
                indexload:true,  //首页的阴影
                zcyzm:true,    //验证码是否现实
                paname:true,   //提示密码是否现实
                pamima:"请输入您的密码",   //提示输入密码
                msgbtn:"登录",     //底部按钮文本
                msgnomima:"忘记密码",   //左侧忘记密码文本
                myreg:/^[1][3,4,5,7,8][0-9]{9}$/,  //手机号码验证
                btncolor:0,  //忘记密码按钮的颜色显示
                btncolordl:0,  //登录颜色显示
                btncolorzc:0,  //注册的颜色显示
                hqyzmd:"获取验证码",  //获取验证码倒计时的文本类容
                intervalid:'',    //验证码计时器
                zhzhzh:"",   //获取验证码时的账号
                henone:3,    //点击的端口
                avatar:require('../../assets/img/Topavatar.png'),  //头像
                companyName:"", //公司姓名
                supplierName:'',//负责人姓名
                activeNames: ['1'],
                // select_boolean:false,
                AboutUsBool:false,//关于我们弹窗
                feedback:false,//反馈建议弹窗
                feedQuestion:'',
                radioFrame:0,//选择框按钮，默认是0
                SwitchStatus:{},//开关按钮
                telephone:'',
                email:'',
                recordImageId:'',
                id:[],
                timePeriods: [
                    {
                    value: '09.00-10.00',
                    label: '09.00-10.00'
                    }, 
                    {
                    value: '10.00-11.00',
                    label: '10.00-11.00'
                    },
                    {
                    value: '11.00-12.30',
                    label: '11.00-12.30'
                    },
                     {
                    value: '14.00-15.00',
                    label: '14.00-15.00'
                    }, 
                    {
                    value: '15.00-16.00',
                    label: '15.00-16.00'
                    },
                    {
                    value: '16.00-17.00',
                    label: '16.00-17.00'
                    }, 
                    {
                    value: '17.00-18.00',
                    label: '17.00-18.00'
                    }
                ],
                value: '',
                amenStatus:false,
                stamps:[],
                radio:3,
                sureRdio:3,
                Notip:false,//不再提醒
                version: config.version,
            })
        },
        methods :{
        
            clickimg(){
               this.boolean=true
               this.arrow_down=true
               this.arrow_up=false
            },
            clickname(){
               this.boolean=true
               this.arrow_down=true
               this.arrow_up=false
            },
            drop_down(){
                this.boolean=!this.boolean
                this.arrow_down=false
                this.arrow_up=true
            },  
            drop_up(){  
                this.boolean=!this.boolean
                this.arrow_down=true
                this.arrow_up=false
            },
            // 去修改审核状态
            GoamendStatus(){
                this.boolean=false
                this.$router.push({
                    path:'/ComponyInformation'
                })
            },
            // 公司信息设置
            componySetting(){
                this.$refs.leftr.leftc = 4;
                this.$refs.leftr.clilef = 4;
                this.boolean=false;
                this.$router.push({path:'/ComponyInformation'})
            },
            pushImg(event){
                this.file=event.target.files[0];
                let data=new FormData();
                data.append('file',this.file)
                this.changePhotomo("upload/images/filingDocuments",data,(response) => {
                    console.log(response)
                    //这里是logo
                    this.recordImageId = response.data.fileLibId;
                    this.id.push(response.data.fileLibId);
                },(error) => {
                    console.log(error)
                });
            },
            del(i) {  // 根据下标删除
                this.id.splice(i, 1)
                this.recordImageId=''
            },
            // 切换账号
            switchover(){
                 //清除token
                localStorage.removeItem("Token");
                this.GLOBAL.logintt = 3;
                this.SwitchAccount();
                this.boolean=false;
                return;
            },
            // 关于我们
            AboutUs(){
                this.AboutUsBool=true;
            },
            openLink($event){
                console.log($event)
                var linkUrl=$event.srcElement.href
                this.$electron.shell.openExternal(linkUrl)
            },
            // 反馈建议
            feedbackAdvice(){
                this.feedback=true
            },
            // 问题反馈与功能建议的切换
            switchQuestion(val){
                if (val==0) {
                    this.feedbackBool=true;
                    this.radioFrame=val;
                    this.feedQuestion='';
                }else{
                    this.feedbackBool=false;
                    this.radioFrame=val;
                }
            },
            selectTime(val){
                this.telselect=0;
                console.log(val)
            },
            // 问题反馈的取消
            feedbackCancel(){
                this.feedback=false
            },
            // 问题反馈的确定
            feedbackSure(radioFrame){
                // console.log(this.GLOBAL.doctcenter.adminid)
                // console.log(this.GLOBAL.doctcenter.name)
               // 确定是将电话，内容以及单选框以及时间段发送给后台
                if (radioFrame==0) {
                    // 电话接口
                     if(this.feedQuestion==''){
                        this.$message({
                            message: '请输入反馈的问题',
                            type: 'warning'
                        });
                     }else{
                        this.changeDatamo("POST","feedback/add",{
                            userId:this.GLOBAL.doctcenter.adminid,//必传
                            person:this.GLOBAL.supplier.name,
                            picture:this.recordImageId,//可以为空
                            content:this.feedQuestion,//必传
                            telephone:this.telephone,//可以为空，
                            period:this.value,//时间段 可以为空，
                        },(response)=>{
                        console.log(response)
                        if (response.code==0) {
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                        }else{
                            this.$message({
                                message: '提交失败',
                                type: 'warning'
                            });
                        }
                    })  
                  }
                }else{
                    // 邮箱接口
                     if(this.feedQuestion==''){
                        this.$message({
                            message: '请输入反馈的问题',
                            type: 'warning'
                        });
                     }else{
                        this.changeDatamo("POST","feedback/add",{
                            userId:this.GLOBAL.doctcenter.adminid,//必传
                            person:this.GLOBAL.supplier.name,
                            picture:this.recordImageId,//可以为空
                            content:this.feedQuestion,//必传
                            email:this.email//可以为空，
                        },(response)=>{
                        console.log(response)
                        if (response.code==0) {
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                        }else{
                            this.$message({
                                message: '提交失败',
                                type: 'warning'
                            });
                        }
                    })    
                  }  
                }
            },
            closeSelect(val){
                if(val==3){
                    this.sureRdio=val;
                    this.Notip=false
                }else if(val==6){
                    this.sureRdio=val;
                    this.Notip=false
                }
            },
            tipApp(val){
                console.log(val) //true 不在提醒选中之后
                console.log(this.$store.state.id) //2
                console.log(this.sureRdio)  //3 或6
                var id=this.$store.state.id
                var dataSetting=this.sureRdio
                var num=9 //设置是否最小化还是关闭
                console.log(dataSetting)
                // var num=val
                if(val==true){
                    // 不再提醒选中之后，进行设置的修改
                    this.$store.dispatch("setSetting",{id,dataSetting,num})
                }else{
                    return;
                }
            },
            closeSure(sureRdio){
                if(sureRdio==3){
                    // console.log('隐藏在托盘')
                    this.$electron.ipcRenderer.send('close',sureRdio);
                    // 弹框消失
                    this.dialogVisible=false
                }else{
                      // 关闭
                      //本地获取logintt判断当前登录的端口
                        if(this.GLOBAL.logintt == 2){
                            //医生端退出
                            this.changeDatado("GET","/login/loginOut",{
                            },(response) =>{
                                console.log(response)
                                if(response.code == 0){
                                    //成功退出
                                    localStorage.removeItem("Token");
                                    this.$electron.ipcRenderer.send('close','6')
                                }
                            },(error) =>{
                                console.log(error)
                            });
                        }else if(this.GLOBAL.logintt == 3){
                            //供应商退出
                            this.changeDatamo("GET","token/out",{
                            },(response) =>{
                                if(response.code == 0){
                                    //成功退出
                                    localStorage.removeItem("Token");
                                    this.$electron.ipcRenderer.send('close','6');
                                }
                                console.log(response);
                            },(error) =>{
                                console.log(error)
                            });
                        }
                }
            },
            // 点击退出
            exit() {
                const h = this.$createElement;
                this.$msgbox({
                  title: '退出后不会删除任何历史数据',
                  showCancelButton: true,
                  confirmButtonText: '退出',
                  cancelButtonText: '取消',

                  beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                      instance.confirmButtonLoading = true;
                      instance.confirmButtonText = '执行中...';

                    this.$electron.ipcRenderer.send('close');
                      setTimeout(() => {
                        done();
                        setTimeout(() => {
                          instance.confirmButtonLoading = false;
                        }, 300);
                      }, 3000);
                    } else {
                      done();
                    }
                  }
                }).then(action => {
                  this.$message({
                    type: 'info',
                    message:"退出中"
                  });
                });
            },
            //忘记密码
            czbtn(num){
                //通过num判断按钮当前需要执行什么方法  tonum改变num的值

                /**
                 * 0 -> 找回密码
                 * 其他 -> 返回登录
                 * */

                //清空输入框里面的类容
                this.input = "";
                this.inputP = "";
                if(num == 0){
                    // 执行找回密码
                    this.submima()
                }else {
                    // 执行返回登录
                    this.returnLogin();
                }
            },
            //点击 登录 按钮时候不同状态的处罚情况
            nexbtn(num){
                 /**通过num判断登录按钮的方法 tonum改变num的值
                  * 通过
                  *
                  * 0->登录
                  * 1->注册
                  * 2->重置密码下一步
                  * 3->完成修改密码
                  * 4->注册账号点击下一步
                  * 5->完成注册账号
                  *
                  * */
                if(num == 0){
                    //登录
                    this.login();
                }else if(num == 1){
                    //清除输入框当前值
                    this.input = "";
                    this.inputP = "";
                    //调用注册方法
                    this.zhuce();
                }else if(num == 2){
                    // 在重置密码时候点击下一步方法
                    this.resetPwd();
                }else if(num == 3){
                    //完成修改密码
                    if(this.input == ""){
                        //密码01为空
                        this.$message.error('密码不能为空');
                    }else if(this.inputP == ""){
                        //密码02为空
                        this.$message.error('密码不能为空');
                    }else{
                        //当密码01和密码02都存在时候
                        if(this.input == this.inputP){
                            //密码01和密码02相同时候
                            /**
                             *
                             *   GLOBAL 是本地全局文件在main.js里面定义的名称（本地全局文件：overstation.js）
                             *   changeDatado 和changeDatamo 还有changeDatayo 是 医生端 和 供应商 还有 影视端 的调用方法的接口
                             *   logintt是判断是什么端
                             *   1->影视端
                             *   2->医生端
                             *   3->供应商
                             *  changeDataos
                            * */
                            this.changeDataos(this.GLOBAL.logintt,"POST","register/retrievePassword",{
                                telephone:this.zhzhzh,
                                password:this.inputP
                            },(response) =>{
                                //返回后
                                this.xgzcsuccess(response)
                            },(error) =>{
                                //接口错误打印
                                console.log(error)
                            });
                        }else{
                            //当二个密码不一致时候
                            this.$message.error('密码不一致');
                        }
                    }
                }else if(num == 4){
                    //注册账号点击下一步
                    this.togothik();
                }else if(num == 5){
                    //完成注册账号
                    if(this.input == "" || this.inputP == ""){
                        //账号不能为空
                        this.$message.error('密码不能为空');
                    }else{
                        //密码01和密码02存在时候
                        if(this.input == this.inputP){
                            //密码01和密码02相同时候

                            /**
                             *
                             *   GLOBAL 是本地全局文件在main.js里面定义的名称（本地全局文件：overstation.js）
                             *   changeDatado 和changeDatamo 还有changeDatayo 是 医生端 和 供应商 还有 影视端 的调用方法的接口
                             *   logintt是判断是什么端
                             *   1->影视端
                             *   2->医生端
                             *   3->供应商
                             *
                             *
                             * */
                              if(this.GLOBAL.logintt == 2){//医生端注册
                                this.changeDatado("POST","register/PCregister",{
                                    telephone:this.zhzhzh,
                                    password:this.inputP
                                },(response) =>{
                                    console.log(response);
                                    if(response.code == 0){
                                        this.returnLogin();
                                        this.$message({
                                            message: response.msg,
                                            type: 'success'
                                        });
                                        this.input = "";
                                        this.inputP = "";
                                    }else{
                                        this.$message.error(response.msg);
                                    }
                                },(error) =>{
                                    console.log(error)
                                });
                            }else if(this.GLOBAL.logintt == 3){//供应商注册
                                this.changeDatamo("POST","register",{
                                    telephone:this.zhzhzh,
                                    password:this.inputP
                                },(response) =>{
                                    console.log(response);
                                    if(response.code == 0){
                                        this.$message({
                                            message: response.msg,
                                            type: 'success'
                                        });
                                        this.returnLogin();
                                        this.input = "";
                                        this.inputP = "";

                                    }else{
                                        this.$message.error(response.msg);
                                    }
                                },(error) =>{
                                    console.log(error)
                                });
                            }else if(this.GLOBAL.logintt == 1){
                                this.changeDatayo("POST","register",{
                                    telephone:this.zhzhzh,
                                    password:this.inputP
                                },(response) =>{
                                    console.log(response);
                                    if(response.code == 0){
                                        this.$message({
                                            message: response.msg,
                                            type: 'success'
                                        });
                                        this.returnLogin();
                                        this.input = "";
                                        this.inputP = "";
                                    }else{
                                        this.$message.error(response.msg);
                                    }
                                },(error) =>{
                                    console.log(error)
                                });
                            }
                        }else{
                            this.$message.error('密码不一致');
                        }
                    }
                }
            },
            //账号注册 修改密码成功
            xgzcsuccess(response){
                if(response.code == 0){
                    //注册成功
                    this.$message({
                        message: response.msg,
                        type: 'success'
                    });
                    //返回登录
                    this.returnLogin();
                    //输入框清空
                    this.input = "";
                    this.inputP = "";
                }else{
                    //返回失败时候
                    this.$message.error(response.msg);
                }
            },
            //注册
            zhuce(){
                 //清除计时器
                clearInterval(this.intervalid);
                //点击了注册获取验证码

                /**
                 * tonum是调用 czbtn 方法和 nexbtn 方法里面的参数 num
                 * msgbtn是登录注册修改密码下面最大的按钮
                 * msgnomima在登录页面是 修改密码 其他页面都是 返回登录
                 * zcyzm 是否展示验证码页面 true为不展示  false为展示
                 * */
                //修改tonum
                this.tonum = 4;
                // 倒计时 赋值
                this.hqyzmd = "获取验证码";
                // 标题修改
                this.mags = "注册账号";
                // 登录返回
                this.msgnomima = "返回登陆";
                // 按钮类容修改
                this.msgbtn = "下一步";
                // 验证码显示出来 当验证码为false时候显示验证码
                this.zcyzm = false;
            },
            togothik(){
               //判断账号和验证码是否存在
                if(this.input == ""){
                    this.$message.error('请输入账号/手机号码');
                }else if(this.inputP == ""){
                    this.$message.error('请输入验证码');
                }else{
                    //验证手机号码是否是手机号码   register/registerDoctorVerification
                    if(this.GLOBAL.logintt == 3){
                        //供应商接口
                        if(this.myreg.test(this.input)){
                            this.changeDatamo("GET","register/registerSupplierVerification",{
                                telephone:this.input,
                                smsVerCode:this.inputP
                            },(response) =>{
                                console.log(response);
                                if(response.code == 0){
                                    //获取验证码并且验证验证通过之后调用下面的接口
                                    this.tonum = 5;
                                    this.mags = "请输入密码";
                                    this.msgbtn = "注册";
                                    this.zcyzm = true;
                                    this.paname = false; //账号
                                    //获取账号和手机验证码
                                    this.zhzhzh = this.input;

                                    this.input = "";
                                    this.inputP = "";
                                }else{
                                    this.$message.error("验证码错误");
                                }
                            },(error) =>{
                                console.log(error)
                            });
                        }else{
                            this.$message.error('请输入正确格式的账号/手机号码');
                        }
                    }else if(this.GLOBAL.logintt == 2) {
                        if (this.myreg.test(this.input)) {
                            //医生端接口
                            this.changeDatado("GET", "register/registerDoctorVerification", {
                                telephone: this.input,
                                smsVerCode: this.inputP
                            }, (response) => {
                                console.log(response);
                                if (response.code == 0) {
                                    //获取验证码并且验证验证通过之后调用下面的接口
                                    this.tonum = 5;
                                    this.mags = "请输入密码";
                                    this.msgbtn = "注册";
                                    this.zcyzm = true;
                                    this.paname = false; //账号
                                    //获取账号和手机验证码
                                    this.zhzhzh = this.input;
                                    this.input = "";
                                    this.inputP = "";
                                } else {
                                    this.$message.error("验证码错误");
                                }
                            }, (error) => {
                                console.log(error)
                            });
                        } else {
                            this.$message.error('请输入正确格式的账号/手机号码');
                        }
                    }else if(this.GLOBAL.logintt == 1){
                        if (this.myreg.test(this.input)) {
                            //影视端接口
                            this.changeDatayo("GET", "register/registerVerification", {
                                telephone: this.input,
                                smsVerCode: this.inputP
                            }, (response) => {
                                console.log(response);
                                if (response.code == 0) {
                                    //获取验证码并且验证验证通过之后调用下面的接口
                                    this.tonum = 5;
                                    this.mags = "请输入密码";
                                    this.msgbtn = "注册";
                                    this.zcyzm = true;
                                    this.paname = false; //账号
                                    //获取账号和手机验证码
                                    this.zhzhzh = this.input;
                                    this.input = "";
                                    this.inputP = "";
                                } else {
                                    this.$message.error("验证码错误");
                                }
                            }, (error) => {
                                console.log(error)
                            });
                        } else {
                            this.$message.error('请输入正确格式的账号/手机号码');
                        }
                    }

                }
            },
            //验证码验证
            yzmjy(response){
                if (response.code == 0) {
                    //获取验证码并且验证验证通过之后调用下面的接口
                    //修改显示状态
                    this.tonum = 5;
                    //修改提示类容
                    this.mags = "请输入密码";
                    this.msgbtn = "注册";
                    //修改验证码显示
                    this.zcyzm = true;
                    this.paname = false; //账号
                    //获取账号和手机验证码
                    this.zhzhzh = this.input;
                    //清空类容
                    this.input = "";
                    this.inputP = "";
                } else {
                    this.$message.error("验证码错误");
                }
            },

            returnLogin(){
                //返回登录页面初始化状态
                //登录状态修改
                this.tonum = 0;
                //密码提示显示
                this.paname = true; //账号
                //密码提示类容
                this.pamima = "请输入您的密码";
                //底部按钮显示
                this.msgbtn = "登录";
                //顶部提示显示
                this.mags = "";
                //顶部提示style清空
                this.txtwb = "";
                //验证码状态
                this.zcyzm = true;
                //忘记密码类容
                this.msgnomima = "忘记密码?";
            },
            //点击修改密码
            submima(){
                 //清除计时器
                clearInterval(this.intervalid);
                //登录状态修改
                this.tonum = 2;
                //修改状态和文本类容
                this.paname = true; //账号
                this.hqyzmd = "获取验证码";
                this.pamima = "请输入您的密码";
                this.msgbtn = "下一步";
                this.mags = "重置密码";
                this.txtwb = "";
                this.msgnomima = "返回登录";
            },
            //完成修改密码返回
            wcsubmint(response){
                if(response.code == 0){
                    this.$message({
                        message: response.msg,
                        type: 'success'
                    });
                    //修改状态
                    this.tonum = 3;
                    this.paname = false; //账号
                    this.pamima = "输入重置的密码";
                    this.msgbtn = "完成";
                    this.mags = "输入密码";
                    this.txtwb = "";
                    this.msgnomima = "返回登录";
                    //获取账号和手机验证码
                    this.zhzhzh = this.input;
                    this.input = "";
                    this.inputP = "";
                }else{
                    this.$message.error("验证码错误");
                }
            },
            //点击完成修改密码
            resetPwd(){
                //判断账号和验证码是否存在
                if(this.input == ""){
                    this.$message.error('请输入账号/手机号码');
                }else if(this.inputP == ""){
                    this.$message.error('请输入验证码');
                }else{
                    //验证手机号码是否是手机号码
                    if(this.myreg.test(this.input)){
                        //修改的密码的验证码判断是否是同
                        this.changeDataos(this.GLOBAL.logintt,"POST","register/retrievePasswordVerification",{
                            telephone:this.input,
                            smsVerCode:this.inputP
                        },(response) =>{
                            //有返回
                            this.wcsubmint(response);
                        },(error) =>{
                            console.log(error)
                        });
                    }else{
                        this.$message.error('请输入正确格式的账号/手机号码');
                    }

                }
            },
            //获取验证码计时器
            CodeTimer(response){
                if(response.code == 0){
                    //账号验证成功验证码发送
                    this.$message({
                        message: response.msg,
                        type: 'success'
                    });
                    //计时器六十秒
                    let miao = 60;
                    //计时器
                    this.intervalid = setInterval(()=>{
                        //验证码显示
                        this.hqyzmd = "00:"+miao;
                        miao--;
                        if (miao == 0){
                            //时间等于0时候
                            this.hqyzmd = "重新发送";
                            //清除计时器
                            clearInterval(this.intervalid);
                        }
                    },1000);
                }else{
                    //失败
                    this.$message.error(response.msg);
                }
            },
            //获取验证码
            GetCode(num){
                let url;
                //判断是注册账号还是修改密码
                if(num == 0){
                    // console.log('是你吧')
                    //这是修改密码的获取验证码
                    url = "register/getSMSCodeToRetrievePassword"
                }else{
                    //这是注册账号的获取验证码
                    url = "register/getSMSCodeToRegister"
                }
                //判断账号和验证码是否存在
                if(this.input == ""){
                    this.$message.error('请输入账号/手机号码');
                }else{
                    if(this.myreg.test(this.input)){
                        //公共接口
                        this.changeDataos(this.GLOBAL.logintt,"GET",url,{
                            telNum:this.input
                        },(response) =>{
                            console.log(response)
                            //返回值
                            this.CodeTimer(response);
                        },(error) =>{
                            //接口失败
                            console.log(error)
                        });
                    }else{
                        this.$message.error('请输入正确格式的账号/手机号码');
                    }
                }
            },
            
            topMenu (num) {
                //点击上面按钮通过num判断点击的是关闭app或者是最小化app
                //最小化app
                if(num == 1){
                    console.log(num);
                    this.$electron.ipcRenderer.send('minimize');
                    return
                }
                //关闭app
                if(num == 3){
                    console.log(this.$store.state.arr.ifExitProcedure)
                    var AppSelect=this.$store.state.arr.ifExitProcedure
                    if(AppSelect==3){   
                        // 退出到系统托盘中
                        this.dialogVisible=false
                        this.$electron.ipcRenderer.send('close','3');
                    }else if(AppSelect!=3&&AppSelect!=6){
                        this.dialogVisible=true;
                    }else if(AppSelect==6){
                        this.dialogVisible=false
                         //本地获取logintt判断当前登录的端口
                        if(this.GLOBAL.logintt == 2){
                            //医生端退出
                            this.changeDatado("GET","/login/loginOut",{
                            },(response) =>{
                                console.log(response)
                                if(response.code == 0){
                                    //成功退出
                                    localStorage.removeItem("Token");
                                    this.$electron.ipcRenderer.send('close','6')
                                }
                            },(error) =>{
                                console.log(error)
                            });
                        }else if(this.GLOBAL.logintt == 3){
                            //供应商退出
                            this.changeDatamo("GET","token/out",{
                            },(response) =>{
                                if(response.code == 0){
                                    //成功退出
                                    localStorage.removeItem("Token");
                                    this.$electron.ipcRenderer.send('close','6');
                                }
                                console.log(response);
                            },(error) =>{
                                console.log(error)
                            });
                        }
                    }
                }
            },
            index(){
                //打开app显示状态
                //计时器五秒动画
                let i = 5;
                let intervalid;
                intervalid = setInterval(()=>{
                    i--;
                    if (i == 0){
                        //时间到窗口打开
                        //登录窗口显示状态
                        this.show = !this.show;
                        //动画显示关闭
                        this.InitAnimation = false;
                        //关闭计时器
                        clearInterval(intervalid);
                    }
                }, 1000);
            },
            checkPort(num){
              //登录端口点击按钮
              //登录端口储存
              this.henone = num;
              //本地全局储存
              this.GLOBAL.logintt = num;
              //密码清空
              this.inputP = "";
            },
            // 登录
            login(){
                // 点击了登录判断是否勾选自动登录
                if(this.checked){
                    //勾选了 储存 勾选状态 登录的端口 账号 密码
                    localStorage.setItem("checked",true);  //勾选状态
                    localStorage.setItem("logintt",this.GLOBAL.logintt);  //登录的端口
                    // localStorage.setItem("zhaoh",this.input);  //账号
                    // localStorage.setItem("passw",this.inputP); //密码 
                    this.setCookie('zhaoh',this.input,7200)  
                    this.setCookie('passw',this.inputP,7200) 
                }else{
                    //没有勾选清楚之前储存的账号密码和勾选状态
                    localStorage.setItem("checked",false);
                    // localStorage.setItem("zhaoh","");
                    // localStorage.setItem("passw","");
                    this.setCookie('zhaoh','',7200)  
                    this.setCookie('passw','',7200) 
                }
                //通过全局GLOBAL里面的logintt是哪里登录  changeDataos
                //本地储存账号密码
                this.GLOBAL.tel=this.input; //账号
                this.GLOBAL.pwd=this.inputP; //密码
                 //医生登录
                // if(this.GLOBAL.logintt == 2){
                //     this.$router.push({
                //         path: '/'      //跳转的路径
                //     });
                //     this.changeDatado("POST","token/login",{    //这里是发送给后台的数据
                //         telephone:this.input,
                //         password:this.inputP,
                //     },(response) =>{
                //         console.log(response);
                //         if(response.token){
                //             this.$refs.leftr.leftc = 0;
                //             this.$refs.leftr.clilef = 0;
                //             this.$refs.zideo.init();
                //             this.$refs.leftr.index();
                //             // 修改过
                //             localStorage.setItem("Token",response.token);
                //             localStorage.setItem("logintt",2);
                //             this.InitAnimation=false
                //             this.show = true;
                //             this.LoginLoad();
                    
                //         }else{
                //             this.$message.error("账号密码不符合");
                //             this.input = "";
                //             this.inputP = "";
                //         }
                //     },(error) =>{
                //         console.log(error)
                //     });
                // }else if(this.GLOBAL.logintt == 3){
                //     this.$router.push({
                //         path: '/'      //跳转的路径
                //     });
                //     this.changeDatamo("POST","token/login",{    //这里是发送给后台的数据
                //         username:this.input,
                //         password:this.inputP,
                //     },(response) =>{
                //         if(response.token){ 
                //             this.$refs.leftr.leftc = 0;
                //             this.$refs.leftr.clilef = 0;
                //             this.$refs.zideo.init();
                //             this.$refs.leftr.index();
                //             localStorage.setItem("Token",response.token);
                //             localStorage.setItem("logintt",3);
                //             this.InitAnimation=false
                //             this.show = true;
                //             this.LoginLoad();
                //             this.changeDataos(this.GLOBAL.logintt,"GET", "supplier/getSupplier", {    //这里是所获取的公司信息
                //             }, (response) => {
                //                 if (response.companyname == undefined||response.companyname==''||response.companyname==null||response.auditStatus!='AP') {
                //                     //直接进入了这里了
                //                     this.$router.push("/InforAudit")
                //                 }
                //             });
                //         }else{
                //             this.$message.error("账号密码不符合");
                //             this.input = "";
                //             this.inputP = "";
                //         }
                            
                //     },(error) =>{
                //         console.log(error);
                //     })
                // }

                // this.$router.push({
                //         path: '/'      //跳转的路径
                //     });
                this.changeDataos(this.GLOBAL.logintt,"POST","token/login",this.switth(),(response) =>{
                    // 这个接口只是判断账号与密码是否正确或者有无注册，会返回token，不是表示登陆成功哦
                    if(response.token){
                        // 储存token值和登录端口
                        localStorage.setItem("Token",response.token);
                        localStorage.setItem("logintt",this.GLOBAL.logintt);
                        //左边导航的模块里面的leftc赋值,用于更改侧边导航的样式
                        this.$refs.leftr.leftc = 0;
                        // //左边导航的模块里面的leftc赋值，用于更改侧边导航的样式
                        this.$refs.leftr.clilef = 0;
                     
                        // console.log(this.$refs.zideo.init())
                        // 子组件的销毁与刷新
                        this.Sonboolean = false;
                        this.$nextTick(() => {
                            this.Sonboolean = true;
                        });
                        this.$refs.zideo.init();
                       
                        // 这个暂时不明原因，。傻逼
                        // //中间模块里面的方法init从新调用刷新页面
                        // if(this.GLOBAL.logintt == 1){
                        //     // 这个是影象段
                        //     // 这个init 是在Aside里的index
                        //     this.$refs.zideo.init(0,0);
                        // }else{
                        //     this.$refs.zideo.init();
                        // }
                        //左边导航的显示模块里面的方法index刷新左侧栏
                        this.$refs.leftr.index();
                         // 登陆成功后，调用打印材料的函数，以及顶部头像信息的接口
                        this.getUserInfor();
                        this.Query();
                        // 开机动画消失
                        this.InitAnimation=false
                        //登录窗口消失状态
                        this.show = true;
                        //登录加载调用登录弹窗取消
                        this.LoginLoad();
                        // 要是是供应商则需要进行进行公司页面的审核
                        switch(this.GLOBAL.logintt) {
                            case 3:
                                // 用于公司信息页面的审核
                                this.changeDataos(this.GLOBAL.logintt,"GET", "supplier/getSupplier", {    //这里是所获取的公司信息
                                }, (response) => {
                                    console.log(response)
                                    if (response.companyname == undefined||response.companyname==''||response.companyname==null||response.auditStatus!='AP') {
                                        //直接进入了这里了
                                        this.$router.push("/InforAudit")
                                    }
                                });
                        }
                    }else{
                        // 这边判断到底是密码错误还是未注册需要再判断
                        this.$message.error("账号密码不符合");
                        this.input = "";
                        this.inputP = "";
                    }
                },(error) =>{
                    console.log(error)
                });
            },
            // 获取登陆账号与密码
            switth(){
                var todata = {};
                if(this.GLOBAL.logintt == 1){
                    todata={
                        username:this.input,
                        password:this.inputP
                    };
                    // 要这个干嘛？？
                    // this.$router.push({
                    //     path: '/caselist'      //跳转的路径
                    // });
                }else if(this.GLOBAL.logintt == 2){
                    // this.$router.push({
                    //     path: '/'      //跳转的路径
                    // });
                    todata={
                        telephone:this.input,
                        password:this.inputP
                    };
                }else if(this.GLOBAL.logintt == 3){
                    // this.$router.push({
                    //     path: '/'      //跳转的路径
                    // });
                    todata={
                        username:this.input,
                        password:this.inputP
                    };
                }
                return todata;
            },
            // 自动登陆
            AutoLogin(){
                this.input = this.getcookie("zhaoh");
                this.inputP = this.getcookie("passw");
                console.log(this.input)
                console.log(this.inputP)
                // 保存全局，账号设置要用(密码是否要求显示？？)
               this.GLOBAL.tel=this.input; //账号
               this.GLOBAL.pwd=this.inputP; //密码
              // 供应商
              if(this.GLOBAL.logintt==3){
                //   this.$router.push({
                //         path: '/'      //跳转的路径
                //   });
                this.changeDatamo("POST","token/login",{
                    username:this.input,
                    password:this.inputP,
                },(response) =>{
                    if(response.token){
                        // 储存token值和登录端口
                        localStorage.setItem("Token",response.token);
                        localStorage.setItem("logintt",this.GLOBAL.logintt);
                        //左边导航的模块里面的leftc赋值,用于更改侧边导航的样式
                        this.$refs.leftr.leftc = 0;
                        // //左边导航的模块里面的leftc赋值，用于更改侧边导航的样式
                        this.$refs.leftr.clilef = 0;
                        // this.$refs.zideo.init();
                        // //中间模块里面的方法init从新调用刷新页面
                        // if(this.GLOBAL.logintt == 1){
                        //     // 这个是影象段
                        //     // 这个init 是在Aside里的index
                        //     this.$refs.zideo.init(0,0);
                        // }else{
                        //     this.$refs.zideo.init();
                        // }
                        this.Sonboolean = false;
                        this.$nextTick(() => {
                            this.Sonboolean = true;
                        });
                        //左边导航的显示模块里面的方法index刷新左侧栏
                        this.$refs.leftr.index();
                        // 登陆成功后，调用打印材料的函数，以及顶部头像信息的接口
                        this.getUserInfor();
                        this.Print_material();
                        this.Query();
                        //显示登录窗口消失，加载状态稍微迟缓些
                        // this.show = true;
                        //登录加载调用登录弹窗取消
                        this.LoginLoad();
                    }else{
                        // 这边判断到底是密码错误还是未注册需要再判断
                        // this.$message.error("登录有问题，请手动登录");
                        this.index();
                    }
                },(error) =>{
                    console.log(error)
                });
              }else if(this.GLOBAL.logintt==2){
                  console.log('医生自动登陆')
              }else if(this.GLOBAL.logintt==1){
                  console.log('影像端自动登陆')
              }
            },
            LoginLoad(){
              //登录加载二秒
              let i =3;
              //计时器二秒后关闭登录加载
              let intervalste = setInterval(()=>{
                  i--;
                  if (i == 0){
                      //关闭登录加载状态
                      this.indexload = false;
                    //   开机动画
                      this.InitAnimation=false;
                    //   登陆窗口
                      this.show = true;
                      //关闭定时器
                      clearInterval(intervalste);
                  }
              }, 1000);
            },
            //登陆判断是否自动与手动登陆
            LoginJudge(){
                // this.InitAnimation=true
                //判断check状态
                if(localStorage.getItem("checked") == "true"){
                    //自动登录
                    this.checked = true;
                    // //赋值账号密码和登录端口
                    this.GLOBAL.logintt = localStorage.getItem("logintt");
                    // this.input = localStorage.getItem("zhaoh");
                    // this.inputP = localStorage.getItem("passw");
                    this.input = this.getcookie("zhaoh");
                    this.inputP = this.getcookie("passw");
                    console.log(this.input)
                    console.log(this.inputP)
                    //调用自动登录
                    this.AutoLogin();
                }else{
                    //check没有选，进行手动登陆
                    //手动登录（动画计时器小时候，登陆页面出现）
                    this.index();
                }
            },
            //登录切换
            SwitchAccount(){
                console.log("切换账号");
                this.indexload = true;
                //清空token 然后切换登录
                this.$refs.leftr.leftc = 0;
                this.$refs.leftr.clilef = 0;
                // -----------------------------------
                localStorage.removeItem("Token");
                // ------------------------------------
                /**
                 * 弹出登录自我思路
                 *1.清空token弹出登录加载页面
                 *2.左侧栏leftc和clilef初始化
                 *3.判断登录状态
                 *4.跳转首页-->登录退出后默认是状态3的端口首页是状态3医生端的首页
                 * */
                if(this.GLOBAL.logintt == 1){
                    this.$router.push({
                        path: '/caselist'      //跳转的路径
                    });
                }else{
                // 这个是退出登陆后的默认端口
                  this.checkPort(3);
                }
                //登录窗口显示
                this.show = false;
            },
            addload(num){
                //按钮样式修改

                //class的样式修改;
                this.btncolor = num;
            },
            addloaddl(num){
                //按钮样式修改
                //class的样式修改;
                this.btncolordl = num;
            },
            addloadzc(num){
                //按钮样式修改
                //class的样式修改;
                this.btncolorzc = num;
            },
            Print_material(){
                this.changeDatamo("GET","material/getlist",{    //这里是发送给后台的数据
                    page:1,
                    size:10000,
                },(response) =>{
                    console.log(response)
                    this.stamps=response.data
                    console.log(this.stamps)
                    this.stamps.forEach(v=>{ 
                        this.SwitchStatus[v.materialScienceId]=v.style
                    })
                },(error) =>{
                    console.log(error)
                });
            },
            // 这个方法的信息应用于顶部信息栏
            getUserInfor(){
                console.log('你是最初的吗')
                if(this.GLOBAL.logintt ==1){
                    console.log('影像端')
                 }else if(this.GLOBAL.logintt ==2){
                        this.changeDatado("GET","doctor/getDoctorInformation",{
                        },(response) =>{
                            // 医生姓名（有误）
                            this.GLOBAL.companyName = response.name;
                            // 供应商负责人姓名
                            // this.supplierName=response;
                            this.GLOBAL.avatar = this.GLOBAL.bastuse+ "view-image/" + response.enterpriseLogo;
                        },(error) =>{
                            console.log(error);
                        });
                }else if(this.GLOBAL.logintt ==3){
                    this.changeDatamo("GET","supplier/getSupplier",{
                    },(response) =>{
                         console.log('你是最初的吗供应商')
                    // 公司名称
                     this.GLOBAL.companyName = response.companyname;
                     this.GLOBAL.supplier = response
                    // 公司负责人姓名
                    this.GLOBAL.supplierName=response.name;
                    if(response.filingStatus==1){
                        this.GLOBAL.filingStatus='备案已通过'
                    }else if(response.filingStatus==2){
                        this.GLOBAL.filingStatus='备案未通过'
                        this.amenStatus=true
                    }else if(response.filingStatus==0){  
                        this.GLOBAL.filingStatus='备案待审核中'
                        // 不确定备案待审中，是否需要修改备案证件
                        // this.amenStatus=true
                    }else{
                        this.GLOBAL.filingStatus='备案未上传'
                        this.amenStatus=true
                    }
                    this.GLOBAL.avatar = this.GLOBAL.bastusemo+ "view-image/" + response.enterpriseLogo;//response.avatar暂时为undefined
                    },(error) =>{
                        console.log(error);
                    });
                }
            },
            // 设置cookie
            setCookie(name,value,seconds) {
                seconds=seconds || 0;
                var expires='';
                if(seconds!=0){
                    var date=new Date();
                    date.setTime(date.getTime()+(seconds*1000));
                    expires = "; expires="+date.toGMTString();
                }
                document.cookie=name+"="+escape(value)+expires+";path=/";
            },
            // 获取cookie
            getcookie(name){
                var names=name+"=";
                var arr=document.cookie.split(';');
                for(var i=0;i<arr.length;i++){
                    var arrString = arr[i] // 取得字符串
                    while (arrString.charAt(0) == ' ') { // 判断一下字符串有没有前导空格
                    arrString = arrString.substring(1, arrString.length) // 有的话，从第二位开始取
                    }
                    if (arrString.indexOf(names) == 0) { // 如果含有我们要的name
                    return unescape(arrString.substring(names.length, arrString.length)) // 解码并截取我们要值
                    }
                }
                return false;
            },
            // 清除cookie
            clearCookie(name) {
                setCookie(name, "", -1);
            },
            Query(){
                this.$store.dispatch("getSetting")
            } 
          
        },
        created(){
                ipcRenderer.on('setting',(event,data)=>{
                console.log(data)
                if(data=="setting"){
                    ipcRenderer.send('openWindow','open')
                    this.$refs.leftr.leftc = 5;
                    this.$refs.leftr.clilef = 5;
                    this.$router.push({
                        path:'/Setup'
                    })  
                }else{
                    return;
                }
                    
            })
            //判断是否要自动登录
            this.LoginJudge();
            // this.getUserInfor();
            // 点击其他区域顶部信息弹窗消失
            document.addEventListener("click",e=>{
                var Topdialog=document.getElementById('Topdialog')
                if (Topdialog.contains(e.target)) {
                }else{
                    this.boolean=false;
                    this.arrow_down=false
                    this.arrow_up=true
                }
            })
            // 监听网络的变化，并通知
            window.addEventListener('offline',function () {
                var path=require('path')
                var option={
                    title:'树蚁医疗',
                    body:'网络异常',
                    icon:path.join('../../../static/shoyii.ico'),
                    // href:'https://www.shoyii.com'
                }
                var Notification=new window.Notification(option.title,option)
                // Notification.onclick=function () {
                //     shell.openExternal('https://www.shoyii.com')
                // }
            })
        },
    }

</script>
<style>
    .select_infor i{
        margin-right:5px;
        color:#666666;
        font-size: 12px;
    }
    .select_infor p{
      color:#333333;
    }
    .select_infor p:hover{
        background: #F1F1F1;
    }
    .contact  input::-webkit-input-placeholder{
            font-size: 12px;
            color: #999999;
        }
    .app {
        width:100%;
        height: 100%;
        /*padding:2px;这是HTML片段啊*/
        font-family: 'PingFang-SC-Bold';
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        background:#fff;
        position: relative;
    }
    .none{
        display: none;
    }
    body{
        margin: 0;
        padding: 0;
        height: 100%;
    }
    .el-header {
        position: fixed;
        top: 0;
        right: 0;
        text-align: right;
        width: calc(100% - 385px);
        font-size: 25px;
        background:rgba(255,255,255,1);
        /* box-shadow:0px 2px 5px -1px rgba(18,49,137,0.06); */
        color: #333;
        line-height: 45px;
        z-index: 100;
    }
    .el-header li{
        margin: 10px;
    }
    /* .el-dialog__body{
        height: 336px;
    } */
    .left {
        position: fixed;
        height: 100%;
        left: 0;
        top: 0;
        background:#F8F8F8;
        box-shadow:1px 0px 5px -1px rgba(18,49,137,0.1);
        z-index: 150;
    }
    ::-webkit-scrollbar {
        /*隐藏滚轮*/
        display: none;
    }
    /*图片框*/
    @-webkit-keyframes fnone {
        0% {
            z-index: 3000;
            left: 395px;
            top: 300px;
            width: 430px;
            height: 155px;
        }
        99%{
            z-index: 3000;
            left: 395px;
            top: 300px;
            width: 430px;
            height: 155px;
        }
        100% {
            z-index: 3000;
            left: 395px;
            top: 301px;
            width: 430px;
            height: 155px;
        }
    }
    .tolog{
        z-index: 3000;
        position: fixed;
        left: 340px;
        top: 300px;
        width: 430px;
        height: 155px;
        animation-fill-mode: forwards;
        -webkit-animationanimation-name: fnone;
        -webkit-animation-timing-function: ease-in-out;
        -webkit-animation-iteration-count: 1;
        -webkit-animation-duration: 5s;
        -webkit-animation-direction: alternate;
    }

    /*logo的动*/
    @-webkit-keyframes fadeInOut {
        0% {
            opacity:0.3;
            top:50px;
            left: 0px;
            width:100%;
            height: 100%;
        }
        40% {
            opacity:.5;
            top:-100px;
            left: 0px;
            width:100%;
            height: 100%;
        }
        70% {
            opacity: 1;
            top:-200px;
            left: 0px;
            width:100%;
            height: 100%;
        }
        99%{
            opacity: 1;
            top: -217px;
            left: calc(50% - 50px);
            width: 31%;
            height: 30%;
        }
        100%{
            opacity: 1;
            top: -217px;
            left: calc(50% - 50px);
            width: 31%;
            height: 30%;
        }
    }
    .anim_fade_image {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        animation-fill-mode: forwards;
        -webkit-animation-name: fadeInOut;
        -webkit-animation-timing-function: ease-in-out;
        -webkit-animation-iteration-count: 1;
        -webkit-animation-duration: 1s;
        -webkit-animation-direction: alternate;
    }

    /*首页的动画*/
    @-webkit-keyframes scbde {
        0% {
            opacity:0;
        }
        80% {
            opacity: 0;
        }
        90% {
            opacity:.5;
        }
        100%{
            opacity:1;
        }
    }

    .scnde{
        animation-fill-mode: forwards;
        -webkit-animation-name: scbde;
        -webkit-animation-timing-function: ease-in-out;
        -webkit-animation-iteration-count: 1;
        -webkit-animation-duration: 5s;
        -webkit-animation-direction: alternate;
    }

    .yinyc{
        z-index: 2000;
        position: absolute;
        left:calc(50% - 210px);
        top: 40px;
        width:420px;
        height:640px;
        background:rgba(255,255,255,1);
        box-shadow:0px 2px 40px 2px rgba(82,132,242,0.4);
        border-radius:16px;
    }

    .transition-box {
        margin-bottom: 10px;
        width: 200px;
        height: 100px;
        border-radius: 4px;
        background-color: #409EFF;
        text-align: center;
        color: #fff;
        padding: 40px 20px;
        box-sizing: border-box;
        margin-right: 20px;
    }

    /*登录*/
    .el-row {
        margin-bottom: 20px;
    }

    .el-col {
        border-radius: 4px;
    }

    .grid-content {
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:normal;
        color:rgba(51,51,51,1);
        line-height:34px;
    }

    .row-bg {
        padding: 10px 0;
    }

    .inputlogin{
        text-align: left;
        border-bottom: 1px solid rgba(238,238,238,1);
        margin: 10px 30px 0px 25px;
    }

    .inputlogin .el-input{
        width: 80%;
    }
    .loginyzm{
        display: flex;
        margin: 15px 30px 0px 32px!important;
    }
    .loginyzm .yzmtime{
        cursor: pointer;
        text-align: center;
        width:80px;
        height:30px;
        background:rgba(238,239,242,1);
        color: rgba(164,170,186,1);
        border-radius:4px;
        margin: 5px 3px 4px 30px;
        font-size: 14px;
        font-family:PingFang-SC-Medium;
        font-weight:normal;
        line-height:30px;
    }
    .loginyzm .el-input{
        margin-left: 5px;
        width: 50%;
    }
    .loginyzm .el-input__inner{
        border: 0px;
        padding-left: 0px;
        font-size: 16px;
        font-family:PingFang-SC-Medium;
        font-weight:normal;
        line-height:16px;
    }

    .inputlogin .el-input--suffix .el-input__inner{
        border: 0px;
        padding-left: 0px;
        font-size: 16px;
        font-family:PingFang-SC-Medium;
        font-weight:normal;
        line-height:16px;
    }

    .inputlogin .el-input .el-input__clear{
        font-size: 17px;
        color: #999999;
    }

    .iyt .el-checkbox__input.is-checked+.el-checkbox__label{
        color: #80B3DE;
    }

    .iyt .el-checkbox__label{
        font-size:16px;font-family:PingFang-SC-Medium;cursor: pointer;
        font-weight:500;color:rgba(169,169,169,1);line-height:34px;
    }

    .iyt .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
        background-color:#80B3DE;
        border-color:#80B3DE;
    }

    .btncolho{
        color: #80B3DE !important;
    }
    .backbtncolor{
        background-color: #80B3DE !important;
    }

    .hessqqnxian{
        margin-left:170px;
        width:50px;
        height:4px;
        background:#80B3DE;
        border-radius:2px;
    }

.el-dialog__headerbtn{
    font-size: 18px!important;
}
.el-dialog__headerbtn .el-dialog__close{
    color:#E4E4E4!important ;
}
 .componyLogo{
    position: absolute;
    top: 121px;
    left:0px;
    width: 80px;
    height: 80px;
    opacity: 0;
    cursor: pointer;
    z-index: 10;
}
.inputImage:hover{
    background: #F8F8F8;
}
.minimize:hover{
    color: #86B0D4;
}
.closeApp:hover{
    color: #86B0D4;
}
.el-icon-arrow-down:hover{
     color: #86B0D4;
}
.el-icon-arrow-up:hover{
    color: #86B0D4;
}
.componyName:hover{
    color: #86B0D4;
}
</style>



