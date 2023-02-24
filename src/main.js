import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';

import './assets/main.css'

import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)

app.use(router)

axios.defaults.withCredentials = true;

app.config.globalProperties.axios = axios

app.mount('#app')
