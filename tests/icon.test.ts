import { describe, expect, it } from 'vitest';
import { render } from 'svelte/server';
import Icon from '../src/lib/components/icon/icon.svelte';
import { iconRegistry, type IconName } from '../src/lib/components/icon/icon-registry';

describe('Icon server rendering', () => {
	it('renders every generated glyph without a browser DOM', () => {
		expect(typeof globalThis.DOMParser).toBe('undefined');
		for (const name of Object.keys(iconRegistry) as IconName[]) {
			const { body } = render(Icon, { props: { name } });
			expect(iconRegistry[name], name).toMatch(
				/<(path|circle|rect|line|polyline|polygon|ellipse)\b/
			);
			expect(body, name).toContain(iconRegistry[name]);
		}
	});

	it('preserves size, variant, visibility, animation and forwarded attributes', () => {
		const { body } = render(Icon, {
			props: {
				name: 'search',
				size: 32,
				variant: 'warning',
				hidden: true,
				animation: 'spin',
				class: 'custom',
				'aria-label': 'Find'
			}
		});
		expect(body).toContain('width="32"');
		expect(body).toContain('height="32"');
		expect(body).toContain('var(--color-icon-warning)');
		expect(body).toContain('opacity: 0');
		expect(body).toContain('icon--spin');
		expect(body).toContain('custom');
		expect(body).toContain('aria-label="Find"');
		expect(
			render(Icon, { props: { name: 'search', size: 'small', disabled: true } }).body
		).toContain('var(--color-icon-disabled)');
	});
});
