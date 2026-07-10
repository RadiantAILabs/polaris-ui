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
</script>

<Story name="All elements">
	{#snippet template()}
		<div style="max-width: 32rem;">
			<Markdown {source} />
		</div>
	{/snippet}
</Story>
