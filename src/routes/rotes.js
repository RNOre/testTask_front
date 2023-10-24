import {createRouter, createWebHistory} from "vue-router";
import AllComments from "../components/Comments/AllComments/AllComments.vue";
import UserComments from "../components/Comments/UserComments/UserComments.vue";


const routes = [
    {path: '/all-comments', component: AllComments},
    {path: '/my-comments', component: UserComments},
]

export const router = createRouter({
    routes,
    history: createWebHistory()
})