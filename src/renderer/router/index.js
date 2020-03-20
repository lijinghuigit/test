
import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/publicpage/index';
import Inde from '../components/publicpage/index/index';
import Notice from '../components/publicpage/notice/notice';
import Material from '../components/supplier/material/material';
import Setup from '../components/publicpage/setup/setup';
import Methary from '../components/doctor/methary/methary';
import Caselist from '../components/doctor/caselist/casetop';
import Materce from '../components/supplier/materbank/materce';
import Apmaker from '../components/publicpage/apmaker/apmaker';
import Dofa from '../components/publicpage/aa/dofa';
import Necalist from '../components/doctor/necalist/necalist';
import Method from '../components/doctor/methods/method';
import Addmethod from '../components/doctor/methods/addmethods'
import tonsonal from "../components/publicpage/setup/tonsonal"
import InforAudit from "../components/publicpage/setup/InforAudit"
// ----------------------------------------------------
import OrderList from "../components/supplier/OrderList"
import MyWallet from "../components/supplier/MyWallet"
import ComponyInformation from "../components/publicpage/setup/ComponyInformation"
// ------------------------------------------------------
Vue.use(Router);

const routes = [

    {
        path:"/tonsonal",
        name:"tonsonal",
        component:tonsonal
    },
  
    {
        path:"/InforAudit",
        name:"InforAudit",
        component:InforAudit
    },

    {
        path: '/',
        name: 'Index',
        meta: {
            requireAuth: true,
        },
        component:Index,
        children: [
            {
                path: '/',
                name: 'Inde',
                component: Inde,
                meta: {
                    requireAuth: true,
                },
            },
            {
                path: '/notice',
                name: 'Notice',
                component: Notice
            },
            {
                path: '/material',
                name: 'Material',
                component: Material
            },
            {
                path: '/ComponyInformation',
                name: 'ComponyInformation',
                component: ComponyInformation
            },
            {
                path: '/setup',
                name: 'Setup',
                component: Setup
            },
            {
                path: '/methary',
                name: 'Methary',
                component: Methary
            },

            {
                path:'/caselist',
                name:'Caselist',
                component:Caselist
            },
            {
                path:'/materce',
                name:'Materce',
                component:Materce
            },
            {
                path:'/apmaker',
                name:'Apmaker',
                component:Apmaker
            },
            {
                path:'/dofa',
                name:'Dofa',
                component:Dofa
            },
            {
                path:'/necalist',
                name:'Necalist',
                component:Necalist
            },
            {
                path:'/method',
                name:'Method',
                component:Method
            },
            {
                path:'/addmethod',
                name:'Addmethod',
                component:Addmethod
            },
            {
                path:'/OrderList',
                name:'OrderList',
                component:OrderList,
            },
            {
                path:'/MyWallet',
                name:'MyWallet',
                component:MyWallet,
            },
        ]
    }
];
const router = new Router({
    routes
});

router.beforeEach((to, from, next) => {
    console.log(localStorage.getItem("Token"));
    if (to.matched.some(r => r.meta.requireAuth)) {           //这里的requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登陆的
        if (localStorage.getItem("Token")){
            console.log("--查看到了已经登录了--"); //
            // 登录之后改变大小的问题
            const { remote } = require('electron');
            remote.getCurrentWindow().setSize(1160, 720);  // 1270 780
            // remote.getCurrentWindow().setSize(1160, 670);  // 1270 780
            next();
        }else{
            const { remote } = require('electron');
            remote.getCurrentWindow().setSize(1160, 720);  // 1270 780
            // remote.getCurrentWindow().setSize(1160, 670);  // 1270 780
            next();
            // console.log("--检测到未登录--");
            // 调整页面的大小
            // const { remote } = require('electron');
            // remote.getCurrentWindow().setSize(390, 655);  // 390 655
            // next({
            //     path: '/loginto',
            //     query: {redirect: to.fullPath}
            // });
        }
    }else{
        
        const { remote } = require('electron');
        remote.getCurrentWindow().setSize(1160, 720);  // 1270 780
        // remote.getCurrentWindow().setSize(1160, 670);  // 1270 780
        next();
        // 调整页面的大小
        // console.log("--检测到未登录--");
        // const { remote } = require('electron');
        // remote.getCurrentWindow().setSize(390, 655);  // 390 655
        // next();
    }
});
export default router;