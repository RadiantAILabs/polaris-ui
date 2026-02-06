<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from './Button.svelte';
	import { getAvailableIcons } from '../icon';

	const availableIcons = getAvailableIcons();

	const { Story } = defineMeta({
		title: 'Components/Button',
		component: Button,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['primary', 'secondary', 'invisible', 'destructive'],
				description: 'Button visual style variant'
			},
			size: {
				control: { type: 'select' },
				options: ['small', 'base', 'large'],
				description: 'Button size'
			},
			label: {
				control: { type: 'text' },
				description: 'Button text label'
			},
			icon: {
				control: { type: 'select' },
				options: [null, ...availableIcons],
				description: 'Icon to display in button'
			},
			iconPosition: {
				control: { type: 'select' },
				options: ['left', 'right'],
				description: 'Position of icon relative to label'
			},
			counterBadge: {
				control: { type: 'number' },
				description: 'Counter badge to display on the button'
			},
			badge: {
				control: { type: 'text' },
				description: 'Badge text to display in the button'
			},
			disabled: {
				control: { type: 'boolean' },
				description: 'Disable button interaction'
			},
			href: {
				control: { type: 'text' },
				description: 'URL to make button act as a link'
			},
			type: {
				control: { type: 'select' },
				options: ['button', 'submit', 'reset'],
				description: 'HTML button type'
			}
		}
	});
</script>

<Story name="All Variants" args={{ label: 'Button' }}>
	{#snippet template(args)}
		<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
			<Button variant="primary" size="small" label={args.label || 'Button'} />
			<Button variant="primary" size="base" label={args.label || 'Button'} />
			<Button variant="primary" size="large" label={args.label || 'Button'} />
			<Button variant="secondary" size="small" label={args.label || 'Button'} />
			<Button variant="secondary" size="base" label={args.label || 'Button'} />
			<Button variant="secondary" size="large" label={args.label || 'Button'} />
			<Button variant="destructive" size="small" label={args.label || 'Button'} />
			<Button variant="destructive" size="base" label={args.label || 'Button'} />
			<Button variant="destructive" size="large" label={args.label || 'Button'} />
			<Button variant="invisible" size="small" label={args.label || 'Button'} />
			<Button variant="invisible" size="base" label={args.label || 'Button'} />
			<Button variant="invisible" size="large" label={args.label || 'Button'} />
		</div>
	{/snippet}
</Story>

<Story name="With Badge" args={{ variant: 'primary' }}>
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 1rem;">
			<div>
				<h4 style="margin: 0 0 0.5rem; font-size: 0.875rem; font-weight: 500;">Small</h4>
				<div style="display: flex; gap: 0.5rem; align-items: center;">
					<Button variant="primary" size="small" label="Click here" badge="Item" />
					<Button
						variant="primary"
						size="small"
						label="Click here"
						badge="Item"
						icon="arrow-right"
					/>
					<Button variant="primary" size="small" label="Click here" badge="Item" disabled />
					<Button variant="secondary" size="small" label="Click here" badge="Item" />
					<Button
						variant="secondary"
						size="small"
						label="Click here"
						badge="Item"
						icon="arrow-right"
					/>
					<Button variant="secondary" size="small" label="Click here" badge="Item" disabled />
				</div>
			</div>
			<div>
				<h4 style="margin: 0 0 0.5rem; font-size: 0.875rem; font-weight: 500;">Base</h4>
				<div style="display: flex; gap: 0.5rem; align-items: center;">
					<Button variant="primary" size="base" label="Click here" badge="Item" />
					<Button
						variant="primary"
						size="base"
						label="Click here"
						badge="Item"
						icon="arrow-right"
					/>
					<Button variant="primary" size="base" label="Click here" badge="Item" disabled />
					<Button variant="secondary" size="base" label="Click here" badge="Item" />
					<Button
						variant="secondary"
						size="base"
						label="Click here"
						badge="Item"
						icon="arrow-right"
					/>
					<Button variant="secondary" size="base" label="Click here" badge="Item" disabled />
				</div>
			</div>
			<div>
				<h4 style="margin: 0 0 0.5rem; font-size: 0.875rem; font-weight: 500;">Large</h4>
				<div style="display: flex; gap: 0.5rem; align-items: center;">
					<Button variant="primary" size="large" label="Click here" badge="Item" />
					<Button
						variant="primary"
						size="large"
						label="Click here"
						badge="Item"
						icon="arrow-right"
					/>
					<Button variant="primary" size="large" label="Click here" badge="Item" disabled />
					<Button variant="secondary" size="large" label="Click here" badge="Item" />
					<Button
						variant="secondary"
						size="large"
						label="Click here"
						badge="Item"
						icon="arrow-right"
					/>
					<Button variant="secondary" size="large" label="Click here" badge="Item" disabled />
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Icons" args={{ variant: 'primary' }}>
	{#snippet template(args)}
		<div
			style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; align-items: center;"
		>
			<div>
				<h4 style="margin: 0 0 0.5rem; font-size: 0.875rem; font-weight: 500;">Small</h4>
				<div style="display: flex; gap: 0.5rem; align-items: center;">
					<Button
						variant={args.variant}
						size="small"
						icon="alert-circle"
						iconPosition="left"
						label="Left"
					/>
					<Button
						variant={args.variant}
						size="small"
						icon="arrow-right"
						iconPosition="right"
						label="Right"
					/>
					<Button variant={args.variant} size="small" icon="gear" />
					<Button variant={args.variant} size="small" icon="message" counterBadge={3} />
				</div>
			</div>
			<div>
				<h4 style="margin: 0 0 0.5rem; font-size: 0.875rem; font-weight: 500;">Base</h4>
				<div style="display: flex; gap: 0.5rem; align-items: center;">
					<Button
						variant={args.variant}
						size="base"
						icon="alert-circle"
						iconPosition="left"
						label="Left"
					/>
					<Button
						variant={args.variant}
						size="base"
						icon="arrow-right"
						iconPosition="right"
						label="Right"
					/>
					<Button variant={args.variant} size="base" icon="gear" />
					<Button variant={args.variant} size="base" icon="message" counterBadge={5} />
				</div>
			</div>
			<div>
				<h4 style="margin: 0 0 0.5rem; font-size: 0.875rem; font-weight: 500;">Large</h4>
				<div style="display: flex; gap: 0.5rem; align-items: center;">
					<Button
						variant={args.variant}
						size="large"
						icon="alert-circle"
						iconPosition="left"
						label="Left"
					/>
					<Button
						variant={args.variant}
						size="large"
						icon="arrow-right"
						iconPosition="right"
						label="Right"
					/>
					<Button variant={args.variant} size="large" icon="gear" />
					<Button variant={args.variant} size="large" icon="message" counterBadge={25} />
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<Story
	name="Playground"
	args={{
		variant: 'primary',
		size: 'base',
		label: 'Button',
		disabled: false,
		icon: undefined,
		iconPosition: 'left'
	}}
>
	{#snippet template(args)}
		<Button {...args} />
	{/snippet}
</Story>
