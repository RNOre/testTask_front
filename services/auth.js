import setting from "../src/setting.js";

export default {
    login(token, refreshToken) {
        localStorage.setItem(setting.userToken, token)
        localStorage.setItem(setting.refreshToken, refreshToken)
    },
    // authentication status
    authenticated() {
        var t = localStorage.getItem(setting.userToken);
        return t && t.length > 0;
    },
    getToken() {
        return localStorage.getItem(setting.userToken);
    },
    logout() {
        localStorage.setItem(setting.userToken, "");
        localStorage.setItem(setting.refreshToken, "");
    },
}
