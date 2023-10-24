import axios from "axios";

axios.defaults.timeout = 5000;
let token = 'W2BiE2OXSLOVXmxvWBbuXSJ5efqBLiRv_1698055144';
let config = {
    headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
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
            await axios.get('http://localhost:20080/comment/index?expand=user&sort=-date', config)
                .then(resp => resp.data.items)
                .then(data => commit('setAllComments', data))
        },
        async createComment({comment}, payload) {
            await axios.post('http://localhost:20080/comment/create', payload,  config)
        },

    }
}