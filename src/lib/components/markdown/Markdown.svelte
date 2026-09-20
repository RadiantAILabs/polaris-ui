<script lang="ts">
	// Rendering logic lives in ./render-markdown.ts, a plain TS module with no
	// Svelte dependency, so it can be unit tested directly under any test
	// runner (this repo's CI runs the tests with Bun's own test runner, which
	// cannot compile a `.svelte` file's `<script module>` block).
	import { renderMarkdown } from './render-markdown';

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
			background: var(--color-background-raised);

			@include typography('body-small-semibold');
		}

		.cell--narrow {
			width: 1%;
			font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
			white-space: nowrap;
		}
	}
</style>
