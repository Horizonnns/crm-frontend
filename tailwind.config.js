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
				blue: {
					10: '#283444',
				},
			},

			boxShadow: {
				cards: '0 0 12px rgba(51, 51, 51, 0.2)',
			},

			animation: {
				'waving-hand':
					'wave 3s cubic-bezier(.17,.67,.83,.67) 10',
			},
		},
	},
	plugins: [],
};
