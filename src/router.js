import {
	createWebHistory,
	createRouter,
} from 'vue-router';
import AuthTabs from './pages/auth/AuthTabs.vue';
import Admin from './pages/admin/Admin.vue';
import FrontOff from './pages/front-off/FrontOff.vue';
import BackOff from './pages/back-off/BackOff.vue';

export default createRouter({
	history: createWebHistory(),
	routes: [
		{
			name: 'register',
			path: '/register',
			component: AuthTabs,
		},
		{
			name: 'admin',
			path: '/admin',
			component: Admin,
		},
		{
			name: 'frontoff',
			path: '/frontoff',
			component: FrontOff,
		},
		{
			name: 'backoff',
			path: '/backoff',
			component: BackOff,
		},
	],
});
