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
	@use '../../styles/tokens' as *;

	.calendar-cell {
		position: relative;
		width: var(--cell-size);
		height: var(--cell-size);
		padding: 0;
		text-align: center;

		@include typography('button-large');

		&:focus-within {
			z-index: 20;
		}
	}
</style>
