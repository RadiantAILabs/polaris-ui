import { marked, Marked, type Tokens } from 'marked';
import DOMPurify from 'dompurify';

// A single token (optionally in backticks) that contains a digit: an id, a
// time, a date, or a number. Matched against the cell's raw source text, not
// its rendered HTML.
const NARROW_CELL = /^`?(?=[^\s`]*\d)[^\s`]{1,48}`?$/;

// A dedicated Marked instance for the tables-enabled path, so the custom
// table-cell renderer never touches the shared `marked` singleton used by the
// (default) flag-off path below or by any other consumer of `marked` in the
// host bundle.
const gfmMarked = new Marked({
	gfm: true,
	renderer: {
		tablecell(token: Tokens.TableCell): string {
			const tag = token.header ? 'th' : 'td';
			const classes = NARROW_CELL.test(token.text.trim()) ? ' class="cell--narrow"' : '';
			const align = token.align ? ` align="${token.align}"` : '';
			return `<${tag}${classes}${align}>${this.parser.parseInline(token.tokens)}</${tag}>\n`;
		}
	}
});

// Hardened sanitizer policy, applied regardless of the `tables` flag: no
// `<img>` or other media tags (the source can be model output pointing at a
// URL nobody here controls) and no inline `style`.
const SANITIZE_CONFIG = {
	USE_PROFILES: { html: true },
	FORBID_TAGS: ['img', 'picture', 'source', 'video', 'audio', 'track'],
	FORBID_ATTR: ['style']
};

function isExternalHref(href: string): boolean {
	// No `window` (e.g. during SSR): treat as external so it still gets
	// hardened rather than risk leaving an unhardened link in the markup.
	if (typeof window === 'undefined') return true;
	try {
		return new URL(href, window.location.href).origin !== window.location.origin;
	} catch {
		return true;
	}
}

// A DOMPurify instance isolated from the module-level default export. Calling
// the default export as a function (`DOMPurify()`) creates a new, independent
// instance bound to the current `window` instead of mutating the shared
// singleton that another consumer of `import DOMPurify from 'dompurify'` in
// the host app might also be using - `addHook` below must not leak onto that
// singleton. Created lazily so importing this module never touches `window`
// outside the browser.
let purify: ReturnType<typeof DOMPurify> | undefined;
function getPurify() {
	if (!purify) {
		purify = DOMPurify();
		if (typeof purify.addHook === 'function') {
			purify.addHook('afterSanitizeAttributes', (node) => {
				if (node.tagName !== 'A') return;
				const href = node.getAttribute('href');
				if (!href) return;
				if (isExternalHref(href)) {
					node.setAttribute('target', '_blank');
					node.setAttribute('rel', 'noopener noreferrer');
				}
			});
		}
	}
	return purify;
}

/**
 * Sanitized HTML for `source`. With `tables` off (the default) this is
 * exactly the pre-existing `marked.parse(source, { gfm: false })` call,
 * unchanged.
 */
export function renderMarkdown(source: string, tables = false): string {
	const rendered = tables
		? gfmMarked.parse(source, { async: false })
		: (marked.parse(source, { gfm: false }) as string);
	return getPurify().sanitize(rendered, SANITIZE_CONFIG);
}
