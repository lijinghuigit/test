import {app, BrowserWindow, ipcMain} from 'electron'
const config=require('../../package.json')
var path=require('path')
// ------------------------------------------
// 引入自动更新模块
const { autoUpdater } = require('electron-updater')
// 更新包位置
// const feedUrl = `http://192.168.31.141:8082/AppDir/build/`
const feedUrl = `https://manage.shoyii.com/AppDir/supplier/build/`

// --------------------------------------------
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`;

function createWindow () {
  /**
   * Initial window options
   */
  // mainWindow = new BrowserWindow({
  //     // height: 563,
  //     height: 1270,
  //     useContentSize: true,
  //     // width: 1000
  //     width: 1270
  // })

    mainWindow = new BrowserWindow({
        width: 1160,  // 1270
        height: 720,
        maxWidth: 1160,
        // transparent: true,
        frame: false,
        resizable: false,
        maximizable: false,
        webPreferences: {
            nodeIntegration: true,
            plugins:true,
            defaultFontFamily:{
                standard:"PingFang-SC-Bold",
                //serif:"",
                //sansSerif:"",
                //monospace:"",
            },
            defaultFontSize:12,
            defaultEncoding:"utf-8"
        }
        // webPreferences: {
        //     preload: path.join(__dirname, 'preload.js')
        // }
    });
    mainWindow.loadURL(winURL);
    require('./icon.js')
    require('./dialog.js')
    mainWindow.on('closed', () => {
    mainWindow = null
  })
}
ipcMain.on('close',(e,data)=>{
  console.log(data)
    if(data==3){
      e.preventDefault();  //阻止窗口的关闭事件
      mainWindow.hide();
    }else{
      mainWindow.close()
    }
    
});
ipcMain.on('openWindow',(e,data)=>{
  console.log(data)
  mainWindow.show()
});

ipcMain.on('minimize',e=>{
    mainWindow.minimize()
});
ipcMain.on('maximize',e=>{
  mainWindow.maximize()
});
// ------------------------------------------
// 主进程监听渲染进程传来的信息
ipcMain.on('update', (e, arg) => {
  console.log('update')
  console.log(arg)
  checkForUpdates()
})
let checkForUpdates = () => {
  autoUpdater.currentVersion = config.version
  // 配置安装包远端服务器
  autoUpdater.setFeedURL(feedUrl)
  autoUpdater.on('error', function (message) {
    sendUpdateMessage('error', message)
  })

  autoUpdater.on('checking-for-update', function (message) {
    sendUpdateMessage('checking-for-update',message)
    console.log('5')
    console.log(message)
  })

  autoUpdater.on('update-available', function (message) {
    sendUpdateMessage('update-available', message)
    console.log('1')
    console.log(message)
    console.log(message.path)
  })

  autoUpdater.on('update-not-available', function (message) {
    sendUpdateMessage('update-not-available',message )
    console.log('2')
    console.log(message)
  })

  // 更新下载进度事件
  autoUpdater.on('download-progress', function (progressObj) {
    console.log('3')
    sendUpdateMessage('download-progress',progressObj)
    console.log(progressObj)
  })
  // 更新下载完成事件
  autoUpdater.on('update-downloaded', function (event,releaseNotes,releaseName, releaseDate,updateUrl,quitAndUpdate){
    console.log('4')
    // sendUpdateMessage('isUpdateNow')
    // eslint-disable-next-line no-undef
    // ipcMain.on('updateNow', (e, arg) => {
       autoUpdater.quitAndInstall()
    // })
  })
  // 执行自动更新检查
  autoUpdater.checkForUpdates()
}
// 主进程主动发送消息给渲染进程函数
function sendUpdateMessage (message, data) {
  mainWindow.webContents.send('message', { message, data })
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
});
