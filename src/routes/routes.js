import {createRouter, createWebHistory} from "vue-router";
import AllComments from "../components/Comments/AllComments/AllComments.vue";
import UserComments from "../components/Comments/UserComments/UserComments.vue";
import Login from "../components/Login.vue";
import Auth from "../../services/auth.js";
import Register from "../components/Register.vue";
import UserProfile from "../components/Comments/UserProfile/UserProfile.vue";
import Admin from "../components/Comments/Admin/Admin.vue";


const routes = [
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/personal-cabinet', component: UserProfile, meta: {requireAuth: true}},
    {path: '/all-comments', component: localStorage.getItem('role')=='admin'? Admin: AllComments, meta: {requireAuth: true}},
    {path: '/my-comments', component: UserComments, meta: {requireAuth: true}},
    {path: '/admin', component: Admin, meta: {requireAuth: true}}
]
const router = createRouter({
    routes,
    history: createWebHistory()
})

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth && !Auth.authenticated()) {
        next({
            path: '/login',
            query: {redirect: to.fullPath}
        })
    } else {
        next()
    }
});

export default router;