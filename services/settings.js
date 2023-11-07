import axios from "axios";
import Auth from "./auth.js";

let isRefreshing = false;
let refreshSubscribers = [];
const subscribeTokenRefresh = (cb) => refreshSubscribers.push(cb);
axios.interceptors.response.use(undefined, error => {
    const status = error.response ? error.response.status : false;
    const originalRequest = error.config;

    if(error.config.url === '/auth/refresh-token'){
        Auth.logout();
    }

    if(status === API_STATUS_UNAUTHORIZED){
        if(!isRefreshing){
            isRefreshing = true;
        }
    }
})