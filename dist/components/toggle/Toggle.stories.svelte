<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Toggle from './Toggle.svelte';

	const { Story } = defineMeta({
		title: 'Components/Toggle',
		component: Toggle,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			border: {
				control: { type: 'select' },
				options: ['light', 'strong'],
				description: 'Border variant'
			},
			options: {
				control: { type: 'object' },
				description: 'Array of toggle options with label and value'
			},
			value: {
				control: { type: 'text' },
				description: 'Currently selected value'
			}
		}
	});
</script>

<Story
	name="Border Variants"
	args={{
		options: [
			{ label: 'Option 1', value: 'option1' },
			{ label: 'Option 2', value: 'option2' },
			{ label: 'Option 3', value: 'option3' }
		],
		value: 'option1'
	}}
>
	{#snippet template(args)}
		<div style="display: flex; gap: 2rem; align-items: center;">
			<Toggle {...args} border="light" />
			<Toggle {...args} border="strong" />
		</div>
	{/snippet}
</Story>

<Story
	name="Two Options"
	args={{
		options: [
			{ label: 'On', value: 'on' },
			{ label: 'Off', value: 'off' }
		],
		value: 'on'
	}}
>
	{#snippet template(args)}
		<Toggle {...args} />
	{/snippet}
</Story>

<Story
	name="Multiple Options"
	args={{
		options: [
			{ label: 'Daily', value: 'daily' },
			{ label: 'Weekly', value: 'weekly' },
			{ label: 'Monthly', value: 'monthly' },
			{ label: 'Yearly', value: 'yearly' }
		],
		value: 'weekly'
	}}
>
	{#snippet template(args)}
		<Toggle {...args} />
	{/snippet}
</Story>

<Story
	name="Playground"
	args={{
		border: 'light',
		options: [
			{ label: 'Value 1', value: 'value1' },
			{ label: 'Value 2', value: 'value2' },
			{ label: 'Value 3', value: 'value3' }
		],
		value: 'value1'
	}}
>
	{#snippet template(args)}
		<Toggle {...args} />
	{/snippet}
</Story>
