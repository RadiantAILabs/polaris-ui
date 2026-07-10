<script lang="ts">
	import { cn } from '../../utils';

	import { Calendar as CalendarPrimitive } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: CalendarPrimitive.DayProps = $props();
</script>

<CalendarPrimitive.Day bind:ref {...restProps}>
	{#snippet child({ props, day })}
		<div {...props} class={cn('calendar-day', className)}>
			{day}
		</div>
	{/snippet}
</CalendarPrimitive.Day>

<style lang="scss">
	@use './calendar-base' as base;

	.calendar-day {
		@include base.day-base;

		// Today state (not selected)
		&[data-today]:not([data-selected]) {
			color: var(--color-text-primary);
			background-color: var(--color-button-background-active);
		}

		// Selected state
		&[data-selected] {
			color: var(--color-text-inverse-primary);
			background-color: var(--color-button-primary-background-active);

			// Hover state
			&:hover {
				color: var(--color-text-inverse-primary);
				background-color: var(--color-button-primary-background-active);
			}
		}

		// Outside month state (not selected)
		&[data-outside-month]:not([data-selected]) {
			color: var(--color-text-tertiary);
		}
	}
</style>
