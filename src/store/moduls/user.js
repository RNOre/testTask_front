import axios from "axios";
import Auth from "../../../services/auth.js";
import setting from "../../setting.js";
import axiosInterceptorInstance from "../../../services/http.js";
import router from "../../routes/routes.js";

axios.defaults.timeout = 5000;
axios.defaults.baseURL = setting.remoteHost;

const token = Auth.getToken();
let config = {
    headers: {
        Authorization: 'Bearer ' + token,
        'Access-Control-Allow-Origin': '*'
        // 'Content-Type': 'application/json'
    },
    mode: 'no-cors',
    // withCredentials: true
}

export const user = {
    state: () => {
        return {
            avatar: 'https://yt3.googleusercontent.com/k_LC5oQii8OpIXcQNvOtvWHN9CnBD5V9XdGDIouHuavMj8m-sEkwtMzvm8V8GC8InE5Uwdz6RK4=s900-c-k-c0x00ffffff-no-rj',
            username: 'noname',
            email: '',
            id: '',
            auth: localStorage.getItem('userId'),
            FIO: '',
            phone: '',
            dateOfBirth: '',
            city: '',
            chartData: {
                published_comments: 0,
                hidden_comments: 0
            }
        }
    },
    mutations: {
        setAuth(state) {
            state.auth = true;
        },
        logout(state) {
            localStorage.setItem('role', '');
            state.auth = false
        },
        setHeader(state, payload) {
            state.username = payload.username;
            state.avatar = payload.avatar;
            state.FIO = payload.FIO;
            state.phone = payload.phone;
            state.dateOfBirth = payload.dateOfBirth;
            state.city = payload.city
        },
        setUserData(state, payload) {
            state.FIO = payload.FIO;
            state.phone = payload.phone;
            state.dateOfBirth = payload.dateOfBirth;
            state.city = payload.city
        },
        setChangedData(state, payload) {
            state.FIO = payload.FIO;
            state.phone = payload.phone;
            state.dateOfBirth = payload.dateOfBirth;
            state.city = payload.city
        },
        setChartData(state, payload) {
            state.chartData.published_comments = payload.published_comments;
            state.chartData.hidden_comments = payload.hidden_comments;
        }
    },
    actions: {
        async login({commit}, payload) {
            try {
                const response = await axios.post(
                    'auth/login', payload)

                const token = response.data.token;
                const refreshToken = response.data.refreshToken;
                const id = response.data.user.id;
                localStorage.setItem('userId', id);
                Auth.login(token, refreshToken);
                commit('setAuth');
            } catch (e) {
                console.log(e);
            }
        },
        async setHeader({commit}) {
            const userId = localStorage.getItem('userId');
            try {
                axios.get(`userinfo/view/${userId}`, config)
                    // .then(resp=>console.log(resp))
                    .then(resp => commit('setHeader', resp.data))
            } catch (e) {
                console.log(e);
            }
        },
        async getUserData({commit}, payload) {
            axios.get(`userinfo/view/${payload}`, config)
                .then(resp => commit('setUserData', resp.data))
        },
        async saveChange({commit}, payload) {
            try {
                const body = payload.body;
                await axios.put(`userinfo/update/${payload.id}`, body, config)
                    .then(resp => commit('setChangedData', resp.data))
            } catch (e) {
                console.log(e);
            }
        },
        async refreshToken() {
            try {
                const body = {
                    refreshToken: localStorage.getItem('rt')
                };
                const resp = await axiosInterceptorInstance.post('auth/refresh', body)
                    .then(resp => resp.data)
                if (resp.status) {
                    Auth.login(resp.token, resp.refreshToken)
                } else {
                    Auth.logout();
                    router.push('/login')
                }
            } catch (e) {
                console.log(e)
            }

        },
        logout({commit}) {
            commit('logout')
        },
        async getChartData({commit}) {
            // await axios.get('test/index')
            //     .then(resp => commit('setChartData', resp.data))
        }
    }
}