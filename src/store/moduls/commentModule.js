import axios from "axios";

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
            await axios.get('http://localhost:20080/comment/index?expand=user&sort=-date')
                .then(resp => resp.data.items)
                .then(data => commit('setAllComments', data))
        }
    }
}