<script lang="ts">
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import { cn } from '../../utils';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: CalendarPrimitive.CellProps = $props();
</script>

<CalendarPrimitive.Cell bind:ref {...restProps}>
	{#snippet child({ props, ...childProps })}
		<td {...props} class={cn('calendar-cell', className)}>
			{@render children?.(childProps)}
		</td>
	{/snippet}
</CalendarPrimitive.Cell>

<style lang="scss">
	@use './calendar-base' as base;

	.calendar-cell {
		@include base.cell-base;
	}
</style>
