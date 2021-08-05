import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import UserService from "@/services/UserService";
import axios from "axios";

Vue.config.productionTip = false

UserService.ping().catch((e) => {
    console.log(e)
})

window.axios = axios

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')