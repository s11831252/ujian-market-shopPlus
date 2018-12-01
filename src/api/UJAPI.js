import http_axios from '../utils/http/axios'
import http_wx from '../utils/http/wxhttp'
const http = mpvue_Mode === 'WX' ? http_wx : http_axios;

 let BaseHost = "http://live.ujianchina.net:818/";
//let BaseHost = "https://live.ujianchina.net/";

export default {
    Account_Login: param => {
        return http.post(BaseHost + "api/Account/Login", param)
    },
    Account_wxLogin: (code,extAppid,param) => {
        return http.post(BaseHost + `Weixin/wxLogin?code=${code}&extAppid=${extAppid}`, param)
    },
    User_Get: param => {
        return http.get(BaseHost + "api/User/Get", param)
    },
}