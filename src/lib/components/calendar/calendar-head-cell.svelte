<script lang="ts">
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import { cn } from '../../utils';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: CalendarPrimitive.HeadCellProps = $props();
</script>

<CalendarPrimitive.HeadCell bind:ref {...restProps}>
	{#snippet child({ props })}
		<th {...props} class={cn('calendar-head-cell', className)}>
			{@render children?.()}
		</th>
	{/snippet}
</CalendarPrimitive.HeadCell>

<style lang="scss">
	@use '../../styles/tokens' as *;

	.calendar-head-cell {
		width: var(--cell-size);
		color: var(--color-text-disabled);

		@include typography('button-large');
	}
</style>
