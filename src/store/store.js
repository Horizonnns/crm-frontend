import { createStore } from 'vuex';

const store = createStore({
	state: {
		user:
			JSON.parse(localStorage.getItem('user')) ||
			null,

		users:
			JSON.parse(localStorage.getItem('users')) ||
			[],

		applications:
			JSON.parse(
				localStorage.getItem('applications')
			) || [],

		notify: null,

		token:
			localStorage.getItem('accessToken') || null,
	},
	mutations: {
		setToken(state, status) {
			state.token = status;
		},

		setNotify(state, status) {
			state.notify = status;
		},

		setUser(state, user) {
			state.user = user;
			localStorage.setItem(
				'user',
				JSON.stringify(user)
			);
		},

		setUsers(state, users) {
			state.users = users;
			localStorage.setItem(
				'users',
				JSON.stringify(users)
			);
		},

		deleteUser(state, userId) {
			const index = state.users.findIndex(
				(user) => user.id === userId
			);
			if (index !== -1) {
				state.users.splice(index, 1);
				localStorage.setItem(
					'users',
					JSON.stringify(state.users)
				);
			}
		},

		setApplications(state, applications) {
			state.applications = applications;
			localStorage.setItem(
				'applications',
				JSON.stringify(applications)
			);
		},

		deleteApp(state, appId) {
			const index = state.applications.findIndex(
				(app) => app.id === appId
			);
			if (index !== -1) {
				state.applications.splice(index, 1);
				localStorage.setItem(
					'applications',
					JSON.stringify(state.applications)
				);
			}
		},

		logout(state) {
			state.user = null;
			state.users = null;
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			localStorage.removeItem('users');
			localStorage.removeItem('applications');
		},
	},
});
export default store;
