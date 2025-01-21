import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {
			sans: ['Red Hat Display', 'sans-serif']
		},
		extend: {
			colors: {
				dark: '#121212',
				light: '#ffffff'
			}
		}
	},

	plugins: [typography]
} satisfies Config;
