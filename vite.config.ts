import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => ({
	plugins: mode === 'test' ? [svelte()] : [],
	test: {
		include: ['tests/**/*.test.ts', 'scripts/**/*.test.ts'],
		expect: { requireAssertions: true }
	}
}));
