<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import RadioGroup from './RadioGroup.svelte';

	const { Story } = defineMeta({
		title: 'Components/RadioGroup',
		component: RadioGroup,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			value: {
				control: { type: 'text' },
				description: 'The selected value'
			},
			items: {
				control: { type: 'object' },
				description: 'Array of radio group items'
			}
		}
	});
</script>

<Story name="Default">
	{#snippet template()}
		<RadioGroup
			value="option2"
			items={[
				{ value: 'option1', label: 'Option 1' },
				{ value: 'option2', label: 'Option 2' },
				{ value: 'option3', label: 'Option 3' },
				{ value: 'option4', label: 'Option 4 (Disabled)', disabled: true }
			]}
		/>
	{/snippet}
</Story>

<Story
	name="Playground"
	args={{
		value: 'option2',
		items: [
			{ value: 'option1', label: 'Option 1' },
			{ value: 'option2', label: 'Option 2' },
			{ value: 'option3', label: 'Option 3' }
		]
	}}
>
	{#snippet template(args)}
		<RadioGroup {...args} />
	{/snippet}
</Story>
