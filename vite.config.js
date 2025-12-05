import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import { readFileSync } from 'fs';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const isDev = mode === 'development';
	return {
		base: '/',
		clearScreen: false,
		server: isDev
			? {
					host: env.VITE_DEV_HOST,
					port: 5173,
					cors: true,
					https: {
						key: readFileSync(env.VITE_KEY_PEM),
						cert: readFileSync(env.VITE_PEM),
					},
					allowedHosts: true,
					hmr: {
						host: env.VITE_DEV_HOST,
						protocol: 'wss',
						clientPort: 5173,
					},
				}
			: undefined,
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
			tailwindcss(),
			react({
				babel: {
					plugins: [
						...(mode === 'production'
							? [['babel-plugin-react-compiler', { target: '19' }]]
							: []),
					],
				},
			}),
			VitePWA({
				registerType: 'autoUpdate',
				includeAssets: [],
				manifestFilename: 'manifest.json',
				workbox: {
					navigateFallback: '/',
					globPatterns: ['**/*.{js,css,html,png,svg,ico,json}'],
					cleanupOutdatedCaches: true,
				},
				devOptions: {
					enabled: false,
				},
				manifest: {
					id: '/',
					name: 'ГОВНОДАВ.РФ',
					short_name: 'ГОВНОДАВ',
					description: 'Заметки о говне',
					theme_color: 'black',
					display: 'standalone',
					orientation: 'portrait',
					icons: [
						{
							src: '/bob-192.png',
							sizes: '192x192',
							type: 'image/png',
						},
						{
							src: '/bob-512.png',
							sizes: '512x512',
							type: 'image/png',
						},
					],
					screenshots: [
						{
							src: '/desktop.png',
							sizes: '1920x1080',
							type: 'image/png',
							form_factor: 'wide',
							label: 'Главная страница на десктопе',
						},
						{
							src: '/mobile.png',
							sizes: '365x789',
							type: 'image/png',
							form_factor: 'narrow',
							label: 'Главная страница на телефоне',
						},
						{
							src: '/bob-512.png',
							sizes: '512x512',
							type: 'image/png',
							form_factor: 'wide',
							label: 'ГОВНОДАВ.РФ',
						},
					],
				},
			}),
		],
	};
});
