import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import autoprefixer from 'autoprefixer';
import { resolve } from 'path';

export default defineConfig({
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
			'@pages': resolve(__dirname, './src/pages'),
			'@components': resolve(__dirname, './src/components'),
			'@assets': resolve(__dirname, './src/assets'),
			'@hooks': resolve(__dirname, './src/hooks'),
			'@lib': resolve(__dirname, './src/lib'),
			'@context': resolve(__dirname, './src/context'),
		},
	},
	plugins: [
		react({ babel: { plugins: [['babel-plugin-react-compiler']] } }),
		tailwindcss(),
		autoprefixer(),
	],
});
