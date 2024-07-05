import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Se stai usando Vue Router
import store from './store/indexx';
const app = createApp(App);
app.use(store);
app.use(router); // Usa Vue Router se necessario
app.mount('#app');