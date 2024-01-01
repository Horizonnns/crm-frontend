import { createApp } from 'vue';
import './assets/css/main.css';
import App from './App.vue';
import { vMaska } from 'maska';
import router from './router';
import store from './store/store';

createApp(App)
	.use(router)
	.use(store)
	.directive('maska', vMaska)
	.mount('#app');
