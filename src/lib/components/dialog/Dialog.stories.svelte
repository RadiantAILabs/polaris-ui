<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Dialog from './index.js';
	import { Button } from '../button';
	import { Input } from '../input';

	const { Story } = defineMeta({
		title: 'Components/Dialog',
		component: Dialog,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			open: {
				control: { type: 'boolean' },
				description: 'Controls whether the overlay is open'
			},
			disabled: {
				control: { type: 'boolean' },
				description: 'Whether the overlay trigger is disabled'
			},
			title: {
				control: { type: 'text' },
				description: 'The title text displayed in the overlay header'
			},
			variant: {
				control: { type: 'select' },
				options: ['modal', 'side-sheet'],
				description:
					'The variant of the Dialog - modal (centered) or side-sheet (slides from right)'
			},
			size: {
				control: { type: 'select' },
				options: ['small', 'medium', 'large', 'extra-large'],
				description: 'The size of the dialog'
			},
			showCloseButton: {
				control: { type: 'boolean' },
				description: 'Whether to show the close button in the top-right corner'
			},
			triggerButtonProps: {
				control: { type: 'object' },
				description: 'Props to pass to the trigger button (including label for button text)'
			}
		}
	});
</script>

<script lang="ts">
	let smallOpen = $state(false);
	let mediumOpen = $state(false);
	let largeOpen = $state(false);
	let xlOpen = $state(false);
	let overflowsOpen = $state(false);
	let sideSheetSmallOpen = $state(false);
	let sideSheetMediumOpen = $state(false);
	let sideSheetLargeOpen = $state(false);
</script>

<Story name="Sizes">
	{#snippet template()}
		<div style="display: flex; flex-wrap: wrap; gap: 24px; padding: 40px;">
			<!-- Small -->
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Small</h3>
				<Dialog
					title="Small Modal"
					size="small"
					open={smallOpen}
					onOpenChange={(open) => (smallOpen = open)}
					triggerButtonProps={{ label: 'Open Small', variant: 'secondary', size: 'base' }}
				>
					<div style="display: flex; flex-direction: column; gap: 16px;">
						<p style="margin: 0; color: var(--color-text-secondary);">
							This is a small modal, good for simple confirmations.
						</p>
						<Input placeholder="Name" />
					</div>

					{#snippet footer()}
						<Button
							variant="secondary"
							label="Cancel"
							size="base"
							onclick={() => (smallOpen = false)}
						/>
						<Button variant="primary" label="Confirm" size="base" />
					{/snippet}
				</Dialog>
			</div>

			<!-- Medium -->
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Medium (Default)</h3>
				<Dialog
					title="Medium Modal"
					size="medium"
					open={mediumOpen}
					onOpenChange={(open) => (mediumOpen = open)}
					triggerButtonProps={{ label: 'Open Medium', variant: 'secondary', size: 'base' }}
				>
					<div style="display: flex; flex-direction: column; gap: 16px;">
						<p style="margin: 0; color: var(--color-text-secondary);">
							This is a medium modal, good for forms and settings.
						</p>
						<Input placeholder="Name" />
						<Input placeholder="Email" />
						<Input placeholder="Message" />
					</div>

					{#snippet footer()}
						<Button
							variant="secondary"
							label="Cancel"
							size="base"
							onclick={() => (mediumOpen = false)}
						/>
						<Button variant="primary" label="Save" size="base" />
					{/snippet}
				</Dialog>
			</div>

			<!-- Large -->
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Large</h3>
				<Dialog
					title="Large Modal"
					size="large"
					open={largeOpen}
					onOpenChange={(open) => (largeOpen = open)}
					triggerButtonProps={{ label: 'Open Large', variant: 'secondary', size: 'base' }}
				>
					<div style="display: flex; flex-direction: column; gap: 16px;">
						<p style="margin: 0; color: var(--color-text-secondary);">
							This is a large modal, good for complex forms and detailed content.
						</p>
						<div style="display: flex; gap: 12px;">
							<Input placeholder="First name" />
							<Input placeholder="Last name" />
						</div>
						<Input placeholder="Email" />
						<Input placeholder="Company" />
						<Input placeholder="Job title" />
						<Input placeholder="Bio" />
					</div>

					{#snippet footer()}
						<Button
							variant="secondary"
							label="Cancel"
							size="base"
							onclick={() => (largeOpen = false)}
						/>
						<Button variant="primary" label="Create Profile" size="base" />
					{/snippet}
				</Dialog>
			</div>

			<!-- Extra Large -->
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Extra Large</h3>
				<Dialog
					title="Extra Large Modal"
					size="extra-large"
					open={xlOpen}
					onOpenChange={(open) => (xlOpen = open)}
					triggerButtonProps={{ label: 'Open XL', variant: 'secondary', size: 'base' }}
				>
					<div style="display: flex; flex-direction: column; gap: 12px;">
						<p style="margin: 0; color: var(--color-text-secondary);">
							This is an extra large modal, good for dashboards and data tables.
						</p>
						<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;">
							<Input placeholder="Field 1" />
							<Input placeholder="Field 2" />
							<Input placeholder="Field 3" />
							<Input placeholder="Field 4" />
							<Input placeholder="Field 5" />
							<Input placeholder="Field 6" />
						</div>
						<Input placeholder="Long description field" />
					</div>

					{#snippet footer()}
						<Button
							variant="secondary"
							label="Cancel"
							size="base"
							onclick={() => (xlOpen = false)}
						/>
						<Button variant="primary" label="Save Changes" size="base" />
					{/snippet}
				</Dialog>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Side Sheet Variant">
	{#snippet template()}
		<div style="display: flex; flex-wrap: wrap; gap: 24px; padding: 40px;">
			<!-- Small Size -->
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Small (400px)</h3>
				<Dialog
					variant="side-sheet"
					title="Small Side Sheet"
					size="small"
					open={sideSheetSmallOpen}
					onOpenChange={(open) => (sideSheetSmallOpen = open)}
					triggerButtonProps={{
						label: 'Open Small Side Sheet',
						variant: 'secondary',
						size: 'base'
					}}
				>
					<div style="display: flex; flex-direction: column; gap: 16px;">
						<p style="margin: 0; color: var(--color-text-secondary);">
							This is a Dialog with variant="side-sheet" and size="small".
						</p>
						<Input placeholder="Name" />
						<Input placeholder="Email" />
					</div>

					{#snippet footer()}
						<Button
							variant="secondary"
							label="Cancel"
							size="base"
							onclick={() => (sideSheetSmallOpen = false)}
						/>
						<Button variant="primary" label="Save" size="base" />
					{/snippet}
				</Dialog>
			</div>

			<!-- Medium Size -->
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">
					Medium (600px - Default)
				</h3>
				<Dialog
					variant="side-sheet"
					title="Medium Side Sheet"
					size="medium"
					open={sideSheetMediumOpen}
					onOpenChange={(open) => (sideSheetMediumOpen = open)}
					triggerButtonProps={{
						label: 'Open Medium Side Sheet',
						variant: 'secondary',
						size: 'base'
					}}
				>
					<div style="display: flex; flex-direction: column; gap: 16px;">
						<p style="margin: 0; color: var(--color-text-secondary);">
							This is a Dialog with variant="side-sheet" and size="medium".
						</p>
						<Input placeholder="Name" />
						<Input placeholder="Email" />
						<Input placeholder="Company" />
						<Input placeholder="Message" />
					</div>

					{#snippet footer()}
						<Button
							variant="secondary"
							label="Cancel"
							size="base"
							onclick={() => (sideSheetMediumOpen = false)}
						/>
						<Button variant="primary" label="Submit" size="base" />
					{/snippet}
				</Dialog>
			</div>

			<!-- Large Size -->
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Large (800px)</h3>
				<Dialog
					variant="side-sheet"
					title="Large Side Sheet"
					size="large"
					open={sideSheetLargeOpen}
					onOpenChange={(open) => (sideSheetLargeOpen = open)}
					triggerButtonProps={{
						label: 'Open Large Side Sheet',
						variant: 'secondary',
						size: 'base'
					}}
				>
					<div style="display: flex; flex-direction: column; gap: 16px;">
						<p style="margin: 0; color: var(--color-text-secondary);">
							This is a Dialog with variant="side-sheet" and size="large".
						</p>
						<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
							<Input placeholder="First name" />
							<Input placeholder="Last name" />
							<Input placeholder="Email" />
							<Input placeholder="Phone" />
							<Input placeholder="Company" />
							<Input placeholder="Job title" />
						</div>
						<Input placeholder="Bio" />
					</div>

					{#snippet footer()}
						<Button
							variant="secondary"
							label="Cancel"
							size="base"
							onclick={() => (sideSheetLargeOpen = false)}
						/>
						<Button variant="primary" label="Create Profile" size="base" />
					{/snippet}
				</Dialog>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Overflows">
	{#snippet template()}
		<div style="padding: 40px;">
			<Dialog
				title="This is an extremely long title that should demonstrate how the Dialog component handles very long titles that might wrap to multiple lines or get truncated depending on the design requirements and available space in the header area"
				open={overflowsOpen}
				onOpenChange={(open) => (overflowsOpen = open)}
				triggerButtonProps={{ label: 'Open Overflows Example', variant: 'primary', size: 'base' }}
			>
				<div style="display: flex; flex-direction: column; gap: 24px;">
					<h3 style="margin: 0; font-size: 16px; font-weight: 600;">
						Long Content with Long Title
					</h3>
					<p style="margin: 0; color: var(--color-text-secondary);">
						This story demonstrates how the overlay handles both very long titles and extensive
						content that requires scrolling.
					</p>

					<!-- eslint-disable @typescript-eslint/no-unused-vars -->
					{#each Array(10) as _, i (i)}
						<div>
							<h4 style="margin: 0 0 8px; font-size: 14px; font-weight: 600;">Section {i + 1}</h4>
							<p style="margin: 0; line-height: 1.5; color: var(--color-text-secondary);">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
								exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
								irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
								pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
								deserunt mollit anim id est laborum.
							</p>
						</div>
					{/each}
				</div>

				{#snippet footer()}
					<Button
						variant="secondary"
						label="Decline"
						onclick={() => (overflowsOpen = false)}
						size="base"
					/>
					<Button
						variant="primary"
						label="Accept"
						onclick={() => console.log('Accept clicked')}
						size="base"
					/>
				{/snippet}
			</Dialog>
		</div>
	{/snippet}
</Story>

<Story
	name="Playground"
	args={{
		open: false,
		disabled: false,
		title: 'Dialog Title',
		variant: 'modal',
		size: 'medium',
		showCloseButton: true,
		triggerButtonProps: { label: 'Open Dialog', variant: 'primary', size: 'base' }
	}}
>
	{#snippet template(args)}
		<div style="padding: 40px;">
			<Dialog {...args}>
				<div style="display: flex; flex-direction: column; gap: 16px;">
					<h3 style="margin: 0; font-size: 16px; font-weight: 600;">Content Area</h3>
					<p style="margin: 0; color: var(--color-text-secondary);">
						This is the main content area of the overlay. You can add any content here.
					</p>
					<Input placeholder="Example input field" />
					<div style="display: flex; gap: 12px;">
						<Input placeholder="First name" />
						<Input placeholder="Last name" />
					</div>
				</div>

				{#snippet footer()}
					<Button
						variant="secondary"
						label="Cancel"
						onclick={() => console.log('Cancel clicked')}
						size="base"
					/>
					<Button
						variant="primary"
						label="Save Changes"
						onclick={() => console.log('Save clicked')}
						size="base"
					/>
				{/snippet}
			</Dialog>
		</div>
	{/snippet}
</Story>
