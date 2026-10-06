import { afterEach, describe, expect, it } from 'vitest';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';
import sources from '../src/lib/styles/fonts/sources.json';

const temporaryDirectories: string[] = [];
const styles = fileURLToPath(new URL('../src/lib/styles/index.scss', import.meta.url));
const fonts = new URL('../src/lib/styles/fonts/', import.meta.url);

afterEach(() => {
	for (const dir of temporaryDirectories.splice(0)) rmSync(dir, { recursive: true, force: true });
});

describe('bundled fonts', () => {
	it('retains the redistribution license for each font family', () => {
		for (const source of sources) {
			expect(readFileSync(new URL(source.licenseFile, fonts), 'utf8')).toContain(
				'SIL OPEN FONT LICENSE Version 1.1'
			);
		}
	});

	it('bundles every font subset under the app base path without external font URLs', async () => {
		const root = mkdtempSync(join(tmpdir(), 'polaris-font-build-'));
		temporaryDirectories.push(root);
		writeFileSync(join(root, 'main.js'), `import ${JSON.stringify(styles)};`);
		const result = await build({
			configFile: false,
			root,
			base: '/hubble/',
			logLevel: 'silent',
			build: {
				write: false,
				assetsInlineLimit: 0,
				rollupOptions: { input: join(root, 'main.js') }
			}
		});
		if (Array.isArray(result) || !('output' in result)) throw new Error('Expected one Vite bundle');
		const assets = result.output.filter((entry) => entry.type === 'asset');
		const css = assets.find((entry) => entry.fileName.endsWith('.css'));
		expect(css).toBeDefined();
		const content = String(css?.source);
		expect(content).not.toMatch(/fonts\.googleapis\.com|fonts\.gstatic\.com|https?:\/\//);
		const urls = [...content.matchAll(/url\(([^)]+\.woff2)\)/g)].map((match) =>
			match[1]?.replace(/["']/g, '')
		);
		expect(urls).toHaveLength(15);
		for (const url of urls) {
			expect(url).toMatch(/^\/hubble\/assets\//);
			const asset = assets.find((entry) => `/hubble/${entry.fileName}` === url);
			expect(asset, url).toBeDefined();
			expect(
				Buffer.from(asset?.source ?? '')
					.subarray(0, 4)
					.toString(),
				url
			).toBe('wOF2');
		}
	});
});
