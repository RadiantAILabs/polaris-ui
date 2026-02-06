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
	@use '../../styles/tokens' as *;

	.calendar-day {
		display: flex;
		flex-direction: column;
		gap: $space-1;
		align-items: center;
		justify-content: center;
		width: var(--cell-size);
		height: var(--cell-size);
		padding: 0;
		line-height: 1;
		color: var(--color-text-primary);
		white-space: nowrap;
		user-select: none;
		border-radius: $border-radius-base;

		@include typography(button-large);

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

		// Disabled state
		&[data-disabled] {
			pointer-events: none;
			opacity: 0.5;
		}

		// Unavailable state
		&[data-unavailable] {
			color: var(--color-text-tertiary);
			text-decoration: line-through;
		}

		// Hover state
		&:hover {
			color: var(--color-text-primary);
			background-color: var(--color-button-background-hover);
		}

		// Focus state
		&:focus {
			position: relative;
			border-color: var(--color-control-border-active);
			box-shadow: 0 0 0 2px rgb(var(--color-control-border-active) / 50%);
		}
	}
</style>
