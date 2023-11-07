import axios from "axios";
import setting from "../src/setting.js";
import Auth from "./auth.js";
import router from "../src/routes/routes.js";
import {store} from "../src/store/index.js";

axios.defaults.timeout = 5000;
axios.defaults.baseURL = setting.remoteHost;

const axiosInterceptorInstance = axios.create({
    baseURL: 'http://localhost:20080/'
})
axios.interceptors.request.use(
    (config) => {
        if (Auth.authenticated()) {
            const token = Auth.getToken('tk');
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

axiosInterceptorInstance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if(error.response.status==401){
            store.dispatch('refreshToken');
        }
    }
)

export default axiosInterceptorInstance;