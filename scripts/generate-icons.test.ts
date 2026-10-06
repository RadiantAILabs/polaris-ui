import { afterEach, describe, expect, it } from 'vitest';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { transpileModule } from 'typescript';

const generator = fileURLToPath(new URL('./generate-icons.ts', import.meta.url));
const temporaryDirectories: string[] = [];

function fixture(names: string[]) {
	const cwd = mkdtempSync(resolve(tmpdir(), 'polaris-icon-registry-'));
	temporaryDirectories.push(cwd);
	const dir = resolve(cwd, 'src/lib/components/icon/icons');
	mkdirSync(dir, { recursive: true });
	for (const name of names) writeFileSync(resolve(dir, `${name}.svg`), '<svg/>');
	return { cwd, output: resolve(dir, '../icon-registry.ts') };
}

afterEach(() => {
	for (const dir of temporaryDirectories.splice(0)) rmSync(dir, { recursive: true, force: true });
});

describe('icon registry generation', () => {
	it('generates valid TypeScript for numeric, reserved, and numbered variant names', () => {
		const { cwd, output } = fixture(['zebra', 'export', '360-degrees', 'grid-02', '360']);
		const result = spawnSync('bun', [generator], { cwd, encoding: 'utf8' });
		expect(result.status, result.stderr).toBe(0);
		const code = readFileSync(output, 'utf8');
		expect(transpileModule(code, { reportDiagnostics: true }).diagnostics).toEqual([]);
		expect(code).toContain("'360-degrees': icon_360Degrees");
		expect(code).toContain("'360': icon_360");
		expect(code).toContain('export: icon_export');
		expect(code.indexOf('./icons/360-degrees.svg')).toBeLessThan(code.indexOf('./icons/zebra.svg'));
		expect(spawnSync('bun', [generator], { cwd }).status).toBe(0);
		expect(readFileSync(output, 'utf8')).toBe(code);
	});

	it('rejects invalid filenames before replacing the registry', () => {
		const { cwd, output } = fixture(['invalid name']);
		writeFileSync(output, 'original registry');
		const result = spawnSync('bun', [generator], { cwd, encoding: 'utf8' });
		expect(result.status).not.toBe(0);
		expect(result.stderr).toContain('Invalid icon filename');
		expect(readFileSync(output, 'utf8')).toBe('original registry');
	});
});
