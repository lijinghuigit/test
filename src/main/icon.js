var {Menu,Tray,BrowserWindow,app,nativeImage}=require('electron');

var path=require('path');

// var iconTray=new Tray(path.join(__dirname,'../../static/shoyii.ico'));
let image;
// image=nativeImage.createFromPath(path.join(__dirname,'../../static/shoyii.ico'))
image=nativeImage.createFromPath(`${__static}/shoyii.ico`)
image.setTemplateImage(true)
var iconTray = new Tray(image);
//绑定右键菜单
var trayMenu=Menu.buildFromTemplate([
    {
        label:'最小化',
        icon:__static+"/img/minimize.png",
        click:function(){
            win.minimize()
        }
    },
    {
        label:'设置',
        icon:__static+"/img/setting.png",
        click:function(){
            win.webContents.send('setting','setting')
        }
    },
    {
        label:'退出',
        icon:__static+"/img/exit.png",
        click:function(){
            if (process.platform !== 'darwin') {
                app.quit();
            }
        }
    }
   
]);

iconTray.setContextMenu(trayMenu);

iconTray.setToolTip('树蚁医疗');



//实现点击关闭按钮让应用保存在托盘里面 ，双击托盘打开应用


var win=BrowserWindow.getFocusedWindow();

//监听任务栏图标的点击事件
iconTray.on('click',function(){
    win.show();
})