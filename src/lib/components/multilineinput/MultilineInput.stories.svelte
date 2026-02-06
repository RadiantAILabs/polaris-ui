<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MultilineInput from './MultilineInput.svelte';

	const { Story } = defineMeta({
		title: 'Components/MultilineInput',
		component: MultilineInput,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			placeholder: {
				control: { type: 'text' },
				description: 'Placeholder text'
			},
			disabled: {
				control: { type: 'boolean' },
				description: 'Whether the input is disabled'
			},
			readonly: {
				control: { type: 'boolean' },
				description: 'Whether the input is read-only'
			},
			showCopyButton: {
				control: { type: 'boolean' },
				description: 'Show a copy button to copy the content'
			},
			'aria-invalid': {
				control: { type: 'boolean' },
				description: 'Whether the input is in error state'
			},
			value: {
				control: { type: 'text' },
				description: 'Input value'
			}
		}
	});
</script>

<Story name="All Variants">
	{#snippet template()}
		<div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: flex-start;">
			<div style="min-width: 300px;">
				<h3 style="margin: 0 0 8px; font-size: 14px; font-weight: 500;">JSON</h3>
				<MultilineInput
					placeholder="Enter JSON..."
					value={`{
  "name": "example",
  "version": "1.0.0",
  "description": "A sample JSON"
}`}
				/>
			</div>
			<div style="min-width: 300px;">
				<h3 style="margin: 0 0 8px; font-size: 14px; font-weight: 500;">YAML</h3>
				<MultilineInput
					placeholder="Enter YAML..."
					value={`name: example
version: 1.0.0
description: A sample YAML
dependencies:
  - lodash
  - express`}
				/>
			</div>
			<div style="min-width: 300px;">
				<h3 style="margin: 0 0 8px; font-size: 14px; font-weight: 500;">Markdown</h3>
				<MultilineInput
					placeholder="Enter Markdown..."
					value={`# Hello World

This is a **sample** markdown with:

- Lists
- Code blocks
- And more!

\`\`\`javascript
console.log('Hello World');
\`\`\``}
				/>
			</div>
			<div style="min-width: 300px;">
				<h3 style="margin: 0 0 8px; font-size: 14px; font-weight: 500;">Disabled</h3>
				<MultilineInput
					placeholder="Enter JSON..."
					disabled={true}
					value={`{
  "disabled": true
}`}
				/>
			</div>
			<div style="min-width: 300px;">
				<h3 style="margin: 0 0 8px; font-size: 14px; font-weight: 500;">Error</h3>
				<MultilineInput
					placeholder="Enter JSON..."
					aria-invalid={true}
					value={`{
  "invalid": json,
}`}
				/>
			</div>
			<div style="min-width: 300px;">
				<h3 style="margin: 0 0 8px; font-size: 14px; font-weight: 500;">Read-Only with Copy</h3>
				<MultilineInput
					readonly={true}
					showCopyButton={true}
					value={`{
  "name": "read-only",
  "copyable": true
}`}
				/>
			</div>
		</div>
	{/snippet}
</Story>

<Story
	name="Playground"
	args={{
		placeholder: 'Enter code...',
		disabled: false,
		'aria-invalid': false,
		value: `{
  "name": "playground",
  "interactive": true,
  "features": [
    "syntax highlighting",
    "line numbers",
    "error states"
  ]
}`
	}}
>
	{#snippet template(args)}
		<div style="width: 400px; height: 300px;">
			<MultilineInput {...args} />
		</div>
	{/snippet}
</Story>
