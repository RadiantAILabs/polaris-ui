<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { TraceTimeline } from '.';

	const { Story } = defineMeta({
		title: 'Components/TraceTimeline',
		component: TraceTimeline,
		parameters: {
			layout: 'padded'
		},
		tags: ['autodocs'],
		argTypes: {
			bars: {
				control: { type: 'object' },
				description: 'Array of bars with startTime and duration in milliseconds'
			},
			minGridSpacing: {
				control: { type: 'number' },
				description: 'Minimum pixels between grid lines (default: 80)'
			}
		}
	});
</script>

<Story name="Complex Trace">
	{#snippet template()}
		<div style="padding: 24px;">
			<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Complex Trace Pattern</h3>
			<TraceTimeline
				bars={[
					{ startTime: 0, duration: 8000, label: 'Total request' },
					{ startTime: 0, duration: 1000, label: 'Auth check' },
					{ startTime: 1000, duration: 3500, label: 'Database query' },
					{ startTime: 1000, duration: 1000, label: 'Query parsing' },
					{ startTime: 2000, duration: 2500, label: 'Data fetch' },
					{ startTime: 2000, duration: 500, label: 'Connection pool' },
					{ startTime: 5500, duration: 1500, label: 'Response formatting' },
					{ startTime: 7000, duration: 1000, label: 'Compression' },
					{ startTime: 7000, duration: 2000, label: 'Network transfer' },
					{ startTime: 9000, duration: 1000, label: 'Client processing' },
					{ startTime: 9500, duration: 500, label: 'Render' },
					{ startTime: 10000, duration: 300, label: 'Paint' },
					{ startTime: 10300, duration: 200, label: 'Composite' }
				]}
			/>
		</div>
	{/snippet}
</Story>

<Story name="Short Durations">
	{#snippet template()}
		<div style="padding: 24px;">
			<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Short Duration Events</h3>
			<TraceTimeline
				bars={[
					{ startTime: 0, duration: 100, label: 'Quick event 1' },
					{ startTime: 150, duration: 50, label: 'Quick event 2' },
					{ startTime: 250, duration: 200, label: 'Quick event 3' },
					{ startTime: 500, duration: 100, label: 'Quick event 4' },
					{ startTime: 650, duration: 150, label: 'Quick event 5' }
				]}
			/>
		</div>
	{/snippet}
</Story>

<Story name="Single Long Trace">
	{#snippet template()}
		<div style="padding: 24px;">
			<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Single Long Trace</h3>
			<TraceTimeline bars={[{ startTime: 0, duration: 12000, label: 'Long running operation' }]} />
		</div>
	{/snippet}
</Story>

<Story name="Empty State">
	{#snippet template()}
		<div style="padding: 24px;">
			<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">No Data</h3>
			<div style="height: 100px;">
				<TraceTimeline bars={[]} />
			</div>
		</div>
	{/snippet}
</Story>

<Story name="With Empty Rows">
	{#snippet template()}
		<div style="padding: 24px;">
			<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">
				Mixed Data with Empty Rows
			</h3>
			<p style="margin: 0 0 12px; font-size: 13px; color: var(--color-text-secondary);">
				Demonstrates alignment when some rows have no timeline data (e.g., processing tasks without
				endTime)
			</p>
			<TraceTimeline
				bars={[
					{ startTime: 0, duration: 2000, label: 'Initial request' },
					null,
					{ startTime: 500, duration: 1500, label: 'Database query' },
					null,
					null,
					{ startTime: 2500, duration: 1000, label: 'Response formatting' },
					{ startTime: 3500, duration: 500, label: 'Send response' },
					null
				]}
			/>
		</div>
	{/snippet}
</Story>

<Story name="Width Testing">
	{#snippet template()}
		<div style="padding: 24px;">
			<h3
				style="margin: 0 0 16px; font-size: 14px; font-weight:
			500;"
			>
				Various Container Widths
			</h3>
			<div style="display: flex; flex-direction: row; gap: 32px;">
				{#each [40, 80, 160, 240] as width (width)}
					<div>
						<p style="margin: 0 0 8px; font-size: 12px; color: var(--color-text-secondary);">
							Width: {width}px
						</p>
						<div
							style="width: {width}px; height: 200px; overflow-x: auto; border: 1px dashed purple;"
						>
							<TraceTimeline
								bars={[
									{ startTime: 0, duration: 3000, label: 'Request' },
									{ startTime: 500, duration: 1500, label: 'Processing' },
									{ startTime: 2500, duration: 2000, label: 'Response' }
								]}
								minGridSpacing={80}
							/>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/snippet}
</Story>

<Story
	name="Playground"
	args={{
		bars: [
			{ startTime: 0, duration: 3000, label: 'Request' },
			{ startTime: 500, duration: 1500, label: 'Processing' },
			{ startTime: 2500, duration: 2000, label: 'Response' }
		],
		minGridSpacing: 80
	}}
>
	{#snippet template(args)}
		<div style="padding: 24px;">
			<TraceTimeline {...args} />
		</div>
	{/snippet}
</Story>
