import { describe, expect, it, vi } from 'vitest';
import { render } from 'svelte/server';
import { createRawSnippet } from 'svelte';
import Button from '../src/lib/components/button/Button.svelte';

vi.mock('../src/lib/components/icon', () => ({ Icon: () => {} }));

describe('Button', () => {
	it('renders custom content without switching an icon button to icon-only layout', () => {
		const children = createRawSnippet(() => ({
			render: () => '<span>Agent <em>is</em> Assistant</span>'
		}));
		const { body } = render(Button, { props: { children, label: 'Fallback', icon: 'search' } });
		expect(body, 'custom snippet renders its markup').toContain(
			'<span>Agent <em>is</em> Assistant</span>'
		);
		expect(body, 'custom content takes precedence over the simple label').not.toContain('Fallback');
		expect(body, 'content with an icon retains the text button layout').not.toContain(
			'btn--icon-only'
		);
	});
	it('retains disabled link semantics with custom content', () => {
		const children = createRawSnippet(() => ({ render: () => '<span>Details</span>' }));
		const { body } = render(Button, { props: { children, href: '/details', disabled: true } });
		expect(body, 'disabled links cannot navigate').not.toContain('href="/details"');
		expect(body, 'disabled state is exposed to assistive technology').toContain(
			'aria-disabled="true"'
		);
		expect(body, 'disabled links are removed from tab order').toContain('tabindex="-1"');
		expect(body, 'links render snippets too').toContain('<span>Details</span>');
	});
});
