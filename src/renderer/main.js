import Vue from 'vue'
import  VueQuillEditor from 'vue-quill-editor'

import DocHttp from './utils/DocHttp'
import SupplierHttp from './utils/SupplierHttp'
import ImageHttp from './utils/ImageHttp'
import axios from 'axios'

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

import qs from 'qs'
import '../../static/icf/iconfont.css'

import App from './App'
import router from './router'

import Element from 'element-ui'
import echarts from 'echarts'

import 'element-ui/lib/theme-chalk/index.css'
import './font/iconfont.css'
// 在入口文件引入之后，可以直接在各个页面引用
import global from './utils/overstation'
import {store } from './store/store'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import db from './datastore.js'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.use(Viewer);

Vue.use(Element);
Vue.use(VueQuillEditor);
Vue.prototype.$db = db;
// -----------------------
Vue.prototype.axios = axios
// -------------------------
Vue.prototype.$echarts = echarts;
// 医生端
Vue.http = Vue.prototype.$Doc = DocHttp;
// 供应商端
Vue.http = Vue.prototype.$Supplier = SupplierHttp;
// 医疗影像端
Vue.http = Vue.prototype.$Image = ImageHttp;
Vue.prototype.format = function(fmt,time) {
    var o = {
        "M+" : time.getMonth()+1,
        "d+" : time.getDate(),
        "h+" : time.getHours(),
        "m+" : time.getMinutes(),
        "s+" : time.getSeconds(),
        "q+" : Math.floor((time.getMonth()+3)/3),
        "S"  : time.getMilliseconds()
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (time.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
};
Viewer.setDefaults({
    'inline':false,
    'button':true, //右上角按钮
    "navbar": false, //底部缩略图
    "title": false, //当前图片标题
    "toolbar": false, //底部工具栏
    "tooltip": true, //显示缩放百分比
    "movable": true, //是否可以移动
    "zoomable": true, //是否可以缩放
    "rotatable": true, //是否可旋转
    "scalable": true, //是否可翻转
    "transition": true, //使用 CSS3 过度
    "fullscreen": true, //播放时是否全屏
    "keyboard": false, //是否支持键盘
    "url": "data-source",
    ready: function (e) {
        // console.log(e.type,'组件以初始化');
    },
    show: function (e) {
        // console.log(e.type,'图片显示开始');
    },
    shown: function (e) {
        // console.log(e.type,'图片显示结束');
    },
    hide: function (e) {
        // console.log(e.type,'图片隐藏完成');
    },
    hidden: function (e) {
        // console.log(e.type,'图片隐藏结束');
    },
    view: function (e) {
        // console.log(e.type,'视图开始');
    },
    viewed: function (e) {
        // console.log(e.type,'视图结束');
        // 索引为 1 的图片旋转20度
        // if(e.detail.index === 1){
        //     this.viewer.rotate(20);
        // }
    },
    zoom: function (e) {
        console.log(e.type,'图片缩放开始');
    },
    zoomed: function (e) {
        console.log(e.type,'图片缩放结束');
    }
});
// 文件和图片上传接口
Vue.prototype.changePhotodo = function(url,data,res,err){
    const instance=axios.create({
        withCredentials: true
    });
    const config = {
        headers:{
            Token:localStorage.getItem("Token")
        }
    };
    instance.post(global.bastuse+url,data,config)
        .then(res).catch(err)
};
// 文件和图片上传接口
Vue.prototype.changePhotomo = function(url,data,res,err){
    const instance=axios.create({
        withCredentials: true
    });
    const config = {
        headers:{
            Token:localStorage.getItem("Token")
        }
    };
    console.log(global.bastusemo);
    instance.post(global.bastusemo+url,data,config)
        .then(res).catch(err)
};
// 文件和图片上传接口
Vue.prototype.changePhotoyo = function(url,data,res,err){
    const instance=axios.create({
        withCredentials: true
    });
    const config = {
        headers:{
            Token:localStorage.getItem("Token")
        }
    };
    console.log(global.bastusemo);
    instance.post(global.bastusemo+url,data,config)
        .then(res).catch(err)
};

// 主页开始渲染后，再调用
Vue.prototype.changeDatamo = function (method,url,data,res,err){  //供应商
    this.$Supplier({
        url:url,
        method:method,
        params: data,
        headers:{
            Token:localStorage.getItem("Token")
        }
    },{
        //单独配置
        withCredentials: true
    }).then(res).catch(err);
};

Vue.prototype.changeDatado = function (method,url,data,res,err){  //医生
    // console.log("wuli");
    // console.log(localStorage.getItem("Token"));
    this.$Doc({
        url:url,
        method:method,
        params: data,
        headers:{
            Token:localStorage.getItem("Token")
        }
    },{
        // 单独配置
        withCredentials: true
    })
        .then(res)
        .catch(err);
};
Vue.prototype.changeDatayo = function (method,url,data,res,err){  //影视
    this.$Image({
        url:url,
        method:method,
        params: data,
        headers:{
            Token:localStorage.getItem("Token")
        }
    },{
        // 单独配置
        withCredentials: true
    })
        .then(res)
        .catch(err);
};

/**
 * 新的接口判断 2019-9-24
 * */
// 登陆之后再调用
// 这个接口用于修改密码，登陆，注册，类似四个端口的公共接口
Vue.prototype.changeDataos = function(whos,method,url,data,res,err){
    // console.log(whos)//对应的哪个端口，为1,2,3,4
    // 1-> 影视   2->医生    3->供应商
    switch(whos){
        case 1 :
            this.$Image({
                url:url,
                method:method,
                params: data,
                headers:{
                    Token:localStorage.getItem("Token")
                }
            },{
                // 单独配置
                withCredentials: true
            })
                .then(res)
                .catch(err);
            break;
        case 2 :
            this.$Doc({
                url:url,
                method:method,
                params: data,
                headers:{
                    Token:localStorage.getItem("Token")
                }
            },{
                // 单独配置
                withCredentials: true
            })
                .then(res)
                .catch(err);
            break;
        case 3 :
            this.$Supplier({
                url:url,
                method:method,
                params: data,
                headers:{
                    Token:localStorage.getItem("Token")
                }
            },{
                // 单独配置
                withCredentials: true
            })
            .then(res)
            .catch(err);
            break;
    }
};
//图片上传封装
// 在这块的GLOBAL为大写，因此导致页面必须应用大写
Vue.prototype.GLOBAL = global;
Vue.prototype.qs = qs;
Vue.config.productionTip = false;
console.log=function(){};
/*
* 封装token和请求
* */

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store:store,
// 引入对外暴露的vuex对象
  template: '<App/>'
}).$mount('#app');
