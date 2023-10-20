import {createRouter, createWebHistory} from "vue-router";
import AllComments from "../components/Comments/AllComments/AllComments.vue";
import UserComponent from "../components/Comments/UserComments/UserComponent.vue";
import userComponent from "../components/Comments/UserComments/UserComponent.vue";
import allComments from "../components/Comments/AllComments/AllComments.vue";


const routes = [
    {path: '/all-comments', component: AllComments},
    {path: '/my-comments', component: UserComponent, name: userComponent},
]

export const router = createRouter({
    routes,
    history: createWebHistory()
})