    import axios from "axios";

export const students = {
    state: () => {
        return {
            students: '',
            groups: ''
        }
    },
    mutations: {
        setStudents(state, payload) {
            state.students = payload;
        },
        deleteStudent(state, payload) {
            const newState = state.students.filter(student => student.id != payload);
            state.students = newState;
        },
        getGroups(state, payload) {
            state.groups = payload;
        }
    },
    actions: {
        async getStudents({commit}) {
            try {
                await axios.get('http://localhost:8876/api/v1/students')
                    .then(resp => resp.data.data)
                    .then(resp => commit('setStudents', resp));
            } catch (e) {
                console.log(e);
            }
        },
        async deleteStudent({commit}, payload) {
            try {
                await axios.delete(`http://localhost:8876/api/v1/students/${payload}`)
                    .then(commit('deleteStudent', payload))
            } catch (e) {
                console.log(e)
            }
        },
        async createStudent({commit}, payload) {
            try {
                let response = await axios.post('http://localhost:8876/api/v1/students', payload);
                if (response.status == 201) {
                    await axios.get('http://localhost:8876/api/v1/students')
                        .then(resp => resp.data.data)
                        .then(resp => commit('setStudents', resp));
                }
            } catch (e) {
                console.log(e);
            }
        },
        async getGroups({commit}) {
            try {
                await axios.get('http://localhost:8876/api/v1/groups')
                    .then(resp => resp.data.data)
                    .then(resp => commit('getGroups', resp));
            } catch (e) {
                console.log(e);
            }
        }
    },
    getters: {
        // getStudentsData(state) {
        //     return state.students;
        // },
        // getGroups(state){
        //     return state.groups
        // }
    }
}