import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

export default defineConfig({
	plugins: [
		storybookTest({
			configDir: fileURLToPath(new URL('.', import.meta.url)),
			tags: { include: ['interaction'] }
		})
	],
	test: {
		setupFiles: [fileURLToPath(new URL('./vitest.setup.ts', import.meta.url))],
		browser: {
			enabled: true,
			provider: 'playwright',
			headless: true,
			instances: [{ browser: 'chromium' }, { browser: 'webkit' }],
			viewport: { width: 1100, height: 800 },
			screenshotFailures: false
		}
	}
});
