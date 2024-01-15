import {
	createWebHistory,
	createRouter,
} from 'vue-router';
import AuthTabs from './pages/auth/AuthTabs.vue';
import Admin from './pages/admin/Admin.vue';
import FrontOff from './pages/front-off/FrontOff.vue';
import BackOff from './pages/back-off/BackOff.vue';
import Application from './pages/application/Application.vue';

const routes = [
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
	{
		name: 'app',
		path: '/app/:app',
		component: Application,
		meta: { requiresAuth: true },
		props: true,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach(async (to, from, next) => {
	const isAuth =
		JSON.parse(localStorage.getItem('user')) !==
		null;
	const user = JSON.parse(
		localStorage.getItem('user')
	);

	if (isAuth) {
		if (to.name === 'register') {
			next('/admin');
		} else if (
			user.role === 'admin' &&
			to.name !== 'admin'
		) {
			next('/admin');
		} else if (
			user.role === 'front-office' &&
			to.name !== 'frontoff'
		) {
			if (to.name !== 'app') {
				next('/frontoff');
			} else {
				next();
			}
		} else if (
			user.role === 'back-office' &&
			to.name !== 'backoff'
		) {
			if (to.name !== 'app') {
				next('/backoff');
			} else {
				next();
			}
		} else {
			next();
		}
	} else {
		if (to.name !== 'register') {
			next('/register');
		} else {
			next();
		}
	}
});

export default router;
