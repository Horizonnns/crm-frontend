import { createStore } from 'vuex';

const store = createStore({
	state: {
		user:
			JSON.parse(localStorage.getItem('user')) ||
			[],

		users:
			JSON.parse(localStorage.getItem('users')) ||
			[],

		applications:
			JSON.parse(
				localStorage.getItem('applications')
			) || [],

		token:
			localStorage.getItem('accessToken') || null,
	},
	mutations: {
		setToken(state, token) {
			state.token = token;

			localStorage.setItem(
				'accessToken',
				JSON.stringify(token)
			);
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
			state.user = [];
			state.users = [];
			state.token = null;
			state.applications = [];
			localStorage.removeItem('user');
			localStorage.removeItem('users');
			localStorage.removeItem('accessToken');
			localStorage.removeItem('applications');
		},
	},
});
export default store;
