import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import Button from "primevue/button"
import router from "./routes/routes.js";
import {store} from "./store/index.js";
import VueCookies from 'vue-cookies'
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";
import { RoughDonut } from 'vue-roughviz'
import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const app = createApp(App);
app.component('Button', Button);
app.component(RoughDonut)
app.use(PrimeVue);
app.use(router);
app.use(VueCookies);
app.use(store);
app.use(ToastService);
app.use(ConfirmationService);
app.use(LoadingPlugin);
app.mount('#app')
