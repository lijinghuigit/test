<template>
  <div style="text-align: left;">
    <div>
      <!--基础设置-->
      <div style="display: flex;margin-bottom: 10px;">
          <div class="account">基础设置</div>
          <div style="margin-top: 2px;">
              <el-checkbox class="chec" v-model="openStart" @change="settingApp(1)">开机时启动树蚁医疗（推荐）</el-checkbox>
          </div>
      </div>
        <!--基础设置-->
      <div style="display: flex;margin-bottom: 10px;">
          <div class="account">通知及提醒</div>
          <div style="margin-top: 2px;">
              <el-checkbox class="chec" v-model="downCopmete" @change="settingApp(2)">下载完成STL文件后右下角弹窗提示</el-checkbox>
              <el-checkbox class="chec" style="width:140px;" v-model="downfailer"  @change="settingApp(3)">下载失败时右下角弹窗提示</el-checkbox>
              <el-checkbox class="chec" v-model="tipsounds"  @change="settingApp(4)">下载完成后播放提示音</el-checkbox>
              <el-checkbox class="chec" v-model="tipmessage" @change="settingApp(5)">显示消息中心数字红点</el-checkbox>
          </div>
      </div>
      <!-- 关闭主面板 -->
       <div style="display: flex;margin-bottom: 10px;">
          <div class="account" style="line-height:20px;">关闭主面板</div>
          <div style="margin-top: 2px;">
             <el-radio-group v-model="radio" @change="minimizeApp">
                <div style="margin-bottom:10px;">
                    <el-radio :label="3">最小化到托盘，不退出程序</el-radio>
                </div>
                <div>
                    <el-radio :label="6">退出程序</el-radio>
                </div>
             </el-radio-group>
          </div>
      </div>
      <!-- 关于树蚁医疗 -->
      <div style="display: flex;margin-bottom: 10px;">
          <div class="account">关于树蚁医疗</div>  
          <div style="margin-top: 2px;width:60%;">
              <div class="chec" style="display:flex;">
                   <p style="line-height:40px;">当前版本:<span>{{version}}</span> <span style="margin-left:15px;">最新版本</span><span>{{lastVersion}}</span></p>
                   <el-button class="nowUpdate" style="margin:5px 0 0 30px;background:#FFFFFF;color:#333333;border:1px solid #999999;height:26px;width:86px;" @click="updateNow()"><span style="margin-left:-5px;">检查更新</span></el-button>
              </div>
              <el-checkbox class="chec" v-model="autoUpdate" @change="AutoUpdate(7)">自动更新</el-checkbox>
              <el-checkbox class="chec" v-model="tipUpdate" @change="TipUpdate(8)">有新版本时提醒我</el-checkbox>
              <div class="account" style="display:flex;width:60%;">
                 <p>下载目录</p>    
                 <p style="margin-left:10px;color:black;">默认将下载的内容缓存在文件夹中</p>
              </div>
              <div style="margin:10px 0px;">
                <input type="text" readonly v-model="filePath" style="width:60%;"/>
                <button @click="amendCatalogue" style="margin:0px 10px;border:1px solid #888888;outline:none;background:#ffffff;color:#000000;cursor:pointer;" class="amendBtn">更改目录</button>
                <button @click="openFile" style="background:white;outline:none;border:1px solid #888888;color:#000000;cursor:pointer;" class="openBtn">打开文件夹</button>
              </div>
              <p><a style="color:black;text-decoration:none;"  @click.prevent="openLink($event)" href="https://wxgzh.shoyii.com/pcxieyi.html" >《隐私政策》</a></p>
          </div>
      </div>
      <el-dialog
          title="正在更新新版本,请稍候..."
          :visible.sync="dialogVisible"
          width="60%"
          :close-on-click-modal="closeOnClickModal"
          :close-on-press-escape="closeOnPressEscape"
          :show-close="showClose"
          margin-top='25vh'
          center>
          <div style="width:100%;height:20vh;line-height:20vh;text-align:center">
            <el-progress
              status="success"
              :text-inside="true"
              :stroke-width="20"
              :percentage="percentage"
              :width="strokeWidth"
              :show-text="true"
            ></el-progress>
          </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import config from '../../../../../package.json'
let _this = this;
const { ipcRenderer,shell } = require('electron')
//接收主进程版本更新消息
ipcRenderer.on("message", (event, message) => {
  console.log(message);
if('checking-for-update'==message.message){
     _this.$message("正在检查");
} 
  else if ("update-available" == message) {
    //显示升级对话框
    _this.dialogVisible = true;
  } else if ("download-progress" == message.message) {
     _this.dialogVisible = true;
    //更新升级进度
    /**
     * 
     * message{bytesPerSecond: 47673
      delta: 48960
      percent: 0.11438799862426002
      total: 42801693
      transferred: 48960
      }
     */
    console.log(message)
    
    console.log(message.data.percent);
    let percent = Math.round(parseFloat(message.data.percent));
    _this.percentage = percent;
    console.log(_this.percentage)
    if(_this.percentage==100){
         console.log('15456')
         ipcRenderer.send('updateNow') 
    }
  }else if("update-not-available"==message.message){
     _this.$message("当前为最新版本");
    // alert('当前为最新版本')
  } 
  else if ("error" == message.message) {
    _this.dialogVisible = false;
    _this.$message("更新失败");
  }
});
//20秒后开始检测新版本
let timeOut = window.setTimeout(() => {
  ipcRenderer.send("checkForUpdate");
}, 20000);
clearTimeout;
//间隔1小时检测一次
let interval = window.setInterval(() => {
  ipcRenderer.send("checkForUpdate");
}, 3600000);
    export default {
        name: "basicset",
        // components:{Update},
        data () {
          return {
            name:'',
            age:'',
            openStart: false,
            downCopmete: false,
            downfailer:false,
            tipsounds:false,
            tipmessage:false,
            minimize: false,
            exitapp: false,
            autoUpdate:false,
            tipUpdate:false,
            version: config.version,
            lastVersion:'',
            nowVersion:'',
            radio:0,
            filePath:'', 
            dialogVisible: false,
            closeOnClickModal: false,
            closeOnPressEscape: false,
            showClose: false,
            percentage: 0,
            strokeWidth:200,
            id:'',
          };
        },
        methods:{  
          getsettingData(){
            // console.log('看下数据有变化吗')
            console.log(this.$store.state.arr)
            var settingdata=this.$store.state.arr
            this.openStart=settingdata.powerOnSelfStart
            this.downCopmete=settingdata.downloadCompletionPrompt
            this.downfailer=settingdata.downloadFailurePrompt
            this.tipsounds=settingdata.downloadLostPlayTone
            this.tipmessage=settingdata.messagePointDisplay
            this.filePath=settingdata.downloadDirectory
            this.autoUpdate=settingdata.autoUpdate
            this.tipUpdate=settingdata.newVersionPrompt
            this.id=settingdata.id
            this.radio=settingdata.ifExitProcedure
          },
          minimizeApp(val){
            console.log(val)
              // 3 最小化到托盘 6 关闭
             this.radio=val
             var ifExitProcedure=this.radio
             this.setting(ifExitProcedure,9)  
          },
          // 自动更新
          AutoUpdate(num){
            // num==7
             var autoUpdate=this.autoUpdate
             this.setting(autoUpdate,7)
          },
          // 是否提示更新
          TipUpdate(num){
             // num==8
            var newVersionPrompt=this.tipUpdate
            this.setting(newVersionPrompt,num)
          },
        
          updateNow(){
              ipcRenderer.send('update',0)
          },
          getVersion(){
            this.axios({
              url:"https://manage.shoyii.com/App/getLatestEdition",
              method:"get"
              }).then((response)=>{
                console.log(response.data)
                  if(response.data.code==0){
                  //  // 最新版本
                  this.lastVersion=response.data.object.codeVersion
                  // 当前版本
                  // this.nowVersion=response.data.object.codeBefore
                  }else{
                    console.log('error')
                  }
              })
          },
          openLink($event){
              var linkUrl=$event.srcElement.href
              this.$electron.shell.openExternal(linkUrl)
          },
          amendCatalogue(){
            ipcRenderer.send('amend-file-dialog')
            ipcRenderer.on('selectedFiles',(event,files)=>{
                console.log(files)
                this.filePath=files
                var id=this.id
                var dataSetting=files
                var num=10
                this.$store.dispatch("setSetting",{id,dataSetting,num})
            })
          },
          openFile(){
            console.log(this.filePath[0])
            shell.showItemInFolder(this.filePath[0]);
          },
          settingApp(num){
            if(num==1){
              var powerOnSelfStart=this.openStart
              console.log(powerOnSelfStart)
              this.setting(powerOnSelfStart,1)
            }else if(num==2){
               var downloadCompletionPrompt=this.downCopmete
               this.setting(downloadCompletionPrompt,2)
            }else if(num==3){
                var downloadFailurePrompt=this.downfailer
                this.setting(downloadFailurePrompt,3)
            }else if(num==4){
              var downloadLostPlayTone=this.tipsounds
              this.setting(downloadLostPlayTone,4)
            }else if(num==5){
              var messagePointDisplay=this.tipmessage
              this.setting(messagePointDisplay,5)
            }
          },
          // 设置选项
          setting(dataSetting,num){
            var id=this.id
            console.log(id)
            console.log(dataSetting)
            console.log(num)
            this.$store.dispatch("setSetting",{id,dataSetting,num})
          },
          // 再次查询数据
        }, 
        created(){
          this.getVersion()
          this.getsettingData() 
          // 获取设置的选项
          _this = this;
        },
         destroyed() {
            window.clearInterval(interval);
            window.clearInterval(timeOut);
        }
   
    }

</script>

<style scoped>
  .account{
    width: 115px;
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:normal;
    letter-spacing: 1px;
    color:rgba(89,89,89,1);
    line-height:40px;
  }
  .chec{
    display: block;
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:normal;
    color:rgba(85,85,93,1);
    line-height:35px;
  }
  .msup{
    width: 80px;
    padding: 6px 6px;
    margin-top: 10px;
    background:rgba(245,245,249,1);
    border:1px solid rgba(230,235,236,1);
    border-radius:1px;
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:normal;
    color:rgba(111,111,123,1);
    line-height:18px;
    text-align: center;
    cursor:pointer;
  }
  .amendBtn:hover{
    background: #c6c6c6 !important;
  }
  .openBtn:hover{
     background: #c6c6c6 !important;
  }
</style>
