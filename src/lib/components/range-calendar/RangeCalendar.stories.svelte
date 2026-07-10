<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { RangeCalendar } from './index.js';

	const { Story } = defineMeta({
		title: 'Components/RangeCalendar',
		component: RangeCalendar,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	import { CalendarDate, getLocalTimeZone, today, type DateValue } from '@internationalized/date';

	type Range = { start: DateValue | undefined; end: DateValue | undefined };

	const start = today(getLocalTimeZone());

	let playgroundValue = $state<Range>({ start: undefined, end: undefined });
	let twoMonthValue = $state<Range>({ start: undefined, end: undefined });
	// A concrete range so the start/middle/end highlight styling is visible.
	let presetValue = $state<Range>({
		start: new CalendarDate(2025, 6, 10),
		end: new CalendarDate(2025, 6, 18)
	});
</script>

<!-- Single-month range picker; select a start then an end day. -->
<Story name="Playground">
	{#snippet template()}
		<RangeCalendar bind:value={playgroundValue} placeholder={start} />
	{/snippet}
</Story>

<!-- Two months side by side. -->
<Story name="Two months">
	{#snippet template()}
		<RangeCalendar bind:value={twoMonthValue} numberOfMonths={2} placeholder={start} />
	{/snippet}
</Story>

<!-- A preselected range showing the start, middle, and end highlight states. -->
<Story name="Preselected range">
	{#snippet template()}
		<RangeCalendar bind:value={presetValue} placeholder={new CalendarDate(2025, 6, 1)} />
	{/snippet}
</Story>
