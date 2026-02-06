import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import type { Config } from '@sveltejs/kit';
import path from 'node:path';

const config: Config = {
	preprocess: vitePreprocess(),
	kit: {
		alias: {
			$lib: path.resolve('./src/lib')
		}
	}
};

export default config;
