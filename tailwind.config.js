/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{vue,js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				primary: '#00b956',
				secondary: '#731982',
				blue: {
					10: '#283444',
				},
			},

			animation: {
				'waving-hand':
					'wave 3s cubic-bezier(.17,.67,.83,.67) 10',
			},
		},
	},
	plugins: [],
};
