<script lang="ts">
	import { marked } from 'marked';
	import DOMPurify from 'dompurify';

	export interface MarkdownProps {
		/** Markdown source to render. */
		source: string;
	}

	let { source }: MarkdownProps = $props();

	const html = $derived.by(() => {
		const rendered = marked.parse(source, { gfm: false }) as string;
		return DOMPurify.sanitize(rendered);
	});
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -- sanitized by DOMPurify in renderMarkdown -->
<div class="markdown">{@html html}</div>

<style lang="scss">
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
	}
</style>
