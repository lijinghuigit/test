import axios from 'axios'
import {
    Message
} from 'element-ui';
// 创建axios实例
const service = axios.create({
    withCredentials: true,
    baseURL: 'https://doctor.shoyii.com/',
    // baseURL: 'http://192.168.31.141:8081/medical-treatment-doctor/',
    // baseURL: 'http://192.168.31.223:8086/',
    timeout: 900000 // 请求超时时间
     });
service.interceptors.request.use(config => {
    return config
}, error => {
    Promise.reject(error)
});

// respone拦截器
service.interceptors.response.use(
    response => {
        if (response.status !== 200) {
            switch (response.status) {
                case 401: // 用户未登
                    break;
                default:
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
        console.log(error);
        if (error) {
            const res = error;
            return Promise.reject(res)
        } else {
            return Promise.reject(error)
        }
    }
);

export default service


//
//