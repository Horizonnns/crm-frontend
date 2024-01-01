	state: {
		user:
			JSON.parse(localStorage.getItem('user')) ||
			null,

		users:
			JSON.parse(localStorage.getItem('users')) ||
			[],
	},
