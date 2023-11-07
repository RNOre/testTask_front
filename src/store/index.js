import {createStore} from "vuex";
import {comment} from "./moduls/commentModule.js";
import {user} from "./moduls/user.js";

export const store = createStore({
    modules: {
        comment,
        user
    }
})