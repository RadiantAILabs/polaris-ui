<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Popover } from './index.js';
	import { Button } from '../button';
	import { Input } from '../input';

	const { Story } = defineMeta({
		title: 'Components/Popover',
		component: Popover,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			open: {
				control: { type: 'boolean' },
				description: 'Controls whether the popover is open'
			},
			disabled: {
				control: { type: 'boolean' },
				description: 'Whether the popover trigger is disabled'
			},
			align: {
				control: { type: 'select' },
				options: ['start', 'end'],
				description: 'How to align the popover relative to the trigger'
			},
			triggerButtonProps: {
				control: { type: 'object' },
				description: 'Props to pass to the trigger button (including label for button text)'
			}
		}
	});
</script>

<Story name="All Variants">
	{#snippet template()}
		<div style="display: flex; flex-wrap: wrap; gap: 24px; padding: 120px;">
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Start</h3>
				<Popover triggerButtonProps={{ label: 'Start' }}>
					{#snippet actions()}
						<Button variant="secondary" label="Cancel" size="base" />
						<Button variant="primary" label="Submit" size="base" />
					{/snippet}

					<Popover.Header title="Contact Form" />
					<div style="display: flex; flex-direction: column; gap: 16px;">
						<Input placeholder="Name" />
						<Input placeholder="Email" type="email" />
					</div>
				</Popover>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">End</h3>
				<Popover triggerButtonProps={{ label: 'End' }} align="end">
					{#snippet actions()}
						<Button variant="secondary" label="Cancel" size="base" />
						<Button variant="primary" label="Submit" size="base" />
					{/snippet}

					<Popover.Header title="Contact Form" />
					<div style="display: flex; flex-direction: column; gap: 16px;">
						<Input placeholder="Name" />
						<Input placeholder="Email" type="email" />
					</div>
				</Popover>
			</div>
		</div>
	{/snippet}
</Story>

<Story
	name="Playground"
	args={{
		open: false,
		disabled: false,
		align: 'start',
		triggerButtonProps: { label: 'Open Modal', variant: 'primary', size: 'base' }
	}}
>
	{#snippet template(args)}
		<div style="padding: 40px;">
			<Popover {...args}>
				{#snippet actions()}
					<Button
						variant="secondary"
						label="Cancel"
						onclick={() => console.log('Cancel clicked')}
						size="base"
					/>
					<Button
						variant="primary"
						label="Submit"
						onclick={() => console.log('Submit clicked')}
						size="base"
					/>
				{/snippet}

				<Popover.Header title="Form Modal" />

				<div style="display: flex; flex-direction: column; gap: 16px;">
					<Input placeholder="Name" />
					<Input placeholder="Email" type="email" />
					<Input placeholder="Message" />
				</div>
			</Popover>
		</div>
	{/snippet}
</Story>
