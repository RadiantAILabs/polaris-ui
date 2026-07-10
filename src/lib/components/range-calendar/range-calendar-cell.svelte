<script lang="ts">
	import { RangeCalendar as RangeCalendarPrimitive } from 'bits-ui';
	import { cn } from '../../utils';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: RangeCalendarPrimitive.CellProps = $props();
</script>

<RangeCalendarPrimitive.Cell bind:ref {...restProps}>
	{#snippet child({ props, ...childProps })}
		<td {...props} class={cn('range-calendar-cell', className)}>
			{@render children?.(childProps)}
		</td>
	{/snippet}
</RangeCalendarPrimitive.Cell>

<style lang="scss">
	@use '../calendar/calendar-base' as base;

	.range-calendar-cell {
		@include base.cell-base;
	}
</style>
