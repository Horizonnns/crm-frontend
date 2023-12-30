import { createApp } from 'vue';
import './assets/css/main.css';
import App from './App.vue';
import { vMaska } from 'maska';
import router from './router';

createApp(App)
	.use(router)
	.directive('maska', vMaska)
	.mount('#app');
