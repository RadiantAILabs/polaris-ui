<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TreeElementTag from './TreeElementTag.svelte';

	const { Story } = defineMeta({
		title: 'Components/Tree/ElementTag',
		component: TreeElementTag,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			upConnector: {
				control: { type: 'boolean' },
				description: 'Whether to show the upward connector line'
			},
			downConnector: {
				control: { type: 'boolean' },
				description: 'Whether to show the downward connector line'
			},
			text: {
				control: { type: 'text' },
				description: 'Short tag text shown inside the box'
			}
		}
	});
</script>

<Story name="Connectors">
	{#snippet template()}
		<div style="display: flex; gap: 48px; align-items: flex-start; padding: 40px;">
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Both Connectors</h3>
				<TreeElementTag text="Loop" upConnector={true} downConnector={true} />
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Up Only</h3>
				<TreeElementTag text="Loop" upConnector={true} downConnector={false} />
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Down Only</h3>
				<TreeElementTag text="Loop" upConnector={false} downConnector={true} />
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">No Connectors</h3>
				<TreeElementTag text="Loop" upConnector={false} downConnector={false} />
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Text Widths">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 24px; padding: 40px;">
			<div>
				<h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 500;">Empty</h3>
				<div style="display: inline-flex; border: 1px dashed purple">
					<TreeElementTag text="" upConnector={true} downConnector={true} />
				</div>
			</div>

			<div>
				<h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 500;">Single character</h3>
				<div style="display: inline-flex; border: 1px dashed purple">
					<TreeElementTag text="A" upConnector={true} downConnector={true} />
				</div>
			</div>

			<div>
				<h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 500;">Normal</h3>
				<div style="display: inline-flex; border: 1px dashed purple">
					<TreeElementTag text="Loop" upConnector={true} downConnector={true} />
				</div>
			</div>

			<div>
				<h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 500;">Long</h3>
				<div style="display: inline-flex; border: 1px dashed purple">
					<TreeElementTag text="Iteration" upConnector={true} downConnector={true} />
				</div>
			</div>

			<div>
				<h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 500;">Very long</h3>
				<div style="display: inline-flex; border: 1px dashed purple">
					<TreeElementTag
						text="ThisIsAVeryLongTagThatStretchesTheBox"
						upConnector={true}
						downConnector={true}
					/>
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<Story
	name="Playground"
	args={{
		upConnector: true,
		downConnector: true,
		text: 'Loop'
	}}
>
	{#snippet template(args)}
		<div style="padding: 40px;">
			<TreeElementTag {...args} />
		</div>
	{/snippet}
</Story>
