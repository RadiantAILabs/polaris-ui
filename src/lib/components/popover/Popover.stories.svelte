<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, within, userEvent, waitFor } from 'storybook/test';
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

{#snippet customContentExample()}
	<Popover.Root>
		<Popover.Trigger
			>{#snippet child({ props })}<Button
					{...props}
					variant="secondary"
					label="Select a value"
					icon="chevron-down"
				/>{/snippet}</Popover.Trigger
		>
		<Popover.Content
			style="width: var(--bits-popover-anchor-width); min-width: 240px;"
			onOpenAutoFocus={(event) => event.preventDefault()}
		>
			<div style="padding: 8px;"><Input aria-label="Value" placeholder="Value" /></div>
		</Popover.Content>
	</Popover.Root>
{/snippet}

<Story name="Custom Content" template={customContentExample} />
<Story
	name="Custom Content interactions"
	tags={['interaction', '!dev', '!autodocs']}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const trigger = canvas.getByRole('button', { name: 'Select a value' });
		await userEvent.click(trigger);
		const input = await within(canvasElement.ownerDocument.body).findByRole('textbox', {
			name: 'Value'
		});
		const surface = input.closest('.polaris-popover-surface')!;
		await waitFor(() =>
			expect(
				Math.abs(surface.getBoundingClientRect().top - trigger.getBoundingClientRect().bottom - 4),
				'custom content stays anchored below its trigger'
			).toBeLessThan(2)
		);
		await userEvent.keyboard('{Escape}');
	}}
	template={customContentExample}
/>

<Story
	name="Disabled trigger"
	tags={['interaction']}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(
			canvas.getByRole('button', { name: 'Disabled through popover' }),
			'popover configuration disables the trigger'
		).toBeDisabled();
	}}
>
	{#snippet template()}
		<Popover disabled triggerButtonProps={{ label: 'Disabled through popover' }}
			>Unavailable</Popover
		>
	{/snippet}
</Story>
