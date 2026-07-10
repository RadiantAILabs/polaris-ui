<script lang="ts">
	import { RangeCalendar as RangeCalendarPrimitive } from 'bits-ui';
	import { cn } from '../../utils';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: RangeCalendarPrimitive.DayProps = $props();
</script>

<RangeCalendarPrimitive.Day bind:ref {...restProps}>
	{#snippet child({ props, day })}
		<div {...props} class={cn('range-calendar-day', className)}>
			{day}
		</div>
	{/snippet}
</RangeCalendarPrimitive.Day>

<style lang="scss">
	@use '../../styles/tokens' as *;
	@use '../calendar/calendar-base' as base;

	.range-calendar-day {
		@include base.day-base;

		&[data-today]:not([data-selected], [data-highlighted]) {
			color: var(--color-text-primary);
			background-color: var(--color-button-background-active);
		}

		&[data-highlighted]:not([data-disabled]),
		&[data-range-middle]:not([data-disabled]) {
			color: var(--color-text-primary);
			background-color: var(--color-button-background-active);
			border-radius: 0;
		}

		&[data-range-start]:not([data-disabled]),
		&[data-selection-start]:not([data-disabled]),
		&[data-range-end]:not([data-disabled]),
		&[data-selection-end]:not([data-disabled]) {
			color: var(--color-text-inverse-primary);
			background-color: var(--color-button-primary-background-active);
		}

		&[data-range-start]:not([data-range-end]),
		&[data-selection-start]:not([data-selection-end]) {
			border-radius: $border-radius-base 0 0 $border-radius-base;
		}

		&[data-range-end]:not([data-range-start]),
		&[data-selection-end]:not([data-selection-start]) {
			border-radius: 0 $border-radius-base $border-radius-base 0;
		}

		&[data-range-start][data-range-end],
		&[data-selection-start][data-selection-end] {
			border-radius: $border-radius-base;
		}

		&[data-outside-month]:not([data-selected], [data-highlighted]) {
			color: var(--color-text-tertiary);
		}

		&[data-range-start]:hover,
		&[data-selection-start]:hover,
		&[data-range-end]:hover,
		&[data-selection-end]:hover {
			color: var(--color-text-inverse-primary);
			background-color: var(--color-button-primary-background-active);
		}
	}
</style>
