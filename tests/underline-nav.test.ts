import { expect, it, vi } from 'vitest';
import { render } from 'svelte/server';
import UnderlineNav from '../src/lib/components/underline-nav/UnderlineNav.svelte';

vi.mock('../src/lib/components/icon', () => ({ Icon: () => {} }));

it('keeps the first tab reachable when the active id is stale', () => {
	const { body } = render(UnderlineNav, {
		props: {
			tabs: [
				{ id: 'overview', label: 'Overview' },
				{ id: 'details', label: 'Details' }
			],
			activeTab: 'removed'
		}
	});
	const buttons = body.match(/<button\b[^>]*>/g) ?? [];
	expect(buttons, 'both tabs render').toHaveLength(2);
	expect(buttons[0], 'first tab remains in the keyboard tab order').toContain('tabindex="0"');
	expect(buttons[1], 'only one tab is in the keyboard tab order').toContain('tabindex="-1"');
});

it('uses explicit tab and panel ids for accessible panel labelling', () => {
	const { body } = render(UnderlineNav, {
		props: {
			tabs: [
				{
					id: 'overview',
					label: 'Overview',
					buttonId: 'example-overview-tab',
					panelId: 'example-overview-panel'
				}
			],
			activeTab: 'overview'
		}
	});
	expect(body, 'panel can reference the provided tab DOM id').toContain(
		'id="example-overview-tab"'
	);
	expect(body, 'tab references its associated panel').toContain(
		'aria-controls="example-overview-panel"'
	);
});
