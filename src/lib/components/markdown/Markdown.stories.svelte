<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Markdown from './Markdown.svelte';

	const { Story } = defineMeta({
		title: 'Components/Markdown',
		component: Markdown,
		parameters: { layout: 'padded' },
		tags: ['autodocs']
	});

	const source = `# Heading 1

A paragraph with **bold**, *italic*, \`inline code\`, and [a link](https://example.com).

A second paragraph after a blank line. This exercises the \`p + p\` margin rule.

## Heading 2
### Heading 3
#### Heading 4

- Unordered first
- Unordered second
- Unordered third

1. Ordered one
2. Ordered two

A paragraph that follows a list. This exercises the \`ul + p\` margin rule.

> A blockquote spanning
> two lines, styled with a left border.

---

\`\`\`ts
function greet(name: string) {
  return \`Hello, \${name}!\`;
}
\`\`\`
`;

	const tableSource = `Three earlier runs hit the same retry loop.

| Run | Started | Outcome | What happened |
| --- | --- | --- | --- |
| \`run-7f3a\` | 09:41:03 | error | Three retries, then a timeout from the vector store |
| \`run-c21d\` | 09:52:47 | ok | Two retries; the third attempt returned 40 documents |
| \`run-08e1\` | 10:05:12 | ok | One retry; slow but within budget |

The common factor is the **first retrieval call** after a cold start. See
[the trace](https://example.com/traces/7f3a) for details.
`;
</script>

<Story name="All elements">
	{#snippet template()}
		<div style="max-width: 32rem;">
			<Markdown {source} />
		</div>
	{/snippet}
</Story>

<Story name="GFM tables">
	{#snippet template()}
		<div style="max-width: 32rem;">
			<Markdown source={tableSource} tables />
		</div>
	{/snippet}
</Story>
