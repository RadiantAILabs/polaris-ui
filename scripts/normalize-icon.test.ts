import { describe, expect, it } from 'vitest';
import { DOMParser } from 'linkedom';
import { normalizeIcon } from './normalize-icon';

describe('icon generation', () => {
	it('inherits solid fills and strokes while preserving transparent and gradient paint', () => {
		const content = normalizeIcon(
			`<svg><path fill="#123456" stroke="red"/><path fill="none" stroke="none"/><path fill="url(#paint)" stroke="url(#line)"/><path fill="currentColor" stroke="currentColor"/></svg>`
		);
		const document = new DOMParser().parseFromString(`<svg>${content}</svg>`, 'image/svg+xml');
		const paths = [...document.querySelectorAll('path')];
		expect(
			paths.map((element) => [element.getAttribute('fill'), element.getAttribute('stroke')])
		).toEqual([
			['currentColor', 'currentColor'],
			['none', 'none'],
			['url(#paint)', 'url(#line)'],
			['currentColor', 'currentColor']
		]);
	});

	it('rejects missing SVG assets during generation instead of rendering an empty icon', () => {
		expect(() => normalizeIcon('<div>not an icon</div>')).toThrow(
			'Icon must contain an SVG element'
		);
	});
});
