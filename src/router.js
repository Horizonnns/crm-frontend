import {
	createWebHistory,
	createRouter,
} from 'vue-router';
import AuthTabs from './pages/auth/AuthTabs.vue';
import Admin from './pages/admin/Admin.vue';
import FrontOff from './pages/front-off/FrontOff.vue';
import BackOff from './pages/back-off/BackOff.vue';

const router = createRouter({
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
			meta: { requiresAuth: true },
		},
		{
			name: 'frontoff',
			path: '/frontoff',
			component: FrontOff,
			meta: { requiresAuth: true },
		},
		{
			name: 'backoff',
			path: '/backoff',
			component: BackOff,
			meta: { requiresAuth: true },
		},
	],
});

router.beforeEach((to, from, next) => {
	const isAuthenticated =
		JSON.parse(localStorage.getItem('user')) !==
		null;

	if (
		to.matched.some(
			(record) => record.meta.requiresAuth
		)
	) {
		if (!isAuthenticated) {
			next('/register');
		} else {
			next();
		}
	} else {
		next();
	}
});

export default router;
