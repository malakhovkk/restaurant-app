import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // <---
//import VueSSE from 'vue-sse';
import Equal from 'equal-vue';
import 'equal-vue/dist/style.css';

createApp(App).use(router).use(Equal).mount('#app');
//createApp(App).use(VueRouter).use(Equal).mount('#app');
