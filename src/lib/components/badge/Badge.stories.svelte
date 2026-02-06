<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Badge from './Badge.svelte';
	import { getAvailableIcons } from '../icon';

	const availableIcons = getAvailableIcons();

	const { Story } = defineMeta({
		title: 'Components/Badge',
		component: Badge,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			text: {
				control: { type: 'text' },
				description: 'Badge text content'
			},
			leadingIcon: {
				control: { type: 'select' },
				options: [null, ...availableIcons],
				description: 'Icon to display before text'
			},
			showDelete: {
				control: { type: 'boolean' },
				description: 'Show delete button'
			},
			onDelete: {
				action: 'delete',
				description: 'Callback when delete button is clicked'
			},
			disabled: {
				control: { type: 'boolean' },
				description: 'Disable the badge'
			},
			size: {
				control: { type: 'select' },
				options: ['small', 'base', 'large'],
				description: 'Badge size'
			}
		}
	});
</script>

<Story name="All Variants" args={{ text: 'Item', showDelete: true }}>
	{#snippet template(args)}
		<div style="display: flex; flex-direction: column; gap: 1rem;">
			<div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
				<Badge text={args.text} size="small" />
				<Badge text={args.text} leadingIcon="search" size="small" />
				<Badge
					text={args.text}
					showDelete={args.showDelete}
					onDelete={args.onDelete}
					size="small"
				/>
				<Badge
					text={args.text}
					leadingIcon="search"
					showDelete={args.showDelete}
					onDelete={args.onDelete}
					size="small"
				/>
				<Badge text={args.text} disabled size="small" />
				<Badge text={args.text} leadingIcon="search" disabled size="small" />
				<Badge
					text={args.text}
					showDelete={args.showDelete}
					onDelete={args.onDelete}
					disabled
					size="small"
				/>
				<Badge
					text={args.text}
					leadingIcon="search"
					showDelete={args.showDelete}
					onDelete={args.onDelete}
					disabled
					size="small"
				/>
			</div>
			<div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
				<Badge text={args.text} size="base" />
				<Badge text={args.text} leadingIcon="search" size="base" />
				<Badge text={args.text} showDelete={args.showDelete} onDelete={args.onDelete} size="base" />
				<Badge
					text={args.text}
					leadingIcon="search"
					showDelete={args.showDelete}
					onDelete={args.onDelete}
					size="base"
				/>
				<Badge text={args.text} disabled size="base" />
				<Badge text={args.text} leadingIcon="search" disabled size="base" />
				<Badge
					text={args.text}
					showDelete={args.showDelete}
					onDelete={args.onDelete}
					disabled
					size="base"
				/>
				<Badge
					text={args.text}
					leadingIcon="search"
					showDelete={args.showDelete}
					onDelete={args.onDelete}
					disabled
					size="base"
				/>
			</div>
			<div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
				<Badge text={args.text} size="large" />
				<Badge text={args.text} leadingIcon="search" size="large" />
				<Badge
					text={args.text}
					showDelete={args.showDelete}
					onDelete={args.onDelete}
					size="large"
				/>
				<Badge
					text={args.text}
					leadingIcon="search"
					showDelete={args.showDelete}
					onDelete={args.onDelete}
					size="large"
				/>
				<Badge text={args.text} disabled size="large" />
				<Badge text={args.text} leadingIcon="search" disabled size="large" />
				<Badge
					text={args.text}
					showDelete={args.showDelete}
					onDelete={args.onDelete}
					disabled
					size="large"
				/>
				<Badge
					text={args.text}
					leadingIcon="search"
					showDelete={args.showDelete}
					onDelete={args.onDelete}
					disabled
					size="large"
				/>
			</div>
		</div>
	{/snippet}
</Story>

<Story
	name="Playground"
	args={{
		text: 'Item',
		leadingIcon: undefined,
		showDelete: false,
		disabled: false
	}}
>
	{#snippet template(args)}
		<Badge {...args} onDelete={args.onDelete} />
	{/snippet}
</Story>
