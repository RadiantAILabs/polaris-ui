import { DOMParser } from 'linkedom';

export function normalizeIcon(source: string): string {
	const svg = new DOMParser().parseFromString(source, 'image/svg+xml').querySelector('svg');
	if (!svg) throw new Error('Icon must contain an SVG element');

	for (const attribute of ['fill', 'stroke']) {
		for (const element of svg.querySelectorAll(`[${attribute}]`)) {
			const value = element.getAttribute(attribute);
			if (value && value !== 'none' && !value.startsWith('url(')) {
				element.setAttribute(attribute, 'currentColor');
			}
		}
	}

	return svg.innerHTML;
}
