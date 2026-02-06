<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { CollapsibleWindow } from './index';

	const { Story } = defineMeta({
		title: 'Components/CollapsibleWindow',
		component: CollapsibleWindow,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			open: {
				control: { type: 'boolean' },
				description: 'Whether the collapsible content is initially open'
			},
			disabled: {
				control: { type: 'boolean' },
				description: 'Whether the collapsible window is disabled'
			},
			ariaLabel: {
				control: { type: 'text' },
				description: 'ARIA label for the trigger button'
			}
		}
	});
</script>

<script lang="ts">
	let basicOpen = $state(false);
	let nestedLevel1_1 = $state(false);
	let nestedLevel1_2 = $state(false);
	let nestedLevel1_3 = $state(false);
	let nestedLevel2_1_1 = $state(false);
	let nestedLevel2_1_2 = $state(false);
	let nestedLevel2_2_1 = $state(false);
	let nestedLevel2_2_2 = $state(false);
	let nestedLevel2_3_1 = $state(false);
	let nestedLevel2_3_2 = $state(false);
</script>

<Story name="All Variants">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 32px; width: 400px;">
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Basic</h3>
				<CollapsibleWindow bind:open={basicOpen}>
					{#snippet trigger()}
						<span>User Settings</span>
					{/snippet}
					{#snippet content()}
						<p style="margin: 0; color: var(--color-text-secondary);">
							Configure your account preferences and privacy settings.
						</p>
					{/snippet}
				</CollapsibleWindow>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Disabled</h3>
				<CollapsibleWindow disabled={true}>
					{#snippet trigger()}
						<span>Disabled Section</span>
					{/snippet}
					{#snippet content()}
						<p style="margin: 0; color: var(--color-text-secondary);">
							This content is not available.
						</p>
					{/snippet}
				</CollapsibleWindow>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Long Content</h3>
				<CollapsibleWindow>
					{#snippet trigger()}
						<span>Documentation</span>
					{/snippet}
					{#snippet content()}
						<div style="max-width: 350px;">
							This component creates a collapsible section with border lines above and below. The
							trigger and content are aligned to the left for better readability. <br /><br />
							This component creates a collapsible section with border lines above and below. The trigger
							and content are aligned to the left for better readability. <br /><br />
							This component creates a collapsible section with border lines above and below. The trigger
							and content are aligned to the left for better readability.
						</div>
					{/snippet}
				</CollapsibleWindow>
			</div>
		</div>
	{/snippet}
</Story>

<Story
	name="Playground"
	args={{
		open: false,
		disabled: false,
		ariaLabel: 'Toggle collapsible content'
	}}
>
	{#snippet template(args)}
		<div style="width: 400px;">
			<CollapsibleWindow {...args}>
				{#snippet trigger()}
					<span>Playground Example</span>
				{/snippet}
				{#snippet content()}
					This is a playground for testing the CollapsibleWindow component.
				{/snippet}
			</CollapsibleWindow>
		</div>
	{/snippet}
</Story>

<Story name="Recursive">
	{#snippet template()}
		<div style="width: 600px;">
			<style>
				.collapsible-window:not(:last-child) {
					border-bottom: none;
				}
			</style>
			<div style="margin-bottom: 16px;">
				<h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 600;">Recursive Collapsibles</h3>
				<p style="margin: 0 0 16px; font-size: 14px; color: var(--color-text-secondary);">
					Custom styling applied to remove double borders between nested collapsible sections.
				</p>
			</div>

			<!-- Level 1 - First Collapsible -->
			<CollapsibleWindow bind:open={nestedLevel1_1}>
				{#snippet trigger()}
					<span style="font-weight: 500;">Level 1 - Section A</span>
				{/snippet}
				{#snippet content()}
					<div
						style="padding: 8px 0; padding-left: 16px; border-left: 2px solid var(--color-border);"
					>
						<CollapsibleWindow bind:open={nestedLevel2_1_1}>
							{#snippet trigger()}
								<span style="font-size: 14px;">Level 2 - Subsection A1</span>
							{/snippet}
							{#snippet content()}
								<div
									style="padding: 12px; margin: 8px 0; background: var(--color-background-subtle); border-radius: 4px;"
								>
									<p style="margin: 0; font-size: 13px; color: var(--color-text-secondary);">
										This is deeply nested content in Section A, Subsection A1. It demonstrates how
										the collapsible component handles multiple levels of nesting.
									</p>
								</div>
							{/snippet}
						</CollapsibleWindow>

						<CollapsibleWindow bind:open={nestedLevel2_1_2}>
							{#snippet trigger()}
								<span style="font-size: 14px;">Level 2 - Subsection A2</span>
							{/snippet}
							{#snippet content()}
								<div
									style="padding: 12px; margin: 8px 0; background: var(--color-background-subtle); border-radius: 4px;"
								>
									<p style="margin: 0; font-size: 13px; color: var(--color-text-secondary);">
										Another piece of nested content in Section A, Subsection A2. Each level
										maintains proper spacing and visual hierarchy.
									</p>
								</div>
							{/snippet}
						</CollapsibleWindow>
					</div>
				{/snippet}
			</CollapsibleWindow>

			<!-- Level 1 - Second Collapsible -->
			<CollapsibleWindow bind:open={nestedLevel1_2}>
				{#snippet trigger()}
					<span style="font-weight: 500;">Level 1 - Section B</span>
				{/snippet}
				{#snippet content()}
					<div
						style="padding: 8px 0; padding-left: 16px; border-left: 2px solid var(--color-border);"
					>
						<CollapsibleWindow bind:open={nestedLevel2_2_1}>
							{#snippet trigger()}
								<span style="font-size: 14px;">Level 2 - Subsection B1</span>
							{/snippet}
							{#snippet content()}
								<div
									style="padding: 12px; margin: 8px 0; background: var(--color-background-subtle); border-radius: 4px;"
								>
									<p style="margin: 0; font-size: 13px; color: var(--color-text-secondary);">
										Content for Section B, Subsection B1. This demonstrates consistent behavior
										across different branches of the nested structure.
									</p>
								</div>
							{/snippet}
						</CollapsibleWindow>

						<CollapsibleWindow bind:open={nestedLevel2_2_2}>
							{#snippet trigger()}
								<span style="font-size: 14px;">Level 2 - Subsection B2</span>
							{/snippet}
							{#snippet content()}
								<div
									style="padding: 12px; margin: 8px 0; background: var(--color-background-subtle); border-radius: 4px;"
								>
									<p style="margin: 0; font-size: 13px; color: var(--color-text-secondary);">
										Final content for Section B, Subsection B2. The visual indicators help users
										understand the nesting structure.
									</p>
								</div>
							{/snippet}
						</CollapsibleWindow>
					</div>
				{/snippet}
			</CollapsibleWindow>

			<!-- Level 1 - Third Collapsible -->
			<CollapsibleWindow bind:open={nestedLevel1_3}>
				{#snippet trigger()}
					<span style="font-weight: 500;">Level 1 - Section C</span>
				{/snippet}
				{#snippet content()}
					<div
						style="padding: 8px 0; padding-left: 16px; border-left: 2px solid var(--color-border);"
					>
						<CollapsibleWindow bind:open={nestedLevel2_3_1}>
							{#snippet trigger()}
								<span style="font-size: 14px;">Level 2 - Subsection C1</span>
							{/snippet}
							{#snippet content()}
								<div
									style="padding: 12px; margin: 8px 0; background: var(--color-background-subtle); border-radius: 4px;"
								>
									<p style="margin: 0; font-size: 13px; color: var(--color-text-secondary);">
										Content for Section C, Subsection C1. This is the third major section showing
										how the component scales with more content.
									</p>
								</div>
							{/snippet}
						</CollapsibleWindow>

						<CollapsibleWindow bind:open={nestedLevel2_3_2}>
							{#snippet trigger()}
								<span style="font-size: 14px;">Level 2 - Subsection C2</span>
							{/snippet}
							{#snippet content()}
								<div
									style="padding: 12px; margin: 8px 0; background: var(--color-background-subtle); border-radius: 4px;"
								>
									<p style="margin: 0; font-size: 13px; color: var(--color-text-secondary);">
										Final deeply nested content in Section C, Subsection C2. This completes the
										triple-nested example with full functionality.
									</p>
								</div>
							{/snippet}
						</CollapsibleWindow>
					</div>
				{/snippet}
			</CollapsibleWindow>
		</div>
	{/snippet}
</Story>
