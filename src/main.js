import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import Button from "primevue/button"
import router from "./routes/routes.js";
import {store} from "./store/index.js";


const app = createApp(App);
app.component('Button', Button);
app.use(PrimeVue);
app.use(router);
app.use(store);
app.mount('#app')
