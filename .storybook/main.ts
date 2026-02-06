import type { StorybookConfig } from '@storybook/svelte-vite';
import { svelte as viteSvelte } from '@sveltejs/vite-plugin-svelte';
import { resolve as r } from 'node:path';

const config: StorybookConfig = {
	framework: { name: '@storybook/svelte-vite', options: {} },
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|ts|svelte)'],
	addons: [
		'@storybook/addon-docs',
		'@storybook/addon-a11y',
		'@storybook/addon-themes',
		'@storybook/addon-svelte-csf'
	],
	viteFinal: async (viteConfig) => {
		// Ensure Svelte is actually compiling node_modules/.svelte files
		viteConfig.plugins = [viteSvelte(), ...(viteConfig.plugins ?? [])];

		// Separate cache just for Storybook (prevents CSS randomly going stale)
		viteConfig.cacheDir = r(process.cwd(), 'node_modules/.vite-storybook');

		// Avoid duplicate Svelte copies from workspace
		viteConfig.resolve ??= {};
		viteConfig.resolve.dedupe = [...(viteConfig.resolve.dedupe ?? []), 'svelte'];
		viteConfig.resolve.conditions = [...(viteConfig.resolve.conditions ?? []), 'svelte'];

		// Absolute Sass search paths
		viteConfig.css ??= {};
		viteConfig.css.devSourcemap = true;
		viteConfig.css.preprocessorOptions ??= {};
		viteConfig.css.preprocessorOptions.scss ??= {};
		(viteConfig.css.preprocessorOptions.scss as Record<string, unknown>).loadPaths = [
			new URL('../src/lib/styles', import.meta.url).pathname,
			new URL('../src/lib/styles/tokens', import.meta.url).pathname
		];

		// Resolve svelte dependencies
		viteConfig.optimizeDeps ??= {};
		viteConfig.optimizeDeps.include = ['svelte', '@storybook/svelte'];
		viteConfig.server ??= {};
		viteConfig.server.fs = { strict: false };

		return viteConfig;
	}
};

export default config;
