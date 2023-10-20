import {createStore} from "vuex";
import {comment} from "./moduls/commentModule.js";

export const store = createStore({
    modules: {
        comment
    }
})