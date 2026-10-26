import { expect, it, vi } from 'vitest';
import { render } from 'svelte/server';
import DropdownMenu from '../src/lib/components/dropdown-menu/DropdownMenu.svelte';

vi.mock('../src/lib/components/icon', () => ({ Icon: () => {} }));

it.each([true, false])('passes disabled=%s to the trigger', (disabled) => {
	const { body } = render(DropdownMenu, {
		props: { buttonLabel: 'Options', disabled, items: ['Action'] }
	});
	const button = body.match(/<button\b[^>]*>/)?.[0];
	expect(button, 'dropdown trigger renders').toBeDefined();
	expect(/\sdisabled(?:=|\s|>)/.test(button ?? ''), 'native trigger follows disabled').toBe(
		disabled
	);
});
