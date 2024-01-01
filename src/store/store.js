import { createStore } from 'vuex';

export default createStore({
	state: {
		user:
			JSON.parse(localStorage.getItem('user')) ||
			null,

		users:
			JSON.parse(localStorage.getItem('users')) ||
			[],
	},
	mutations: {
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

		logout(state) {
			state.user = null;
			state.users = null;
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			localStorage.removeItem('users');
		},
	},
});
