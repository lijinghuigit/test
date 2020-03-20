import axios from 'axios'
import {
    Message
} from 'element-ui';
// 创建axios实例
const service = axios.create({
    withCredentials: true,
    baseURL:'http://imageSide.shoyii.com/',
    // baseURL:'http://192.168.31.141:8081/medical-treatment-imageSide/',
    // 服务器测试
    // baseURL:'http://192.168.31.223:8085/',
    timeout: 900000 // 请求超时时间 超时时间
});
service.interceptors.request.use(config => {
    return config
}, error => {
    Promise.reject(error)
});
// respone拦截器
service.interceptors.response.use(
    response => {
        // console.log(status);
        console.log(response.status);
        if (response.status !== 200) {
            //console.log("这里是不登录二百的值");
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