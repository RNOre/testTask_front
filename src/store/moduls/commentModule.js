import axios from "axios";
import setting from "../../setting.js";
import Auth from "../../../services/auth.js";
import axiosInterceptorInstance from "../../../services/http.js";

axios.defaults.timeout = 5000;
axios.defaults.baseURL = setting.remoteHost;

const token = Auth.getToken();

let config = {
    headers: {
        Authorization: 'Bearer ' + token,
        'Access-Control-Allow-Origin': '*'
    },
    mode: 'no-cors',
}

export const comment = {
    state: () => {
        return {
            comments: '',
            userComments: '',
        }
    },
    mutations: {
        setAllComments(state, payload) {
            state.comments = payload.filter(comment => comment.status);
        },
        setUserCommentsData(state, payload) {
            state.userComments = payload;
        },
        changeCommentStatus(state, payload) {
            for (let i = 0; i < state.userComments.length; i++) {
                if (state.userComments[i].id == payload.id) {
                    state.userComments[i].status = payload.status == 0 ? 0 : 1;
                }
            }
        },
        changeCommentText(state, payload) {
            for (let i = 0; i < state.userComments.length; i++) {
                if (state.userComments[i].id == payload.id) {
                    state.userComments[i].text = payload.text;
                }
            }
        },
        setNewComment(state, payload) {
            console.log(payload);
            state.userComments.push(payload);
        },
        deleteComment(state, payload) {
            const newState = state.userComments.filter(comment => comment.id != payload);
            state.userComments = newState;

        }
    },
    actions: {
        async getAllComments({commit}) {
            await axiosInterceptorInstance.get('comment/index?expand=user&sort=-date', config)
                .then(resp => resp.data.items)
                .then(data => commit('setAllComments', data))
        },
        async getUserComments({commit}, payload) {
            await axios.post('userdata/index', payload)
                .then(resp => commit('setUserCommentsData', resp.data))
        },
        async createComment({commit}, payload) {
            await axios.post('comment/create', payload, config)
                .then(resp => commit('setNewComment', resp.data))
        },
        async changeCommentStatus({commit}, payload) {
            const body = {
                status: payload.status
            }
            await axios.put(`comment/update/${payload.id}`, body, config)
                .then(commit('changeCommentStatus', payload));
        },
        async changeCommentText({commit}, payload) {
            const body = {
                text: payload.text
            }
            await axiosInterceptorInstance.put(`comment/update/${payload.id}`, body, config)
                .then(commit('changeCommentText', payload))
        },
        async deleteComment({commit}, payload) {
            await axios.delete(`comment/delete/${payload}`, config)
                .then(commit('deleteComment', payload))
        },
        async createCommentWithFile({commit}, payload) {
            // console.log(payload.body)
            const response = await axios.post('comment/create', payload.body, config)
                .then(resp=>resp.data)
            commit('setNewComment', response);
// commentId: response.id
            payload={...payload};
            delete payload.body;
            console.log(payload)
            let counter = 0;
            for(let item in payload){
                if(payload.hasOwnProperty(item)){
                    counter++;
                }
            };
            for (let i = 0; i < counter; i++) {
                payload[i]={...payload[i], commentId: response.id}
                await axios.post('file/create', payload[i])
                    .then(resp => console.log(resp));
            }

        },
        async adminGetComments({commit}, payload){
            await axiosInterceptorInstance.get('comment/index?expand=user,file&sort=-date', config)
                .then(resp=>commit('setAllComments', resp.data.items))
        }
    }
}