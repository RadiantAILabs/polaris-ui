import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vitest/config';

// Separate from vite.config.ts (which Storybook's Vite builder also loads
// and merges): registering the svelte plugin there made Storybook run its
// own already-compiled Svelte runtime files and CSF story files back
// through vite-plugin-svelte's compiler a second time, breaking
// `storybook:build`. Vitest prefers vitest.config.ts over vite.config.ts
// when both exist, so this keeps the two builds isolated.
export default defineConfig({
	plugins: [svelte({ hot: false })],
	test: {
		environment: 'jsdom',
		expect: { requireAssertions: true }
	}
});
