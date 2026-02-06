<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TreeResourceIcon from './TreeResourceIcon.svelte';

	const { Story } = defineMeta({
		title: 'Components/Tree/ResourceIcon',
		component: TreeResourceIcon,
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
			type: {
				control: { type: 'select' },
				options: ['agent', 'component', 'nli'],
				description: 'The type of resource'
			}
		}
	});
</script>

<Story name="Resource Types">
	{#snippet template()}
		<div style="display: flex; gap: 48px; align-items: flex-start; padding: 40px;">
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Agent</h3>
				<TreeResourceIcon type="agent" />
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Component</h3>
				<TreeResourceIcon type="component" />
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">NLI</h3>
				<TreeResourceIcon type="nli" />
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Connectors">
	{#snippet template()}
		<div style="display: flex; gap: 48px; align-items: flex-start; padding: 40px;">
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Both Connectors</h3>
				<TreeResourceIcon type="agent" upConnector={true} downConnector={true} />
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Up Only</h3>
				<TreeResourceIcon type="agent" upConnector={true} downConnector={false} />
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Down Only</h3>
				<TreeResourceIcon type="agent" upConnector={false} downConnector={true} />
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">No Connectors</h3>
				<TreeResourceIcon type="agent" upConnector={false} downConnector={false} />
			</div>
		</div>
	{/snippet}
</Story>

<Story
	name="Playground"
	args={{
		upConnector: true,
		downConnector: true,
		type: 'agent'
	}}
>
	{#snippet template(args)}
		<div style="padding: 40px;">
			<TreeResourceIcon {...args} />
		</div>
	{/snippet}
</Story>
