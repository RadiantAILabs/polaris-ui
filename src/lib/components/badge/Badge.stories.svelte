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
			},
			variant: {
				control: { type: 'select' },
				options: ['default', 'outline', 'inverse'],
				description: 'Visual variant'
			}
		}
	});
</script>

<Story name="States" args={{ text: 'Item', showDelete: true }}>
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

<Story name="Variants">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 1.5rem;">
			<div>
				<h3 style="margin: 0 0 0.5rem; font-size: 0.85rem; font-weight: 500;">Default</h3>
				<div style="display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center;">
					<Badge text="Small" size="small" />
					<Badge text="Base" size="base" />
					<Badge text="Large" size="large" />
					<Badge text="With icon" leadingIcon="search" size="base" />
				</div>
			</div>

			<div>
				<h3 style="margin: 0 0 0.5rem; font-size: 0.85rem; font-weight: 500;">Outline</h3>
				<div style="display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center;">
					<Badge text="Small" variant="outline" size="small" />
					<Badge text="Base" variant="outline" size="base" />
					<Badge text="Large" variant="outline" size="large" />
					<Badge text="With icon" variant="outline" leadingIcon="search" size="base" />
				</div>
			</div>

			<div>
				<h3 style="margin: 0 0 0.5rem; font-size: 0.85rem; font-weight: 500;">Inverse</h3>
				<div style="display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center;">
					<Badge text="Small" variant="inverse" size="small" />
					<Badge text="Base" variant="inverse" size="base" />
					<Badge text="Large" variant="inverse" size="large" />
					<Badge text="With icon" variant="inverse" leadingIcon="search" size="base" />
				</div>
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
