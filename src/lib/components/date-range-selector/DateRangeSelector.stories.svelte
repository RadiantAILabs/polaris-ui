<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { DateRangeSelector, type DateRange, type DateRangePreset } from './index.js';

	const { Story } = defineMeta({
		title: 'Components/DateRangeSelector',
		component: DateRangeSelector,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';

	const current = today(getLocalTimeZone());

	const presets: DateRangePreset[] = [
		{ id: 'last-7-days', label: 'Last 7 days', range: () => lastDays(7) },
		{ id: 'last-14-days', label: 'Last 14 days', range: () => lastDays(14) },
		{ id: 'last-30-days', label: 'Last 30 days', range: () => lastDays(30) }
	];

	function lastDays(days: number): DateRange {
		return { start: current.subtract({ days: days - 1 }), end: current };
	}

	let emptyValue = $state<DateRange>({ start: undefined, end: undefined });
	let presetValue = $state<DateRange>({
		start: new CalendarDate(2025, 6, 10),
		end: new CalendarDate(2025, 6, 18)
	});
	let noPresetsValue = $state<DateRange>({ start: undefined, end: undefined });
</script>

<Story name="Variants">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 24px; padding: 40px;">
			<div>
				<h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 600;">Empty with presets</h3>
				<DateRangeSelector bind:value={emptyValue} {presets} />
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 600;">Preselected range</h3>
				<DateRangeSelector bind:value={presetValue} {presets} />
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 600;">
					Calendar only (no presets)
				</h3>
				<DateRangeSelector bind:value={noPresetsValue} placeholder="Pick a range" />
			</div>
		</div>
	{/snippet}
</Story>
