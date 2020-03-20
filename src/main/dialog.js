var {ipcMain,dialog,BrowserWindow}=require('electron')
ipcMain.on('amend-file-dialog',(event) => {
    dialog.showOpenDialog({
        title:'选择下载的存放目录',
        properties:['openFile','openDirectory'] , //选择文件夹
    },function(files){
        if(files){
            // console.log(files)
            event.sender.send('selectedFiles',files)
        }
    })
})
var mainWindow= BrowserWindow.getFocusedWindow();
mainWindow.webContents.session.on('will-download', (event, item, webContents) => {
    // console.log(item) //为DownloadItem 
    console.log(savepath)
    if(savepath==''||savepath=='null'){
        console.log('选择路径下载')
    }else{
        console.log('设置默认路径下载')
        item.setSavePath(savepath+"/"+item.getFilename())
    }
    //设置文件存放位置，如果用户没有设置保存路径，Electron将使用默认方式来确定保存路径（通常会提示保存对话框）
    console.log(item.getFilename())
    item.on('updated', (event, state) => {
        console.log(state)
        if (state === 'interrupted') {
            console.log('Download is interrupted but can be resumed')
        } else if (state === 'progressing') {
            if (item.isPaused()) {
                console.log('Download is paused')
                mainWindow.webContents.send('downstate',state)
            } else {
                console.log(`Received bytes: ${item.getReceivedBytes()}`)
                if(mainWindow.isDestroyed()){
                    // 不显示进度条
                    mainWindow.setProgressBar(-1)
                    mainWindow.webContents.send('downstate',state)
                    return;
                }
                mainWindow.webContents.send('down-process',{
                    name:item.getFilename(),
                    receive:item.getReceivedBytes(),
                    total:item.getTotalBytes()
                });
                var percent=(item.getReceivedBytes()/item.getTotalBytes()*100).toFixed(2)
                if(item.getTotalBytes()==0||item.getReceivedBytes()==0){
                    percent=0;
                    console.log(item.getReceivedBytes())
                    // 这个为0，因此报错，getTotalBytes()的大小为0,因次报Infinity
                    console.log(item.getTotalBytes())
                    mainWindow.webContents.send('downstate',state,percent)
                    mainWindow.setProgressBar(item.getReceivedBytes()/item.getTotalBytes())
                }else{
                    console.log(item.getReceivedBytes())
                    // 这个为0，因此报错，getTotalBytes()的大小为0,因次报Infinity
                    console.log(item.getTotalBytes())
                    mainWindow.webContents.send('downstate',state,percent)
                    console.log((item.getReceivedBytes()/item.getTotalBytes()*100).toFixed(2)+'%')
                    if((item.getReceivedBytes()/item.getTotalBytes()*100).toFixed(2)=='100.00'){
                        var i=5,
                        intervalid = setInterval(()=>{
                            i--;
                            if (i == 0){
                                mainWindow.setProgressBar(-1)
                                //关闭计时器
                                clearInterval(intervalid);
                            }
                        }, 1000);
                    }
                    mainWindow.setProgressBar(item.getReceivedBytes()/item.getTotalBytes())
                }
                
            }
        }
    })
    item.once('done', (event, state) => {
        // console.log('来了2')
        console.log(state)
            if (state === 'completed') {
                console.log('Download successfully')
                var percent=(item.getReceivedBytes()/item.getTotalBytes()*100).toFixed(2)
                console.log(percent)              
                //回显 调用渲染进程方法
                mainWindow.webContents.send('downstate',state,percent)
                mainWindow.setProgressBar(item.getReceivedBytes()/item.getTotalBytes())
            } else {
                console.log(`Download failed: ${state}`)
                //回显 调用渲染进程方法
                mainWindow.webContents.send('downstate',state)
            }
        })
    })
//默认路径下载文件
let downloadpath;//下载路径
let savepath; //保存路径
ipcMain.on('download', (event, args) => {
    // console.log(args)
var arr=args.split("+");
  downloadpath=arr[0];
savepath=arr[1];
console.log(downloadpath)
console.log(savepath)
  //下面这句会触发will-download事件
mainWindow.webContents.downloadURL(downloadpath);
})

