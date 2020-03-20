import axios from 'axios'
import {
    Message
} from 'element-ui';
// 创建axios实例
const service = axios.create({
    withCredentials: true,
    // 线上
    baseURL:'http://supplier.shoyii.com/',
    // 文龙IP
    // baseURL:'http://192.168.31.141:8085/medical-treatment-supplier/',
    // baseURL:'http://192.168.31.141:8084/',
    // baseURL:'http://192.168.31.185:8090/medical-treatment-supplier/',
    // 服务器测试
    // baseURL:'http://192.168.31.223:8084/',
    timeout: 900000 // 请求超时时间
});
// request 拦截器
service.interceptors.request.use(config => {
    return config
}, error => {
    Promise.reject(error)
});

// respone拦截器
service.interceptors.response.use(
    response => {
        console.log('启动了')
        console.log(response.status);
        if (response.status!== 200) {
            // console.log("这里是不登录二百的值");
            switch (response.status){
                case 401: // 用户未登录
                    break;
                default:
                    console.log(response);
                    Message({
                        message: response.status || '未知错误',
                        type: 'error',
                        center: true
                    });
                    break;
            }
            return Promise.reject(response)
        } else {
            return response.data
        }
    },
    error => {
        if (error.response) {
            const res = error.response.data;
            return Promise.reject(res)
        } else {
            return Promise.reject(error)
        }
    }
);

export default service