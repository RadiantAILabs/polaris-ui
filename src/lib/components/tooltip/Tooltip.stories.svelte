<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Tooltip } from './index.js';
	import { Button } from '../button';

	const { Story } = defineMeta({
		title: 'Components/Tooltip',
		component: Tooltip,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			text: {
				control: { type: 'text' },
				description: 'Plain-text tooltip body'
			},
			side: {
				control: { type: 'select' },
				options: ['top', 'right', 'bottom', 'left'],
				description: 'Side of the trigger the tooltip opens on'
			},
			align: {
				control: { type: 'select' },
				options: ['start', 'center', 'end'],
				description: 'Alignment of the tooltip along the chosen side'
			},
			sideOffset: {
				control: { type: 'number' },
				description: 'Gap in pixels between the trigger and the tooltip'
			},
			delayDuration: {
				control: { type: 'number' },
				description: 'Hover delay in milliseconds before the tooltip opens'
			},
			disabled: {
				control: { type: 'boolean' },
				description: 'Whether the tooltip is suppressed'
			}
		}
	});
</script>

<Story name="Sides">
	{#snippet template()}
		<div style="display: flex; gap: 64px; padding: 96px;">
			{#each ['top', 'right', 'bottom', 'left'] as const as side (side)}
				<Tooltip {side} text={`Opens ${side}`}>
					<Button variant="secondary" label={side} size="base" />
				</Tooltip>
			{/each}
		</div>
	{/snippet}
</Story>

<Story name="Rich content">
	{#snippet template()}
		<div style="padding: 96px;">
			<Tooltip side="top">
				{#snippet content()}
					<div class="hint">
						<p class="hint__title">Merge branch</p>
						<p class="hint__body">
							Combines the source branch into the target and closes the request.
						</p>
					</div>
				{/snippet}
				<Button variant="secondary" label="Merge" size="base" />
			</Tooltip>
		</div>
	{/snippet}
</Story>

<Story
	name="Playground"
	args={{
		text: 'Copy to clipboard',
		side: 'top',
		align: 'center',
		sideOffset: 6,
		delayDuration: 200,
		disabled: false
	}}
>
	{#snippet template(args)}
		<div style="padding: 96px;">
			<Tooltip {...args}>
				<Button variant="primary" label="Hover me" size="base" />
			</Tooltip>
		</div>
	{/snippet}
</Story>

<style>
	.hint {
		display: flex;
		flex-direction: column;
		gap: 6px;
		max-width: 15rem;
	}

	.hint__title {
		margin: 0;
		font-weight: 600;
	}

	.hint__body {
		margin: 0;
		opacity: 0.8;
	}
</style>
