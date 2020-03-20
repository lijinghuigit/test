// 判断不同的登陆端口 2为医生端口，3为供应商端口
const logintt = 3;
// 线上
const bastuse = "https://doctor.shoyii.com/";
const bastusemo = "http://supplier.shoyii.com/";
const bastuseyo = "http://imageSide.shoyii.com/";
// 文龙IP
// const bastuse = "http://192.168.31.141:8081/medical-treatment-doctor/";
// const bastusemo = "http://192.168.31.141:8084/";
// const bastuseyo = "http://192.168.31.141:8081/medical-treatment-imageSide/";
// 服务器测试
// const bastuse = "https://192.168.31.223:8086/";
// const bastusemo = "http://192.168.31.223:8084/";
// const bastuseyo = "http://192.168.31.223:8085/";

const doctcenter = '';
// 将上述变量暴露出去
export default {
    logintt,
    bastuse,
    doctcenter,
    bastusemo,
    bastuseyo,
}