<script lang="ts" module>
	import { marked, Marked, type Tokens } from 'marked';
	import DOMPurify from 'dompurify';

	export interface MarkdownProps {
		/** Markdown source to render. */
		source: string;
		/**
		 * Enable GitHub-flavoured Markdown, including pipe tables. Off by
		 * default so existing consumers render exactly as before. When on, a
		 * table cell holding a single token that contains a digit (an id, a
		 * time, a date, or a number) gets a `cell--narrow` class so those
		 * columns stay tight while prose columns get the room.
		 */
		tables?: boolean;
	}

	// A single token (optionally in backticks) that contains a digit: an id, a
	// time, a date, or a number. Matched against the cell's raw source text,
	// not its rendered HTML.
	const NARROW_CELL = /^`?(?=[^\s`]*\d)[^\s`]{1,48}`?$/;

	// A dedicated Marked instance for the tables-enabled path, so the custom
	// table-cell renderer never touches the shared `marked` singleton used by
	// the (default) flag-off path below or by any other consumer of `marked`
	// in the host bundle.
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
	// `<img>` or other media tags (the source can be model output pointing at
	// a URL nobody here controls) and no inline `style`.
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

	// A DOMPurify instance isolated from the module-level default export.
	// Calling the default export as a function (`DOMPurify()`) creates a new,
	// independent instance bound to the current `window` instead of mutating
	// the shared singleton that another consumer of `import DOMPurify from
	// 'dompurify'` in the host app might also be using - `addHook` below must
	// not leak onto that singleton. Created lazily so importing this module
	// never touches `window` outside the browser.
	let purify: ReturnType<typeof DOMPurify> | undefined;
	function getPurify() {
		if (!purify) {
			purify = DOMPurify();
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
		return purify;
	}

	/**
	 * Sanitized HTML for `source`. With `tables` off (the default) this is
	 * exactly the pre-existing `marked.parse(source, { gfm: false })` call,
	 * unchanged. Exported for tests.
	 */
	export function renderMarkdown(source: string, tables = false): string {
		const rendered = tables
			? gfmMarked.parse(source, { async: false })
			: (marked.parse(source, { gfm: false }) as string);
		return getPurify().sanitize(rendered, SANITIZE_CONFIG);
	}
</script>

<script lang="ts">
	let { source, tables = false }: MarkdownProps = $props();

	const html = $derived(renderMarkdown(source, tables));
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -- sanitized by DOMPurify in renderMarkdown -->
<div class="markdown">{@html html}</div>

<style lang="scss">
	@use '../../styles/tokens' as *;

	.markdown :global {
		p {
			margin: 0;
		}

		ul,
		ol {
			padding-left: 1.25rem;
			margin: 0;
		}

		li + li {
			margin-top: 0.125rem;
		}

		p + p,
		p + ul,
		p + ol,
		ul + p,
		ol + p {
			margin-top: 0.5rem;
		}

		h1,
		h2,
		h3,
		h4 {
			margin: 0.5rem 0 0.25rem;
			font-weight: 600;
		}

		h1 {
			font-size: 1.05rem;
		}

		h2 {
			font-size: 1rem;
		}

		h3 {
			font-size: 0.95rem;
		}

		h4 {
			font-size: 0.9rem;
		}

		code {
			padding: 0.05rem 0.3rem;
			font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
			font-size: 0.85em;
			background: var(--color-background-emphasized-1);
			border-radius: 3px;
		}

		pre {
			padding: 0.5rem 0.625rem;
			margin: 0.5rem 0;
			overflow-x: auto;
			font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
			font-size: 1em;
			background: var(--color-background-emphasized-1);
			border-radius: 4px;
		}

		pre code {
			padding: 0;
			background: transparent;
			border-radius: 0;
		}

		a {
			color: var(--color-text-primary);
			text-decoration: underline;
		}

		blockquote {
			padding-left: 0.625rem;
			margin: 0.25rem 0;
			color: var(--color-text-secondary);
			border-left: 2px solid var(--color-border-base);
		}

		hr {
			margin: 0.75rem 0;
			border: 0;
			border-top: 1px solid var(--color-border-base);
		}

		table {
			font-variant-numeric: tabular-nums;
			border-collapse: collapse;

			@include typography('body-small-regular');
		}

		th,
		td {
			padding: $space-0-5 $space-1;
			vertical-align: top;
			text-align: left;
			border: $border-width-base solid var(--color-border-base);
		}

		th {
			color: var(--color-text-secondary);
			background: var(--color-background-emphasized-1);

			@include typography('body-small-semibold');
		}

		.cell--narrow {
			width: 1%;
			font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
			white-space: nowrap;
		}
	}
</style>
