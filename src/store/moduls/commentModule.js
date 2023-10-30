import axios from "axios";
import setting from "../../setting.js";
import Auth from "../../../services/auth.js";

axios.defaults.timeout = 5000;
axios.defaults.baseURL=setting.remoteHost;
// let token = 'W2BiE2OXSLOVXmxvWBbuXSJ5efqBLiRv_1698055144';
const token = Auth.getToken();
let config = {
    headers: {
        Authorization: 'Bearer ' + token,
        'Access-Control-Allow-Origin':'*'
        // 'Content-Type': 'application/json'
    },
    mode: 'no-cors',
}

export const comment = {
    state: () => {
        return {
            comments: ''
        }
    },
    mutations: {
        setAllComments(state, payload) {
            state.comments = payload;
        }
    },
    actions: {
        async getAllComments({commit}) {
            await axios.get('comment/index?expand=user&sort=-date', config)
                .then(resp => resp.data.items)
                .then(data => commit('setAllComments', data))
        },
        async createComment({comment}, payload) {
            await axios.post('comment/create', payload,  config)
        },
    }
}