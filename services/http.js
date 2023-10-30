import axios from "axios";
import setting from "../src/setting.js";
import Auth from "./auth.js";
import router from "../src/routes/routes.js";

axios.defaults.timeout = 5000;
axios.defaults.baseURL = setting.remoteHost;

axios.interceptors.request.use(
    (config) => {
        if (Auth.authenticated()) {
            const token = Auth.getToken();
            console.log(token);
            // const token = 1;
            config.headers.common["Authorization"] = `Bearer ${token}`;
            // config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('not authorized');
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    Auth.logout()
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        console.log(error);
        return Promise.reject(error);
    }
)
