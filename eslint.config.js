import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import react from 'eslint-plugin-react';

export default defineConfig([
	globalIgnores(['dist']),
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		extends: [
			js.configs.recommended,
			reactHooks.configs.flat.recommended,
			reactRefresh.configs.vite,
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: {
				...globals.browser,
				...globals.es2022,
			},
			parserOptions: {
				ecmaVersion: 'latest',
				ecmaFeatures: { jsx: true },
				sourceType: 'module',
			},
		},
		plugins: {
			react: react,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		rules: {
			semi: ['error', 'always'],
			'react/jsx-key': 'error',
			'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
		},
		ignores: ['dist/', 'node_modules/', '*.config.js'],
	},
]);
