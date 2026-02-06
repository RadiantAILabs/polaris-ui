<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TreeElementDetails from './TreeElementDetails.svelte';

	const { Story } = defineMeta({
		title: 'Components/Tree/ElementDetails',
		component: TreeElementDetails,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			time: {
				control: { type: 'text' },
				description: 'Time duration to display'
			},
			tokens: {
				control: { type: 'text' },
				description: 'Number of tokens to display'
			},
			status: {
				control: { type: 'select' },
				options: ['completed', 'processing', 'failed'],
				description: 'Status of the element'
			}
		}
	});
</script>

<Story name="Variants">
	{#snippet template()}
		<div
			style="display: flex; flex-direction: column; gap: 24px; align-items: flex-start; padding: 40px;"
		>
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Processing state</h3>
				<TreeElementDetails status="processing" />
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Completed state</h3>
				<TreeElementDetails time="125.8s" tokens="15347" />
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Failed state</h3>
				<TreeElementDetails time="125.8s" tokens="15347" status="failed" />
			</div>
		</div>
	{/snippet}
</Story>

<Story
	name="Playground"
	args={{
		time: '13.6s',
		tokens: '2523',
		status: 'completed'
	}}
>
	{#snippet template(args)}
		<div style="padding: 40px;">
			<TreeElementDetails {...args} />
		</div>
	{/snippet}
</Story>
