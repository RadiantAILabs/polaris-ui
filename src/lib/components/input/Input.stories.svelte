<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Input from './Input.svelte';
	import { getAvailableIcons } from '../icon';

	const availableIcons = getAvailableIcons();

	const { Story } = defineMeta({
		title: 'Components/Input',
		component: Input,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			icon: {
				control: { type: 'select' },
				options: [null, ...availableIcons],
				description: 'Icon name to display'
			},
			placeholder: {
				control: { type: 'text' },
				description: 'Placeholder text'
			},
			label: {
				control: { type: 'text' },
				description: 'Field name displayed inside the input before the value.'
			},
			disabled: {
				control: { type: 'boolean' },
				description: 'Whether the input is disabled'
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
		<div style="display: flex; gap: 16px; align-items: flex-start;">
			<div>
				<h3 style="margin: 0 0 8px; font-size: 14px; font-weight: 500;">Default</h3>
				<Input icon="search" placeholder="Enter text..." />
			</div>
			<div>
				<h3 style="margin: 0 0 8px; font-size: 14px; font-weight: 500;">Disabled</h3>
				<Input icon="search" placeholder="Enter text..." disabled={true} />
			</div>
			<div>
				<h3 style="margin: 0 0 8px; font-size: 14px; font-weight: 500;">Error</h3>
				<Input icon="search" placeholder="Enter text..." aria-invalid={true} />
			</div>
		</div>
	{/snippet}
</Story>

<Story name="With Label">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 16px; width: 320px;">
			<Input label="ID" placeholder="Enter an ID..." />
			<Input label="Search" icon="search" placeholder="Search by name..." />
			<Input label="Amount" value="1024" disabled={true} />
			<Input label="Email" placeholder="name@example.com" aria-invalid={true} />
		</div>
	{/snippet}
</Story>

<Story
	name="Playground"
	args={{
		icon: 'search',
		label: 'Search',
		placeholder: 'Enter text...',
		disabled: false,
		'aria-invalid': false,
		value: ''
	}}
>
	{#snippet template(args)}
		<Input {...args} />
	{/snippet}
</Story>
